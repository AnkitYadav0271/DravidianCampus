const cards = document.querySelectorAll(".carousel-card");
const prevBtnToppers = document.getElementById("prevBtnToppers");
const nextBtnToppers = document.getElementById("nextBtnToppers");
const dotsContainerToppers = document.getElementById("dotsContainer");

let currentIndex = Math.floor(cards.length / 2);

// Generate dots
cards.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-orange-500 w-6" : "bg-gray-500"}`;
  dotsContainerToppers.appendChild(dot);
});

const dots = dotsContainerToppers.querySelectorAll("div");

function updateCarouselToppers() {
  cards.forEach((card, index) => {
    const offset = index - currentIndex;

    if (offset === 0) {
      // Central Active Focus
      card.style.transform = `translateX(0) scale(1) rotateY(0deg) translateZ(120px)`;
      card.style.zIndex = 30;
      card.style.opacity = "1";
      card.style.filter = "none";
      card.style.boxShadow = "0 30px 60px -15px rgba(249, 115, 22, 0.35)";
    } else if (offset === -1) {
      // Left Side Wing
      card.style.transform = `translateX(-250px) scale(0.85) rotateY(35deg) translateZ(0px)`;
      card.style.zIndex = 20;
      card.style.opacity = "0.75";
      card.style.filter = "brightness(0.6)";
      card.style.boxShadow = "none";
    } else if (offset === 1) {
      // Right Side Wing
      card.style.transform = `translateX(250px) scale(0.85) rotateY(-35deg) translateZ(0px)`;
      card.style.zIndex = 20;
      card.style.opacity = "0.75";
      card.style.filter = "brightness(0.6)";
      card.style.boxShadow = "none";
    } else if (offset < -1) {
      // Deep Left Background
      card.style.transform = `translateX(-420px) scale(0.7) rotateY(55deg) translateZ(-150px)`;
      card.style.zIndex = 10;
      card.style.filter = "brightness(0.3)";
      card.style.opacity = offset === -2 ? "0.35" : "0";
    } else if (offset > 1) {
      // Deep Right Background
      card.style.transform = `translateX(420px) scale(0.7) rotateY(-55deg) translateZ(-150px)`;
      card.style.zIndex = 10;
      card.style.filter = "brightness(0.3)";
      card.style.opacity = offset === 2 ? "0.35" : "0";
    }
  });

  // Active dot synchronization
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("bg-orange-500", "w-6");
      dot.classList.remove("bg-gray-500");
    } else {
      dot.classList.remove("bg-orange-500", "w-6");
      dot.classList.add("bg-gray-500");
    }
  });
}

// Direct-click activation logic
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    currentIndex = index;
    updateCarouselToppers();
  });
});

// Event hooks for directional layout control
prevBtnToppers.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarouselToppers();
  }
});

nextBtnToppers.addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarouselToppers();
  }
});

updateCarouselToppers();
