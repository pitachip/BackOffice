const INITIAL_STATE = {
	orders: [],
	pagination: {},
	locations: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_ORDER_HISTORY":
			return {
				...state,
				orders: action.payload.orders,
				pagination: action.payload.pagination,
			};
		case "SET_STORE_INFORMATION":
			return { ...state, locations: action.payload };
		case "persist/PURGE":
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default orderReducer;
