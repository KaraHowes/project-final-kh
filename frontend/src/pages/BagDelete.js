import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import Loader from "../components/Loader";

import { Box } from "../components/styling/containers";
import { Press } from "../components/styling/general";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import image from "../images/bag.png";

const All = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  width: 100%;
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
const Image = styled.div`
  margin: 0 auto;
`;
const ButtonContainer=styled.div`
width: 80%;
max-width: 250px;
margin: 20px auto`

const BagDelete = () => {
  const accessToken = useSelector((store) => store.member.accessToken);
  const { _id } = useParams(); //This is vital so that the id can be taken from the url browser
  const memberId = useSelector((store) => store.member.memberId);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    swal({
      title: "Are you sure?",
      text: "Do you really want to delete this bag from Thek-Friends?",
      icon: "warning",
      buttons: {
        confirm: {
          text: "Yes",
          result: true,
          closeModal: true,
          value: true,
          visible: true,
        },
        cancel: {
          text: "Cancel",
          result: false,
          closeModal: true,
          value: null,
          visible: true,
        },
      },
    }).then((result) => {
      if (result) {
        swal(`You have deleted the Thek!`, { icon: "success" });

        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        if (accessToken) {
          fetch(API_URL(`deleteBag/${_id}`), options).then(navigate("/signin"));
        }
      } else {
        console.log(`You've chosen not to delete this object`);
      }
    }).finally(() => setLoading(false));
  }, [navigate, accessToken, _id]);
  return (
    <>
      <Box>
  
        <Menu />
        <All>
          {loading && <Loader />}
          <Image>
            <img src={image} alt={image} height={150} width={125}/>
          </Image>
          <ButtonContainer>
          <Button>
            <Press to={`/member/${memberId}`} params={(accessToken, memberId)}>
              My Profile
            </Press>
          </Button>
          <Logout />
          </ButtonContainer>
          
        </All>
      </Box>
      <Footer />
    </>
  );
};

export default BagDelete;
