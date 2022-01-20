import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import thoughts from '../reducers/thoughts';


//this needs to be changed and will only render bags as a protected endpoint
const Main = () => {
	const thoughtsItems = useSelector((store) => store.thoughts.items);
	const accessToken = useSelector((store) => store.member.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!accessToken) {
			navigate('/signin');
		}
	}, [accessToken, navigate]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				Authorization: accessToken,
			},
		};

		fetch(API_URL('thoughts'), options)
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(thoughts.actions.setItems(data.response));
					dispatch(thoughts.actions.setError(null));
				} else {
					dispatch(thoughts.actions.setItems([]));
					dispatch(thoughts.actions.setError(data.response));
				}
			});
	}, [accessToken, dispatch]);

	return (
		<div>
			<div>
				<Link to="/signin">To '/login' !</Link>
			</div>
			<h1>Protected happy thoughts:</h1>
			{thoughtsItems.map((item) => (
				<div key={item._id}>{item.message}</div>
			))}
		</div>
	);
};

export default Main;
