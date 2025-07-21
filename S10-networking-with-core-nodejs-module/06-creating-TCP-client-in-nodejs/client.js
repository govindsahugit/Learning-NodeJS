import net from "node:net";

const socket = net.createConnection({ host: "192.168.1.2", port: 4000 });

socket.on("error", () => {
  console.log("Server Lost.");
});

socket.on("data", (chunk) => {
  console.log(chunk.toString());
});

socket.write("Hii from client.js");
