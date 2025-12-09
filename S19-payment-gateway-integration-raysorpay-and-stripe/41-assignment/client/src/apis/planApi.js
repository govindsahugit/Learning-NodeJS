import { axiosWithCreds } from "./axiosInstances";

// Fetch all plans
export const fetchAllPlans = async () => {
    const response = await axiosWithCreds.get("/plan/get/all/plans");
    return response;
};

// Create payment order
export const createPaymentOrder = async (planId, amount) => {
    const response = await axiosWithCreds.post("/payment/create-order", {
        planId,
        amount,
    });
    return response;
};

// Verify payment
export const verifyPayment = async (orderId, paymentId, signature, planId) => {
    const response = await axiosWithCreds.post("/payment/verify-payment", {
        orderId,
        paymentId,
        signature,
        planId,
    });
    return response;
};
