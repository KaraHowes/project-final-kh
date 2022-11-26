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
      <Box>
        <Menu />
        {loading && <Loader />}
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
