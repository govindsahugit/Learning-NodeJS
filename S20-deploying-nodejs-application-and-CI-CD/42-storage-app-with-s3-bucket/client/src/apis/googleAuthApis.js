import { loginWithGoogle } from "./authApi";

export const sendIdToken = async (
  idToken,
  routeUrl,
  navigate,
  setServerError
) => {
  try {
    const res = await loginWithGoogle(idToken, routeUrl);
    const data = await res.data;
    if (data.message) {
      navigate("/");
    } else if (data.error) {
      setServerError(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
