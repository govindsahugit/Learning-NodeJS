import { axiosWithCreds, axiosWithoutCreds } from "./axiosInstances";

export const getDirectoryItemsApi = async (dirId) => {
  const data = await axiosWithCreds.get(`/directory/${dirId || ""}`);
  return data;
};

export const createDirectorApi = async (dirId = "", newDirname, adminView) => {
  const data = await axiosWithCreds.post(
    `/${adminView ? "admin/create/user/dir" : "directory"}/${dirId}`,
    {},
    { headers: { dirname: newDirname } }
  );
  return data;
};

export const deleteDirectoryApi = async (id, adminView) => {
  const data = await axiosWithCreds.delete(
    `/${adminView ? "admin/delete/user/dir" : "directory"}/${id}`
  );
  return data;
};

export const handleRenameApi = async (
  renameType,
  adminView,
  renameId,
  renameValue
) => {
  const newName =
    renameType === "file"
      ? { newFilename: renameValue }
      : { newDirName: renameValue };

  const url =
    renameType === "file"
      ? `/${adminView ? "admin/rename/user/file" : "file"}/${renameId}`
      : `/${adminView ? "admin/rename/user/dir" : "directory"}/${renameId}`;
  const data = await axiosWithCreds.patch(url, newName);
  return data;
};

export const handlePublicDirectoryApi = async (item) => {
  const data = item.isPublic
    ? await axiosWithCreds.patch(`/public/directory/${item.id}`)
    : await axiosWithCreds.post(`/public/directory/${item.id}`);
  return data;
};

export const getPublicDirDataApi = async (dirId) => {
  const data = await axiosWithoutCreds.get(`/public/directory/${dirId}`);
  return data;
};

export const getUserDirDataApi = async (dirId) => {
  const data = await axiosWithCreds.get(`/admin/get/user/data/${dirId}`);
  return data;
};
