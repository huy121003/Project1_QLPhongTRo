import axios from "axios";

 async function createPaymentLink(formData: any) {
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
  } catch (error: any) {
    return error.response.data;
  }
}
export default {createPaymentLink}