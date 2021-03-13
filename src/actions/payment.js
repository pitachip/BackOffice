import pitachip from "../apis/pitachip";
import { getUserToken } from "../utils/authUtils";

export const refundCreditCard = (paymentIntentId, amount) => async (
	dispatch
) => {
	try {
		const userToken = await getUserToken();
		const refundCreditCard = await pitachip.post(
			"/payment/refund/creditcard",
			{
				paymentIntentId: paymentIntentId,
				amount,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return refundCreditCard;
	} catch (error) {
		return error;
	}
};

export const voidInvoice = (invoiceId) => async (dispatch) => {
	try {
		const userToken = await getUserToken();
		const voidInvoice = await pitachip.post(
			"/payment/refund/invoice",
			{
				invoiceId: invoiceId,
			},
			{
				headers: { Authorization: `Bearer ${userToken.token}` },
			}
		);
		return voidInvoice;
	} catch (error) {
		return error;
	}
};

export const addPurchaseOrderNumber = (invoiceId) => async (dispatch) => {
	try {
	} catch (error) {}
};
