import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const getUsers = (page, limit) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const users = await pitachip.get(`/user?page=${page}&limit=${limit}`, {
			headers: { Authorization: `Bearer ${userToken.token}` },
		});

		console.log(users);
		dispatch({
			type: "SET_USERS",
			payload: {
				users: users.data,
				pagination: users.pagination,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
