const slider = document.getElementById("offerSlider");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const offerCorousel = document.getElementById("offersCarousel");

let current = 0;
let slides;

function updateSlider() {
  slider.style.transform = `translateX(-${current * 100}%)`;

  // Dynamic Morphing Pill Layout Management
  document.querySelectorAll(".dot").forEach((dot, index) => {
    if (index === current) {
      dot.style.width = "24px"; // Active long pill
      dot.classList.add("opacity-100");
      dot.classList.remove("opacity-40");
    } else {
      dot.style.width = "8px"; // Inactive clean dot
      dot.classList.add("opacity-40");
      dot.classList.remove("opacity-100");
    }
  });
}

async function loadOffers() {
  try {
    const response = await fetch("http://localhost:8000/admin/offers/images");
    const data = await response.json();
    console.log(data);

    if (!response.ok || !data?.offers || data.offers.length <= 0) {
      offerCorousel.classList.add("hidden");
      return;
    }

    offerCorousel.classList.remove("hidden");

    // Fixed 300px responsive architecture rendering from backend data matching exact class structures
    slider.innerHTML = data.offers
      .map(
        (offer) =>
          `
          <div class="min-w-full w-full h-[300px] relative shrink-0 overflow-hidden">
            <picture>
              <source media="(min-w: 1024px)" srcset="${offer.desktopUrl || offer.imageUrl}">
              <source media="(min-w: 768px)" srcset="${offer.tabletUrl || offer.imageUrl}">
              <img
                src="${offer.imageUrl}"
                class="w-full h-[300px] object-cover object-top transform scale-100 transition-transform duration-1000"
                alt="Campus Offer"
              />
            </picture>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        `,
      )
      .join("");

    // NOW get slides
    slides = slider.children;

    // Build the morphing modern tracker layout
    dotsContainer.innerHTML = ""; // Clear loader artifacts if any
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("button");

      // Initializing style with custom base heights/widths for the morph effect
      dot.className =
        "dot h-2 rounded-full bg-white opacity-40 transition-all duration-300 ease-in-out cursor-pointer";
      dot.style.width = "8px";

      dot.addEventListener("click", () => {
        current = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }

    updateSlider();
  } catch (error) {
    console.error("Failed to process backend banner data:", error);
    offerCorousel.classList.add("hidden");
  }
}

loadOffers();

nextBtn.addEventListener("click", () => {
  if (!slides || slides.length === 0) return;
  current++;

  if (current >= slides.length) {
    current = 0;
  }

  updateSlider();
});

prevBtn.addEventListener("click", () => {
  if (!slides || slides.length === 0) return;
  current--;

  if (current < 0) {
    current = slides.length - 1;
  }

  updateSlider();
});

setInterval(() => {
  if (!slides || slides.length === 0) return;

  current++;

  if (current >= slides.length) {
    current = 0;
  }

  updateSlider();
}, 5000);
