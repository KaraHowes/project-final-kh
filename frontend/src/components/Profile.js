import React from "react";
import { useSelector } from "react-redux";
//import { useNavigate, Link } from "react-router-dom";
////import styled from "styled-components";

//import { PERSONAL_URL } from "../utils/urls";
//import member from "../reducers/member";


const Profile = () => {
  
    
  //const accessToken = useSelector((store) => store.member.accessToken);
  //const errors = useSelector((store) => store.member.error);
  const profileName = useSelector((store) => store.member.membername);
  //const profileStatus = useSelector((store) => store.member.status);
  const memberId = useSelector((store) => store.member.memberId)

  return (
    <div>
      <h1> hi there user, here is your profile page, {profileName}</h1>
      <p>  {memberId}</p>
    
    </div>
  );
};

export default Profile;
