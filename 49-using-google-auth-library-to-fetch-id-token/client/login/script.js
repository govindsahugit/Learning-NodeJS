const button = document.querySelector("button");
const baseURL = "http://localhost:4000";

button.addEventListener("click", () => {
  window.open(`${baseURL}/auth/google`, "auth-popup", "width=500,height=600");
});

const res = await fetch(`${baseURL}/profile`, {
  credentials: "include",
});

if (res.status === 200) location.href = "/client/index.html";
