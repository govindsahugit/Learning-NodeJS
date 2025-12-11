import { axiosWithCreds } from "./axiosInstances";

export const getDirectoryItemsApi = async (planId) => {
  const { data } = await axiosWithCreds.post(`/create/subscription`, {
    planId,
  });
  return data;
};
