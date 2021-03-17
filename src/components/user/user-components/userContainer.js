//ui components
import { Box, Typography } from "@material-ui/core";
//app components
import UserTable from "./userTable";

const UserContainer = () => {
	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				Users
			</Typography>
			<UserTable />
		</Box>
	);
};

export default UserContainer;
