import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";


const NavContainer = styled.div`
width: 100%;
margin-bottom:50px;
border-bottom: 2px solid black;
padding-bottom: 10px;
display: flex;
justify-content: space-around;
text-align: center;

`
const NavLink = styled(Link)`
height:10px;
padding: 10px;
color: black;
text-decoration: none;
&:hover{
background-color: #20C6BA,
colour: pink:
border-radius: 5px;
}`


export const Menu = () => {

    return (
       < NavContainer>
    
       <NavLink to="/about" > About</NavLink>
       <NavLink to="/signin" > Log-in</NavLink>
       <NavLink to="/inspiration" > Inspiration</NavLink>       
   
       </NavContainer>
       
    )
}

export default Menu
