import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import theks from "../reducers/theks";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import Loader from "../components/Loader";

import { Box } from "../components/styling/containers";
import { Press } from "../components/styling/general";
import {
  BagContainer,
  Card,
  TextWrapper,
  CardText,
} from "../components/styling/mapping";

import Footer from "../components/Footer";
import Menu from "../components/Menu";
import image from "../images/bag.png";

const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 15px 0 15px 0;
  margin: 0 auto 15px auto;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 3px 3px 6px #888888;
`;
const Image = styled.div`
  margin: 0 auto;
`;
const ButtonContainer=styled.div`
width: 80%;
max-width: 250px;
margin: 20px auto`


const MemberBag = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  const addedBags = useSelector((store) => store.theks.items);
  const { memberId } = useParams(); //This is vital so that the id can be taken from the url browser

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    fetch(API_URL(`bags/${memberId}`), options)
      .then((res) => res.json())
      .then((data) => {
       
        if (data.success) {
          batch(() => {
            dispatch(theks.actions.setItems(data.response));
            dispatch(theks.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(theks.actions.setItems([]));
            dispatch(theks.actions.setError(data.response));
          });
        }
      })
      .finally(() => setLoading(false));
  }, [accessToken, dispatch, memberId]);

  return (
    <>
      <Box>
        <Menu />
        {loading && <Loader />}
        {addedBags.length === 0 ? (
          <div>you haven't added any bags</div>
        ) : (
          <div></div>
        )}

        <BagContainer>
          {addedBags.map((item) => (
            <Card key={item._id}>
              <Image>
                <img src={image} alt={image} height={150} width={125} />
              </Image>{" "}
              <TextWrapper>
                <CardText>
                  You have donated a {item.colour} bag, based in {item.location}
                </CardText>
                <CardText>Age-range:{item.age}</CardText>
                <CardText>
                  {" "}
                  Available since:
                  {moment(item.createdAt).format("Do MMMM YYYY")}
                </CardText>
                <Button>
                <Press to={`/deleteBag/${item._id}`}>Delete This Thek?</Press>
              </Button>
              </TextWrapper>
              
            </Card>
          ))}
        </BagContainer>
        <ButtonContainer>
        <Button>
        <Press to={`/member/${memberId}`}params={accessToken, memberId}>My Profile</Press>

        </Button>
        <Logout />
          </ButtonContainer>    
        
      </Box>
      <Footer />
    </>
  );
};
export default MemberBag;
