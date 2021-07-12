import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";
import filter from "lodash/filter";

export const getOrders = (page, filter, limit) => async (dispatch) => {
	try {
		let queryFilter = filter;
		if (!queryFilter) {
			queryFilter = "";
		}
		const userToken = await getUserToken();
		const orderHistory = await pitachip.get(
			`/specialorder?page=${page}&${queryFilter}&limit=${limit}`,
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		dispatch({
			type: "SET_ORDER_HISTORY",
			payload: {
				orders: orderHistory.data,
				pagination: orderHistory.pagination,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateOrder = (order, sendEmail) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const modifySpecialOrder = await pitachip.put(
			`/specialorder/${order._id}`,
			{
				modifiedOrder: order,
				sendEmail,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return modifySpecialOrder;
	} catch (error) {
		console.log(error);
	}
};

export const cancelOrder = (orderId, paymentStatus) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const cancelSpecialOrder = await pitachip.delete(
			`/specialorder/${orderId}`,
			{
				headers: {
					Authorization: `Bearer ${userToken.token}`,
				},
				data: {
					paymentStatus: paymentStatus,
				},
			}
		);
		return cancelSpecialOrder;
	} catch (error) {
		return error;
	}
};

export const getStoreInformation = () => async (dispatch) => {
	let response = await pitachip.get("/config");
	response = filter(response.data, { type: "storeInformation" });
	dispatch({ type: "SET_STORE_INFORMATION", payload: response[0].locations });
};
