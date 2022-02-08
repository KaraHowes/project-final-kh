import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";


import theks from "../reducers/theks";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import Loader from "../components/Loader";

import { Box } from "../components/styling/containers";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import image from '../images/bag.png';

const BagContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const Card = styled.div`
margin: 10px auto;
width: 100%;
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
const Button = styled.button`
  width: 80%;
  min-width: 200px;
  height: 50px;
  background-color: #d5f5f2;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin: 10px 0;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
`;
const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;
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
        console.log(data);
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
        {addedBags.length===0?<div>you haven't added any bags</div>:<div></div>}
  
          <BagContainer>
          {addedBags.map((item) => (
           
            <Card key={item._id}>
              <img src={image} alt={image} height={150} width={125}/>
              <TextWrapper>
                <CardText>
                  You have donated a {item.colour}-coloured bag, based in {item.location}
                </CardText>
                <CardText>Age-range:{item.age}</CardText>
                <CardText>
                  {" "}
                  Available since:{moment(item.createdAt).fromNow()}
                </CardText>
              </TextWrapper>
              <Link to={`/deleteBag/${item._id}`}>
                <Button>Delete This Thek?</Button>
              </Link>
             
            </Card>
          ))}
        </BagContainer>
        
       
        <Button>
          <Link to="/AllBags" params={accessToken}>
            Go back to overview
          </Link>
        </Button>
        <Logout />
      </Box>
      <Footer />
    </>
  );

}
export default MemberBag;
