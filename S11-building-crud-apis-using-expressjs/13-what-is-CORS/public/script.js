const res = await fetch("http://localhost:4000/get", {
  method: "GET",
});

const data = await res.json();

console.log(data);
