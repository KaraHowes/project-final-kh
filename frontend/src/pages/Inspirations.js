import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";

import quote from "../reducers/quote";
import { API_URL } from "../utils/urls";

const Div = styled.div`
  background-color: white;
  width: 100%;

`;

const Box = styled.div`
  width: 60%;
  padding: 25px;
  background: white;
  margin: 0 auto;
  border: 5px solid black;
  box-shadow: 10px 10px #878df7;
  font-family: "Josefin Sans", sans-serif;
 
`;
const Button = styled.button`
  width: 60%;
  min-width: 150px;
  height: 50px;
  background-color: #20C6BA;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 15px 0 15px 0;
  margin: 10px auto;
  border-radius: 20px;
  font-family: "Josefin Sans", sans-serif;
  box-shadow: 3px 3px 6px #888888;
  
`;
const Quote = styled.h1 `
font-size: 25px;
text-align: left;
font-weight: 700;

`
const Source = styled.h2`
text-align: right;
font-size: 20px;
font-weight: 500;
font-family: 'Roboto Mono', monospace;
color: #878df7; 
`
const Inspirations = () => {
  const affirmation = useSelector((store) => store.quote);
  const dispatch = useDispatch();

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch(API_URL("inspiration"))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(quote.actions.set_Id(data.response._id));
            dispatch(quote.actions.setQuote(data.response.quote));
            dispatch(quote.actions.setSource(data.response.source));
            dispatch(quote.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(quote.actions.set_Id(null));
            dispatch(quote.actions.setQuote(null));
            dispatch(quote.actions.setSource(null));
            dispatch(quote.actions.setError(data.response));
          });
        }
      });
  }, []);

  return (
    <Box>
      <Div>
        <Quote>{affirmation.quote}</Quote>
        <Source>{affirmation.source}</Source>
      </Div>
      <Button onClick={refreshPage}> I want more</Button>
    </Box>
  );
};
export default Inspirations;
