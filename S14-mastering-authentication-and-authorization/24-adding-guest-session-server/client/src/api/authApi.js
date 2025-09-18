import axiosInstance from "./axiosInstance";

export const registerApi = async (userData) => {
  const { data } = await axiosInstance.post("/auth/register", userData);
  return data;
};

export const loginApi = async (userData) => {
  const { data } = await axiosInstance.post("/auth/login", userData);
  return data;
};

export const logoutApi = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};

export const getUserDetailsApi = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};

export const removeCartApi = async (courseId) => {
  const { data } = await axiosInstance.patch(`/cart/${courseId}`);
  return data;
};
