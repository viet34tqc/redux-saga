import { fork, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { login, LoginPayload, logout } from './authSlice';

function handleLogin(payload: LoginPayload) {
	console.log('Handle login', payload);
}

function handleLogout() {
	console.log('Logged out');
}

function* watchLoginFlow() {
	while (true) {
		// wait for dispatching action login
		// take is non-blocking call, it returns the action object that is being dispatched.
		const action: PayloadAction<LoginPayload> = yield take(login.type);
		// then handle login
		yield fork(handleLogin, action.payload);

		// Now the login is done
		// If you click the login again, it won't execute the 'take' above again.

		// wait for dispatching action logout
		yield take(logout.type);
		// then handle logout
		yield fork(handleLogout);

		// Now the logout is done
		// Because we are in the loop, so return to the login handle again
	}
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
