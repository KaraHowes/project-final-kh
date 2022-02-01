//This handles information for one particular bag

import { createSlice } from '@reduxjs/toolkit';

const oneThek = createSlice({
	name: 'oneThek',
	initialState: {
		_id: null,
		location: null,
		colour: null,
		age: null,
		member: null,
		error: null,
	},
	reducers: {
	
		set_Id: (store, action) => {
			store._id = action.payload;
		},
		setLocation: (store, action) => {
			store.location = action.payload;
		},
		setColour: (store, action) => {
			store.colour = action.payload;
		},
		setAge: (store, action) => {
			store.age = action.payload;
		},
		setMember: (store, action) => {
			store.member = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default oneThek;
