const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      const token = data?._token ?? data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      alert(data?.message ?? "Login successful!");
      return;
    }

    alert(data?.message ?? "Login failed. Please check your credentials.");
  } catch (error) {
    console.error("Error:", error);
    alert("Erreur réseau.");
  }
});
