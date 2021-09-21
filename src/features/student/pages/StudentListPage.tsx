import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import StudentTable from '../components/StudentTable';
import {
	fetchStudentList,
	selectStudentFilter,
	selectStudentList,
	selectStudentPagination,
	setFilter,
} from '../studentSlice';
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
	const pagination = useAppSelector(selectStudentPagination);
	const filter = useAppSelector(selectStudentFilter);
	const match = useRouteMatch();
	const classes = useStyles();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchStudentList(filter));
	}, [dispatch, filter]);

	const handlePageChange = (event: any, page: number) => {
		// Update filter -> Run useEffect again -> Run fetchStudentList again
		dispatch(
			setFilter({
				...filter,
				_page: page,
			})
		);
	};

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

			<Box my={2} display="flex" justifyContent="center">
				<Pagination
					color="primary"
					count={Math.ceil(pagination._totalRows / pagination._limit)}
					page={pagination?._page}
					onChange={handlePageChange}
				/>
			</Box>
		</Box>
	);
};

export default StudentListPage;
