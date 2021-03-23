//libs
import React from "react";
//ui components
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const ToggleUserAccess = ({ disabled, handleChange }) => {
	return (
		<FormControl component="fieldset" fullWidth>
			<FormLabel component="legend">Toggle user's access</FormLabel>
			<RadioGroup name="toggle" value={disabled} onChange={handleChange}>
				<FormControlLabel value="Yes" control={<Radio />} label="Disabled" />
				<FormControlLabel value="No" control={<Radio />} label="Enabled" />
			</RadioGroup>
		</FormControl>
	);
};

export default ToggleUserAccess;
