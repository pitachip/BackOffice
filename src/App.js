import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { testapi } from "./actions";
import "./App.css";

const App = () => {
	const dispatch = useDispatch();

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to slow reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button onClick={() => dispatch(testapi())}>Test API</button>
			</header>
		</div>
	);
};

export default App;
