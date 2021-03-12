//libs
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
//app components
import OrderTable from "./orderTable";
//actions
import { getOrders } from "../../../actions";

const StatusTabPanel = ({ children, value, index, querystring }) => {
	const dispatch = useDispatch();
	const orderHistory = useSelector((state) => state.order);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);

	useEffect(() => {
		const getInitalOrders = async () => {
			if (value === index) {
				setLoading(true);
				await dispatch(getOrders(1, querystring, limit));
				setLoading(false);
				setPage(0);
			}
		};
		getInitalOrders();
	}, [dispatch, index, querystring, value, limit]);

	const handlePageChange = async (event, page) => {
		setLoading(true);
		await dispatch(getOrders(page + 1, querystring, limit));
		setPage(page);
		setLoading(false);
	};

	const handleRowsPerPageChange = async (event) => {
		setLoading(true);
		await dispatch(getOrders(1, querystring, event.target.value));
		setLimit(event.target.value);
		setPage(0);
		setLoading(false);
	};

	const handleTableRefresh = async () => {
		setLoading(true);
		await dispatch(getOrders(1, querystring, limit));
		setLoading(false);
	};

	return loading ? (
		<div hidden={value !== index}>
			<Box p={10}>
				<CircularProgress />
			</Box>
		</div>
	) : (
		<div role="tabpanel" hidden={value !== index}>
			{value === index && (
				<Box p={3}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleTableRefresh}
						endIcon={<RefreshIcon />}
					>
						Refresh Orders
					</Button>
					<OrderTable
						orderHistory={orderHistory}
						loading={loading}
						handlePageChange={handlePageChange}
						page={page}
						handleRowsPerPageChange={handleRowsPerPageChange}
					/>
				</Box>
			)}
		</div>
	);
};

export default StatusTabPanel;
