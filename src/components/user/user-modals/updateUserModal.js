//libs
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
//ui components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
//actions
import { getUserRoles, clearUserToEdit } from "../../../actions";
import { isEmpty } from "lodash";
//styles
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const roles = ["admin", "manager", "employee", "customer"];

const UpdateUserModal = ({ openModal, handleClose, user }) => {
	const dispatch = useDispatch();
	const userToEdit = useSelector((state) => state.user.userToEdit);
	const classes = useStyles();
	const [userRoles, setUserRoles] = useState([]);

	useEffect(() => {
		if (openModal) {
			dispatch(getUserRoles(user.firebaseUserId));
		}
		return () => {
			setUserRoles([]);
			dispatch(clearUserToEdit());
		};
	}, [openModal]);

	useEffect(() => {
		if (!isEmpty(userToEdit)) {
			let roleArray = [];
			const roles = userToEdit.customClaims;
			for (const role in roles) {
				if (roles[role]) {
					roleArray.push(role);
				}
			}
			setUserRoles(roleArray);
		}
	}, [userToEdit]);

	const handleChange = (event) => {
		setUserRoles(event.target.value);
	};

	return (
		<div>
			<Dialog
				open={openModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
			>
				<DialogTitle>{`Modifying ${user.metaData.firstName} ${user.metaData.lastName}'s permissions`}</DialogTitle>
				<DialogContent>
					<DialogContentText>Update this user's permissions.</DialogContentText>
					<FormControl className={classes.formControl}>
						<InputLabel>User Roles</InputLabel>
						<Select
							multiple
							value={userRoles}
							onChange={handleChange}
							input={<Input />}
							MenuProps={MenuProps}
						>
							{roles.map((role) => (
								<MenuItem key={role} value={role}>
									{role}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary">Update User</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default UpdateUserModal;
