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
const Button = styled.button`
  width: 100%;
  min-width: 200px;
  height: 45px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin: 10px 0;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
  box-shadow: 3px 3px 6px #888888
`
const OverallContainer= styled.section`
width: 100%,
margin: 0 auto;`

const LogoutContainer =styled.div`
width: 100%;
max-width: 200px;
margin: 20px auto;`

const BagsFound = () => {

  const foundBags = useSelector((store) => store.searched.items);
  const memberId = useSelector((store) => store.member.memberId)
 
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
      <Button > 
        <Press to={`/member/${memberId}`}params={memberId}>My Profile</Press>
        </Button>
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
