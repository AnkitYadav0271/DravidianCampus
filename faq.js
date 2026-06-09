

const faqButtons = document.querySelectorAll(".faq-btn");

faqButtons.forEach((btn) => {
  btn.addEventListener("click", () => {

    const content = btn.nextElementSibling;
    const icon = btn.querySelector(".faq-icon");

    content.classList.toggle("hidden");

    icon.textContent =
      content.classList.contains("hidden") ? "+" : "−";

  });
});