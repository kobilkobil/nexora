const session = JSON.parse(
  sessionStorage.getItem("nexora-session")
);

if (!session) {
  window.location.href = "login.html";
} else {
  const userName = document.getElementById("userName");
  const profileName = document.getElementById("profileName");
  const userEmail = document.getElementById("userEmail");
  const userAvatar = document.getElementById("userAvatar");

  userName.textContent = session.name;
  profileName.textContent = session.name;
  userEmail.textContent = session.email;
  userAvatar.textContent = session.name.charAt(0).toUpperCase();
}

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("nexora-session");
  window.location.href = "login.html";
});
