const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  if (mobileMenu.classList.contains("hidden")) {
    menuBtn.textContent = "☰";
  } else {
    menuBtn.textContent = "✕";
  }
});

//*Carousel code starts

const libraryImages = ["./public/library1.jpeg", "./public/library3.jpg"];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const libraryImageDiv = document.getElementById("libraryImage");

let currentIndex = 0;

// Auto Slide
setInterval(() => {
  
  currentIndex = (currentIndex + 1) % libraryImages.length;
  
  libraryImageDiv.src = libraryImages[currentIndex];

  console.log("Logging Actual one :", libraryImageDiv.src);
}, 3000);

// Next Button
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % libraryImages.length;
  console.log(libraryImages[currentIndex], " : Logging current imageSrc");
  libraryImageDiv.src = libraryImages[currentIndex];

  console.log("Logging Actual one :", libraryImageDiv.src);
});

// Previous Button
prevBtn.addEventListener("click", () => {
  console.log("prevButtonClicked :():");
  currentIndex =
    (currentIndex - 1 + libraryImages.length) % libraryImages.length;

  libraryImageDiv.src = libraryImages[currentIndex];
});

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



