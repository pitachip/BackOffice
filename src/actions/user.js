import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const getUsers = (page, limit) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const users = await pitachip.get(`/user?page=${page}&limit=${limit}`, {
			headers: { Authorization: `Bearer ${userToken.token}` },
		});
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

export const searchForUser = (email, page, limit) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const user = await pitachip.get(
			`/user?metaData.email=${email}&page=${page}&limit=${limit}`,
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		dispatch({
			type: "SET_USERS",
			payload: {
				users: user.data,
				pagination: user.pagination,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const getUserRoles = (uid) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const user = await pitachip.get(`/auth/roles/${uid}`, {
			headers: { Authorization: `Bearer ${userToken.token}` },
		});

		dispatch({ type: "SET_USER_TO_EDIT", payload: user.data });
	} catch (error) {
		console.log(error);
	}
};

export const updateUserRoles = (uid, role) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const updateUser = await pitachip.put(
			"/auth/updateroles",
			{
				uid: uid,
				role: role,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
	} catch (error) {
		console.log(error);
	}
};

export const clearUserToEdit = () => (dispatch) => {
	dispatch({ type: "SET_USER_TO_EDIT", payload: {} });
};
