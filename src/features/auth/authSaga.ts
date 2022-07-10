import { call, delay, fork, put, take } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import {
	login,
	loginFailed,
	LoginPayload,
	loginSuccess,
	logout,
} from './authSlice';

function* handleLogin(payload: LoginPayload) {
	try {
		yield delay(1000); // This should be API call
		localStorage.setItem('access_token', 'fake token');

		// This should add the real user retrieved from API call.
		yield put(
			loginSuccess({
				id: 1,
				name: 'viet',
			})
		);

		// Redirect to admin page
		yield put(push('/admin/dashboard'));
	} catch (error) {
		yield put(loginFailed(error.message));
	}
}

function* handleLogout() {
	localStorage.removeItem('access_token');

	// Redirect to login page
	yield put(push('/login'));
}

function* watchLoginFlow() {
	while (true) {
		const isLoggedIn = Boolean(localStorage.getItem('access_token'));

		// If you are already logged in, you won't need to listen to login
		if (!isLoggedIn) {
			// wait for login action
			// take is non-blocking call, it returns the action object that is being dispatched.
			const action: PayloadAction<LoginPayload> = yield take(login.type);
			// then handle login
			yield fork(handleLogin, action.payload);
		}

		// Now the login is done
		// If you click the login again, it won't execute the 'take' login again.

		// wait for logout action
		yield take(logout.type);
		// then handle logout
		// We are not using 'fork' here, because fork is non-blocking then it will comeback immediately to the top of the loop
		// If deleting access_token is in progress, then saga won't wait for login (isLoggedIn still true) and come back here
		// We need to wait for the logout process to be done completely
		yield call(handleLogout);

		// Now the logout is done
		// Because we are in the loop, so return to the login handle again
	}
}

export function* authSaga() {
	yield fork(watchLoginFlow);
}
