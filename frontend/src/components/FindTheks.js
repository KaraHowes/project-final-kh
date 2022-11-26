import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import searched from "../reducers/searched";
import { API_URL } from "../utils/urls";

import Logout from "../components/Logout";
import { Box } from "../components/styling/containers";
import { Form, Select } from "../components/styling/formStyle";
import { Press } from "../components/styling/general";
import Loader from "../components/Loader";


const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: #fff000;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 10px 15px;
  margin: 0 0 20px;
  border-radius: 10px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 5px 5px 10px #888888;
`;

const FindTheks = () => {
  const [colour, setColour] = useState("");
  const [location, setLocation] = useState("");

  const errors = useSelector((store) => store.member.error);
  const accessToken = useSelector((store) => store.member.accessToken);
  const memberId = useSelector((store) => store.member.memberId);
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
     <Box>
        {loading && <Loader />}

        <Form onSubmit={onFormSubmit}>
          <label htmlFor="colourInput"></label>
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

          <label htmlFor="locationInput"></label>
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
          <Button>
            <Press to={`/member/${memberId}`} params={memberId}>
              Profile
            </Press>
          </Button>
          <Logout style={{ backgroundColor: "#FFF000" }} />
        </Form>
      </Box>
  );
};
export default FindTheks;
