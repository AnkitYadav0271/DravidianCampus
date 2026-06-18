// Configuration & API endpoint
const API_URL = "http://localhost:8000/admin/gallery/images";

// Function to fetch and render dynamic image cards
async function fetchAndRenderGallery() {
  const gridContainer = document.getElementById("imageGrid");
  const gallerySection = document.getElementById("gallerySection");

  if (gridContainer) {
    gridContainer.className =
      "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[320px]";
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      if (gallerySection) gallerySection.classList.add("hidden");
      return;
    }

    const data = await response.json();
    console.log(data);

    gridContainer.innerHTML = "";

    // Loop through your dynamic payload
    data.gallery.slice(0, 7).forEach((imageItem, index) => {
      const card = document.createElement("div");

      let gridSpanClass = "col-span-1 row-span-1";

      if (index === 0) {
        gridSpanClass = "col-span-1 md:col-span-2 row-span-1";
      } else if (index === 1) {
        gridSpanClass = "col-span-1 row-span-1 md:row-span-2";
      } else if (index === 2) {
        gridSpanClass = "col-span-1 row-span-1";
      }

      card.className = `group overflow-hidden rounded-3xl bg-zinc-100 shadow-sm border border-zinc-100 transition duration-300 ${gridSpanClass}`;

      card.innerHTML = `
        <div class="w-full h-full overflow-hidden">
            <img src="${imageItem.imageUrl || imageItem.src}" 
                 alt="${imageItem.alt || "Dravidian Campus Image"}"
                 class="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out">
        </div>
      `;

      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load campus gallery:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderGallery);
