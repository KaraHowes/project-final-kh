import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchMember } from "../reducers/member";

const Profile = () => {
  const dispatch = useDispatch();
  const { memberId } = useParams();

  const member = useSelector((store) => store.member);
  const accessToken = useSelector((store) => store.member.accessToken);

  useEffect(() => {
    dispatch(fetchMember(memberId, accessToken));
  }, []);
  console.log(member);

  return (
    <div>
      <h1>{member.membername}</h1>
      <p>{member.status}</p>
      <p>{member.email}</p>
      <p>{member.location}</p>
    </div>
  );
};
export default Profile;
