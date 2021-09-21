import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticItem';
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

	console.log({
		loading,
		statistics,
		highestStudentList,
		lowestStudentList,
		rankingByCityList,
	});

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
		</Box>
	);
};

export default Dashboard;
