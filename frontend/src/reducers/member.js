import { createSlice } from '@reduxjs/toolkit';

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
			store.location = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default member;
