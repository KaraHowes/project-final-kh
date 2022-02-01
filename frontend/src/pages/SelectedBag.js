import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import oneThek from "../reducers/oneThek";
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

const SelectedBag = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  const chosenBag = useSelector((store) => store.oneThek);
  //const chosenColour = useSelector((store) => store.oneThek.colour);
  const { _id }= useParams() 
  console.log(_id)
  
  //const BagColour = useSelector((store) => store.theks.colour)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    console.log(accessToken)
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL(`bag/${_id}`), options)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.success) {
          batch(() => {
            dispatch(oneThek.actions.set_Id(data.response._id));
            dispatch(oneThek.actions.setLocation(data.response.location));
            dispatch(oneThek.actions.setColour(data.response.colour));
            dispatch(oneThek.actions.setAge(data.response.age));
            dispatch(oneThek.actions.setMember(data.response.member));
            dispatch(oneThek.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(oneThek.actions.set_Id(null));
            dispatch(oneThek.actions.setLocation(null));
            dispatch(oneThek.actions.setColour(null));
            dispatch(oneThek.actions.setAge(null));
            dispatch(oneThek.actions.setMember(null));
            dispatch(oneThek.actions.setError(data.response));
          });
        }
      });
  }, [accessToken, dispatch, _id]);

  return (
    <Box>
      <BagContainer>
        <h1> You have chosen a {chosenBag.colour}-coloured bag</h1>
        <p>The bag is based in {chosenBag.location}</p>
      </BagContainer>
      <Logout />
    </Box>
  );
};

export default SelectedBag;
