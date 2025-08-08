// GameLogic.js

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function signup(username, password, email) {
  if (users.some(user => user.username === username)) {
    return false;
  }
  const newUser = {
    username,
    password,
    email,
    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA..." // default Base64 avatar
  };
  users.push(newUser);
  saveUsers();
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  return true;
}

function login(username, password) {
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
  return false;
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
}

function updateAvatarImage(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const base64Image = e.target.result;
    if (currentUser) {
      const userIndex = users.findIndex(u => u.username === currentUser.username);
      if (userIndex !== -1) {
        users[userIndex].avatar = base64Image;
        saveUsers();
        currentUser.avatar = base64Image;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        document.getElementById("avatar").src = base64Image;
      }
    }
  };
  reader.readAsDataURL(file);
}

// Load avatar on startup
window.addEventListener("DOMContentLoaded", () => {
  if (currentUser && currentUser.avatar) {
    const avatarImg = document.getElementById("avatar");
    if (avatarImg) avatarImg.src = currentUser.avatar;
  }
});
