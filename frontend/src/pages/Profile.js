import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Lottie from "react-lottie";

import animationData from "../animations/hello.json";
import { API_URL } from "utils/urls";
import Logout from "../components/Logout";
import member from "../reducers/member";

import Loader from '../components/Loader'
import { Box, Header, Details } from "../components/styling/containers"
import Footer from '../components/Footer'
import Menu from '../components/Menu'

const All = styled.div`
display: flex;
flex-direction: column;
`
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
  @media (min-width: 768px){
    margin: 0 30px 0 auto;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: 768px){
    margin: 0 auto 0 30px;
  }
`;
const Button = styled.button`
  width: 80%;
  min-width: 200px;
  height: 40px;
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
const Press =styled(Link)`
text-decoration: none;
&:visited{
  color:black;
}
`
const SmallText = styled.p`
font-size: 0.75rem;
@media (min-width: 768px){
  font-size: 1rem;
}
`
const Colour = styled.span`
color: #878df7;
font-weight: 800;`


const Profile = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.member.accessToken);
  const memberId = useSelector((store) => store.member.memberId);
  const profile = useSelector((store) => store.member)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    setLoading(true)
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
      }).finally(() => setLoading(false));
  }, [dispatch, accessToken, memberId]);
  
  return (
    <>
     <Box>
     
       {loading && <Loader/>}
       <Menu/>
       <All>
       <Lottie options={defaultOptions} height={150} width={150}/>
       <ProfileButtonContainer>
     
      <ProfileContainer>
        <Header> <Colour>{profile.membername}!</Colour></Header>
        <Details> Thek-Friend Status: <Colour>{profile.status}</Colour></Details>
        <Details>Email address: <Colour>{profile.email}</Colour></Details>
        <Details> Location: <Colour>{profile.location}</Colour></Details>
        {profile.status==="Donor"?<SmallText> Already added a bag? Click <Press to={`/bags/${memberId}`}>Here to see it</Press></SmallText>:<div></div>}
    
      </ProfileContainer>
      
      <ButtonContainer>
        <Button>
      {profile.status==="Donor"? <Press to="/AddThek">Add a bag?</Press>:<Press to="/FindThek">Find a bag</Press>}
        </Button>
        <Button>
          <Press to="/AllBags">All bags</Press>
        </Button>
        <Logout />
      </ButtonContainer>
    
      </ProfileButtonContainer>
  
       </All>
     
     </Box>
     <Footer/>
     </> 
  );
};
export default Profile;
//style={{backgroundColor: profile.status==="Donor" ? "#EAF5FA" :"#FFFFCC",} }