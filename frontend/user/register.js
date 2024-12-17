const baseURL = "http://127.0.0.1:8000";


document.getElementById("register-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      document.getElementById("register-message").style.color = "green";
      document.getElementById("register-message").innerText = "Registration successful!";
      window.location.href = "./login.html"; 
    } else {
      document.getElementById("register-message").style.color = "red";
      document.getElementById("register-message").innerText = data.detail || "Registration failed!";
    }
  } catch (error) {
    document.getElementById("register-message").innerText = "An error occurred!";
  }
});
