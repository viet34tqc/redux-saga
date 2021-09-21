import { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { cityActions } from '../city/citySlice';
import StudentAddEditPage from './pages/StudentAddEditPage';
import StudentListPage from './pages/StudentListPage';

const Student = () => {
	// Inherit parent route
	const match = useRouteMatch();
	const dispatch = useAppDispatch();

	// fetchCityList here because Student page needs it
	useEffect(() => {
		dispatch(cityActions.fetchCity());
	}, [dispatch]);

	return (
		<Switch>
			<Route path={match.path} exact>
				<StudentListPage />
			</Route>
			<Route path={`${match.path}/add`}>
				<StudentAddEditPage />
			</Route>
			<Route path={`${match.path}/:studentId`}>
				<StudentAddEditPage />
			</Route>
		</Switch>
	);
};

export default Student;
