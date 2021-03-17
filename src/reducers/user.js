const INITIAL_STATE = {
	users: [],
	pagination: {
		totalItems: 0,
		limit: 0,
	},
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_USERS":
			return {
				...state,
				users: action.payload.users,
				pagination: action.payload.pagination,
			};
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default userReducer;
