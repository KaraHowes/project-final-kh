import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Press } from "./styling/general";
import Logout from "./Logout"

const NoBagContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 50px auto;
  max-width: 400px;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  border-radius: 10px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 5px 5px 10px #888888;
  margin-bottom: 15px;
`;
const Image = styled.img`
  width: 70%;
  margin 0 auto;`;

const NoBagFound = () => {
  const accessToken = useSelector((store) => store.member.accessToken);

  return (
    <NoBagContainer>
      <Image src="./assets/octopus.png" alt="sad octopus"/>
      <p>
        Oh no, that's a pity! Please check the All Bags section for a greater
        selection
      </p>

      <Button>
        <Press to="/allBags" params={accessToken}>
          All bags
        </Press>
      </Button>
      <Logout/>
    </NoBagContainer>
  );
};
export default NoBagFound;
