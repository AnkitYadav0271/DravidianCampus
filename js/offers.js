const slider = document.getElementById("offerSlider");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const offerCorousel = document.getElementById("offersCorousel");

let current = 0;
let slides;

function updateSlider() {
  slider.style.transform = `translateX(-${current * 100}%)`;

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("opacity-100", index === current);

    dot.classList.toggle("opacity-40", index !== current);
  });
}

async function loadOffers() {
  const response = await fetch("http://localhost:8000/admin/offers/images");

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    offerCorousel.classList.add("hidden");
    return;
  }

  if (data?.offers.length <= 0) {
    offerCorousel.classList.add("hidden");
    return;
  }

  offerCorousel.classList.remove("hidden");

  slider.innerHTML = data.offers
    .map(
      (offer) => `
        <div class="min-w-full">
          <img
            src="${offer.imageUrl}"
            class="w-full h-[450px] object-cover"
          />
        </div>
      `,
    )
    .join("");

  // NOW get slides
  slides = slider.children;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("button");

    dot.className = "dot w-3 h-3 rounded-full bg-white opacity-40 transition";

    dot.addEventListener("click", () => {
      current = i;
      updateSlider();
    });

    dotsContainer.appendChild(dot);
  }

  updateSlider();
}

loadOffers();

nextBtn.addEventListener("click", () => {
  current++;

  if (current >= slides.length) {
    current = 0;
  }

  updateSlider();
});

prevBtn.addEventListener("click", () => {
  current--;

  if (current < 0) {
    current = slides.length - 1;
  }

  updateSlider();
});

setInterval(() => {
  if (!slides) return;

  current++;

  if (current >= slides.length) {
    current = 0;
  }

  updateSlider();
}, 5000);
