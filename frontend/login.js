document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Login successful!");
      // You can redirect to dashboard here:
      // window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error. Please try again.");
  }
});
