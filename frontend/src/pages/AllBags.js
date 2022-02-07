import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import moment from 'moment'

import theks from "../reducers/theks";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import { Box } from "../components/styling/containers"
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import Menu from '../components/Menu'

const BagContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  @media (min-width: 768px){
    flex-direction:row;
  }
`;
const Card = styled.div`
width: 100%;
margin: 10px auto;
padding: 10px 0;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-end;
text-align: center;
font-family: "Josefin Sans", sans-serif;
max-width: 200px;
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5)
background: white;
@media (min-width: 768px){
  width:45%;
}
`;
const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;
const TextWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const CardText = styled.p`
  background-color: #d5f5f2;
  padding: 5px 0;
`;

const AllBags = () => {
  const theksItems = useSelector((store) => store.theks.items);
  const accessToken = useSelector((store) => store.member.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    setLoading(true)
    fetch(API_URL("bags"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        dispatch(theks.actions.setItems(data.response));
          //dispatch(theks.actions.setBagId(data.response.bagId));
          //dispatch(theks.actions.setLocation(data.response.location));
          //dispatch(theks.actions.setColour(data.response.colour));
          //dispatch(theks.actions.setAge(data.response.age));
          //dispatch(theks.actions.setMember(data.response.member));
          dispatch(theks.actions.setError(null));
        } else {
          dispatch(theks.actions.setItems([]));
          //dispatch(theks.actions.setBagId(null));
          //dispatch(theks.actions.setLocation(null));
          //dispatch(theks.actions.setColour(null));
          //dispatch(theks.actions.setAge(null));
          //dispatch(theks.actions.seMember(null));
          dispatch(theks.actions.setError(data.response));
        }
      }).finally(() => setLoading(false));
  }, [accessToken, dispatch]);

  return (
    <>
    <Box>
      <Menu/>
       {loading && <Loader/>}
      <BagContainer>
        {theksItems.map((item) => (
          <Card key={item._id}>
              <ImageThek
            src="./assets/thek-icon-1.png"
            alt="Thek-friends-bag-logo"
          ></ImageThek>
            <TextWrapper>
              <CardText>{item.colour}</CardText>
              <Link to={`/bag/${item._id}`}>
                <CardText>{item.location}</CardText>
              </Link>
              <CardText>{item.age}</CardText>
              <CardText> {moment(item.createdAt).fromNow()}</CardText>
            </TextWrapper>
          </Card>
        ))}
      </BagContainer>
      <Logout/>
    </Box>
    <Footer/>
</>
  );
};

export default AllBags;
