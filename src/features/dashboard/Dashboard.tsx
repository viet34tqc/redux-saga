import {
	Box,
	Grid,
	LinearProgress,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
	fetchData,
	selectDashboardLoading,
	selectDashboardStatistics,
	selectHighestStudentList,
	selectLowestStudentList,
	selectRankingByCitylist,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		paddingTop: theme.spacing(1),
	},
	loading: {
		position: 'absolute',
		width: '100%',
		top: theme.spacing(-1),
	},
}));

const Dashboard = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectDashboardLoading);
	const statistics = useAppSelector(selectDashboardStatistics);
	const highestStudentList = useAppSelector(selectHighestStudentList);
	const lowestStudentList = useAppSelector(selectLowestStudentList);
	const rankingByCityList = useAppSelector(selectRankingByCitylist);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			{/* Loading */}
			{loading && <LinearProgress className={classes.loading} />}

			{/* Statistics */}
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={3}>
					<StatisticItem
						icon={<PeopleAlt fontSize="large" color="primary" />}
						value={statistics.maleCount}
						label="male"
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<StatisticItem
						icon={<PeopleAlt fontSize="large" color="primary" />}
						value={statistics.femaleCount}
						label="female"
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<StatisticItem
						icon={<PeopleAlt fontSize="large" color="primary" />}
						value={statistics.highMarkCount}
						label="mark >= 8"
					/>
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<StatisticItem
						icon={<PeopleAlt fontSize="large" color="primary" />}
						value={statistics.lowMarkCount}
						label="mark <= 5"
					/>
				</Grid>
			</Grid>

			{/* Student */}
			<Box mt={5}>
				<Typography variant="h4">All students</Typography>
				<Box mt={4}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={3}>
							<Widget title="Student with highest mark">
								<StudentRankingList studentList={highestStudentList} />
							</Widget>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<Widget title="Student with lowest mark">
								<StudentRankingList studentList={lowestStudentList} />
							</Widget>
						</Grid>
					</Grid>
				</Box>
			</Box>

			{/* Ranking by city */}
			<Box mt={5}>
				<Typography variant="h4">All students</Typography>
				<Box mt={4}>
					<Grid container spacing={3}>
						{rankingByCityList.map((ranking) => (
							<Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
								<Widget title={ranking.cityName}>
									<StudentRankingList studentList={ranking.rankingList} />
								</Widget>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
