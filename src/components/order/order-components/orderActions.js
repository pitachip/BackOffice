//libs
import { useState } from "react";
//ui components
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//app components
import ConfirmOrderModal from "../order-modals/confirmOrderModal";
import CancelOrderModal from "../order-modals/cancelOrderModal";
import MarkPaidModal from "../order-modals/markPaidModal";
import CompleteOrderModal from "../order-modals/completeOrderModal";

const OrderActions = ({ order }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [openCancelOrderModal, setCancelOrderModal] = useState(false);
	const [openMarkPaidModal, setMarkPaidModal] = useState(false);
	const [openCompleteOrderModal, setCompleteOrderModal] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleViewOrder = () => {
		window.open(process.env.REACT_APP_SPECIALORDER_URL + "/view/" + order._id);
	};

	const handleModifyOrder = () => {
		window.open(
			process.env.REACT_APP_SPECIALORDER_URL + "/modify/" + order._id
		);
	};

	const handleConfirmModalOpen = () => {
		setOpenModal(true);
	};

	const handleConfirmModalClose = () => {
		setOpenModal(false);
	};

	const handleCancelOrderModalOpen = () => {
		setCancelOrderModal(true);
	};

	const handleCancelOrderModalClose = () => {
		setCancelOrderModal(false);
	};

	const handleMarkOrderPaidModalOpen = () => {
		setMarkPaidModal(true);
	};

	const handleMarkOrderPaidModalClose = () => {
		setMarkPaidModal(false);
	};

	const handleCompleteOrderModalOpen = () => {
		setCompleteOrderModal(true);
	};

	const handleCompleteOrderModalClosed = () => {
		setCompleteOrderModal(false);
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				variant="outlined"
				endIcon={<ExpandMoreIcon />}
			>
				Order Actions
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{/**Confirm Order */}
				{order.status === "Submitted" ? (
					<MenuItem onClick={handleConfirmModalOpen}>Confirm Order</MenuItem>
				) : null}
				{/**Complete Order */}
				{order.status !== "Submitted" &&
				order.status !== "Completed" &&
				order.status !== "Cancelled" ? (
					<MenuItem onClick={handleCompleteOrderModalOpen}>
						Complete Order
					</MenuItem>
				) : null}
				{/**View Order */}
				<MenuItem onClick={handleViewOrder}>View/Print Order</MenuItem>
				{/**Modify Order */}
				{order.status !== "Completed" && order.status !== "Cancelled" ? (
					<MenuItem onClick={handleModifyOrder}>Modify Order</MenuItem>
				) : null}
				{/**Cancel order */}
				{order.status !== "Completed" && order.status !== "Cancelled" ? (
					<MenuItem onClick={handleCancelOrderModalOpen}>Cancel Order</MenuItem>
				) : null}
				{/**Add PO# */}
				{order.paymentInformation.purchaseOrder &&
				order.paymentInformation.purchaseOrderNumber === "" ? (
					<MenuItem onClick={handleModifyOrder}>Add PO#</MenuItem>
				) : null}
				{/**Mark Invoice as Paid */}
				{order.paymentInformation.paymentStatus === "Pending" ? (
					<MenuItem onClick={handleMarkOrderPaidModalOpen}>
						Mark as Paid
					</MenuItem>
				) : null}
			</Menu>
			<ConfirmOrderModal
				openModal={openModal}
				handleClose={handleConfirmModalClose}
				orderNumber={order.orderNumber}
				order={order}
			/>
			<CancelOrderModal
				openModal={openCancelOrderModal}
				handleClose={handleCancelOrderModalClose}
				orderNumber={order.orderNumber}
				order={order}
			/>
			<MarkPaidModal
				openModal={openMarkPaidModal}
				handleClose={handleMarkOrderPaidModalClose}
				orderNumber={order.orderNumber}
				order={order}
			/>
			<CompleteOrderModal
				openModal={openCompleteOrderModal}
				handleClose={handleCompleteOrderModalClosed}
				orderNumber={order.orderNumber}
				order={order}
			/>
		</div>
	);
};

export default OrderActions;
