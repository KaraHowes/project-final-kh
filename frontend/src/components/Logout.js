import React from 'react'
import { useDispatch, batch } from 'react-redux';
import { Link } from "react-router-dom";
import styled from "styled-components";

import member from "../reducers/member";

const Button = styled.button`
width: 80%;
height: 50px;
background-color: #d5f5f2;
border: none;
cursor: pointer;
font-size: 24px;
padding: 15px 0 15px 0;
border-radius: 20px;
font-family: 'Josefin Sans', sans-serif;`

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