//libs
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
//actions
import { updateOrder, getStoreInformation } from "../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FulfillmentDetailsModal = ({
	openModal,
	handleClose,
	orderNumber,
	order,
}) => {
	const dispatch = useDispatch();
	const locations = useSelector((state) => state.order.locations);
	const [location, setLocation] = useState("");
	const [deliveredBy, setDeliveredBy] = useState("");

	useEffect(() => {
		dispatch(getStoreInformation());
		setLocation(order.orderDetails.fulfilledBy);
		setDeliveredBy(order.orderDetails.deliveredBy);
	}, []);

	const handleUpdateFulfillmentDetails = async () => {
		order.orderDetails.fulfilledBy = location;
		order.orderDetails.deliveredBy = deliveredBy;
		await dispatch(updateOrder(order, false));
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
					Update fulfillment details for order #{orderNumber}
				</DialogTitle>
				<DialogContent>
					<FormControl fullWidth>
						<InputLabel>Store to fulfill order</InputLabel>
						<Select
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						>
							{locations.map((location) => (
								<MenuItem key={location.storeName} value={location.storeName}>
									{location.storeName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							label="Delivered By"
							name="deliveredBy"
							value={deliveredBy}
							onChange={(e) => setDeliveredBy(e.target.value)}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleUpdateFulfillmentDetails} color="primary">
						Update Fulfillment Details
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default FulfillmentDetailsModal;
