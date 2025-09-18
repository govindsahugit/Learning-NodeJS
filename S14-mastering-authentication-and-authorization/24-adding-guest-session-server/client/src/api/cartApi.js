import axiosInstance from "./axiosInstance";

export const addToCartApi = async (courseId) => {
  const { data } = await axiosInstance.post("/cart", { courseId });
  return data;
};

export const getCartApi = async () => {
  const { data } = await axiosInstance.get("/cart");
  return data;
};

export const removeCartApi = async (courseId) => {
  const { data } = await axiosInstance.patch(`/cart/${courseId}`);
  return data;
};
