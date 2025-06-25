console.log("a file started");
for (let i = 0; i < 1000000000; i++) {
  if (i % 400000000 === 0) {
    console.log(`Running Loop 1: ${i}`);
  }
}
