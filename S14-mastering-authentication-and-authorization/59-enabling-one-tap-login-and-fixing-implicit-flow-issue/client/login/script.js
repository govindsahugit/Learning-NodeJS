// function googleLoginCallback(response) {
//   console.log(response);
// }

const clientId =
  "1080347041084-ql6qrkks5ucvunc56fu3qgkkbogniuic.apps.googleusercontent.com";

window.onload = function () {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: async (res) => {
      if (res.credential) {
        await loginUserWithToken(res.credential);
      } else {
        console.log("Something went wrong!");
      }
    },
  });
  google.accounts.id.prompt();
  google.accounts.id.renderButton(document.getElementById("google-login"), {});
};

const loginUserWithToken = async (idToken) => {
  const baseURL = "http://localhost:4000";
  const response = await fetch(`${baseURL}/auth/google`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (response.status === 200) {
    location.href = "/client";
  }
};
