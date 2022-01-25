import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import './app.css';

import Login from './components/Login';
import Register from './components/Register';
import { NotFound } from './components/NotFound';
import Welcome from './components/Welcome'
import Profile from './components/Profile'
import AddThek from './components/AddThek'

import member from './reducers/member';
import theks from './reducers/theks';

const reducer = combineReducers({
	member: member.reducer,
	theks: theks.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/member/:memberId" element={<Profile />} />
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/signin" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/AddThek" element={<AddThek />} />
					<Route path="*" element={<NotFound />} />

				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
