//libs
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
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
}));

const LoginForm = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signingIn, setSigningIn] = useState(false);

	const signInButtonClicked = async (e) => {
		e.preventDefault();
		setSigningIn(true);
		dispatch(signInWithEmailAndPassword(email, password));
		//setSigningIn(false);
	};

	const closeAlert = () => {
		dispatch(closeAuthMessage());
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
					<Button
						type="submit"
						fullWidth
						pending={signingIn}
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</form>
				<Snackbar
					open={auth.showAuthMessage}
					autoHideDuration={6000}
					onClose={closeAlert}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					<MuiAlert elevation={6} variant="filled" />
				</Snackbar>
			</div>
		</Container>
	);
};

export default LoginForm;

/**
 * 					<Snackbar
						open={auth.showAuthMessage}
						autoHideDuration={6000}
						onClose={closeAlert}
						anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					>
<MuiAlert elevation={6} variant="filled" {...props} />
					</Snackbar>
 */
