//libs
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "material-ui-search-bar";
//ui components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
//app components
import UserActions from "./userActions";
//actions
import { getUsers, searchForUser } from "../../../actions";
//styles
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: "10px",
	},
}));

const UserTable = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (searchTerm === "") {
			dispatch(getUsers(page, limit));
		}
	}, [searchTerm]);

	const handlePageChange = async (event, page) => {
		await dispatch(getUsers(page + 1, limit));
		setPage(page);
	};

	const handleRowsPerPageChange = async (event) => {
		await dispatch(getUsers(1, event.target.value));
		setLimit(event.target.value);
		setPage(0);
	};

	const handleSearchForUser = async () => {
		setPage(0);
		if (searchTerm === "") {
			await dispatch(getUsers(page, limit));
		} else {
			await dispatch(searchForUser(searchTerm, 1, limit));
		}
	};

	return (
		<Paper className={classes.paper}>
			<SearchBar
				value={searchTerm}
				onChange={(newValue) => setSearchTerm(newValue)}
				onRequestSearch={() => handleSearchForUser()}
				onCancelSearch={() => setSearchTerm("")}
				placeholder="Search for user by email"
			/>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Disabled</TableCell>
							<TableCell>ID</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.users.map((user) => (
							<TableRow key={user._id}>
								<TableCell>{`${user.metaData.firstName} ${user.metaData.lastName}`}</TableCell>
								<TableCell>{user.metaData.email}</TableCell>
								<TableCell>{user.disabled ? "Yes" : "No"}</TableCell>
								<TableCell>{user.firebaseUserId}</TableCell>
								<TableCell>
									<UserActions user={user} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={user.pagination.totalItems}
				rowsPerPageOptions={[5, 10, 25]}
				page={page}
				rowsPerPage={user.pagination.limit}
				onChangePage={handlePageChange}
				onChangeRowsPerPage={handleRowsPerPageChange}
			/>
		</Paper>
	);
};

export default UserTable;
