import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import searched from "../reducers/searched";
import { API_URL } from "../utils/urls";
import Logout from "../components/Logout";
import { Box } from "../components/styling/containers";
import { Form, Select } from "../components/styling/formStyle";
import Loader from "../components/Loader";
import Footer from '../components/Footer'
import Menu from '../components/Menu'

const AddWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: white;
  border: 1px solid black;
  margin: 0 auto;
  padding: 30px;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff000;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px 15px;
  margin: 0 0 20px;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 3px 3px 6px #888888;
`;

const FindThek = () => {
  const [colour, setColour] = useState("");
  const [location, setLocation] = useState("");

  const errors = useSelector((store) => store.member.error);
  const accessToken = useSelector((store) => store.member.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    navigate("/bagsFound");

    const options = {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
    };
    setLoading(true);
    fetch(
      `${API_URL("searchbags")}?colour=${colour}&location=${location}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.response);
        if (data.success) {
          batch(() => {
            dispatch(searched.actions.setItems(data.response));
            dispatch(searched.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(searched.actions.setItems([]));
            dispatch(searched.actions.setError(data.response));
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
    <Box>
      <Menu/>
      {loading && <Loader/>}
      <AddWrapper>
        <Form onSubmit={onFormSubmit}>
          <Select
            id="colourInput"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            required
          >
            <option disabled value="">
              Main colour:
            </option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Pink">Pink</option>
            <option value="Purple">Purple</option>
            <option value="Orange">Orange</option>
            <option value="Multi">Multi-coloured</option>
          </Select>
          <Select
            id="locationInput"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option disabled value="">
              Location:
            </option>
            <option value="Zurich">Zurich</option>
            <option value="Basel">Basel</option>
            <option value="Geneva">Geneva</option>
            <option value="Bern">Bern</option>
            <option value="Luzern">Luzern</option>
            <option value="Lugano">Lugano</option>
          </Select>

          <Button type="submit">Find my Thek!</Button>

          {errors && <p className="warning-login">Something went wrong!!!</p>}
          <Logout style={{ backgroundColor: "#FFF000" }} />
        </Form>
      </AddWrapper>
    </Box>
    <Footer/>
    </>
  );
};
export default FindThek;
