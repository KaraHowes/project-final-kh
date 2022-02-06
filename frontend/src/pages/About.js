import React from "react";
import styled from "styled-components";

import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { Box } from "../components/styling/containers";

const TitleText = styled.h1``;
const Text = styled.p`
line-height: 22px;
font-size: 18px;`


const About = () => {
  return (
    <>
      <Box>
        <Menu />
        <TitleText>How Thek-Friends started</TitleText>
        <Text>
          It started with a bag. Sat in a Child's room. Used and loved for three years and then
          swapped out for another. Then inspiration struck: why not build a
          resource to facilitate the donation and receivership of these bags?
          The premise is simple: Thek-Friends would like to reduce the waste of unused and now-unloved Theks and give
          them a new home. 
        </Text>

        <Text>
          This project was developed and built by Kara Howes; a Ph.D in Chemistry who is starting her journey
          as a developer (and relishing the process). Originally from the UK, now living in Switzerland. A lover of life and fun.
        </Text>
      </Box>

      <Footer />
    </>
  );
};

export default About;
