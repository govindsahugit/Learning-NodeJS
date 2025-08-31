const myObj = {
  aaa(abcd) {
    setTimeout(() => {
      abcd("Resolve function is called!");
    }, 2000);
  },
  then(abcd) {
    setTimeout(() => {
      abcd("Resolve function is called!!!!!!");
    }, 2000);
  },
};
