import "./App.css";

function App() {
  const handleFileUpload = async (e) => {
    await fetch(
      "https://nodejs-storage-app.s3.ap-south-1.amazonaws.com/pic.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUHODB34S5J43LMNF%2F20251115%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20251115T140601Z&X-Amz-Expires=3600&X-Amz-Signature=84774337da061897e829b35b4d06a844330e7f5ceb1b39d5a2e6b49d79cdd770&X-Amz-SignedHeaders=content-type%3Bhost&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject",
      {
        method: "PUT",
        body: e.target.files[0],
      }
    );
    console.log("File uploaded");
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default App;
