import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { API_URL } from "../utils/urls";


const Div = styled.div`
background-color: white;`
const Inspirations = () => {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    fetch(API_URL("inspiration"))
      .then((res) => res.json())
      .then((response) => {
        setAffirmation(response);
        console.log(response)
      });
  }, []);

  return (
    <Div>
      {affirmation.quote}
    </Div>
  );
};
export default Inspirations;
