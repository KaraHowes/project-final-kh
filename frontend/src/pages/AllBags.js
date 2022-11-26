import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";

import Logout from "../components/Logout";

import Menu from "../components/Menu";
import Filter from "../components/Filter";
import SeeAllBags from "../components/SeeAllBags"
import { Box, ButtonContainer } from "../components/styling/containers";
import { Press } from "../components/styling/general";


const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin: 30px auto;
  font-family: "Josefin Sans", sans-serif;
  color: black;
  border: 3px solid black;
  box-shadow: 8px 8px yellow;
  align-items: center;
`;

const AllBags = () => {
  const memberId = useSelector((store) => store.member.memberId);
  const filteredBags = useSelector((store)=> store.searched.items.length);
  return (
      <Box>
        <Menu />
        <Filter />
      {filteredBags===0 && <SeeAllBags />}
        <ButtonContainer>
          <Button>
            <Press to={`/member/${memberId}`} params={memberId}>
              My Profile
            </Press>
          </Button>
          <Logout />
        </ButtonContainer>
      </Box>
  );
};

export default AllBags;
