document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element Selectors ---
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const authForm = document.getElementById("auth-form");
  const submitBtn = document.getElementById("submit-btn");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("error-message");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");

  const passwordIcon = togglePasswordBtn
    ? togglePasswordBtn.querySelector(".material-symbols-outlined")
    : null;

  // --- Mobile Responsive Navigation Toggler ---
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
      } else {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // --- Helper UI Utilities ---
  function showError(message) {
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.classList.remove("hidden");
    }
  }

  function clearError() {
    if (errorMsg) {
      errorMsg.textContent = "";
      errorMsg.classList.add("hidden");
    }
  }

  function resetButton() {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Secure Sign In";
    }
  }

  // --- Password Visibility Toggle Handler ---
  if (togglePasswordBtn && passwordInput && passwordIcon) {
    togglePasswordBtn.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.textContent = "visibility_off";
      } else {
        passwordInput.type = "password";
        passwordIcon.textContent = "visibility";
      }
    });
  }

  // --- Authentication Submission Engine ---
  if (authForm) {
    authForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      clearError();

      const emailValue = emailInput ? emailInput.value.trim() : "";
      const passwordValue = passwordInput ? passwordInput.value : "";

      if (!emailValue || !passwordValue) {
        showError("Please fill in all fields.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Authenticating...";
      }

      try {
        const response = await fetch("http://localhost:8000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful!", data);
          localStorage.setItem("adminToken", data.token);
          window.location.href = "/admin/dashboard.html";
        } else {
          showError(
            data.message || "Login failed. Please check your credentials.",
          );
          resetButton();
        }
      } catch (error) {
        console.error("Network error during admin authentication:", error);
        showError("Unable to connect to the server. Please try again later.");
        resetButton();
      }
    });
  }
});
