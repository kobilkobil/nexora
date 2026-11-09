
// NEXORA AUTHENTICATION

// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");
    const button = registerForm.querySelector("button[type='submit']");

    if (password.length < 8) {
      message.textContent = "Password minimal 8 karakter.";
      return;
    }

    button.disabled = true;
    message.textContent = "Memproses pendaftaran...";

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    button.disabled = false;

    if (error) {
      message.textContent = error.message;
      return;
    }

    registerForm.reset();

    if (data.session) {
      message.textContent = "Registrasi berhasil! Mengalihkan...";
      window.location.href = "dashboard.html";
    } else {
      message.textContent =
        "Pendaftaran berhasil! Periksa email untuk verifikasi, lalu login.";
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");
    const button = loginForm.querySelector("button[type='submit']");

    button.disabled = true;
    message.textContent = "Memeriksa akun...";

    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

    button.disabled = false;

    if (error) {
      message.textContent = error.message;
      return;
    }

    message.textContent = "Login berhasil!";

    window.location.href = "dashboard.html";
  });
}

