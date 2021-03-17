import { combineReducers } from "redux";
import authReducer from "./auth";
import orderReducer from "./order";
import userReducer from "./user";

export default combineReducers({
	auth: authReducer,
	order: orderReducer,
	user: userReducer,
});
