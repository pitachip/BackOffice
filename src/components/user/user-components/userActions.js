//libs
import { useState } from "react";
//ui components
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//app components
import UpdateUserModal from "../user-modals/updateUserModal";

const UserActions = ({ user }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openUpdateUserModal, setUpdateUserModal] = useState(false);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleUpdateUserModalOpen = () => {
		setUpdateUserModal(true);
	};

	const handleUpdateUserModalClose = () => {
		setUpdateUserModal(false);
	};

	return (
		<div>
			<IconButton edge="end" color="inherit" onClick={handleMenuClick}>
				<MoreIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				transformOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<MenuItem onClick={handleUpdateUserModalOpen}>Update Roles</MenuItem>
				<MenuItem disabled>Disable User</MenuItem>
			</Menu>
			<UpdateUserModal
				openModal={openUpdateUserModal}
				handleClose={handleUpdateUserModalClose}
				user={user}
			/>
		</div>
	);
};

export default UserActions;
