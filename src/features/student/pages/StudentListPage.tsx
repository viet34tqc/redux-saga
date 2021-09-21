import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import StudentTable from '../components/StudentTable';
import { fetchStudentList, selectStudentList } from '../studentSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		paddingTop: theme.spacing(1),
	},

	titleContainer: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',

		marginBottom: theme.spacing(4),
	},

	loading: {
		position: 'absolute',
		top: theme.spacing(-1),
		width: '100%',
	},
}));

const StudentListPage = () => {
	const studentList = useAppSelector(selectStudentList);
	const match = useRouteMatch();
	const classes = useStyles();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchStudentList({ _page: 1, _limit: 15 }));
	}, [dispatch]);

	return (
		<Box className={classes.root}>
			<Box className={classes.titleContainer}>
				<Typography variant="h4">Student</Typography>
				<Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
					<Button variant="contained" color="primary">
						Add new student
					</Button>
				</Link>
			</Box>
			{/* Student Table */}
            <StudentTable studentList={studentList} />
			{/* Pagination */}
		</Box>
	);
};

export default StudentListPage;
