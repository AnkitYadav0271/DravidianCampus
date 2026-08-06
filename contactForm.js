const form = document.getElementById("form");
const textError = document.getElementsByClassName("error")[0];
const errorDiv = document.getElementById("errorDiv");

function validateInput() {
  const phoneNo = form.phoneNo.value.trim();
  const fullName = form.fullName.value.trim();
  const message = form.message.value.trim();
  textError.textContent = "";
  if (!phoneNo || !fullName || !message) {
    errorDiv.classList.remove("hidden");

    if (!fullName) {
      textError.textContent = "Full Name is required";
      return false;
    }

    if (!phoneNo) {
      textError.textContent = "Phone Number is required";
      return false;
    }

    if (!message) {
      textError.textContent = "Message is Required";
      return false;
    }
    return false;
  }

  errorDiv.classList.add("hidden");

  return true;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateInput()) return;

  const data = {
    fullName: form.fullName.value.trim(),
    phoneNo: form.phoneNo.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const response = await fetch("http://localhost:8000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setTimeout(() => {
        window.location.href = "/response.html";
      }, 1000);
    }
  } catch (err) {
    console.error("Error:", err);
  }
});
