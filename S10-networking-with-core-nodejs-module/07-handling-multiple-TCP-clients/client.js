import net from "node:net";

process.stdin.on("data", (input) => {
  // console.log(`You typed: ${input.toString()}`);
  socket.write(input);
});

const socket = net.createConnection({ host: "192.168.1.4", port: 4000 });

socket.on("error", () => {
  console.log("Server Lost.");
});

socket.on("data", (chunk) => {
  console.log(chunk.toString());
});

// socket.write("Hii from client.js");
