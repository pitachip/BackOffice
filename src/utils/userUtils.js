import { each } from "lodash";

/**
 * Format the roles so that it is in
 * the object format that is needed
 * for firebase
 */
export const formatRoles = (rolesArray) => {
	let customClaims = {
		customer: false,
		employee: false,
		manager: false,
		admin: false,
	};

	each(rolesArray, (role) => {
		if (role === "customer") {
			customClaims.customer = true;
		} else if (role === "employee") {
			customClaims.employee = true;
		} else if (role === "manager") {
			customClaims.manager = true;
		} else if (role === "admin") {
			customClaims.admin = true;
		}
	});

	return customClaims;
};
