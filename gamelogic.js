// Helper to get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Helper to save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Handle signup
document.getElementById("signupBtn").addEventListener("click", () => {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const email = document.getElementById("signup-email").value.trim();

  if (!username || !password || !email) {
    alert("Please fill out all fields.");
    return;
  }

  const users = getUsers();
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    alert("Username already exists.");
    return;
  }

  const newUser = { username, password, email, avatar: "" };
  users.push(newUser);
  saveUsers(users);
  alert("Signup successful! You can now log in.");
});

// Handle login
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("game-ui").style.display = "block";

    if (user.avatar) {
      document.getElementById("avatarIcon").style.backgroundImage = `url(${user.avatar})`;
    }
  } else {
    alert("Invalid login credentials");
  }
});

// Auto-login if user already stored
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("game-ui").style.display = "block";

    if (user.avatar) {
      document.getElementById("avatarIcon").style.backgroundImage = `url(${user.avatar})`;
    }
  }
});
