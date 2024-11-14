import axios from "axios";

export async function createPaymentLink(formData) {
    try {
        const res = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_ORDER_URL}/order/create`,
            data: formData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
