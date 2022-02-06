import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import theks from "../reducers/theks";
import Logout from "../components/Logout"

import Loader from '../components/Loader'
import { Box } from "../components/styling/containers"
import { Form, Select } from "../components/styling/formStyle"
import Footer from '../components/Footer'
import Menu from '../components/Menu'


const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: white;
  border: 1px solid black;
  margin: 0 auto;
  padding: 30px;
  
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 3px 3px 6px #888888
`;

const AddThek = () => {

  const[colour, setColour] = useState("")
  const[location, setLocation] = useState("")    
  const[age, setAge] = useState("")  
  const [loading, setLoading] = useState(false)
  
  const accessToken = useSelector((store) => store.member.accessToken)
  const errors = useSelector((store) => store.member.error);
 const memberId = useSelector((store)=>store.member.memberId)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    }
  }, [accessToken, navigate]);
  
  const onFormSubmit = (event) => {
    event.preventDefault();
  
    navigate("/BagAdded")
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },

      body: JSON.stringify({ colour, location, age, memberId}),
    };
    setLoading(true)
    fetch(API_URL("bags"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(theks.actions.setItems(data.response));
            dispatch(theks.actions.setBagId(data.response.bagId))
            dispatch(theks.actions.setLocation(data.response.location))
            dispatch(theks.actions.setColour(data.response.colour))
            dispatch(theks.actions.setAge(data.response.age))
            dispatch(theks.actions.setMember(data.response.member))
			      dispatch(theks.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(theks.actions.setItems([]));
            dispatch(theks.actions.setBagId(null))
            dispatch(theks.actions.setLocation(null))
            dispatch(theks.actions.setColour(null))
            dispatch(theks.actions.setAge(null))
            dispatch(theks.actions.setMember(null))
            dispatch(theks.actions.setError(data.response));
          });
        }
      }).finally(() => setLoading(false));
  };

  return (
    <>
    <Box>
      <Menu/>
      {loading && <Loader/>}
      <AddWrapper>
      <Form onSubmit={onFormSubmit}>

          <Select
          id="colourInput"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          required
        >
          <option disabled value="">
            Select Main colour:
          </option>
          <option value="Blue" >
            Blue
          </option>
          <option value="Green">
            Green
          </option>
          <option value="Pink">
            Pink
          </option>
          <option value="Purple">
            Purple
          </option>
          <option value="Orange">
            Orange
          </option>
          <option value="Multi">
            Multi-coloured
          </option>
        </Select>

        <Select
          id="locationInput"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option disabled value="">
            Select nearest city:
          </option>
          <option value="Zurich" >
            Zurich
          </option>
          <option value="Basel" >
            Basel
          </option>
          <option value="Geneva" >
            Geneva
          </option>
          <option value="Bern" >
            Bern
          </option>
          <option value="Luzern" >
            Luzern
          </option>
          <option value="Lugano" >
            Lugano
          </option>
        </Select>

        <Select
          id="ageInput"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option disabled value="">
            Select the age-range of the bag:
          </option>
          <option value="1stGrade" >
            1st Grade, 6-9 years
          </option>
          <option value="4thGrade" >
            4th Grade, 9-12 years
          </option>
       </Select>
        
          <Button type="submit">Add bag</Button>
          
          <Logout/>
		{errors && <p className="warning-login">The Thek has not been added to the database</p>}

      </Form>
   
    </AddWrapper>
    </Box>
    <Footer />
    </>
  );
};

export default AddThek;

