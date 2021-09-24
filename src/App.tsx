import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './components/Common/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminLayout from './components/Layout/AdminLayout';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
	return (
		<Switch>
			<Route path="/login">
				<LoginPage />
			</Route>
			<PrivateRoute path={['/admin', '/']}>
				<AdminLayout />
			</PrivateRoute>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default App;
