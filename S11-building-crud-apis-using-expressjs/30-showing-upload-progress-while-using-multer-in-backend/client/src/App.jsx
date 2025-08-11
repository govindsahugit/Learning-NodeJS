import "./App.css";

function App() {
  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:4000/upload`, true);
    xhr.responseType = "json";
    xhr.addEventListener("error", () => {
      console.error("Request failed");
      alert("Server connection failed");
    });
    xhr.addEventListener("abort", () => {
      console.warn("Request aborted");
    });
    xhr.addEventListener("load", (e) => {
      console.log(xhr.response);
    });
    xhr.upload.addEventListener("progress", (e) => {
      console.log(`${Math.floor((e.loaded / e.total) * 100)}%`);
    });
    xhr.send(formData);
  };

  return (
    <>
      <form encType="multipart/form-data" onSubmit={(e) => handelSubmit(e)}>
        <input type="file" name="profilePic" /> <br />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default App;
