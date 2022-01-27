import React, { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";


import { API_URL } from "utils/urls";
import Logout from "../components/Logout";
import member from "../reducers/member";


const ProfileContainer = styled.div`
display: flex;
flex-direction: column;
width: 50%;
background-color: white;
border: 1px solid black;
margin: 0 auto;
padding: 100px 0;
`
const Button = styled.button`
  width: 45%;
  height: 50px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  border-radius: 20px;
  font-family: 'Josefin Sans', sans-serif;
`

const Profile = () => {

  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.member.accessToken);
  const memberId = useSelector((store) => store.member.memberId);
  const profile = useSelector((store) => store.member)
  
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    fetch(API_URL(`member/$memberId`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(member.actions.setMemberId(data.response.memberId));
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
      });
  }, [dispatch, accessToken, memberId]);
  return (
  
     <> 
      <ProfileContainer style={{backgroundColor: profile.status==="Donor" ? "#EAF5FA" :"#FFFFCC",} }>
        <h1> Hi there {profile.membername}!</h1>
        <h2> Thank you so much for becomming  a Thek Friend and for registering as a {profile.status}</h2>
        <h2> Here are some of your details, if you would like to update them, please click Here</h2>
        <p>{profile.status}</p>
        <p>{profile.email}</p>
        <p>{profile.location}</p>
      </ProfileContainer>
      <div>
        <Button>
      {profile.status==="Donor"? <Link to="/AddThek">Add a bag?</Link>:<Link to="/FindThek">Find a bag</Link>}
        </Button>
        
        <Button>
          <Link to="/AllBags"> see all bags in our system</Link>
        </Button>
      </div>
      <Logout />
</>
  );
};
export default Profile;
