// =============================
// * Check if admin is logged in or not
// =============================

async function checkAdminLogin() {
  const response = await fetch("http://localhost:8000/admin/current-status", {
    credentials: "include",
  });

  const data = await response.json();

  if (!data.success) {
    window.location.href = "/admin/login.html";
  }

  console.log("admin:", data);
}

checkAdminLogin();

// =============================
// Elements
// =============================

const offersBtn = document.getElementById("offersBtn");
const galleryBtn = document.getElementById("galleryBtn");
const logoutBtn = document.getElementById("logoutBtn");

const fileInput = document.querySelector('input[type="file"]');
const uploadBtn = document.querySelector(".upload-btn");

const imageGrid = document.getElementById("imageGrid");

const resultDiv = document.getElementById("resultDiv");
const resultMsg = document.getElementById("resultMessage");
const imageCount = document.getElementById("imageCount");

let currentSection = "offers";
let selectedFile = null;

// =============================
// Function to show error message
// =============================

//*Show result is here

function ShowError(msg) {
  resultDiv.classList.remove("hidden", "bg-green-100", "border-green-300");
  resultDiv.classList.add("bg-red-100", "border-red-300");
  resultMsg.classList.add("text-red-700");
  resultMsg.classList.remove("text-green-700");
  resultMsg.textContent = msg;
}

//*clear error method is here

function clearError() {
  resultDiv.classList.add("hidden");
  resultMsg.textContent = "";
}

//*show result method is here

function showResult(msg) {
  resultDiv.classList.remove("hidden", "bg-red-100", "border-red-300");
  resultDiv.classList.add("bg-green-100", "border-green-300");
  resultMsg.classList.add("text-green-700");
  resultMsg.classList.remove("text-red-700");
  resultMsg.textContent = msg;
}
let resultTimeout;

function resultDirector(cb, msg) {
  clearTimeout(resultTimeout);

  cb(msg);

  resultTimeout = setTimeout(() => {
    clearError();
  }, 6000);
}
// =============================
// Sidebar Navigation
// =============================

offersBtn.addEventListener("click", () => {
  currentSection = "offers";

  offersBtn.classList.add("bg-orange-500", "text-white");

  galleryBtn.classList.remove("bg-orange-500", "text-white");

  loadOffers();
});

galleryBtn.addEventListener("click", () => {
  currentSection = "gallery";

  galleryBtn.classList.add("bg-orange-500", "text-white");
  galleryBtn.classList.remove("bg-white");

  offersBtn.classList.remove("bg-orange-500", "text-white");

  loadGallery();
});

// =============================
// File Selection
// =============================

fileInput.addEventListener("change", (e) => {
  selectedFile = e.target.files[0];

  if (!selectedFile) {
    resultDirector(ShowError, "please a select an image");
    return;
  }
});

// =============================
// Upload
// =============================

// uploadBtn.addEventListener("click", async () => {
//   if (!selectedFile) {
//     resultDirector(ShowError, "please a select an image");
//     return;
//   }

//   let uploadingInProgress = true;

//   const formData = new FormData();

//   if (currentSection === "offers") {
//     formData.append("offerImage", selectedFile);
//   } else {
//     formData.append("galleryImage", selectedFile);
//   }

//   try {
//     const endpoint =
//       currentSection === "offers"
//         ? "http://localhost:8000/admin/offers/upload"
//         : "http://localhost:8000/admin/gallery/upload";

//     const response = await fetch(endpoint, {
//       method: "POST",
//       credentials: "include",
//       body: formData,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       resultDirector(ShowError, data.message);
//     }

//     uploadingInProgress = false;

//     uploadBtn.textContent = "Upload";

//     resultDirector(showResult, data.message);

//     selectedFile = null;

//     fileInput.value = "";

//     currentSection === "offers" ? loadOffers() : loadGallery();
//   } catch (error) {
//     console.error(error);

//     resultDirector(ShowError, "Upload failed");
//   }
// });

uploadBtn.addEventListener("click", async () => {
  if (!selectedFile) {
    resultDirector(ShowError, "please a select an image");
    return;
  }

  // Save original button text to restore it later
  const originalBtnText = uploadBtn.textContent || "Upload";
  uploadBtn.disabled = true; // Prevent double-clicks during upload

  const formData = new FormData();
  const isOffers = currentSection === "offers";

  if (isOffers) {
    formData.append("offerImage", selectedFile);
  } else {
    formData.append("galleryImage", selectedFile);
  }

  const endpoint = isOffers
    ? "http://localhost:8000/admin/offers/upload"
    : "http://localhost:8000/admin/gallery/upload";

  // Wrap XHR in a Promise so it fits cleanly into your async/await pattern
  try {
    const data = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);

      // CRITICAL: This is the magic cookie handler matching your fetch credentials configuration
      xhr.withCredentials = true;

      // Track Upload Progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100,
          );
          // Update your button text dynamically to show feedback string!
          uploadBtn.textContent = `Uploading... ${percentComplete}%`;
        }
      });

      // Handle server response completion state
      xhr.onload = () => {
        try {
          const responseData = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(responseData);
          } else {
            reject({ status: xhr.status, data: responseData });
          }
        } catch (e) {
          reject({
            status: xhr.status,
            data: { message: "Invalid JSON response from server" },
          });
        }
      };

      // Handle system network failures
      xhr.onerror = () =>
        reject({ status: 0, data: { message: "Network Error Encountered" } });

      // Dispatch file upload string
      xhr.send(formData);
    });

    // --- Success Execution Paths ---
    uploadBtn.disabled = false;
    uploadBtn.textContent = originalBtnText;

    resultDirector(showResult, data.message || "Upload successful!");

    selectedFile = null;
    fileInput.value = "";
    isOffers ? loadOffers() : loadGallery();
  } catch (error) {
    // --- Failure Execution Paths ---
    console.error(error);
    uploadBtn.disabled = false;
    uploadBtn.textContent = originalBtnText;

    const errMsg =
      error.data && error.data.message ? error.data.message : "Upload failed";
    resultDirector(ShowError, errMsg);
  }
});

// =============================
// Load Offers
// =============================

async function loadOffers() {
  try {
    const response = await fetch("http://localhost:8000/admin/offers/images", {
      credentials: "include",
    });

    const data = await response.json();

    renderImages(data.offers);
  } catch (error) {
    console.error(error);
  }
}

// =============================
// Load Gallery
// =============================

async function loadGallery() {
  try {
    const response = await fetch("http://localhost:8000/admin/gallery/images", {
      credentials: "include",
    });

    const data = await response.json();

    renderImages(data.gallery);
  } catch (error) {
    console.error(error);
  }
}

// =============================
// Render Images
// =============================

function renderImages(images) {
  imageGrid.innerHTML = "";

  imageCount.textContent = `${images.length} images`;

  images.forEach((image) => {
    const card = document.createElement("div");

    card.className =
      "group overflow-hidden rounded-3xl bg-white shadow-xl border border-orange-100";

    card.innerHTML = `

        <div class="overflow-hidden">

            <img
                src="${image.imageUrl}"
                class="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
            >
          
        </div>

        <div class="hidden inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs z-50" id="deleteAlertDiv">
        <div
            class="flex flex-col gap-4 w-full max-w-xs p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-xl transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-150">

            <div class="text-center">
                <h3 class="text-sm font-semibold text-gray-900">Delete Item?</h3>
                <p class="text-xs text-gray-500 mt-1">This action cannot be undone.</p>
            </div>

            <div class="flex gap-3 w-full">
                <button
                    class="flex-1 rounded-xl text-center bg-gray-200/70 hover:bg-gray-200 active:scale-98 transition-all cursor-pointer py-2 text-xs font-semibold text-gray-700"
                    id="cancelBtn">
                    Cancel
                </button>
                <button
                    class="flex-1 rounded-xl text-center bg-rose-600 hover:bg-rose-700 active:scale-98 transition-all cursor-pointer py-2 text-xs font-semibold text-white shadow-sm shadow-rose-600/20"
                    id="okBtn">
                    Delete
                </button>
            </div>
        </div>
    </div>

        <div class="p-4">

            <button
                onclick="openDeleteModal('${image._id}')"
                class="w-full py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
            >
                Delete
            </button>

        </div>

    `;

    imageGrid.appendChild(card);
  });
}

// =============================
// Delete
// =============================
const deleteModal = document.getElementById("deleteModal");

const cancelBtn = document.getElementById("cancelBtn");

const confirmBtn = document.getElementById("confirmBtn");

let selectedDeleteId = null;

function openDeleteModal(id) {
  selectedDeleteId = id;

  deleteModal.classList.remove("hidden");
}

cancelBtn.addEventListener("click", () => {
  selectedDeleteId = null;

  deleteModal.classList.add("hidden");
});

confirmBtn.addEventListener("click", async () => {
  if (!selectedDeleteId) return;

  try {
    const endpoint =
      currentSection === "offers"
        ? `http://localhost:8000/admin/offers/image/${selectedDeleteId}`
        : `http://localhost:8000/admin/gallery/image/${selectedDeleteId}`;

    const response = await fetch(endpoint, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      resultDirector(ShowError, data.message);
      return;
    }

    resultDirector(showResult, data.message);

    deleteModal.classList.add("hidden");

    selectedDeleteId = null;

    currentSection === "offers" ? loadOffers() : loadGallery();
  } catch (error) {
    resultDirector(ShowError, "Delete failed");
  }
});

//*Logout is going here
logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8000/admin/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(response);
    console.log(data);

    if (!response.ok) {
      resultDirector(ShowError, data.message);
      return;
    }

    resultDirector(showResult, data.message);
  } catch (error) {
    resultDirector(ShowError, error);
  }
});

// Initial Load

loadOffers();
