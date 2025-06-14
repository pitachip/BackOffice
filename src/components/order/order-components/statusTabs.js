//libs
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//ui components
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//app components
import TabPanel from "./statusTabPanel";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

const StatusTabs = () => {
	/**
	 * Come up with a better way to
	 * render the tabs. Its a little redudant right now
	 * and over renders
	 */
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<Typography variant="h4" gutterBottom>
				Special Orders
			</Typography>
			<Paper className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Submitted" />
					<Tab label="In Progress" />
					<Tab label="Completed" />
					<Tab label="Cancelled" />
					<Tab label="All" />
				</Tabs>
				<TabPanel
					value={value}
					index={0}
					querystring="status=Submitted&sort=orderDetails.orderDate"
				>
					Submitted Orders
				</TabPanel>
				<TabPanel
					value={value}
					index={1}
					querystring="status=Confirmed&status=Scheduled For Delivery&sort=orderDetails.orderDate"
				>
					In Progress Orders
				</TabPanel>
				<TabPanel
					value={value}
					index={2}
					querystring="status=Completed&sort=-orderDetails.orderDate"
				>
					Completed Order
				</TabPanel>
				<TabPanel
					value={value}
					index={3}
					querystring="status=Cancelled&sort=-orderDetails.orderDate"
				>
					Cancelled Orders
				</TabPanel>
				<TabPanel
					value={value}
					index={4}
					querystring="&sort=-orderDetails.orderDate"
				>
					All Orders
				</TabPanel>
			</Paper>
		</div>
	);
};

export default StatusTabs;

/**
 *
 */
