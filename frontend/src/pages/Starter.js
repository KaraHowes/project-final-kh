import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Image =styled.img`
width: 80%;`
const Box = styled.section`
  width: 70%;
  padding: 50px;
  background: white;
  margin: 50px auto 0 auto;
  border: 5px solid black;
  box-shadow: 5px 5px 10px;
`;
const Startbutton = styled.button`
  padding: 20px;
  border-radius: 30px;
  background-color: #878DF7;
  color: white;
  width: 100%;
  font-size: 40px;
  font-family: 'Josefin Sans', sans-serif;
`;
const Buttoncontainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40%;
  height: 100px;
  margin-bottom: 50px;
`;
const Starter = () => {
  return (
    <Box>
        <Image src="./assets/thek-friends-01.png" alt="Thek-friends-written-logo"></Image>
      <Buttoncontainer>
        <Link to="/intro">
          <Startbutton>Enter</Startbutton>
        </Link>
      </Buttoncontainer>
    </Box>
  );
};

export default Starter;
