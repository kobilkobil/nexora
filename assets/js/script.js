console.log("NEXORA berhasil dijalankan!");

document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("main h2");

  if (heading) {
    heading.style.opacity = "0";

    setTimeout(() => {
      heading.style.transition = "opacity 1s ease";
      heading.style.opacity = "1";
    }, 200);
  }
});
