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
import TextField from "@material-ui/core/TextField";
//actions
import { updateOrder } from "../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AddPoNumberModal = ({ openModal, handleClose, orderNumber, order }) => {
	const dispatch = useDispatch();

	const handleAddPoNumber = async () => {
		/**
		 * Need to get all the line items from the invoice
		 * Void the old one
		 * Create a new one with the PO# set.
		 * Unfortunately this is the only way to do it once the invoice is finalized.
		 */
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
				<DialogTitle>Add purchse number to order #{orderNumber}?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Adding purchase order number will automatically update to associated
						invoice.
					</DialogContentText>
					<form noValidate autoComplete="off">
						<TextField
							id="outlined-basic"
							label="Purchase Order #"
							variant="outlined"
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddPoNumber} color="primary">
						Add Purchase Order Number
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddPoNumberModal;
