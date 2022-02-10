import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from 'sweetalert';

import { API_URL } from "../utils/urls";
import member from "../reducers/member";

import Loader from '../components/Loader'
import { Box } from "../components/styling/containers"
import { Select, Input, Form } from "../components/styling/formStyle"
import Footer from '../components/Footer'
import Menu from '../components/Menu'


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 3px 3px 6px #888888;
`;

const Register = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmailAddress] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false)

  const accessToken = useSelector((store) => store.member.accessToken);
  const errors = useSelector((store) => store.member.error);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      swal('Welcome Thek-Friend! Thank you for becomming a member, you wonderful person!', {icon: 'success', button: 'ok'})
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  
  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ membername, password, email, location, status }),
    };
    setLoading(true)  
    fetch(API_URL("signup"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response.memberId));
            dispatch(member.actions.setMembername(data.response.membername));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
            dispatch(member.actions.setEmailAddress(data.response.email));
            dispatch(member.actions.setLocation(data.response.location));
            dispatch(member.actions.setStatus(data.response.status));
            dispatch(member.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMembername(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setEmailAddress(null));
            dispatch(member.actions.setLocation(null));
            dispatch(member.actions.setStatus(null));
            dispatch(member.actions.setError(data.response));
          });
        }
      }).finally(() => setLoading(false));
  };

  return (
    <>
   <Box>
     <Menu/>
    {loading && <Loader/>}
      <Form onSubmit={onFormSubmit}>
        <Input
          id="membernameInput"
          type="text"
          value={membername}
          onChange={(e) => setMembername(e.target.value)}
          minLength="5"
          required
          placeholder="User name"
        />
        <Input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
          placeholder="Email"
        />
        <Input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />

        <Select
          id="locationInput"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option disabled value="">
            Select nearest city:
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
          <option value="Bern" >
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
          id="statusInput"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled value="">
            Thek-friends status:
          </option>
          <option value="Donor">
            Donor
          </option>
          <option value="Recipient">
            Recipient
          </option>
       </Select>
       

        <ButtonContainer>
          <Button type="submit" disabled={membername.length < 5}>
            Register
          </Button>
        </ButtonContainer>
        {errors && (
          <p className="warning-login">
            Whoops, looks like that username has already been taken!
          </p>
        )}
      </Form>
    
   </Box>
   <Footer/>
   </>
  );
};

export default Register;
