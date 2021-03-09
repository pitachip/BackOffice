//libs
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
//actions
import { getOrders } from "../../../actions";

const StatusTabPanel = ({ children, value, index, querystring }) => {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.order);

	/**
	 * TODO
	 * load the data based on the
	 * query string that is passed in and then pass that data to a table
	 */
	useEffect(() => {
		if (value === index) {
			dispatch(getOrders(1, querystring));
		}
	}, [value]);

	return (
		<div role="tabpanel" hidden={value !== index}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

export default StatusTabPanel;
