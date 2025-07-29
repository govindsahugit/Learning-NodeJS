const input = document.querySelector("input");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  e.preventDefault()

  // const res = await fetch("http://192.168.1.10/", {
  //   method: "POST",
  //   body: file,
  //   headers: {
  //     filename: file.name,
  //   },
  // });
  // const data = await res.text();
  // console.log(data);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost/", true);
  xhr.setRequestHeader("filename", file.name);
  xhr.addEventListener("load", (e) => {
    console.log(xhr.response);
  });
  xhr.upload.addEventListener("progress", (e) => {
    console.log(`${Math.floor((e.loaded / e.total) * 100)}% Uploaded`);
  });
  xhr.send(file);
});
