const baseURL = "http://127.0.0.1:8000";

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        document.getElementById("login-message").style.color = "green";
        document.getElementById("login-message").innerText = "Login successful!";
        window.location.href = "../index.html"; 
        localStorage.setItem("token", data.access_token);
      } else {
        document.getElementById("login-message").style.color = "red";
        document.getElementById("login-message").innerText = data.detail || "Login failed!";
      }
    } catch (error) {
      document.getElementById("login-message").innerText = "An error occurred!";
    }
  });
  