import React from 'react'



const Welcome = ({status}) => {

   
    return (
        <div>
            {status==="Donor" &&(<p>hello wonderful donor</p>)}
            <h1>Hi</h1>
        </div>
    )
}

export default Welcome