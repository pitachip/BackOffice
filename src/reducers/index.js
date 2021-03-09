import { combineReducers } from "redux";
import authReducer from "./auth";
import orderReducer from "./order";

export default combineReducers({
	auth: authReducer,
	order: orderReducer,
});
