const INITIAL_STATE = {
	users: [],
	pagination: {
		totalItems: 0,
		limit: 0,
	},
	userToEdit: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_USERS":
			return {
				...state,
				users: action.payload.users,
				pagination: action.payload.pagination,
			};
		case "SET_USER_TO_EDIT":
			return { ...state, userToEdit: action.payload };
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default userReducer;
