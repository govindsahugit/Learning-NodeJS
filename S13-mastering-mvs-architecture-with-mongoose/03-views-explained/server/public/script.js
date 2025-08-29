const deleteBtns = document.querySelectorAll("ul #delete");

deleteBtns.forEach((btn) => {
  const id = btn.getAttribute("data-id");
  btn.addEventListener("click", async () => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });
    await res.json();
    window.location.reload();
  });
});
