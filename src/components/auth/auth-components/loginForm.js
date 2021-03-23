//libs
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
//app components
import Alert from "../../common/alert";
import ForgotPasswordModal from "../auth-modals/forgotPasswordModal";
//actions
import { signInWithEmailAndPassword, closeAuthMessage } from "../../../actions";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	loader: {
		textAlign: "center",
	},
}));

const LoginForm = () => {
	/**
	 * TODO
	 * Make a button with loader, put it in common to be used everywhere
	 */
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signingIn, setSigningIn] = useState(false);
	const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

	const signInButtonClicked = async (e) => {
		e.preventDefault();
		setSigningIn(true);
		await dispatch(signInWithEmailAndPassword(email, password));
		setSigningIn(false);
	};

	const closeAlert = () => {
		dispatch(closeAuthMessage());
	};

	const handleCloseForgotPasswordModal = () => {
		setOpenForgotPasswordModal(false);
	};

	const handleOpenForgotPasswordModal = () => {
		setOpenForgotPasswordModal(true);
	};

	const renderSignInButton = () => {
		return (
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				Sign In
			</Button>
		);
	};

	const renderLoader = () => {
		return (
			<div className={classes.loader}>
				<CircularProgress size={30} />
			</div>
		);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={(e) => signInButtonClicked(e)}
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!signingIn ? renderSignInButton() : renderLoader()}
					<Grid container>
						<Grid item xs>
							<Button color="primary" onClick={handleOpenForgotPasswordModal}>
								Forgot Password?
							</Button>
						</Grid>
					</Grid>
				</form>
				<Snackbar
					open={auth.showAuthMessage}
					onClose={closeAlert}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert onClose={closeAlert} severity={auth.severity}>
						{auth.authMessage}
					</Alert>
				</Snackbar>
			</div>
			<ForgotPasswordModal
				openModal={openForgotPasswordModal}
				handleClose={handleCloseForgotPasswordModal}
			/>
		</Container>
	);
};

export default LoginForm;
