import React from 'react'
import PropTypes from 'prop-types';
import {Modal} from './Modal.js';
import {Input} from './Input.js';
import {Button} from './Button.js';
import {filterJoin} from './svz-utilities';
import './scss/LoginBox.scss';

const LoginForm = props => {
	const {email, pass, persist = true, login, onChange, loggingIn, loggingInContent, error, errorActive} = props;
	const loginFunc = evt => {
		evt.preventDefault();
		login(email, pass, persist);
	}
	return (
		<form onSubmit={loginFunc} className={filterJoin([['logging-in', loggingIn]])}>
			<Input label = "Email" className="user-box" autoComplete="username" onChange={email => onChange({email})} value={email} />
			<Input type="password" label = "Password" className="password-box" autoComplete="current-password" onChange = {pass => onChange({pass})} value={pass} />
			<div className = "persist-box">
				<p>Stay logged in?</p>
				<input type="checkbox" checked = {persist} onChange={evt => onChange({persist: evt.target.checked})} />
			</div>
			<div className = "login-box">
				<input className="button thin" type="submit" value="Login" />
				<div className = "logging-in-content">{loggingInContent}</div>
			</div>
			<div className={filterJoin(['error-box', ['active', errorActive]])}>{error}</div>
		</form>
	)
}


const LoginBox = props => {
	const {email, pass, persist, login, onChange, open, mobileBreak = 768, createUser, newUser, loggingIn, loggingInContent, error, errorActive, ready, screenLock} = props;
	return <div className={filterJoin(["auth-container", ['open', open], ['ready', ready]])} >
		{
			window.innerWidth >= mobileBreak
			?	open
				? <LoginForm {...{email, pass, persist, login, onChange, loggingIn, loggingInContent, error, errorActive}} />
				: <div className="button thin" onClick={() => onChange({open: true})}>Sign In/Register</div>
			:
				<Modal screenLock={screenLock} active={open && !newUser} closeFunction = {() => onChange({open: false})}>
					<LoginForm {...{email, persist, pass, login, onChange, loggingIn, loggingInContent, error, errorActive}} />
				</Modal>
		}
		<Modal screenLock = {screenLock} active={open && newUser} closeFunction = {() => onChange({newUser: false})} >
			<div className="new-user-modal">
				<p>No account for {email} yet.<br/>Would you like to make one?</p> 
				<div className="new-user-yes-no">
					<Button onClick={() => createUser(email, pass, persist)}>Yes</Button>
					<Button onClick={() => onChange({newUser: false})}>No</Button>
				</div>
				<div className={filterJoin(["error-box", ['active',error && !error.includes("400")]])}><p>{error}</p></div>
			</div>
		</Modal>
	</div>
}

LoginBox.propTypes = {
	email: PropTypes.string,
	pass: PropTypes.string,
	login: PropTypes.func,
};

export {LoginBox};