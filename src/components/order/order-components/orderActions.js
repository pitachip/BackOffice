//libs
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//ui components
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//styles
const useStyles = makeStyles((theme) => ({
	button: {
		color: "black",
	},
}));

const OrderActions = () => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				onClick={handleClick}
				variant="outlined"
				endIcon={<ExpandMoreIcon />}
			>
				Order Actions
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem>Confirm Order</MenuItem>{" "}
				{/**Only for order in "Submitted Status" */}
				<MenuItem>View Order</MenuItem>
				<MenuItem>Modify Order</MenuItem>{" "}
				{/**Only if order is not in Completed or Cancelled status */}
				<MenuItem>Add PO#</MenuItem> {/**If applicable */}
				<MenuItem>Print Order</MenuItem>
			</Menu>
		</div>
	);
};

export default OrderActions;
