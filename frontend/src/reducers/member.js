import { createSlice } from '@reduxjs/toolkit';
import { batch } from "react-redux";

import { API_URL } from "../utils/urls";

const member = createSlice({
	name: 'member',
	initialState: {
		memberId: null,
		membername: null,
		accessToken: null,
		email: null,
		error: null,
		location: null,
		status: null,
	},
	reducers: {
		setMemberId: (store, action) => {
			store.memberId = action.payload;
		},
		setMembername: (store, action) => {
			store.membername = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
		},
		setEmailAddress: (store, action) => {
			store.email = action.payload;
		},
		setLocation: (store, action) => {
			store.location = action.payload;
		},
		setStatus: (store, action) => {
			store.status = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default member;

export const fetchMember = (memberId)=>{
	return (dispatch) => {
		fetch(API_URL(`member/$memberId`))
		.then((res) => res.json()
		.then((data)=> {
			if (data.success) {
				batch(() => {
				  dispatch(member.actions.setMemberId(data.response.memberId));
				  dispatch(member.actions.setMembername(data.response.membername));
				  dispatch(member.actions.setAccessToken(data.response.accessToken));
				  dispatch(member.actions.setEmailAddress(data.response.email));
				  dispatch(member.actions.setLocation(data.response.location));
				  dispatch(member.actions.setStatus(data.response.status));
				  dispatch(member.actions.setError(null));
				});
			  } else {
				batch(() => {
				  dispatch(member.actions.setMemberId(null));
				  dispatch(member.actions.setMembername(null));
				  dispatch(member.actions.setAccessToken(null));
				  dispatch(member.actions.setEmailAddress(null));
				  dispatch(member.actions.setLocation(null));
				  dispatch(member.actions.setStatus(null));
				  dispatch(member.actions.setError(data.response));
				});
			  }
		}))
	}
}