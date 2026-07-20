

const form = document.getElementById("newAdmissionLibrary");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

function checkValidity() {
  const fullName = form.fullName.value.trim();
  const phoneNo = form.phoneNo.value.trim();
  const course = form.course.value;

  // Reset errors safely
  if (nameError) nameError.textContent = "";
  if (phoneError) phoneError.textContent = "";

  let isValid = true;

  // Name Validation
  if (fullName.length < 3) {
    nameError.textContent = "Please enter a valid name";
    isValid = false;
  }

  // Phone Validation
  if (!/^\d{10}$/.test(phoneNo)) {
    phoneError.textContent = "Please enter a valid 10 digit phone number";
    isValid = false;
  }

  // Course Validation
  if (!course || course === "Choose Library Type") {
    isValid = false;
    alert("Please select a library type");
  }

  return isValid;
}

//* Submitting the form
const resultMessage = document.getElementById("resultMessage");
const resultDiv = document.getElementById("resultDiv");

form.addEventListener("submit", async (e) => {
  // 1. MUST BE FIRST: Stop the browser's default submit behavior instantly
  e.preventDefault();

  // 2. Validate fields
  console.log("Checking if validity true or not", checkValidity());
  if (!checkValidity()) return;

  const fullName = form.fullName.value.trim();
  const phoneNo = form.phoneNo.value.trim();
  const course = form.course.value;
  const message = form.message ? form.message.value : "";

  const data = {
    fullName: fullName,
    phoneNo: phoneNo,
    email: null,
    course: course,
    message: message,
  };

  try {
    const response = await fetch("http://localhost:8000/new-admission", {
      method: "POST", // Capitalized is standard
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      resultDiv.classList.remove("hidden", "bg-red-700");
      resultDiv.classList.add("bg-green-700");
      resultMessage.textContent = result.message;

      setTimeout(() => {
        window.location.href = "/response.html";
      }, 3000);
    } else {
      resultDiv.classList.remove("hidden", "bg-green-700");
      resultDiv.classList.add("bg-red-700");
      resultMessage.textContent = result.message || "An error occurred.";
    }
  } catch (err) {
    console.error("Network or Backend error:", err);
    resultDiv.classList.remove("hidden", "bg-green-700");
    resultDiv.classList.add("bg-red-700");
    resultMessage.textContent = "Could not reach the server. Please try again.";
  }

  setTimeout(() => {
    resultDiv.classList.add("hidden");
  }, 5000);
});
