import React from 'react';
import Lottie from "react-lottie";
import animationData from '../animations/rainbowloader.json'

export const Loader = () => {
  
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
  
