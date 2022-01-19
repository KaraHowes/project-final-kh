import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import './app.css';
import Main from './components/Main';
import Login from './components/Login';
import NotFound from './components/NotFound';

import member from './reducers/member';
import thoughts from './reducers/thoughts';

const reducer = combineReducers({
	member: member.reducer,
	thoughts: thoughts.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/signin" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
