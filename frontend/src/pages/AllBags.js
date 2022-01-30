import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import theks from '../reducers/theks'
import { API_URL } from '../utils/urls'

const AllBags =()=> {

    const theksItems = useSelector((store)=> store.theks.items)
    const accessToken = useSelector((store)=> store.member.accessToken)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!accessToken) {
            navigate('/signin')
        }
    }, [accessToken, navigate])

    useEffect(()=> {
        const options = { 
            method: 'GET',
            headers: {
                Authorization: accessToken,
            }
        }
        fetch(API_URL('bags'), options)
        .then((res) => res.json())
        .then((data) => {
            if (data.success){
                dispatch(theks.actions.setItems(data.response))
                dispatch(theks.actions.setbagId(data.response.bagId))
                dispatch(theks.actions.setLocation(data.response.location))
                dispatch(theks.actions.setColour(data.response.colour))
                dispatch(theks.actions.setAge(data.response.age))
                dispatch(theks.actions.setMember(data.response.member))
                dispatch(theks.actions.setError(null))
            } else {
                dispatch(theks.actions.setItems([]))
                dispatch(theks.actions.setbagId(null))
                dispatch(theks.actions.setLocation(null))
                dispatch(theks.actions.setColour(null))
                dispatch(theks.actions.setAge(null))
                dispatch(theks.actions.seMember(null))
                dispatch(theks.actions.setError(data.response))
            }
        })
    }, [accessToken])
    
    return(
        <div>
            <h1>All bags will be rendered here</h1>
        {theksItems.map((item)=> ( <div key={item._id}>{item.colour}{item.location}{item.age}</div>)
           
        
        )}
        </div>
    )
}

export default AllBags