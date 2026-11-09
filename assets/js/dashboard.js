// NEXORA DASHBOARD AUTH

async function loadDashboard() {
  const { data: { user }, error } =
    await supabaseClient.auth.getUser();

  if (error || !user) {
    window.location.replace("login.html");
    return;
  }

  const name =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "User";

  document.getElementById("userName").textContent = name;
  document.getElementById("profileName").textContent = name;
  document.getElementById("userEmail").textContent = user.email || "";
  document.getElementById("userAvatar").textContent =
    name.charAt(0).toUpperCase();

  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", async () => {
    logoutBtn.disabled = true;

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      logoutBtn.disabled = false;
      alert("Logout gagal: " + error.message);
      return;
    }

    window.location.replace("login.html");
  });
}

loadDashboard();
