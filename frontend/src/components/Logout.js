import React from "react";
import { useDispatch, batch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

import member from "../reducers/member";

const Button = styled.button`
  width: 100%;
  height: 50px;
  color: black;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px;
  margin: 10px 0;
  align-content: center;
  font-family: "Josefin Sans", sans-serif;
  border: 3px solid black;
  box-shadow: 8px 8px #878df7;
  background-color: white;
`;

const Logout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    swal({
      title: "Are you going now?",
      buttons: {
        confirm: {
          text: "yep",
          result: true,
          closeModal: true,
          value: true,
          visible: true,
        },
        cancel: {
          text: "no-way, José",
          result: false,
          closeModal: true,
          value: null,
          visible: true,
        },
      },
    }).then((result) => {
      if (result) {
        swal("Ok, it was great seeing you. Bye bye");
      }
    });
    batch(() => {
      dispatch(member.actions.setMembername(null));
      dispatch(member.actions.setAccessToken(null));
      dispatch(member.actions.setMemberId(null));
    });
  };
  return (
    <div>
      <Link to="/">
        <Button onClick={logout}>Logout</Button>
      </Link>
    </div>
  );
};
export default Logout;
