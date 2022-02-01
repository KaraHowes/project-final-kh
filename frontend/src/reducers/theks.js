import { createSlice } from '@reduxjs/toolkit';

const theks = createSlice({
	name: 'theks',
	initialState: {
		items: [],
		//bagId: null,
		//location: null,
		//colour: null,
		//age: null,
		//member: null,
		error: null,
	},
	reducers: {
		setItems: (store, action) => {
			store.items = action.payload;},
			
		//setBagId: (store, action) => {
		//	store.bagId = action.payload;
	//	},
	//	setLocation: (store, action) => {
	//		store.location = action.payload;
	//	},
	//	setColour: (store, action) => {
	//		store.colour = action.payload;
	//	},
	//	setAge: (store, action) => {
	//		store.age = action.payload;
	//	},
	//	setMember: (store, action) => {
	//		store.member = action.payload;
	//	},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default theks;
