//libs
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//ui components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
//actions
import { getUsers } from "../../../actions";

const UserTable = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(5);

	useEffect(() => {
		dispatch(getUsers(page, limit));
	}, []);

	const handlePageChange = async (event, page) => {
		await dispatch(getUsers(page + 1, limit));
		setPage(page);
	};

	const handleRowsPerPageChange = async (event) => {
		await dispatch(getUsers(1, event.target.value));
		setLimit(event.target.value);
		setPage(0);
	};

	return (
		<Paper>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Active</TableCell>
							<TableCell>ID</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.users.map((user) => (
							<TableRow key={user._id}>
								<TableCell>{`${user.metaData.firstName} ${user.metaData.lastName}`}</TableCell>
								<TableCell>{user.metaData.email}</TableCell>
								<TableCell>{user.active ? "Yes" : "No"}</TableCell>
								<TableCell>{user.firebaseUserId}</TableCell>
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
