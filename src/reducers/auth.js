const INITIAL_STATE = {
	user: null,
	metaData: {
		firstname: "",
		lastName: "",
	},
	authLoading: true,
	showAuthMessage: false,
	authMessage: "",
	severity: "success",
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload.user,
				metaData: action.payload.metaData,
				authLoading: action.payload.authLoading,
				authMessage: action.payload.errorMessage,
				showAuthMessage: action.payload.errorMessage,
			};
		case "SET_AUTH_MESSAGE":
			return {
				...state,
				authMessage: action.payload.message,
				showAuthMessage: action.payload.showAuthMessage,
				severity: action.payload.severity,
			};
		default:
			return state;
	}
};

export default authReducer;
