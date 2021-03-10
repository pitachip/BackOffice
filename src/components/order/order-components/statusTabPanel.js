//libs
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import Box from "@material-ui/core/Box";
//app components
import OrderTable from "./orderTable";
//actions
import { getOrders } from "../../../actions";

const StatusTabPanel = ({ children, value, index, querystring }) => {
	const dispatch = useDispatch();
	const orderHistory = useSelector((state) => state.order);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (value === index) {
			dispatch(getOrders(1, querystring));
			setLoading(false);
		}
	}, [dispatch, index, querystring, value]);

	return (
		<div role="tabpanel" hidden={value !== index}>
			{value === index && (
				<Box p={3}>
					<OrderTable orderHistory={orderHistory} loading={loading} />
				</Box>
			)}
		</div>
	);
};

export default StatusTabPanel;
