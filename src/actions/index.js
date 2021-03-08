import pitachip from "../apis/pitachip";
export * from "./auth";

export const testapi = () => async (dispatch) => {
	const response = await pitachip.get();
	console.log(response);
};
