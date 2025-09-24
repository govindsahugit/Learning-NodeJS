const nameElement = document.querySelector("#name");
const emailElement = document.querySelector("#email");
const imageElement = document.createElement("img");
const logoutBtn = document.getElementById("logout-btn");

const baseURL = "http://localhost:4000";

const response = await fetch(`${baseURL}/profile`, {
  credentials: "include",
});

if (response.status === 401) {
  location.href = "./login";
}

const { name: fullName, email, picture } = await response.json();

nameElement.textContent = fullName;
emailElement.textContent = email;
imageElement.src = picture;

document.body.appendChild(imageElement);

// ========================================== //

logoutBtn.addEventListener("click", async () => {
  const res = await fetch(`${baseURL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 204) location.href = "./login";
});
