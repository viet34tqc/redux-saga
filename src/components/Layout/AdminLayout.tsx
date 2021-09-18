import { Box, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		gridTemplateColumns: '240px 1fr',
		gridTemplateAreas: `"header header" "sidebar main"`,

		minHeight: '100vh',
	},

	header: {
		gridArea: 'header',
	},
	sidebar: {
		gridArea: 'sidebar',
		borderRight: `1px solid ${theme.palette.divider}`,
		backgroundColor: theme.palette.background.paper,
	},
	main: {
		gridArea: 'main',
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2, 3),
	},
}));

export default function AdminLayout() {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Box className={classes.header}>
				<Header />
			</Box>

			<Box className={classes.sidebar}>
				<Sidebar />
			</Box>

			<Box className={classes.main}>
				<Switch>
					<Route path="/admin/Dashboard"></Route>

					<Route path="/admin/students">
					</Route>
				</Switch>
			</Box>
		</Box>
	);
}
