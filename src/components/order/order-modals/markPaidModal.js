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
import { markInvoiceAsPaid } from "../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const MarkPaidModal = ({ openModal, handleClose, orderNumber, order }) => {
	const dispatch = useDispatch();

	const handleMarkAsPaid = async () => {
		await dispatch(
			markInvoiceAsPaid(order.paymentInformation.invoicePaymentDetails.id, order._id)
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
				<DialogTitle>
					Are you sure you want to mark order #{orderNumber} as paid?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Marking the invoice as paid will finalize the invoice.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						No
					</Button>
					<Button color="primary" onClick={handleMarkAsPaid}>
						Mark as Paid
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default MarkPaidModal;
