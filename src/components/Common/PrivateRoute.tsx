import { Redirect, Route, RouteProps } from 'react-router';

const PrivateRoute = (props: RouteProps) => {
	// Check if user is logged in
	// If so, show route
	// If not, redirect to login page
	const isLoggedIn = Boolean(localStorage.getItem('access_token'));

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}

	return <Route {...props} />;
};

export default PrivateRoute;
