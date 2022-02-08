import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert"

import oneThek from "../reducers/oneThek";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import Loader from '../components/Loader'

import { Box } from "../components/styling/containers"
import Footer from '../components/Footer'
import Menu from '../components/Menu'

const BagContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const Card = styled.div`
margin: 10px;
width: 20%;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-end;
text-align: center;
font-family: "Josefin Sans", sans-serif;
max-width: 200px;
box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5)
background: white;

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
  font-family: 'Josefin Sans', sans-serif;

`
const ImageThek = styled.img`
  width: 100%;
  max-width: 150px;
  display: flex;
  margin: 0 auto;
`;
const BagDelete = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  const chosenBag = useSelector((store) => store.oneThek);
  const { _id }= useParams() //This is vital so that the id can be taken from the url browser

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    
    swal({
        title: 'Are you sure?',
        text: 'Do you really want to delete this bag from Thek-Friends?',
        icon: 'warning',
        buttons: {
          confirm: { text: 'Yes', result: true, closeModal: true, value: true, visible: true },
          cancel: { text: 'Cancel', result: false, closeModal: true, value: null, visible: true },
        },
      }).then((result) => {
        if (result) {
          swal(`You have deleted the Thek!`, { icon: 'success' });
          console.log(`You've deleted this game from the database`);
        
          const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken,
            },
          };
          if (accessToken) {
            fetch(API_URL(`deleteBag/${_id}`), options).then(navigate('/signin'));
          }
        } else {
          console.log(`You've chosen not to delete this object`);
        }
      });
  }, [accessToken, _id]);
  ;
  return (
    <>
    <Box>
        {accessToken}
      <Menu/>
      {loading && <Loader/>}
      <ImageThek
            src="./assets/thek-icon-1.png"
            alt="Thek-friends-bag-logo"
          ></ImageThek>
      <BagContainer>
  <p> {chosenBag.colour} bag which is based in {chosenBag.location}</p> 
  <p>{chosenBag.accessToken}</p>
      </BagContainer>
    
      <Button > 
        <Link to="/AllBags"params={accessToken}>Go back to overview</Link>
        </Button>
      <Logout />
    </Box>
    <Footer/>
    </>
  );
};

export default BagDelete;
