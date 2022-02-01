import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import theks from "../reducers/theks";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";

const Box = styled.section`
  width: 70%;
  padding: 125px;
  background: white;
  margin: 0 auto;
  border: 5px solid black;
  box-shadow: 5px 5px 10px;
  max-width: 800px;
`;
const BagContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const Card = styled.div`
margin: 10px;
width: 20%;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-end;
text-align: center;
font-family: "Josefin Sans", sans-serif;
max-width: 200px;
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5)
background: white;

`;
const TextWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const CardText = styled.p`
  background-color: #d5f5f2;
  padding: 5px 0;
`;

const AllBags = () => {
  const theksItems = useSelector((store) => store.theks.items);
  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL("bags"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        dispatch(theks.actions.setItems(data.response));
          //dispatch(theks.actions.setBagId(data.response.bagId));
          //dispatch(theks.actions.setLocation(data.response.location));
          //dispatch(theks.actions.setColour(data.response.colour));
          //dispatch(theks.actions.setAge(data.response.age));
          //dispatch(theks.actions.setMember(data.response.member));
          dispatch(theks.actions.setError(null));
        } else {
          dispatch(theks.actions.setItems([]));
          //dispatch(theks.actions.setBagId(null));
          //dispatch(theks.actions.setLocation(null));
          //dispatch(theks.actions.setColour(null));
          //dispatch(theks.actions.setAge(null));
          //dispatch(theks.actions.seMember(null));
          dispatch(theks.actions.setError(data.response));
        }
      });
  }, [accessToken]);

  return (
    <Box>
      <BagContainer>
        {theksItems.map((item) => (
          <Card key={item._id}>
            <TextWrapper>
              <CardText>{item.colour}</CardText>
              <Link to={`/bag/${item._id}`}>
                <CardText>{item.location}</CardText>
              </Link>
              <CardText>{item.age}</CardText>
            </TextWrapper>
          </Card>
        ))}
      </BagContainer>
      <Logout/>
    </Box>
  );
};

export default AllBags;
