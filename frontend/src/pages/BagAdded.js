import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Logout from '../components/Logout'
import Footer from '../components/Footer'

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

const BagAdded = () => {

  const profile = useSelector((store) => store.member)

return (
    <>
    <div>Thank you for adding a bag {profile.membername}, you are absolutely awesome!</div>

    <Button> 
        <Link to="/member/:memberId">Return to my Profile page</Link> 
        </Button>
    <Logout/>
    <Footer/>
    </>
)
}
export default BagAdded