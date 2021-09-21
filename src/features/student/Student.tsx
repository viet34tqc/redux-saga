import { Route, Switch, useRouteMatch } from 'react-router';
import StudentAddEditPage from './pages/StudentAddEditPage';
import StudentListPage from './pages/StudentListPage';

const Student = () => {
	// Inherit parent route
	const match = useRouteMatch();
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
