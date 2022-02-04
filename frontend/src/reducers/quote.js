//This handles information for one particular bag

import { createSlice } from '@reduxjs/toolkit';

const quote = createSlice({
	name: 'quote',
	initialState: {
		_id: null,
		quote: null,
		source: null,
		error: null,
	},
	reducers: {
	
		set_Id: (store, action) => {
			store._id = action.payload;
		},
		setQuote: (store, action) => {
			store.quote = action.payload;
		},
		setSource: (store, action) => {
			store.source = action.payload;
		},
	
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default quote;
