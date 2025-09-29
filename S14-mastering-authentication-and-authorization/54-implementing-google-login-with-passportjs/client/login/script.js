const button = document.querySelector("button");
const baseURL = "http://localhost:4000";

button.addEventListener("click", () => {
  window.open(`${baseURL}/auth/google`, "auth-popup", "width=500,height=600");
});

// const res = await fetch(`${baseURL}/profile`, {
//   credentials: "include",
// });

// if (res.status === 200) location.href = "/client/index.html";

window.addEventListener("message", ({ data }) => {
  console.log(data);
  if (data.message === "success") location.href = "/client/index.html";
  else {
    const p = document.createElement("p");
    p.innerText = "Something went wrong!";
    document.body.appendChild(p)
    setTimeout(() => {
      p.remove();
    }, 2000);
  }
});
