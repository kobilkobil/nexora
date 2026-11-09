const getUsers = () => {
  return JSON.parse(localStorage.getItem("nexora-users")) || [];
};

const saveUsers = (users) => {
  localStorage.setItem("nexora-users", JSON.stringify(users));
};

// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    const users = getUsers();

    if (password.length < 8) {
      message.textContent = "Password minimal 8 karakter.";
      return;
    }

    if (users.some(user => user.email === email)) {
      message.textContent = "Email sudah terdaftar.";
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    message.textContent = "Registrasi berhasil! Silakan login.";
    registerForm.reset();
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    const users = getUsers();

    const user = users.find(
      user => user.email === email && user.password === password
    );

    if (!user) {
      message.textContent = "Email atau password salah.";
      return;
    }

    sessionStorage.setItem(
      "nexora-session",
      JSON.stringify({
        name: user.name,
        email: user.email
      })
    );

    window.location.href = "dashboard.html";
  });
}
