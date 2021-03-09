//libs
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
//ui components
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//actions
import { logout } from "../../../actions";
//styles
const useStyles = makeStyles((theme) => ({
	button: {
		color: "white",
	},
}));

const AccountDropdown = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await dispatch(logout());
	};

	return (
		<div>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				className={classes.button}
				startIcon={<AccountCircleIcon />}
			>
				{`Hello, ${auth.metaData.firstName}`}
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export default AccountDropdown;
