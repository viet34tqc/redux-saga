import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../models';

export interface LoginPayload {
	username: string;
	password: string;
}

export interface AuthState {
	isLoggedIn: boolean;
	logging: boolean;
	currentUser: User | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	logging: false,
	currentUser: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<LoginPayload>) => {
			state.logging = true;
		},
		loginSuccess: (state, action: PayloadAction<User>) => {
			state.isLoggedIn = true;
			state.logging = false;
			state.currentUser = action.payload;
		},
		loginFailed: (state, action: PayloadAction<string>) => {
			state.logging = false;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.currentUser = null;
		},
	},
});

// Actions creators
export const { login, loginSuccess, loginFailed, logout } = authSlice.actions;

// Selector
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
