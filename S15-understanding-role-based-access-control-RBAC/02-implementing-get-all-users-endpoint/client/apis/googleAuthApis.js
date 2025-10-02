export const sendIdToken = async (
  idToken,
  routeUrl,
  navigate,
  setServerError
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${routeUrl}`, {
      method: "POST",
      body: JSON.stringify({ idToken }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.message) {
      navigate("/");
    } else if (data.error) {
      setServerError(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
