document.addEventListener("DOMContentLoaded", () => {
  const form1 = document.getElementById("step1-form");
  const form2 = document.getElementById("step2-form");
  const form3 = document.getElementById("step3-form");

  const title = document.getElementById("step-title");
  const subtitle = document.getElementById("step-subtitle");
  const bannerText = document.getElementById("banner-text");
  const uiMessage = document.getElementById("ui-message");

  const dot1 = document.getElementById("dot-1");
  const dot2 = document.getElementById("dot-2");
  const dot3 = document.getElementById("dot-3");

  const btn1 = document.getElementById("btn-step1");
  const btn2 = document.getElementById("btn-step2");
  const btn3 = document.getElementById("btn-step3");
  const toggleNewPasswordBtn = document.getElementById("toggleNewPasswordBtn");

  const emailInput = document.getElementById("recovery-email");
  const otpInput = document.getElementById("otp-code");
  const newPasswordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  let userEmail = "";
  let verificationToken = "";

  // --- Error Notification Handlers ---
  function showStatus(text, isError = true) {
    uiMessage.textContent = text;
    uiMessage.className = isError
      ? "text-red-600 text-xs font-medium mt-4 block"
      : "text-emerald-600 text-xs font-medium mt-4 block";
  }

  function clearStatus() {
    uiMessage.textContent = "";
    uiMessage.className = "hidden";
  }

  // Password Visibility Toggle ---
  if (toggleNewPasswordBtn && newPasswordInput) {
    const icon = toggleNewPasswordBtn.querySelector(
      ".material-symbols-outlined",
    );
    toggleNewPasswordBtn.addEventListener("click", () => {
      if (newPasswordInput.type === "password") {
        newPasswordInput.type = "text";
        icon.textContent = "visibility_off";
      } else {
        newPasswordInput.type = "password";
        icon.textContent = "visibility";
      }
    });
  }

  // ==========================================
  // STEP 1: Request OTP Submission Execution
  // ==========================================
  form1.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus();
    userEmail = emailInput.value.trim();

    btn1.disabled = true;
    btn1.textContent = "Generating Code...";

    try {
      const response = await fetch(
        "http://localhost:8000/admin/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: userEmail }),
        },
      );
      const data = await response.json();

      if (response.ok) {
        // Transition panel UI safely down to Step 2
        form1.classList.add("hidden");
        form2.classList.remove("hidden");

        dot1.className = "w-2 h-2 rounded-full bg-zinc-200";
        dot2.className = "w-2 h-2 rounded-full bg-orange-600";

        title.textContent = "Verification Required";
        subtitle.textContent = `A validation code was delivered to ${userEmail.substring(0, 3) + "********" + userEmail.substring(userEmail.length - 6)}.`;
        bannerText.textContent = "Check your email.";
      } else {
        showStatus(
          data.message ||
            "Failed to identify specified Administrator email ID.",
        );
        btn1.disabled = false;
        btn1.textContent = "Send Verification Code";
      }
    } catch (err) {
      console.error(err);
      showStatus(
        "Server link timed out. Verify backend network pipeline connectivity status.",
      );
      btn1.disabled = false;
      btn1.textContent = "Send Verification Code";
    }
  });

  // ==========================================
  // STEP 2: Verify Submitted OTP Code Engine
  // ==========================================
  form2.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus();
    const otpValue = otpInput.value.trim();

    btn2.disabled = true;
    btn2.textContent = "Verifying Code...";

    try {
      const response = await fetch("http://localhost:8000/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp: otpValue }),
      });

      console.log(response);
      const data = await response.json();

      if (response.ok) {
        form2.classList.add("hidden");
        form3.classList.remove("hidden");

        dot2.className = "w-2 h-2 rounded-full bg-zinc-200";
        dot3.className = "w-2 h-2 rounded-full bg-orange-600";

        title.textContent = "Update Password";
        subtitle.textContent =
          "Set a secure, brand-new credential pass phrase configuration.";
        bannerText.textContent = "Secure your login.";
      } else {
        showStatus(
          data.message || "Invalid or expired authorization code structure.",
        );
        btn2.disabled = false;
        btn2.textContent = "Verify Code";
      }
    } catch (err) {
      console.error(err);
      showStatus("Connection error encountered during verification execution.");
      btn2.disabled = false;
      btn2.textContent = "Verify Code";
    }
  });

  // ==========================================
  // STEP 3: Rewrite and Update Pass Core Handling
  // ==========================================
  form3.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus();

    const newPass = newPasswordInput.value;
    const confirmPass = confirmPasswordInput.value;

    if (newPass !== confirmPass) {
      showStatus("Passwords do not match. Re-enter matching configurations.");
      return;
    }

    btn3.disabled = true;
    btn3.textContent = "Rewriting Security Hash...";

    try {
      const response = await fetch(
        "http://localhost:8000/admin/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            password: newPass,
            confirmPassword: confirmPass,
          }),
        },
      );
      const data = await response.json();

      if (response.ok) {
        showStatus(
          "Password changed successfully! Redirecting down to dashboard panel...",
          false,
        );

        // Timeout wait window allows operational messaging visibility to register before triggering redirect engine mapping routines
        setTimeout(() => {
          window.location.href = "/admin/login.html";
        }, 2200);
      } else {
        showStatus(data.message || "Failed rewriting user credential records.");
        btn3.disabled = false;
        btn3.textContent = "Update Password & Log In";
      }
    } catch (err) {
      console.error(err);
      showStatus(
        "Operational update pipeline encountered standard link communication interruption.",
      );
      btn3.disabled = false;
      btn3.textContent = "Update Password & Log In";
    }
  });
});
