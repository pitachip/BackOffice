//libs
import { useState } from "react";
//ui components
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//app components
import AddUserModal from "../user-modals/addUserModal";
//styles
const useStyles = makeStyles((theme) => ({
	button: {
		marginBottom: "15px",
	},
}));

const AddUserButton = () => {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState(false);

	const handleAddUserModalOpen = () => {
		setOpenModal(true);
	};

	const handleAddUserModalClose = () => {
		setOpenModal(false);
	};
	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleAddUserModalOpen}
				className={classes.button}
			>
				Add User
			</Button>
			<AddUserModal
				openModal={openModal}
				handleClose={handleAddUserModalClose}
			/>
		</div>
	);
};

export default AddUserButton;
