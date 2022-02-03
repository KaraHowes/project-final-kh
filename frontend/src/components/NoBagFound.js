import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";



const NoBagFound =()=> {

     const accessToken = useSelector((store) => store.member.accessToken) 

    return(
        <div>
        <p>Oh no, that's a pity! Please check our All of the Bags section for a
        greater selection</p>
     
      <button>
          <Link to="/AllBags" params={accessToken}>Allbags</Link>
      </button>
      </div>
    )
}
export default NoBagFound