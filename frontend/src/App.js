import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import './app.css';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import { NotFound } from './components/NotFound';
import Welcome from './components/Welcome'
import Profile from './components/Profile'

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
					<Route path="/member/:memberId" element={<Profile />} />
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/signin" element={<Login />} />
					<Route path="/register" element={<Register />} />
					
					<Route path="*" element={<NotFound />} />

				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
