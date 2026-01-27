import { axiosWithCreds } from "./axiosInstances";

export const sendOtp = async (email) => {
  const data = await axiosWithCreds.post("/user/send-otp", { email });
  return data;
};

export const verifyOtp = async (email, otp) => {
  const data = await axiosWithCreds.post("/user/verify-otp", {
    email,
    otp,
  });
  return data;
};

export const forgetPassword = async (formData, otp) => {
  const data = await axiosWithCreds.post("/user/forgot/password", {
    ...formData,
    otp,
  });
  return data;
};

export const loginUser = async (formData, otp) => {
  const data = await axiosWithCreds.post("/user/login", {
    ...formData,
    otp,
  });
  return data;
};

export const registerUser = async (formData, otp) => {
  const data = await axiosWithCreds.post("/user/register", {
    ...formData,
    otp,
  });
  return data;
};

export const loginWithGoogle = async (idToken, routeUrl) => {
  const data = await axiosWithCreds.post(routeUrl, { idToken });
  return data;
};
