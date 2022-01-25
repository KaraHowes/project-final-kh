import React, { useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
//import styled from "styled-components";

import AddThek from "./AddThek";
import FindThek from "./FindThek";
import { API_URL } from "utils/urls";
import Logout from "./Logout";
import member from "../reducers/member";

const Profile = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.member.accessToken);
  const memberId = useSelector((store) => store.member.memberId);

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
      {member.status === "Recipient" ? (
        <FindThek />
      ) : (
        <div>
          <AddThek />
        </div>
      )}
      <div>
        <h1>{member.membername}</h1>
        <p>{member.status}</p>
        <p>{member.email}</p>
        <p>{member.location}</p>
      </div>

      <Logout />
    </>
  );
};
export default Profile;
