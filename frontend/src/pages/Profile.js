import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert"

import { API_URL } from "utils/urls";
import Logout from "../components/Logout";
import member from "../reducers/member";

import Loader from '../components/Loader'
import { Box } from "../components/styling/containers"


const ProfileButtonContainer =styled.div`
display: flex;
flex-direction: column;
width: 90%;
background-color: white;
border: 1px solid black;
margin: 0 auto;
padding: 50px 30px;
justify-content: center;
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

const Profile = () => {

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
          {profile.status==="Donor"?
            swal('Hi there donor', {icon:'success', button: 'ok'}):
          swal('hi there recipient', {icon:'success', button: 'ok'}) }

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
    
     <Box>
       {loading && <Loader/>}
      <ProfileButtonContainer>
      <ProfileContainer>
        <h1> Hi there {profile.membername}!</h1>
        <h2> Thank you so much for becomming  a Thek Friend and for registering as a {profile.status}</h2>
        <h2> Here are some of your details, if you would like to update them, please click Here</h2>
        <p>{profile.status}</p>
        <p>{profile.email}</p>
        <p>{profile.location}</p>
    
      </ProfileContainer>
      
      <ButtonContainer>
        <Button>
      {profile.status==="Donor"? <Link to="/AddThek">Add a bag?</Link>:<Link to="/FindThek">Find a bag</Link>}
        </Button>
        
        <Button>
          <Link to="/AllBags"> see all bags</Link>
        </Button>
        <Logout />
      </ButtonContainer>

      
      </ProfileButtonContainer>
  
     </Box>
      
  );
};
export default Profile;
//style={{backgroundColor: profile.status==="Donor" ? "#EAF5FA" :"#FFFFCC",} }