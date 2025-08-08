// gamelogic.js

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let users = JSON.parse(localStorage.getItem("users")) || [];

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function saveCurrentUser() {
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function signup(username, password) {
  if (users.some((u) => u.username === username)) {
    alert("Username already exists");
    return false;
  }
  const newUser = {
    username,
    password,
    avatar:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABFElEQVR4nO3QQQkAIAwDsIv+Y60HXYQQaZB1fTKa9u79Hy5cuXLiwoULFixYtXrw4cfLkyeP///fVJzq//V6uV3Z4Hh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0YHh0aADoWgGqaPPY9EAAAAASUVORK5CYII="
  };
  users.push(newUser);
  saveUsers();
  currentUser = newUser;
  saveCurrentUser();
  return true;
}

function login(username, password) {
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    alert("Invalid login credentials");
    return false;
  }
  currentUser = user;
  saveCurrentUser();
  updateAvatarOnPage();
  return true;
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("avatar").src = "";
}

function updateAvatarImage(file) {
  if (!currentUser) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    currentUser.avatar = event.target.result;
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      users[userIndex] = currentUser;
      saveUsers();
      saveCurrentUser();
      updateAvatarOnPage();
    }
  };
  reader.readAsDataURL(file);
}

function updateAvatarOnPage() {
  const avatarImg = document.getElementById("avatar");
  if (avatarImg && currentUser && currentUser.avatar) {
    avatarImg.src = currentUser.avatar;
  }
}

// Make sure avatar updates on page load if logged in
document.addEventListener("DOMContentLoaded", () => {
  updateAvatarOnPage();
});
