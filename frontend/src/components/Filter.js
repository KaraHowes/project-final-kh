import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment'

import searched from "../reducers/searched";
import { API_URL } from "../utils/urls";
import { Form, Select } from "../components/styling/formStyle";

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff000;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px 15px;
  margin: 0 0 20px;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 3px 3px 6px #888888;
`;
const BagContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  @media (min-width: 768px){
    flex-direction:row;
  }
`;
const Card = styled.div`
width: 100%;
margin: 10px auto;
padding: 10px 0;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-end;
text-align: center;
font-family: "Josefin Sans", sans-serif;
max-width: 200px;
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5)
background: white;
@media (min-width: 768px){
  width:45%;
}
`;
const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;
const TextWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const CardText = styled.p`
  background-color: #d5f5f2;
  padding: 5px 0;
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
        console.log(data.response);
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
              <Link to={`/bag/${item._id}`}>
              <CardText>Colour:{item.location}</CardText>
              
              </Link>
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
