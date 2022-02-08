import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";

import oneThek from "../reducers/oneThek";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import Loader from '../components/Loader'

import { Box } from "../components/styling/containers"
import Footer from '../components/Footer'
import Menu from '../components/Menu'

const BagContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const Button = styled.button`
  width: 80%;
  min-width: 200px;
  height: 50px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin: 10px 0;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
`
const SelectedBag = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  const chosenBag = useSelector((store) => store.oneThek);
  const { _id }= useParams() //This is vital so that the id can be taken from the url browser

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    fetch(API_URL(`bag/${_id}`), options)
      .then((res) => res.json())
      .then((data) => {
        
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
      }).finally(() => setLoading(false));
  }, [accessToken, dispatch, _id]);

  return (
    <>
    <Box>
      <Menu/>
      {loading && <Loader/>}
      <BagContainer>
        <h1> You have chosen a {chosenBag.colour}-coloured bag</h1>
        <p>The bag is based in {chosenBag.location}</p>
      </BagContainer>
      <Button > Reserve this bag?</Button>
      <Button > 
        <Link to="/AllBags"params={accessToken}>Go back to overview</Link>
        </Button>
      <Logout />
    </Box>
    <Footer/>
    </>
  );
};

export default SelectedBag;
