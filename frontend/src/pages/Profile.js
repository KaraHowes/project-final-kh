import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import styled from "styled-components";
import Lottie from "react-lottie";

import animationData from "../animations/hello.json";
import { API_URL } from "utils/urls";
import member from "../reducers/member";

import Logout from "../components/Logout";
import Loader from "../components/Loader";
import { Box } from "../components/styling/containers";
import { Press, Colour, Header, SubTitle } from "../components/styling/general";
import Menu from "../components/Menu";

const All = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto 30px auto;
  padding: 10px;
  justify-content: center;

  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 900px) {
    margin: 30px auto;
    flex-direction: row;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  justify-content: center;
  margin: 0 auto;
  @media (min-width: 768px) {
    margin: 0 30px 0 auto;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 80%;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  min-width: 200px;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0;
  margin: 10px 0;
  background-color: white;
  border: 3px solid black;
  box-shadow: 8px 8px yellow;
  font-family: "Josefin Sans", sans-serif;
`;
const SmallText = styled.p`
  font-size: 0.75rem;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
  @media (min-width: 900px) {
  }
`;

const Profile = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.member.accessToken);
  const memberId = useSelector((store) => store.member.memberId);
  const profile = useSelector((store) => store.member);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    setLoading(true);
    fetch(API_URL(`member/${memberId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response._id));
            dispatch(member.actions.setMembername(data.response.membername));
            dispatch(member.actions.setAccessToken(data.response.accessToken));
            dispatch(member.actions.setEmailAddress(data.response.email));
            dispatch(member.actions.setLocation(data.response.location));
            dispatch(member.actions.setStatus(data.response.status));
            dispatch(member.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(member.actions.setMemberId(null));
            dispatch(member.actions.setMembername(null));
            dispatch(member.actions.setAccessToken(null));
            dispatch(member.actions.setEmailAddress(null));
            dispatch(member.actions.setLocation(null));
            dispatch(member.actions.setStatus(null));
            dispatch(member.actions.setError(data.response));
          });
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch, accessToken, memberId]);

  return (
  
      <Box>
        {loading && <Loader />}
        <Menu />
        <All>
          <Lottie options={defaultOptions} height={170} width={170} />
          <ProfileButtonContainer>
            <ProfileContainer>
              <Header>
                <Colour>Hey {profile.membername}!</Colour>
              </Header>
              <SubTitle>
                Thek-Friend: <Colour>{profile.status}</Colour>
              </SubTitle>
              <SubTitle>
                Email: <Colour>{profile.email}</Colour>
              </SubTitle>
              <SubTitle>
                Location: <Colour>{profile.location}</Colour>
              </SubTitle>
              {profile.status === "Donor" ? (
                <SmallText>
                  Already added a bag? Click
                  <Press to={`/bags/${memberId}`}>Here to see it</Press>
                </SmallText>
              ) : (
                <div></div>
              )}
            </ProfileContainer>

            <ButtonContainer>
              <Button>
                {profile.status === "Donor" ? (
                  <Press to="/addThek">Add a bag?</Press>
                ) : (
                  <Press to="/findThek">Find a bag</Press>
                )}
              </Button>
              <Button>
                <Press to="/allBags">All bags</Press>
              </Button>
              <Logout />
            </ButtonContainer>
          </ProfileButtonContainer>
        </All>
      </Box>
  );
};
export default Profile;

