import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";


import Logout from '../components/Logout'

const WelcomeContainer = styled.div`
display: flex;
flex-direction: column;
width: 50%;
background-color: white;
border: 1px solid black;
margin: 0 auto;
padding: 100px 0;
`

const Welcome = () => {

   
    return (
        <WelcomeContainer>
            
            <h1>Welcome Thek-Friend! Thank you for becomming a member.... you can</h1>
            <Link to="/signin">
            <button> sign in</button>
            </Link>
            <p>or</p>
            <Logout/>
        </WelcomeContainer>
    )
}

export default Welcome