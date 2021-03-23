//libs
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
//ui components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
//app components
import Alert from "../../common/alert";
//actions
import { closeAuthMessage, sendPasswordResetEmail } from "../../../actions";
//styles
const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ForgotPasswordModal = ({ openModal, handleClose }) => {
	const [email, setEmail] = useState("");
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const closeAlert = () => {
		dispatch(closeAuthMessage());
	};

	const handleResetPasswordClick = async (e) => {
		e.preventDefault();
		await dispatch(sendPasswordResetEmail(email));
		handleClose();
	};

	return (
		<div>
			<Dialog
				open={openModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				fullWidth
			>
				<DialogTitle>Password Reset</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter your email address.</DialogContentText>
					<form className={classes.form}>
						<TextField
							fullWidth
							id="outlined-basic"
							label="Email Address"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" onClick={handleResetPasswordClick}>
						Send Password Reset Email
					</Button>
				</DialogActions>
			</Dialog>
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
	);
};

export default ForgotPasswordModal;
