const deleteBtns = document.querySelectorAll("ul #delete");
const titles = document.querySelectorAll("li>span");

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

titles.forEach((title) => {
  const id = title.getAttribute("data-id");
  title.addEventListener("click", async () => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
    });
    const data = await res.json();
    if (data.success) window.location.reload();
  });
});
