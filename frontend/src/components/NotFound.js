import React from 'react';
import Lottie from "react-lottie";
import animationData from '../animations/notfound.json'

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

        <div>
        <Lottie 
            options={defaultOptions}
            height={800}
            width={800}
          />
        </div>
      
    
    );
  };
  
