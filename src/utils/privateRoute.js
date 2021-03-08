//libs
import React from "react";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({
	component: Component,
	isAuthenticated,
	isLoading,
	...props
}) => {
	if ((isLoading && !isAuthenticated) || (isAuthenticated && isLoading)) {
		return <div>Loading...</div>;
	} else if (!isLoading && !isAuthenticated) {
		return <Redirect to="/login" />;
	} else if (!isLoading && isAuthenticated) {
		return <Component {...props} />;
	}
};

export default PrivateRoute;
