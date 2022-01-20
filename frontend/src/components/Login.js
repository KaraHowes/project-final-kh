import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/urls';
import member from '../reducers/member';

const Login = () => {
	const [membername, setMembername] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState('signup');

	const accessToken = useSelector((store) => store.member.accessToken);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errors = useSelector(store => store.member.error);

	useEffect(() => {
		if (accessToken) {
			navigate('/');
		}
	}, [accessToken, navigate]);

	const onFormSubmit = (event) => {
		event.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
	
			body: JSON.stringify({ membername, password }),
		};

		fetch(API_URL(mode), options)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success) {
					batch(() => {
						dispatch(member.actions.setMemberId(data.response.memberId));
						dispatch(member.actions.setMembername(data.response.membername));
						dispatch(member.actions.setAccessToken(data.response.accessToken));
						dispatch(member.actions.setError(null));
					});
				} else {
					batch(() => {
						dispatch(member.actions.setMemberId(null));
						dispatch(member.actions.setMembername(null));
						dispatch(member.actions.setAccessToken(null));
						dispatch(member.actions.setError(data.response));
					});
				}
			});
	};

	return (
		<>{/*
			<div>
				<Link to="/">To '/' hello wonderful you!</Link>
			</div>
			<label htmlFor="signup">Signup</label>
			<input
				id="signup"
				type="radio"
				checked={mode === 'signup'}
				onChange={() => setMode('signup')}
			/>
			<label htmlFor="signin">Signin</label>
			<input
				id="signin"
				type="radio"
				checked={mode === 'signin'}
				onChange={() => setMode('signin')}
			/>
			<form onSubmit={onFormSubmit}>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={membername}
					onChange={(e) => setMembername(e.target.value)}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
		</form>*/}
		<main className="mainContainer">
      {mode === 'signup' ? <div className="top-login">Create a user</div> : <div className="top-login">Login with your user</div>}
      
      {/* <Link className="to-start" to="/">Go to start</Link> */}
      <div className="choose-type">
        <div className="signup">
          <input
            id="signup"
            type="radio"
            checked={mode === 'signup'}
            onChange={() => setMode('signup')}
          />
          <label htmlFor="signup">Sign up!</label>
        </div>

        <div className="signin">
          <input
            id="signin"
            type="radio"
            checked={mode === 'signin'}
            onChange={() => setMode('signin')}
          />
          <label htmlFor="signin">Sign In!</label>
        </div>
      </div>

      <form className="form" onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={membername}
          onChange={(e) => setMembername(e.target.value)}
        />

        <label htmlFor="password">Password {errors && <p className="warning-login">Please enter a password!</p>}</label> 
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === 'signup' ? <button disabled={membername.length < 5} className="login" type="submit">Create user</button> : <button disabled={membername.length < 5} className="login" type="submit">Login</button>}
        {membername.length < 5 ? <p className="warning">Your username needs to be longer than 5 characters!</p> : <p></p>}
        
      </form>
    </main>
  );
		</>
	);
};

export default Login;
