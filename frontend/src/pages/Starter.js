import React from "react";
import styled from "styled-components";

import Footer from "../components/Footer";
import { Press } from "../components/styling/general"

const Image = styled.img`
  width: 100%;
  margin: 0 auto;
  min-width: 300px;
`;
const Box = styled.section`
display: flex;
  flex-direction: column;  
width: 70%;
  padding: 150px 50px;
  background: white;
  margin: 50px auto 0 auto;
  border: 5px solid black;
  box-shadow: 10px 10px #878df7;
  align-items: center;
  justify-content: center;
`;
const Startbutton = styled.button`
  padding: 20px;
  border-radius: 30px;
  border: none;
  background-color: #878df7;
  color: white;
  width: 90%;
  font-size: 40px;
  font-family: "Josefin Sans", sans-serif;
  &:hover{
    background-color: black;
  }
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
    <>
      <Box>
        <Image
          src="./assets/thek-friends-01.png"
          alt="Thek friends written logo"
        />
        <Buttoncontainer>
          <Press to="/">
            <Startbutton>Enter</Startbutton>
          </Press>
        </Buttoncontainer>
      </Box>
      <Footer />
    </>
  );
};

export default Starter;
