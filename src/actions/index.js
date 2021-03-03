import pitachip from "../apis/pitachip";

export const testapi = () => async (dispatch) => {
	const response = await pitachip.get();
	console.log(response);
};
