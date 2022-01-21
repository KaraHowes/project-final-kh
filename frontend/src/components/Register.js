import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import member from "../reducers/member";

const RegisterWrapper = styled.div`
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
  }
  font-family: "Josefin Sans", sans-serif;
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
  font-family: "Josefin Sans", sans-serif;
`;

const Register = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const accessToken = useSelector((store) => store.member.accessToken);
  const errors = useSelector((store) => store.member.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/welcome");
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

    fetch(API_URL("signup"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response.memberId));
            dispatch(member.actions.setMembername(data.response.membername));
            dispatch(member.actions.setEmailAddress(data.response.email));
            dispatch(member.actions.setLocation(data.response.location));
            dispatch(member.actions.setStatus(data.response.status));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
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
          //dispatch(member.actions.setErrors(data));
        }
      });
  };

  return (
    <RegisterWrapper>
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
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          id="statusInput"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option disabled value="">
            Select your Thek-friends status:
          </option>
          <option value="Donor" selected>
            Donor
          </option>
          <option value="Recipient" selected>
            Recipient
          </option>
        </select>
        {status === "Donor" && <p>hello wonderful donor</p>}

        <ButtonContainer>
          <Button type="submit" disabled={membername.length < 5}>
            Register
          </Button>
        </ButtonContainer>
        {errors && (
          <p className="warning-login">
            Whoops, looks like there has been an error
          </p>
        )}
      </Form>
    </RegisterWrapper>
  );
};

export default Register;
