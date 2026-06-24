const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
// const copyRight = document.getElementById("copyright");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  if (mobileMenu.classList.contains("hidden")) {
    menuBtn.textContent = "☰";
  } else {
    menuBtn.textContent = "✕";
  }
});

//*Carousel code starts

// const libraryImages = ["./public/library1.jpeg", "./public/library3.jpg"];

// const prevBtn = document.getElementById("prevBtn");
// const nextBtn = document.getElementById("nextBtn");
// const libraryImageDiv = document.getElementById("libraryImage");

// let currentIndex = 0;

// // Auto Slide
// setInterval(() => {

//   currentIndex = (currentIndex + 1) % libraryImages.length;

//   libraryImageDiv.src = libraryImages[currentIndex];

//   console.log("Logging Actual one :", libraryImageDiv.src);
// }, 3000);

// // Next Button
// nextBtn.addEventListener("click", () => {
//   currentIndex = (currentIndex + 1) % libraryImages.length;
//   console.log(libraryImages[currentIndex], " : Logging current imageSrc");
//   libraryImageDiv.src = libraryImages[currentIndex];

//   console.log("Logging Actual one :", libraryImageDiv.src);
// });

// // Previous Button
// prevBtn.addEventListener("click", () => {
//   console.log("prevButtonClicked :():");
//   currentIndex =
//     (currentIndex - 1 + libraryImages.length) % libraryImages.length;

//   libraryImageDiv.src = libraryImages[currentIndex];
// });

//Navbar transition

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add(
      "bg-white/20",
      "backdrop-blur-xl",
      "shadow-lg",
      "border-b",
      "border-white/20",
    );
  } else {
    navbar.classList.remove(
      "bg-white/20",
      "backdrop-blur-xl",
      "shadow-lg",
      "border-b",
      "border-white/20",
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. Get current path (e.g., "/library.html")
  const currentPath = window.location.pathname;

  // 2. Desktop Navigation Active States
  const desktopLinks = document.querySelectorAll(".nav-link");
  desktopLinks.forEach((link) => {
    // If the href matches the current path, trigger the line animation
    if (
      link.getAttribute("href") === currentPath ||
      (currentPath === "/" && link.getAttribute("href") === "/index.html")
    ) {
      link.classList.add("text-orange-400");
      // Change underline width from w-0 to w-full smoothly
      link.classList.remove("after:w-0");
      link.classList.add("after:w-full");
    }
  });

  // 3. Mobile Navigation Active States
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  mobileLinks.forEach((link) => {
    if (
      link.getAttribute("href") === currentPath ||
      (currentPath === "/" && link.getAttribute("href") === "/index.html")
    ) {
      // Highlight mobile link with background + text shift
      link.classList.add(
        "bg-orange-400/20",
        "text-orange-500",
        "font-medium",
        "border-l-4",
        "border-orange-400",
      );
    }
  });


});
