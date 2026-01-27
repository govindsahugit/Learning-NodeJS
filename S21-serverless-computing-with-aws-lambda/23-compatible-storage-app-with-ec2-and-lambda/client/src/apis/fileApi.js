import { axiosWithCreds } from "./axiosInstances";

export const deleteFile = async (id, adminView) => {
  const data = await axiosWithCreds.delete(
    `/${adminView ? "admin/delete/user/file" : "file"}/${id}`
  );
  return data;
};

export const uploadFileWithProgress = async (
  dirId,
  file,
  filename,
  onUploadProgress
) => {
  const { data } = await axiosWithCreds.post(`/file/${dirId || ""}`, file, {
    headers: {
      "Content-Type": file.type,
      filename,
    },
    onUploadProgress,
  });
  return data;
};

export const handlePublicFileApi = async (item) => {
  const data = item.isPublic
    ? await axiosWithCreds.patch(`/public/file/${item.id}`)
    : await axiosWithCreds.post(`/public/file/${item.id}`);
  return data;
};
