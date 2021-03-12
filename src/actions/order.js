import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const getOrders = (page, filter, limit) => async (dispatch) => {
	try {
		let queryFilter = filter;
		if (!queryFilter) {
			queryFilter = "";
		}
		const userToken = await getUserToken();
		const orderHistory = await pitachip.get(
			`/specialorder?sort=-createdAt&page=${page}&${queryFilter}&limit=${limit}`,
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

export const updateOrder = (order) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const modifySpecialOrder = await pitachip.put(
			`/specialorder/${order._id}`,
			{
				modifiedOrder: order,
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
