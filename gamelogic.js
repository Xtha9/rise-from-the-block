// Helper: get all users from storage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || {};
}

// Helper: save all users to storage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Auto-create owner account (if it doesn't exist)
const defaultOwner = {
  username: "X",
  password: "SmileKid18$",
  email: "sicrug@gmail.com",
  role: "owner"
};

const allUsers = getUsers();
if (!allUsers["X"]) {
  allUsers["X"] = defaultOwner;
  saveUsers(allUsers);
}

function login(username, password) {
  const users = getUsers();
  const user = users[username];
  if (user && user.password === password) {
    localStorage.setItem("loggedInUser", username);
    updateUI();
  } else {
    alert("Invalid username or password.");
  }
}

function signup(username, password, email) {
  if (!username || !password || !email) {
    alert("Please fill out all fields.");
    return;
  }

  if (username.length < 1 || username.length > 40) {
    alert("Username must be between 1 and 40 characters.");
    return;
  }

  const users = getUsers();
  if (users[username]) {
    alert("Username already exists.");
    return;
  }

  users[username] = { username, password, email };
  saveUsers(users);
  localStorage.setItem("loggedInUser", username);
  updateUI();
}

function logout() {
  localStorage.removeItem("loggedInUser");
  updateUI();
}

function updateUI() {
  const currentUser = localStorage.getItem("loggedInUser");
  document.getElementById("login-form").style.display = currentUser ? "none" : "block";
  document.getElementById("signup-form").style.display = currentUser ? "none" : "block";
  document.getElementById("game-ui").style.display = currentUser ? "block" : "none";

  if (currentUser) {
    document.getElementById("user-display").innerText = "Logged in as: " + currentUser;
  } else {
    document.getElementById("user-display").innerText = "";
  }
}

document.getElementById("loginBtn").onclick = () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  login(username, password);
};

document.getElementById("signupBtn").onclick = () => {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value;
  const email = document.getElementById("signup-email").value.trim();
  signup(username, password, email);
};

window.onload = () => {
  updateUI();
};
