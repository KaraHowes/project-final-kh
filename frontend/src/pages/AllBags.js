import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import moment from "moment";

import theks from "../reducers/theks";
import { API_URL } from "../utils/urls";

import Logout from "../components/Logout";
import Loader from "../components/Loader";
import Menu from "../components/Menu";
import Filter from "../components/Filter";
import { Box, ButtonContainer } from "../components/styling/containers";
import { Press } from "../components/styling/general";
import {
  BagContainer,
  Card,
  TextWrapper,
  CardText,
} from "../components/styling/mapping";

const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;

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
  const theksItems = useSelector((store) => store.theks.items);
 
  const memberId = useSelector((store) => store.member.memberId);
  const filteredBags = useSelector((store)=> store.searched.items.length);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const options = {
      method: "GET",
    };
    setLoading(true);
    fetch(API_URL("bags"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(theks.actions.setItems(data.response));
          dispatch(theks.actions.setError(null));
        } else {
          dispatch(theks.actions.setItems([]));
          dispatch(theks.actions.setError(data.response));
        }
      })
      .finally(() => setLoading(false));
  }, [ dispatch]);

const removeFilter =()=> {
  window.location.reload();
}

  return (
    
      <Box>
        <Menu />
        {loading && <Loader />}
        <Filter />
      {filteredBags===0 && 
      <BagContainer>
        
        {theksItems.map((item) => (
          <Card key={item._id}>
            <ImageThek
              src="./assets/thek-icon-1.png"
              alt="Thek friends bag"
            />
            <TextWrapper>
              <CardText>Colour: {item.colour}</CardText>
              <CardText>Location: {item.location}</CardText>
              <CardText>Age-range: {item.age}</CardText>
              <CardText>
                Available since:{" "}
                {moment(item.createdAt).format("Do MMMM YYYY")}
              </CardText>
              <Press to={`/bag/${item._id}`}>
                <CardText>More details</CardText>
              </Press>
            </TextWrapper>
          </Card>
        ))}
      </BagContainer>}
        
        <Button onClick={removeFilter}>All Bags</Button>
      
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
