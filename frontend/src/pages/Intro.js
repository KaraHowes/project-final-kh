import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";

import animationData from "../animations/star.json";

import { Box } from "../components/styling/containers";
import { Press } from "../components/styling/general";
import Footer from "../components/Footer";
import Menu from "../components/Menu";


const ImageWords = styled.img`
  width: 100%;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px auto 0 auto;
  @media (min-width: 768px){
    width:100%;
    margin: 0 10px 0 auto;
    align-items: center;
  }
`;
const ImageWritingContainer = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px){
    flex-direction:row;
    margin: 20px 0;
  }
`;
const ImageThek = styled.img`
  width: 150px;
  height: 180px;
  @media (min-width: 768px){
    margin-right: 30px;
    height: 180px;
  }
`;
const LottieContainer = styled.div`
  margin: 60px 0 0 -40px;
  @media (min-width: 768px){
    display: none;
  }
`;
const TextContainer = styled.div`
@media (min-width: 768px){
  float: right;
}`;
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
  padding: 15px;
  font-weight: 800;
  border-radius: 10px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 5px 5px 10px #888888;
`;
const Buttoncontainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
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
    <>
      <Box>
        <Menu />
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
            <LottieContainer>
              <Lottie options={defaultOptions} height={150} width={150} />
            </LottieContainer>
          </ImageContainer>

          <TextContainer>
            <TitleText>Welcome to Thek-Friends</TitleText>
            <MainText>
              {" "}
              Every year thousands of Children start the Swiss School system.
              As we all know, The Thek is an integral part of the process.
              Become a Thek-Friend and help us to reduce the waste of unused
              and unloved Theks and give them a new home.
            </MainText>
          </TextContainer>
        </ImageWritingContainer>

        <Buttoncontainer>
          <Press to="/signin">
            <Startbutton>Register</Startbutton>
          </Press>
        </Buttoncontainer>
      </Box>
      <Footer />
    </>
  );
};

export default Intro;
