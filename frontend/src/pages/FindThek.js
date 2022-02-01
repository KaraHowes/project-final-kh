import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import styled from "styled-components";

import theks from '../reducers/theks'
import { API_URL } from '../utils/urls'
import Logout from "../components/Logout"
//import BagFound from "../components/BagFound"

const Box = styled.section `
width: 70%;
padding: 50px;
background: white;
margin: 50px auto 0 auto;
border: 5px solid black;
box-shadow: 5px 5px 10px;
`
const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: white;
  border: 1px solid black;
  margin: 0 auto;
  padding: 30px;
  
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  justify-content: center;
  margin: 0 auto;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #FFF000;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px 15px;
  margin: 0 0 20px;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 3px 3px 6px #888888
`;
const Select = styled.select`
   border:none;
    padding: 10px 15px;
    margin: 0 0 20px;
    height: 40px;
    display: block;
    border-radius: 5px;
    font-size: 16px;
    background-color: #FFFFCC;
    font-weight: 800;
    font-family: 'Josefin Sans', sans-serif;
    text-align: center;
    ;
`

const FindThek = () => {
    const[colour, setColour] = useState("")
    const[location, setLocation] = useState("")    
    const[age, setAge] = useState("")  

    const errors = useSelector((store) => store.member.error);

    const accessToken = useSelector((store)=> store.member.accessToken)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!accessToken) {
            navigate('/signin')
        }
    }, [accessToken, navigate])

    const onFormSubmit = (event) => {
        event.preventDefault();
       
        const options = { 
            method: 'GET',
            headers: {
                Authorization: accessToken,
            },
            //body: JSON.stringify({ colour, location, age }),
        }
        fetch(API_URL("searchbags"), options)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                dispatch(theks.actions.setItems(data.response))
                dispatch(theks.actions.setbagId(data.response.bagId))
                dispatch(theks.actions.setLocation(data.response.location))
                dispatch(theks.actions.setColour(data.response.colour))
                dispatch(theks.actions.setAge(data.response.age))
                dispatch(theks.actions.setMember(data.response.member))
                dispatch(theks.actions.setError(null))
            } else {
                dispatch(theks.actions.setItems([]))
                dispatch(theks.actions.setbagId(null))
                dispatch(theks.actions.setLocation(null))
                dispatch(theks.actions.setColour(null))
                dispatch(theks.actions.setAge(null))
                dispatch(theks.actions.seMember(null))
                dispatch(theks.actions.setError(data.response))
            }
        })
      
}
return (
    //<div>Here is the 'pick-my-thek' form</div>
   <Box>
        <AddWrapper>
      <Form onSubmit={onFormSubmit}>
      <Select
          id="colourInput"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          required
        >
          <option disabled value="">
            Main colour:
          </option>
          <option value="Blue">
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
           Location:
          </option>
          <option value="Zurich">
            Zurich
          </option>
          <option value="Basel">
            Basel
          </option>
          <option value="Geneva">
            Geneva
          </option>
          <option value="Bern">
            Bern
          </option>
          <option value="Luzern">
            Luzern
          </option>
          <option value="Lugano">
            Lugano
          </option>
        </Select>

        <Select
          id="ageInput"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        >
          <option disabled value="">
            Age-range:
          </option>
          <option value="1stGrade">
            1st Grade, 6-9 years
          </option>
          <option value="4thGrade">
            4th Grade, 9-12 years
          </option>
       </Select>
   
          <Button type="submit">Find my Thek!</Button>
          
       
		{errors && <p className="warning-login">Something went wrong!!!</p>}
        <Logout style={{backgroundColor: '#FFF000'}}/>
      </Form>
     

      
    </AddWrapper>
   </Box>
)
}
export default FindThek