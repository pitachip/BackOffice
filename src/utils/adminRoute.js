//libs
import React from "react";
import { Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, isAdmin, isLoading, ...props }) => {
	if ((isLoading && !isAdmin) || (isAdmin && isLoading)) {
		return <div>Loading...</div>;
	} else if (!isLoading && !isAdmin) {
		return <div>Not Authorized to View this Page</div>;
	} else if (!isLoading && isAdmin) {
		return <Component {...props} />;
	}
};

export default AdminRoute;
