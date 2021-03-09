//libs
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./apis/firebase";
import { Router, Switch, Route, Redirect } from "react-router-dom";
//app components
import PrivateRoute from "./utils/privateRoute";
import LoginContainer from "./components/auth/auth-components/loginContainer";
import AppLayout from "./components/layout/layout-components/appLayout";
//actions
import { authStateChanged } from "./actions";
//utils
import { isAuthorized } from "./utils/authUtils";
import { history } from "./utils/history";
import "./App.css";

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			let userAuthorized = user ? await isAuthorized() : false;
			if (user && userAuthorized) {
				setIsAuthenticated(true);
				setIsLoading(false);
				dispatch(authStateChanged(user));
			} else {
				setIsLoading(false);
				setIsAuthenticated(false);
			}
		});
	}, [dispatch]);

	return (
		<div>
			<Router history={history}>
				<Switch>
					<PrivateRoute
						path="/orders"
						exact
						component={AppLayout}
						isAuthenticated={isAuthenticated}
						isLoading={isLoading}
					/>
					<PrivateRoute
						path="/users"
						exact
						component={AppLayout}
						isAuthenticated={isAuthenticated}
						isLoading={isLoading}
					/>
					<Route path="/login" exact component={LoginContainer} />
					<Redirect exact path="/" to="/orders" />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
