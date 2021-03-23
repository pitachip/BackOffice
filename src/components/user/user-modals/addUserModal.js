//libs
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
//ui components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
//app components
import UserRolesDropdown from "../user-components/userRolesDropdown";
//actions
import { addNewUser } from "../../../actions";
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

const AddUserModal = ({ openModal, handleClose }) => {
	const [newUserFields, setNewUserFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		userRoles: [],
	});
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleUserRoleChange = (event) => {
		setNewUserFields({ ...newUserFields, userRoles: event.target.value });
	};

	const handleCreateNewUser = async (e) => {
		e.preventDefault();
		await dispatch(addNewUser(newUserFields));
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
				<DialogTitle>Add a new user</DialogTitle>
				<DialogContent>
					<form
						className={classes.form}
						noValidate
						onSubmit={(e) => handleCreateNewUser(e)}
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="firstName"
							label="First Name"
							name="firstName"
							autoFocus
							value={newUserFields.firstName}
							onChange={(e) =>
								setNewUserFields({
									...newUserFields,
									firstName: e.target.value,
								})
							}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							autoFocus
							value={newUserFields.lastName}
							onChange={(e) =>
								setNewUserFields({
									...newUserFields,
									lastName: e.target.value,
								})
							}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoFocus
							value={newUserFields.email}
							onChange={(e) =>
								setNewUserFields({ ...newUserFields, email: e.target.value })
							}
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
							value={newUserFields.password}
							onChange={(e) =>
								setNewUserFields({ ...newUserFields, password: e.target.value })
							}
						/>
						<UserRolesDropdown
							userRoles={newUserFields.userRoles}
							handleChange={handleUserRoleChange}
						/>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button color="primary" type="submit">
								Add New User
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddUserModal;
