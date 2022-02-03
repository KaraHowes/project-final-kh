import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import NoBagFound from '../components/NoBagFound'

const BagsFound = () => {

  const foundBags = useSelector((store) => store.searched.items);
  //const accessToken = useSelector((store) => store.member.memberId) 

  if (foundBags.length === 0) {
    return (
      <>
       <NoBagFound />
      </>
    );
  }

  return (
    <div>
      Found bags
      {foundBags.map((item) => (
        <div key={item.bagId}>
          {item.colour}
          {item.location}
        </div>
      ))}
    </div>
  );
};

export default BagsFound;
