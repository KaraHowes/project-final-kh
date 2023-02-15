import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 5px solid black;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  @media (max-width: 768px) {
    border-bottom: none;
  }
`;
const NavLink = styled(Link)`
height: 20px;
padding: 20px 10px;
color: black;
text-decoration: none;
font-size; 24px;
&:hover{
text-decoration: underline;
text-decoration-style: wavy;
text-decoration-color:#F675A8;
text-decoration-thickness: 3px;
text-decoration-padding-bottom: 10px;
text-underline-offset: 5px;
text-decoration-skip-ink: none;
}`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 4px;
    width: 35px;
    background: #20C6BA;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  font-size: 24px;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;
export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Nav isOpen={isOpen}>
      <NavLink to="/"> Home</NavLink>
        <NavLink to="/signin"> Log-in</NavLink>
        <NavLink to="/about"> About</NavLink>
        <NavLink to="/allBags"> Bags</NavLink>
        <NavLink to="/inspiration"> Inspiration</NavLink> 
      </Nav>
    </NavContainer>
  );
};

export default Menu;
