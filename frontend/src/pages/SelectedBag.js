import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

import oneThek from "../reducers/oneThek";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import Loader from "../components/Loader";

import { Box } from "../components/styling/containers";
import { Press, Details } from "../components/styling/general";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import image from '../images/bag.png';

const ProfileButtonContainer =styled.div`
display: flex;
flex-direction: column;
margin: 30px auto 30px auto;
padding: 10px;
justify-content: center;
@media (min-width: 768px){
  margin: 30px auto;
  flex-direction: row;
}
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  justify-content: center;
  margin: 0 auto;
 
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: 768px){
  justify-content: space-evenly;
  }
`;
const Button = styled.button`
  width: 80%;
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
const HeaderText = styled.h1`
font-size: 1.75rem;
@media (min-width: 768px){
  font-size: 2rem;
}
`

const SelectedBag = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  const chosenBag = useSelector((store) => store.oneThek);
  const { _id } = useParams(); //This is vital so that the id can be taken from the url browser
  const email = useSelector((store) => store.member.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, [accessToken, dispatch, _id]);

  const reserveBag = () => {
    swal("Thank you for for reserving a bag from our collection", {
      icon: "success",
      button: "ok",
    });
    const options = {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    fetch(API_URL("reserveBag"), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(navigate("/"));
  };
  return (
    <>
      <Box>
        <Menu />
        {loading && <Loader />}

        <ProfileButtonContainer>
          <ProfileContainer>
          <img src={image} alt={image} height={150} width={125}/>
            <HeaderText>
              {" "}
              You have chosen a {chosenBag.colour} bag
            </HeaderText>
            <Details> The bag is based in {chosenBag.location}</Details>
         
          </ProfileContainer>

          <ButtonContainer>
            <Button onClick={reserveBag}> Reserve this bag?</Button>

            <Button>
              <Press to="/AllBags" params={accessToken}>
                Overview
              </Press>
            </Button>
            <Logout />
          </ButtonContainer>
        </ProfileButtonContainer>
      </Box>
      <Footer />
    </>
  );
};

export default SelectedBag;
