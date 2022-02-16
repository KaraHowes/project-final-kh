import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import { API_URL } from "../utils/urls";
import member from "../reducers/member";

import { Box } from "../components/styling/containers"
import { Form, Input } from "../components/styling/formStyle"
import Footer from '../components/Footer'
import Menu from '../components/Menu'


const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 5px 5px 10px #888888
`;
const Press =styled(Link)`
text-decoration: none;
&:visited{
  color:black;
}
`
const Login = () => {
  const [membername, setMembername] = useState("");
  const [password, setPassword] = useState("");


  const accessToken = useSelector((store) => store.member.accessToken);
  const errors = useSelector((store) => store.member.error);
  const memberId = useSelector((store) => store.member.memberId)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (accessToken) {
      navigate(`/member/${memberId}`);
    }
  }, [accessToken, navigate, memberId]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ membername, password}),
    };

    fetch(API_URL("signin"), options)
      .then((res) => res.json())
      .then((data) => {
      
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response._id));
            dispatch(member.actions.setMembername(data.response.membername));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
            dispatch(member.actions.setLocation(data.response.location));
            dispatch(member.actions.setStatus(data.response.status));
            dispatch(member.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMembername(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setLocation(null));
            dispatch(member.actions.setStatus(null));
            dispatch(member.actions.setError(data.response));
          });
        }
      });
  };

  return(
 <>
 <Box>
   <Menu/>
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
            <Press to="/register">Register</Press>
          </Button>
        </ButtonContainer>
		{errors && <p className="warning-login">Your Username or password do not match our records</p>}

      </Form>
    </SigninWrapper>

 </Box>
 <Footer/>
 </>
  )
};

export default Login;

