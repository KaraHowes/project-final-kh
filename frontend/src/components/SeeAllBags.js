import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import moment from "moment";

import theks from "../reducers/theks";
import { API_URL } from "../utils/urls";

import Loader from './Loader'
import { Press } from "./styling/general";
import {
  BagContainer,
  Card,
  TextWrapper,
  CardText,
} from "./styling/mapping";

const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;


const SeeAllBags = () => {
  const theksItems = useSelector((store) => store.theks.items);
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

  return (
      <>
    {loading && <Loader />}
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
  </BagContainer>
  </>
  );
};

export default SeeAllBags;
