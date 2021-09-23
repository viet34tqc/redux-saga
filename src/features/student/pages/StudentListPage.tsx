import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Student } from '../../../models';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import {
	fetchStudentList,
	selectStudentFilter,
	selectStudentList,
	selectStudentPagination,
	setFilter,
	setFilterDebounce,
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
	const cityList = useAppSelector(selectCityList);
	const classes = useStyles();

	const match = useRouteMatch();
	const history = useHistory();

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

	const handleSearchChange = (newFilter: ListParams) => {
		dispatch(setFilterDebounce(newFilter));
	};
	const handleSelectChange = (newFilter: ListParams) => {
		dispatch(setFilter(newFilter));
	};

	const handleRemoveStudent = async (student: Student) => {
		try {
			await studentApi.remove(student?.id || '');
			dispatch(fetchStudentList(filter));

			toast.success('Remove student successfully');
		} catch (error) {
			console.log('Failed to remove', error);
		}
	};

	const handleEditStudent = async (student: Student) => {
		history.push(`${match.url}/${student.id}`);
	};

	const cityMap = useAppSelector(selectCityMap);

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

			<StudentFilter
				cityList={cityList}
				filter={filter}
				onChange={handleSelectChange}
				onSearchChange={handleSearchChange}
			/>

			{/* Student Table */}
			<StudentTable
				studentList={studentList}
				onEdit={handleEditStudent}
				onRemove={handleRemoveStudent}
				cityMap={cityMap}
			/>
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
