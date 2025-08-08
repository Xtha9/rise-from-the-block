// =========================
// GameLogic.js (Fresh Version for Rise from the Block)
// =========================

// LocalStorage-based user system
const users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function saveCurrentUser() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  updateUI();
}

function login(username, password) {
  if (!users[username]) return alert("User not found.");
  if (users[username].password !== password) return alert("Incorrect password.");
  currentUser = users[username];
  saveCurrentUser();
  updateUI();
}

function signup(username, password, email) {
  if (users[username]) return alert("Username already taken.");
  if (username.length < 1 || username.length > 20) return alert("Username must be 1-20 characters.");

  users[username] = {
    email,
    password
  };

  saveUsers();
  login(username, password);
}

function updateUI() {
  const gameUI = document.getElementById("game-ui");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const userDisplay = document.getElementById("user-display");

  if (currentUser) {
    if (gameUI) gameUI.style.display = "block";
    if (loginForm) loginForm.style.display = "none";
    if (signupForm) signupForm.style.display = "none";
    if (userDisplay) userDisplay.innerText = `Welcome, ${getUsernameByUser(currentUser)}!`;
  } else {
    if (gameUI) gameUI.style.display = "none";
    if (loginForm) loginForm.style.display = "block";
    if (signupForm) signupForm.style.display = "block";
    if (userDisplay) userDisplay.innerText = "";
  }
}

function getUsernameByUser(userObj) {
  return Object.keys(users).find((key) => users[key].email === userObj.email) || "";
}

// On page load, check for saved session
window.onload = () => {
  updateUI();
};
