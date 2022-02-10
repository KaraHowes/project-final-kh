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
const OverallContainer= styled.section`
width: 100%,
margin: 0 auto;`

const LogoutContainer =styled.div`
width: 100%;
max-width: 200px;
margin: 20px auto;`
const BagsFound = () => {

  const foundBags = useSelector((store) => store.searched.items);
  
  return (  
    <>
    <Box>
      <Menu/>
      
      {foundBags.length===0?<NoBagFound />:
        <OverallContainer>
<BagContainer>
      {foundBags.map((item) => (

        <Card key={item.bagId}>
          <ImageThek
            src="./assets/thek-icon-1.png"
            alt="Thek-friends-bag-logo"
          ></ImageThek>
          <TextWrapper>
          <CardText>Colour: {item.colour}</CardText>
          <CardText>Location: {item.location}</CardText>
          <CardText>Age-range: {item.age}</CardText>
              <CardText> Available since: {moment(item.createdAt).format('Do MMMM YYYY')}</CardText>
              <Press to={`/bag/${item._id}`}>
                <CardText>More details</CardText>
              </Press>
              
          </TextWrapper>
          
        </Card>
      ))}
      </BagContainer>
      <LogoutContainer>
      <Logout/>
      </LogoutContainer>
   
        </OverallContainer>
        
      }
      
    </Box>
    <Footer/>
    </>
  );
};

export default BagsFound;
