//libs
import { makeStyles } from "@material-ui/core/styles";
//ui components
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
//styles
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const roles = ["admin", "manager", "employee", "customer"];

const UserRolesDropdown = ({ userRoles, handleChange }) => {
	const classes = useStyles();

	return (
		<FormControl className={classes.formControl} fullWidth>
			<InputLabel>User Roles</InputLabel>
			<Select
				multiple
				value={userRoles}
				onChange={handleChange}
				input={<Input />}
				MenuProps={MenuProps}
			>
				{roles.map((role) => (
					<MenuItem key={role} value={role}>
						{role}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default UserRolesDropdown;
