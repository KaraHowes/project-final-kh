import { createSlice, findNonSerializableValue } from '@reduxjs/toolkit';

const member = createSlice({
	name: 'member',
	initialState: {
		memberId: null,
		membername: null,
		accessToken: null,
		email: null,
		error: null,
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
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default member;
