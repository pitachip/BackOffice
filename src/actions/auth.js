import { auth } from "../apis/firebase";
import pitachip from "../apis/pitachip";
import { getUserToken, isAuthorized } from "../utils/authUtils";
import { history } from "../utils/history";

export const signInWithEmailAndPassword = (email, password) => async (
	dispatch
) => {
	try {
		let metaData = {};

		const signInAttempt = await auth.signInWithEmailAndPassword(
			email,
			password
		);

		const userAuthorized = await isAuthorized();

		if (signInAttempt && userAuthorized) {
			const userToken = await getUserToken();
			const userMetaData = await pitachip.get("/user/", {
				headers: { Authorization: `Bearer ${userToken.token}` },
			});
			metaData = userMetaData.data.metaData;
			history.push("/");
		}
		dispatch({
			type: "SET_USER",
			payload: {
				user: signInAttempt.user,
				metaData: metaData,
				authLoading: false,
				message: "",
				showAuthMessage: false,
			},
		});
	} catch (error) {
		const errorMessage = createErrorMessage(error.code);

		dispatch({
			type: "SET_AUTH_MESSAGE",
			payload: {
				message: errorMessage,
				showAuthMessage: true,
			},
		});
	}
};

export const closeAuthMessage = () => (dispatch) => {
	dispatch({
		type: "SET_AUTH_MESSAGE",
		payload: {
			message: "",
			showAuthMessage: false,
		},
	});
};

/**TODO: Look into create a file for all the default error messages */
const createErrorMessage = (errorCode) => {
	switch (errorCode) {
		case "auth/email-already-exists":
			return "An account already exists with this email";
		case "auth/wrong-password":
			return "Invalid credentials entered, try again.";
		case "auth/user-not-found":
			return "Account not found. Make sure your email is correct.";
		case "auth/user-disabled":
			return "Too many sign-in attempts. Your account has been temporarily disabled. You can reset it by using the 'Forgot Password' tool or contacting the site administrator (info@pitachipphilly.com)";
		case "auth/too-many-requests":
			return "Too many sign-in attempts. Your account has been temporarily disabled. You can reset it by using the 'Forgot Password' tool or contacting the site administrator (info@pitachipphilly.com)";
		default:
			return "Authentication error, try again.";
	}
};
