//libs
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
//ui components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//app components
import OrderActions from "./orderActions";

const useStyles = makeStyles({
	poWarning: {
		color: "red",
		margin: 0,
	},
	descriptionText: {
		color: "darkGrey",
		margin: 0,
	},
});

const OrderTable = ({
	orderHistory,
	handlePageChange,
	page,
	handleRowsPerPageChange,
}) => {
	const classes = useStyles();

	const renderPaymentType = (paymentType, purchaseOrder) => {
		switch (paymentType) {
			case "cc":
				return "Credit Card";
			case "check":
				if (purchaseOrder) {
					return "Purchase Order";
				} else return "Check";
			case "univ":
				return "University Money Account";
			default:
				return "N/A";
		}
	};

	const renderPurchaseOrderNumber = (paymentInformation) => {
		if (paymentInformation.purchaseOrder) {
			if (paymentInformation.purchaseOrderNumber !== "") {
				return (
					<p className={classes.descriptionText}>
						#{paymentInformation.purchaseOrderNumber}
					</p>
				);
			} else {
				return <p className={classes.poWarning}>Purchase Order Needed</p>;
			}
		}
	};

	const renderPickupLocation = (orderDetails) => {
		return <p className={classes.descriptionText}>{orderDetails.location}</p>;
	};

	const renderDeliveryAddress = (deliveryInformation) => {
		const {
			address1,
			address2,
			city,
			state,
			zip,
			deliveryInstructions,
		} = deliveryInformation;
		return (
			<>
				<p className={classes.descriptionText}>
					{address1} {address2} {city}, {state} {zip}
				</p>
				<p className={classes.descriptionText}>{deliveryInstructions}</p>
			</>
		);
	};

	const renderOrderDate = (orderDate) => {
		let formattedDate = "";
		let formatOptions = {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		formattedDate = new Date(orderDate).toLocaleDateString(
			"en-US",
			formatOptions
		);
		return formattedDate;
	};

	const renderDropOffTime = (time) => {
		return moment(time).format("hh:mmA");
	};

	const renderPickUpTime = (time) => {
		return moment(time).subtract(30, "minutes").format("hh:mmA");
	};

	const renderNumberOfItems = (orderItems) => {
		let numberOfItems = 0;
		orderItems.map((item) => {
			return (numberOfItems += item.quantity);
		});
		return numberOfItems;
	};

	return (
		<>
			<TableContainer className={classes.table} component={Paper}>
				<Table style={{ width: "3000px", tableLayout: "auto" }}>
					<TableHead>
						<TableRow>
							<TableCell>Order #</TableCell>
							<TableCell>Delivery Date</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Customer</TableCell>
							<TableCell>Payment Method</TableCell>
							<TableCell>Payment Status</TableCell>
							<TableCell>Number of Items</TableCell>
							<TableCell>Delivery Method</TableCell>
							<TableCell>Pick Up</TableCell>
							<TableCell>Drop Off</TableCell>
							<TableCell>Fulfilled By</TableCell>
							<TableCell>Delivered By</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orderHistory.orders.map((order) => (
							<TableRow key={order._id}>
								<TableCell width="1%">#{order.orderNumber}</TableCell>
								<TableCell width="5%">
									{renderOrderDate(order.orderDetails.orderDate)}
								</TableCell>
								<TableCell width="2%">{order.status}</TableCell>
								<TableCell width="5%">
									{order.customerInformation.firstName}{" "}
									{order.customerInformation.lastName}
								</TableCell>
								<TableCell width="5%">
									<Grid container>
										<Grid item xs={12}>
											{renderPaymentType(
												order.paymentInformation.paymentType,
												order.paymentInformation.purchaseOrder
											)}
										</Grid>
										<Grid item xs={12}>
											{renderPurchaseOrderNumber(order.paymentInformation)}
										</Grid>
									</Grid>
								</TableCell>
								<TableCell width="2%">
									{order.paymentInformation.paymentStatus}
								</TableCell>
								<TableCell width="2%">
									{renderNumberOfItems(order.orderItems)}
								</TableCell>
								<TableCell width="5%">
									<Grid container>
										<Grid item xs={12}>
											{order.orderDetails.shippingMethod}
										</Grid>
										<Grid item xs={12}>
											{order.orderDetails.shippingMethod === "pickup"
												? renderPickupLocation(order.orderDetails)
												: renderDeliveryAddress(order.deliveryInformation)}
										</Grid>
									</Grid>
								</TableCell>
								<TableCell width="2%">
									{renderPickUpTime(order.orderDetails.orderDate)}
								</TableCell>
								<TableCell width="2%">
									{renderDropOffTime(order.orderDetails.orderDate)}
								</TableCell>
								<TableCell width="3%">
									{order.orderDetails.fulfilledBy}
								</TableCell>
								<TableCell width="3%">
									{order.orderDetails.deliveredBy}
								</TableCell>
								<TableCell width="2%">
									<OrderActions order={order} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={orderHistory.pagination.totalItems}
				rowsPerPageOptions={[5, 10, 25]}
				page={page}
				rowsPerPage={orderHistory.pagination.limit}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleRowsPerPageChange}
			/>
		</>
	);
};

export default OrderTable;
