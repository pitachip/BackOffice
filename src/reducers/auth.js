const INITIAL_STATE = {
	user: null,
	metaData: {
		firstname: "",
		lastName: "",
	},
	authLoading: true,
	authForm: "",
	showAuthMessage: false,
	authMessage: "",
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
			};
		default:
			return state;
	}
};

export default authReducer;
