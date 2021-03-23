//libs
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, each } from "lodash";
//ui components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
//app components
import UserRolesDropdown from "../user-components/userRolesDropdown";
import ToggleUserAccess from "../user-components/toggleUserAccess";
//actions
import {
	getUserRoles,
	clearUserToEdit,
	updateUserRoles,
} from "../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateUserModal = ({ openModal, handleClose, user }) => {
	const dispatch = useDispatch();
	const userToEdit = useSelector((state) => state.user.userToEdit);
	const [userRoles, setUserRoles] = useState([]);
	const [userDisabled, setUserDisabled] = useState("");

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
			setUserDisabled(userToEdit.disabled ? "Yes" : "No");
		}
	}, [userToEdit]);

	const handleRoleChanged = (event) => {
		setUserRoles(event.target.value);
	};

	const handleToggleChange = (event) => {
		setUserDisabled(event.target.value);
	};

	const updateUserClicked = async () => {
		let customClaims = {
			customer: false,
			employee: false,
			manager: false,
			admin: false,
		};

		each(userRoles, (role) => {
			if (role === "customer") {
				customClaims.customer = true;
			} else if (role === "employee") {
				customClaims.employee = true;
			} else if (role === "manager") {
				customClaims.manager = true;
			} else if (role === "admin") {
				customClaims.admin = true;
			}
		});
		await dispatch(
			updateUserRoles(
				userToEdit.uid,
				customClaims,
				userDisabled === "Yes" ? true : false
			)
		);
		handleClose();
	};

	return (
		<div>
			<Dialog
				open={openModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
			>
				<DialogTitle>{`Modifying ${user.metaData.firstName} ${user.metaData.lastName}'s attributes`}</DialogTitle>
				<DialogContent>
					<DialogContentText>Update this user's permissions.</DialogContentText>
					<UserRolesDropdown
						userRoles={userRoles}
						handleChange={handleRoleChanged}
					/>
					<ToggleUserAccess
						disabled={userDisabled}
						handleChange={handleToggleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button color="primary" onClick={updateUserClicked}>
						Update User
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default UpdateUserModal;
