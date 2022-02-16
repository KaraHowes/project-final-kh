import React from 'react';
import Lottie from "react-lottie";
import styled from "styled-components";

import animationData from '../animations/rainbowloader.json'


const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin 0 auto;
`;


const Loader = () => {
  
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    return (

        <LoadWrapper>
        <Lottie 
            options={defaultOptions}
            height={275}
            width={275}
          />
        </LoadWrapper>
      
    
    );
  };
  
export default Loader