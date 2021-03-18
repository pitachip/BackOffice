//libs
import React from "react";
import { useDispatch } from "react-redux";
//ui components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateUserModal = ({ openModal, handleClose, user }) => {
	//const dispatch = useDispatch();

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
