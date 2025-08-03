const res = await fetch("http://localhost:4000/api", {
  method: "PUT",
});
const data = await res.json();
console.log(data);
