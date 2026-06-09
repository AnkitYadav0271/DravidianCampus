console.log("Script loadded");

const form = document.getElementById("newAdmission");

const emailError = document.getElementById("emailError");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkValidity() {
  fullName = form.fullName.value.trim();
  phoneNo = form.phoneNo.value.trim();
  email = form.email.value.trim();
  course = form.course.value;

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
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

  // Email Validation

  if (email.length > 0) {
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    }
  }

  // Course Validation
  if (!course) {
    isValid = false;
    alert("Please select a course");
  }

  return isValid;
}

//* Submitting the form

const resultMessage = document.getElementById("resultMessage");
const resultDiv = document.getElementById("resultDiv");

form.addEventListener("submit", async (e) => {
  const fullName = form.fullName.value.trim();
  const phoneNo = form.phoneNo.value.trim();
  const email = form.email.value.trim();
  const course = form.course.value;
  const data = {
    fullName: fullName,
    phoneNo: phoneNo,
    email: email,
    course: course,
    message: form.message.value,
  };
  e.preventDefault();

  console.log("Checking if validity true or not", checkValidity());
  if (!checkValidity()) return;

  const response = await fetch("http://localhost:8000/new-admission", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();
  

  if (response.ok && result.success) {
    resultDiv.classList.remove("hidden");
    resultDiv.classList.remove("bg-red-700");
    resultDiv.classList.add("bg-green-700");
    resultMessage.textContent = result.message;
  } else {
    resultDiv.classList.remove("hidden");
    resultDiv.classList.remove("bg-green-700");
    resultDiv.classList.add("bg-red-700");
    resultMessage.textContent = result.message;
  }

  setTimeout(() => {
    resultDiv.classList.add("hidden");
  }, 5000);
});
