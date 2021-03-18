import { auth } from "../apis/firebase";

export const isAuthorized = async () => {
	let isAuthorized = false;
	const roles = await auth.currentUser.getIdTokenResult();
	if (roles.claims.admin || roles.claims.manager) {
		isAuthorized = true;
	}
	return isAuthorized;
};

export const isAuthorizedAdmin = async () => {
	let isAuthorizedAdmin = false;
	const roles = await auth.currentUser.getIdTokenResult();
	if (roles.claims.admin) {
		isAuthorizedAdmin = true;
	}
	return isAuthorizedAdmin;
};

export const getUserToken = async () => {
	let userToken = { success: false, token: "" };
	try {
		const tokenResponse = await auth.currentUser.getIdToken(true);
		userToken = { success: true, token: tokenResponse };
	} catch (error) {
		userToken = { success: false, token: "" };
	}
	return userToken;
};
