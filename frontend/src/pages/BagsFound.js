import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import moment from 'moment'


import NoBagFound from '../components/NoBagFound'
import Logout from '../components/Logout'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

import { Box } from "../components/styling/containers"
import { Press } from "../components/styling/general"
import { BagContainer, Card, TextWrapper, CardText } from "../components/styling/mapping"


const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;
const BagsFound = () => {

  const foundBags = useSelector((store) => store.searched.items);
  
  return (  
    <>
    <Box>
      <Menu/>
      <BagContainer>
      {foundBags.length===0?<NoBagFound />:<div></div>}
      {foundBags.map((item) => (

        <Card key={item.bagId}>
          <ImageThek
            src="./assets/thek-icon-1.png"
            alt="Thek-friends-bag-logo"
          ></ImageThek>
          <TextWrapper>
          <CardText>Colour:{item.colour}</CardText>
              <Press to={`/bag/${item._id}`}>
                <CardText>Location:{item.location}</CardText>
              </Press>
              <CardText>Age-range:{item.age}</CardText>
              <CardText> Available since:{moment(item.createdAt).fromNow()}</CardText>
          </TextWrapper>
          
        </Card>
      ))}
      </BagContainer>
   
      <Logout/>
    </Box>
    <Footer/>
    </>
  );
};

export default BagsFound;
