//libs
import { useState } from "react";
//ui components
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//app components
import ConfirmOrderModal from "../order-modals/confirmOrderModal";

const OrderActions = ({ order }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openModal, setOpenModal] = useState(false);

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
				{/**View Order */}
				<MenuItem onClick={handleViewOrder}>View/Print Order</MenuItem>
				{/**Modify Order */}
				{order.status !== "Completed" && order.status !== "Cancelled" ? (
					<MenuItem onClick={handleModifyOrder}>Modify Order</MenuItem>
				) : null}
				{/**Cancel order */}
				{order.status !== "Completed" && order.status !== "Cancelled" ? (
					<MenuItem>Cancel Order</MenuItem>
				) : null}
				{/**Add PO# */}
				{/**Only if order is not in Completed or Cancelled status */}
				<MenuItem>Add PO#</MenuItem> {/**If applicable */}
			</Menu>
			<ConfirmOrderModal
				openModal={openModal}
				handleClose={handleConfirmModalClose}
				orderNumber={order.orderNumber}
				order={order}
			/>
		</div>
	);
};

export default OrderActions;
