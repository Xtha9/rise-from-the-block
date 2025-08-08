// gamelogic.js

// Basic user authentication simulation
let currentUser = null;
let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function signup(username, password) {
  if (users.some((u) => u.username === username)) {
    alert("Username already exists");
    return false;
  }
  users.push({ username, password, avatar: "default-avatar.png" });
  saveUsers();
  return true;
}

function login(username, password) {
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    alert("Invalid login credentials");
    return false;
  }
  currentUser = user;
  return true;
}

function logout() {
  currentUser = null;
}

function updateAvatarImage(file) {
  if (!currentUser) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    currentUser.avatar = event.target.result;
    saveUsers();
    document.getElementById("avatar").src = currentUser.avatar;
  };
  reader.readAsDataURL(file);
}

// Event listeners that should stay inside HTML or separate controller file.
// Only keep game-specific logic here moving forward.

// Add game-specific logic like jobs, stats, levels, money, etc. here.
