for (let i = 1; i <= 200; i++) fetch("http://localhost:4000");
for (let i = 1; i <= 100; i++) fetch("http://localhost:4000/unstable");
for (let i = 1; i <= 50; i++) fetch("http://localhost:4000/cpu-usage");

setInterval(() => {
  for (let i = 1; i <= 200; i++) fetch("http://localhost:4000");
  for (let i = 1; i <= 100; i++) fetch("http://localhost:4000/unstable");
  for (let i = 1; i <= 50; i++) fetch("http://localhost:4000/cpu-usage");
}, 50 * 1000);
