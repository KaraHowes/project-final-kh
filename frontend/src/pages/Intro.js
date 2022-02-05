import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Box } from "../components/styling/containers"
import animationData from "../animations/star.json";

const ImageWords = styled.img`
  width: 100%;
`;
const ImageContainer = styled.div`
display: flex;
flex-direction: row;`;
const ImageWritingContainer = styled.section`
  width: 95%;
`;
const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
`;
const TextContainer = styled.div``;
const TitleText = styled.h1``;
const MainText = styled.p`
  text-align: justify;
  line-height: 24px;
`;
const Startbutton = styled.button`
  width: 100%;
  height: 50px;
  color: white;
  background-color: #878df7;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 3px 3px 6px #888888;
`;
const Buttoncontainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100px;
  margin-bottom: 50px;
`;
const Intro = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box>
      <ImageWords
        src="./assets/thek-friends-01.png"
        alt="Thek-friends-written-logo"
      ></ImageWords>
      <ImageWritingContainer>
        <ImageContainer>
          <ImageThek
            src="./assets/thek-icon-1.png"
            alt="Thek-friends-bag-logo"
          ></ImageThek>

          <Lottie options={defaultOptions} height={150} width={150}/>
        </ImageContainer>

        <TextContainer>
          <TitleText>Welcome to Thek-Friends</TitleText>
          <MainText>
            {" "}
            Every year. thousands of Children start the Swiss School system. As
            we all know, The Thek is an integral part of the process. Become a Thek-Friend
            and helps us to reduce the waste of unused and unloved Theks
            and give them a new home.
          </MainText>
        </TextContainer>
      </ImageWritingContainer>

      <Buttoncontainer>
        <Link to="/signin">
          <Startbutton>Register</Startbutton>
        </Link>
      </Buttoncontainer>
    </Box>
  );
};

export default Intro;
