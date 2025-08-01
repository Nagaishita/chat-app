document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await res.json();

    if (res.status === 201) {
      alert("Successfully signed up");
    } else if (res.status === 409) {
      alert("User already exists, Please Login");
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (err) {
    alert("Could not connect to server.");
    console.error(err);
  }
});
