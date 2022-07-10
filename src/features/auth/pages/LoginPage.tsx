import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { login, logout, selectIsLoggedIn } from '../authSlice';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	},

	box: {
		padding: theme.spacing(3),
	},
}));

const LoginPage = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const isLoggedIn = Boolean(localStorage.getItem('access_token'));

	const handleLoginClick = () => {
		// TODO: get username and pwd from the login form.
		dispatch(
			login({
				username: '',
				password: '',
			})
		);
	};
	return (
		<div className={classes.root}>
			<Paper elevation={1} className={classes.box}>
				<Typography variant="h5" component="h1">
					Student Management
				</Typography>

				<Box mt={4}>
					{!isLoggedIn ? (
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={handleLoginClick}
						>
							Fake Login
						</Button>
					) : (
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={() => dispatch(logout())}
						>
							Logout
						</Button>
					)}
				</Box>
			</Paper>
		</div>
	);
};

export default LoginPage;
