import React from 'react'
import { useDispatch, batch } from 'react-redux';
import { Link } from "react-router-dom";
import styled from "styled-components";

import member from "../reducers/member";

const Button = styled.button`
width: 100%;
height: 40px;
background-color: #F175A5;
border: none;
cursor: pointer;
font-size: 24px;
padding: 15px 0;
align-content: center;
border-radius: 20px;
font-family: 'Josefin Sans', sans-serif;
box-shadow: 3px 3px 6px #888888`

const Logout = () => {

    const dispatch = useDispatch()    

    const logout = () => {
        batch(() => {
          dispatch(member.actions.setMembername(null));
          dispatch(member.actions.setAccessToken(null));
    
          //localStorage.removeItem('user')
        });
      };
    return (
        //this link will be changed to a homepage when it has been made
        <div>
            
            <Link to="/signin">
                <Button onClick={logout}>Logout</Button>
            </Link>
        </div>
    )
}
export default Logout