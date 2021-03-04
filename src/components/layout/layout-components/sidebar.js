//libs
import React from "react";
import { Link } from "react-router-dom";
//ui components
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import List from "@material-ui/core/List";

const SideBar = () => {
	return (
		<div>
			<List>
				<ListItem button component={Link} to="/orders">
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="Orders" />
				</ListItem>
				<ListItem button component={Link} to="/users">
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Users" />
				</ListItem>
			</List>
		</div>
	);
};

export default SideBar;
