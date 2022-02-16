import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment'

import searched from "../reducers/searched";
import { API_URL } from "../utils/urls";

import Loader from '../components/Loader'
import { Form, Select } from "../components/styling/formStyle";
import { BagContainer, Card, CardText, TextWrapper} from "../components/styling/mapping";
import { Press, SubTitle } from "../components/styling/general";

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff000;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px 15px;
  margin: 0 0 20px;
  border-radius: 10px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 5px 5px 10px #888888
`;

const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;


const Filter = () => {
  const [location, setLocation] = useState("");

  const errors = useSelector((store) => store.member.error);
  const accessToken = useSelector((store) => store.member.accessToken);
  const bagCity = useSelector((store)=> store.searched.items) 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    
    event.preventDefault();
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    setLoading(true);
    fetch(
      `${API_URL("searchbags")}?location=${location}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
       
        if (data.success) {
          batch(() => {
            dispatch(searched.actions.setItems(data.response));
            
            dispatch(searched.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(searched.actions.setItems([]));
            
            dispatch(searched.actions.setError(data.response));
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <>

        <Form onSubmit={onFormSubmit}>
        <SubTitle>You can search for a bag by location:</SubTitle>
        {loading && <Loader/>}
          <Select
            id="locationInput"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option disabled value="">
              Location:
            </option>
            <option value="Zurich">Zurich</option>
            <option value="Basel">Basel</option>
            <option value="Geneva">Geneva</option>
            <option value="Bern">Bern</option>
            <option value="Luzern">Luzern</option>
            <option value="Lugano">Lugano</option>
          </Select>

          <Button type="submit">Submit</Button>

          {errors && <p className="warning-login">Something went wrong!!!</p>}
        
        </Form>
 
        <BagContainer>
        {bagCity.map((item) => (
          <Card key={item._id}>
              <ImageThek
            src="./assets/thek-icon-1.png"
            alt="Thek-friends-bag-logo"
          ></ImageThek>
            <TextWrapper>
              <CardText>Colour:{item.colour}</CardText>
              <Press to={`/bag/${item._id}`}>
              <CardText>Colour:{item.location}</CardText>
              
              </Press>
              <CardText>Age-range:{item.age}</CardText>
              <CardText> Available since:{moment(item.createdAt).fromNow()}</CardText>
            </TextWrapper>
          </Card>
        ))}
      </BagContainer>

    </>
  );
};
export default Filter;
