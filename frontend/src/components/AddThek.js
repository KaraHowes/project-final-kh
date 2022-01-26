import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import theks from "../reducers/theks";
import Logout from "./Logout"

const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: white;
  border: 1px solid black;
  margin: 0 auto;
  padding: 100px 0;
  
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  justify-content: center;
  margin: 0 auto;
`;
const Input = styled.input`
  background-color: #d5f5f2;
  display: flex;
  flex-direction: column;
  height: 50px;
  margin: 10px 0;
  padding: 30px 0;
  text-align: center;
  font-size: 24px;
  border: none;
  &::-webkit-input-placeholder {
    color: black;
  };
  font-family: 'Josefin Sans', sans-serif;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;
const Button = styled.button`
  width: 45%;
  height: 50px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
`;

const AddThek = () => {

  const[colour, setColour] = useState("")
  const[location, setLocation] = useState("")    
  const[age, setAge] = useState("")  
  

  const memberId = useSelector((store) => store.member.memberId)
  const accessToken = useSelector((store) => store.member.accessToken)
  const errors = useSelector((store) => store.member.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  {/*useEffect(() => {
    if (accessToken) {
      navigate("/BagAdded");
    }
  }, [accessToken, navigate, memberId]);*/}

  const onFormSubmit = (event) => {
    event.preventDefault();
    navigate("/BagAdded")
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },

      body: JSON.stringify({ colour, location, age }),
    };

    fetch(API_URL("bags"), options)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.success) {
          batch(() => {
            //dispatch(theks.actions.setItems(data.response));
            dispatch(theks.actions.setBagId(data.response.bagId))
            dispatch(theks.actions.setLocation(data.response.location))
            dispatch(theks.actions.setColour(data.response.colour))
            dispatch(theks.actions.setAge(data.response.age))
			      dispatch(theks.actions.setError(null));
          });
        } else {
          batch(() => {
            //dispatch(theks.actions.setItems([]));
            dispatch(theks.actions.setBagId(null))
            dispatch(theks.actions.setLocation(null))
            dispatch(theks.actions.setColour(null))
            dispatch(theks.actions.setAge(null))
            dispatch(theks.actions.setError(data.response));
          });
        }
      });
  };

  return (
    <AddWrapper>
      <Form onSubmit={onFormSubmit}>
        <Input
          id="colourInput"
          type="text"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          minLength="5"
          required
          placeholder="Main Colour"
        />
        <select
          id="locationInput"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option disabled value="">
            Select nearest city:
          </option>
          <option value="Zurich" selected>
            Zurich
          </option>
          <option value="Basel" selected>
            Basel
          </option>
          <option value="Geneva" selected>
            Geneva
          </option>
          <option value="Bern" selected>
            Bern
          </option>
          <option value="Luzern" selected>
            Luzern
          </option>
          <option value="Lugano" selected>
            Lugano
          </option>
        </select>

        <select
          id="ageInput"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option disabled value="">
            Select the age-range of the bag:
          </option>
          <option value="1stGrade" selected>
            1st Grade, 6-9 years
          </option>
          <option value="4thGrade" selected>
            4th Grade, 9-12 years
          </option>
       </select>
        <ButtonContainer>
          <Button type="submit">Add bag</Button>
          
        </ButtonContainer>
		{errors && <p className="warning-login">Your Username or password do not match our records</p>}

      </Form>
      <Logout/>
    </AddWrapper>
  );
};

export default AddThek;

