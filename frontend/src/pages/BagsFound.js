import React from 'react'
import { useSelector} from "react-redux";

import styled from "styled-components";


const BagsFound= ()=>{

    const foundBags = useSelector((store)=> store.searched.items)

return(
    <div>Found bags

    {foundBags.map((item)=>(
        <div key={item.bagId}>{item.colour}{item.location}</div>
      ))}
      </div>
  
)
}

export default BagsFound