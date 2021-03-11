//libs
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";
//ui components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
//app components
import OrderActions from "./orderActions";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const OrderTable = ({
	orderHistory,
	loading,
	handlePageChange,
	page,
	handleRowsPerPageChange,
}) => {
	const classes = useStyles();

	console.log(orderHistory.pagination);

	const renderPaymentType = (paymentType) => {
		switch (paymentType) {
			case "cc":
				return "Credit Card";
			case "check":
				return "Check";
			case "univ":
				return "University Money Account";
			default:
				return "N/A";
		}
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

	return (
		<Paper>
			<TableContainer>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Order #</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Total</TableCell>
							<TableCell>Payment Method</TableCell>
							<TableCell>Delivery Date</TableCell>
							<TableCell>Delivery Method</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orderHistory.orders.map((order) => (
							<TableRow key={order._id}>
								<TableCell>#{order.orderNumber}</TableCell>
								<TableCell>{order.status}</TableCell>
								<TableCell>
									<NumberFormat
										value={order.orderTotals.total}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
										decimalScale={2}
										fixedDecimalScale="true"
									/>
								</TableCell>
								<TableCell>
									{renderPaymentType(order.paymentInformation.paymentType)}
								</TableCell>
								<TableCell>
									{renderOrderDate(order.orderDetails.orderDate)}
								</TableCell>
								<TableCell>{order.orderDetails.shippingMethod}</TableCell>
								<TableCell>
									<OrderActions />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={orderHistory.pagination.totalOrders}
				rowsPerPageOptions={[5, 10, 25]}
				page={page}
				rowsPerPage={orderHistory.pagination.limit}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleRowsPerPageChange}
			/>
		</Paper>
	);
};

export default OrderTable;
