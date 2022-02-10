import React from 'react';
import Lottie from "react-lottie";
import animationData from '../animations/notfound.json'

import { Box } from "../components/styling/containers"
export const NotFound = () => {
  
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    }

    return (

        <Box>
        <Lottie 
            options={defaultOptions}
            height={600}
            width={600}
          />
        </Box>
      
    
    );
  };
  
