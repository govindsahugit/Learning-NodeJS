import { axiosWithCreds, axiosWithoutCreds } from "./axiosInstances";

export const fetchUserApi = async () => {
  const data = await axiosWithCreds.get("/user/data");
  return data;
};

export const fetchAllUsers = async () => {
  const data = await axiosWithCreds.get("/users");
  return data;
};

export const logoutUser = async () => {
  const data = await axiosWithCreds.post("/user/logout");
  return data;
};

export const logoutAllSessions = async () => {
  const data = await axiosWithCreds.post("/user/logout/all");
  return data;
};

export const logoutUserById = async (id) => {
  const data = await axiosWithCreds.post(`/admin/logout/user/${id}`);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await axiosWithCreds.post("/user/login", formData);
  return data;
};

export const registerUser = async (formData) => {
  const { data } = await axiosWithoutCreds.post("/user/register", formData);
  return data;
};

export const softDeleteUserById = async (id) => {
  const data = await axiosWithCreds.delete(`/admin/delete/user/${id}`);
  return data;
};

export const hardDeleteUserById = async (id) => {
  const data = await axiosWithCreds.delete(`/admin/hard/delete/user/${id}`);
  return data;
};

export const recoverUserById = async (id) => {
  const data = await axiosWithCreds.patch(`/admin/recover/user/${id}`);
  return data;
};

export const changeUserRoleApi = async (id, newRole) => {
  const data = await axiosWithCreds.patch(`/admin/change/role/user/${id}`, {
    newRole,
  });
  return data;
};
