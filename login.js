//Login form
const loginForm = document.getElementById("loginForm");

//Handle form submission
loginForm.addEventListener("submit", function (event) {
    
event.preventDefault();

//Read inputs
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const defaultUsername = "admin";
  const defaultPassword = "admin123";

//Validate login
  if (username === defaultUsername && password === defaultPassword) {
    localStorage.setItem("isLoggedIn", "true");

//Go to dashboard
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password");
  }
});
