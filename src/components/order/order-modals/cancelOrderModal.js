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
import { refundCreditCard, cancelOrder, voidInvoice } from "../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CancelOrderModal = ({ openModal, handleClose, orderNumber, order }) => {
	const dispatch = useDispatch();

	const handleCancelOrder = async () => {
		const { paymentInformation, _id } = order;
		if (paymentInformation.paymentType === "cc") {
			await dispatch(
				refundCreditCard(
					paymentInformation.creditCardPaymentDetails.id,
					paymentInformation.creditCardPaymentDetails.amount
				)
			);
			await dispatch(cancelOrder(_id, "Refunded"));
		} else {
			await dispatch(voidInvoice(paymentInformation.invoicePaymentDetails.id));
			await dispatch(cancelOrder(_id, "Invoice Voided"));
		}
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
					Are you sure you want to cancel order #{orderNumber}?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Canceling the order will refund the customer's credit card or void
						the invoice.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						No
					</Button>
					<Button onClick={handleCancelOrder} color="primary">
						Cancel Order
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default CancelOrderModal;
