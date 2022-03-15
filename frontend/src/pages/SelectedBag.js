import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

import oneThek from "../reducers/oneThek";
import { API_URL } from "../utils/urls";

import Logout from "../components/Logout";
import Loader from "../components/Loader";
import { Box, ButtonContainer } from "../components/styling/containers";
import { Press, Details } from "../components/styling/general";
import Menu from "../components/Menu";
import image from "../images/bag.png";

const All = styled.div`
  display: flex;
  flex-direction: column;
 
`;
const ProfileButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px;
  justify-content: center;
  @media (min-width: 768px) {
    margin: 30px auto;
   
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  @media (min-width: 768px) {
    width: 45%;
  }

`;
const Image = styled.div`
margin: 0 auto;
`;
const DetailsTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const TextContainer = styled.div`
width: 100%;
@media (min-width: 768px) {
  width: 55%;
}
`;
const Text = styled.p`
font-size: 1rem;
line-height: 1.2rem;
@media (min-width: 768px) {
  font-size: 1.5rem;
  line-height: 1.75rem;
}
`;
const Button = styled.button`
  width: 100%;
  min-width: 200px;
  height: 45px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin: 10px 0;
  border-radius: 10px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 5px 5px 10px #888888;
`;


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
      body: JSON.stringify({ email, accessToken }),
    };
    fetch(API_URL("reserveBag"), options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .finally(navigate("/"));
  };
  return (
    
      <Box>
        <Menu />
        {loading && <Loader />}
        <All>
          <ProfileButtonContainer>
            <DetailsTextContainer>
              <DetailsContainer>
                <Image>
                  <img src={image} alt={image} height={150} width={125} />
                </Image>
                <Details> Colour: {chosenBag.colour}</Details>
                <Details> Location: {chosenBag.location}</Details>
                <Details> Age-range: {chosenBag.age}</Details>
              </DetailsContainer>
              <TextContainer>
                <Text>
                  It’s great that you like a bag, hopefully soon you will be
                  it’s new owner! If you would like the bag listed/shown below,
                  please confirm by clicking the button below. An email will be
                  sent to you at your given email address to confirm whether you
                  can give this lovely bag a new home.
                </Text>
              </TextContainer>
            </DetailsTextContainer>

            <ButtonContainer>
              <Button onClick={reserveBag}> Reserve this bag?</Button>
              <Button>
                <Press to="/allBags" params={accessToken}>
                  All Bags
                </Press>
              </Button>
              <Logout />
            </ButtonContainer>
          </ProfileButtonContainer>
        </All>
      </Box>
  );
};

export default SelectedBag;
