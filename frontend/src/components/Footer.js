import React from "react";
import styled from "styled-components";

const StyleFooter = styled.footer`
  background: #878df7;
  color: white;
  bottom: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  padding: 15px;
  font-family: "Josefin Sans", sans-serif;
  font-size: 24px;
  font-weight: 800;
`;

const Footer = () => {
  return <StyleFooter>This website was built by Phil Mebobbins</StyleFooter>;
};

export default Footer;
