import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import './app.css';

import Login from './pages/Login';
import Register from './pages/Register';
import { NotFound } from './pages/NotFound';
import Welcome from './pages/Welcome'
import Profile from './pages/Profile'
import AddThek from './pages/AddThek'
import AllBags from './pages/AllBags'
import FindThek from './pages/FindThek'
import BagAdded from './pages/BagAdded'

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
					<Route path="/FindThek" element={<FindThek />} />
					<Route path="/AllBags" element={<AllBags />} />
					<Route path="/BagAdded" element={<BagAdded />} />
					<Route path="*" element={<NotFound />} />

				</Routes>
			</BrowserRouter>
		</Provider>
	);
};
