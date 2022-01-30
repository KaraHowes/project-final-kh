import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import member from "../reducers/member";

const Triangle = styled.div `
width: 0;
height: 0;
border-top: 900px solid #20C6BA;
border-right: 1500px solid transparent;
position: absolute;
left:0;
right:0;
top:0;
z-index:-1;
opacity: 0.9;`

const Box = styled.section `
width: 80%;
padding: 125px;
background: white;
margin: 0 auto;
border: 5px solid black;
box-shadow: 5px 5px 10px;
`
const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: white;
  border: 1px solid black;
  margin: 0 auto;
  padding: 50px 30px;
  
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

const Login = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmailAddress] = useState("")
  //const [mode, setMode] = useState('signup');

  const accessToken = useSelector((store) => store.member.accessToken);
  const errors = useSelector((store) => store.member.error);
  const memberId = useSelector((store) => store.member.memberId)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (accessToken) {
      navigate("/member/member:id");
    }
  }, [accessToken, navigate, memberId]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ membername, password, email }),
    };

    fetch(API_URL("signin"), options)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
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
      });
  };

  return (
    <>
    <Triangle></Triangle>
    <Box>
    <SigninWrapper>
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
          id="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        
        <ButtonContainer>
          <Button type="submit">Sign-in</Button>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </ButtonContainer>
		{errors && <p className="warning-login">Your Username or password do not match our records</p>}

      </Form>
    </SigninWrapper>
    </Box>
    
    </>
  );
};

export default Login;