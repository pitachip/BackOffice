//libs
import React, { useEffect, useState } from "react";
import { auth } from "./apis/firebase";
//import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
//app components
import PrivateRoute from "./utils/privateRoute";
import LoginContainer from "./components/auth/auth-components/loginContainer";
import AppLayout from "./components/layout/layout-components/appLayout";
//actions
import { testapi } from "./actions";
import "./App.css";

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const authAttempt = async () => {
			auth.onAuthStateChanged((user) => {
				console.log(user);
				if (user) {
					setIsAuthenticated(true);
					setIsLoading(false);
				} else {
					setIsLoading(false);
					setIsAuthenticated(false);
				}
			});
		};

		authAttempt();
	});

	return (
		<div>
			<Router>
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

/**
 * App
 *   <Router>
 * 		<Switch>
 * 			<Route comp=signin>
 * 			<PrivateRoute comp=appLayout> --> switch in there too
 * 		<Switch>
 *   <Router>
 */
