import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch, batch } from "react-redux";

import quote from '../reducers/quote'
import { API_URL } from "../utils/urls";


const Div = styled.div`
background-color: white;
border: solid 5px black;`


const Inspirations = () => {

  const affirmation = useSelector((store)=> store.quote)
  const dispatch = useDispatch();



  useEffect(() => {
    fetch(API_URL("inspiration"))
      .then((res) => res.json())
      .then((data) => {
        
        console.log(data)
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
    <Div>
      <h1>{affirmation.quote}</h1>
      <h1>{affirmation.source}</h1>
    </Div>
  );
};
export default Inspirations;
