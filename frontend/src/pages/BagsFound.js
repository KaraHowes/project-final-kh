import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import NoBagFound from '../components/NoBagFound'
import Logout from '../components/Logout'
import { Box } from "../components/styling/containers"

const BagsFound = () => {

  const foundBags = useSelector((store) => store.searched.items);
  

  if (foundBags.length === 0) {
    return (
      <>
       <NoBagFound />
      </>
    );
  }

  return (
    <Box>
      Found bags
      {foundBags.map((item) => (
        <div key={item.bagId}>
          {item.colour}
          {item.location}
        </div>
      ))}
      <Logout/>
    </Box>
  );
};

export default BagsFound;
