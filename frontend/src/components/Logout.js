import React from 'react'
import { useDispatch, batch } from 'react-redux';
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from 'sweetalert'
import member from "../reducers/member";

const Button = styled.button`
width: 100%;
height: 40px;
color: white;
background-color: #878df7;
border: none;
cursor: pointer;
font-size: 24px;
padding: 15px;
margin: 10px 0;
align-content: center;
border-radius: 10px;
font-family: 'Josefin Sans', sans-serif;
box-shadow: 5px 5px 10px #888888;`

const Logout = () => {

    const dispatch = useDispatch()    

    const logout = () => {
        swal({
            title: "Are you going now?",
            buttons:{
                confirm:{text: 'yep', result: true, closeModal: true, value: true, visible: true},
                cancel:{text: 'no-way, José', result: false, closeModal: true, value: null, visible: true},

            }
        }).then((result) => {
            if (result){
                swal('Ok, it was great seeing you. Bye bye')
            }
        })
        batch(() => {
          dispatch(member.actions.setMembername(null));
          dispatch(member.actions.setAccessToken(null));
          dispatch(member.actions.setMemberId(null))
        });
      };
    return (
        <div>
            
            <Link to="/">
                <Button onClick={logout}>Logout</Button>
            </Link>
        </div>
    )
}
export default Logout