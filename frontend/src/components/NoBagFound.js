import React from 'react'
import { useSelector } from "react-redux";

import { Press } from "./styling/general"
const NoBagFound =()=> {

     const accessToken = useSelector((store) => store.member.accessToken) 

    return(
        <div>
        <p>Oh no, that's a pity! Please check our All of the Bags section for a
        greater selection</p>
     
      <button>
          <Press to="/AllBags" params={accessToken}>Allbags</Press>
      </button>
      </div>
    )
}
export default NoBagFound