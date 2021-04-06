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
//actions
import { updateOrder } from "../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CompleteOrderModal = ({ openModal, handleClose, orderNumber, order }) => {
	const dispatch = useDispatch();

	const handleCompleteOrder = async () => {
		order.status = "Completed";
		await dispatch(updateOrder(order, true));
		handleClose();
	};

	return (
		<div>
			<Dialog
				open={openModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>
					Are you sure you want to confirm order #{orderNumber}?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Completing the order will change its status and notify the customer
						via email. This order will no longer be able to be modfieid once it
						is completed.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						No
					</Button>
					<Button onClick={handleCompleteOrder} color="primary">
						Complete Order
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default CompleteOrderModal;
