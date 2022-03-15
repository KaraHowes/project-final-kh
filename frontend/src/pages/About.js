import React from "react";
import styled from "styled-components";

import Menu from "../components/Menu";
import { Box } from "../components/styling/containers";

const TitleText = styled.h1``;
const Text = styled.p`
  line-height: 22px;
  font-size: 18px;
`;

const SocialContainer = styled.section`
  width: 90%;
  text-align: center;
  margin: 10px auto;
`;

const Nav = styled.nav`
  margin: 10px 0;
  padding: 10px 0;
  display: block;
`;
const Link = styled.a`
  padding: 10px;
  margin: 10px;
  font-family: "Font Awesome 5 Brands";
  font-size: 2rem;
  color: black;
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const About = () => {
  return (
   
      <Box>
        <Menu />
        <TitleText>How Thek-Friends started</TitleText>
        <Text>
          It started with a bag. Sat in a Child's room. Used and loved for three
          years and then swapped out for another. Then inspiration struck: why
          not build a resource to facilitate the donation and receivership of
          these bags? The premise is simple: Thek-Friends would like to reduce
          the waste of unused and now-unloved Theks and give them a new home.
        </Text>

        <Text>
          This project was developed and built by Kara Howes; a Ph.D in
          Chemistry who is starting her journey as a developer (and relishing
          the process). Originally from the UK, now living in Switzerland. A
          lover of life and fun.
        </Text>

        <SocialContainer>
          <Nav>
            <Link
              href="https://linkedin.com/in/karahowes"
              aria-label="link to Linked-in  profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-linkedin"></i>
            </Link>
            <Link
              href="https://github.com/KaraHowes"
              aria-label="Link to Github account"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-github"></i>
            </Link>
            <Link
              href="https://stackoverflow.com/users/16680893/karahowes"
              aria-label="link to stackoverflow profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-stack-overflow"></i>
            </Link>
          </Nav>
        </SocialContainer>
      </Box>
  );
};

export default About;
