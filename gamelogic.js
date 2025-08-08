// GameLogic.js

let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function signup(username, password, email = "", avatar = "") {
  if (users.some(u => u.username === username)) return false;
  const user = { username, password, email, avatar: avatar || defaultAvatar }; // Store email & avatar
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));
  return true;
}

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem("currentUser");
}

function updateAvatarImage(file) {
  const reader = new FileReader();
  reader.onload = function () {
    const imageData = reader.result;
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
      users[userIndex].avatar = imageData;
      currentUser.avatar = imageData;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      document.getElementById("avatar").src = imageData;
    }
  };
  reader.readAsDataURL(file);
}

const defaultAvatar =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjQiIGN5PSI0MiIgcj0iMzIiIGZpbGw9IiM1NTUiIC8+PHJlY3QgeT0iODAiIHdpZHRoPSIxMjgiIGhlaWdodD0iNDgiIGZpbGw9IiMzMzMiIC8+PC9zdmc+";

// Initialize avatar from current user if logged in
window.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar");
  if (currentUser && currentUser.avatar) {
    avatar.src = currentUser.avatar;
  } else {
    avatar.src = defaultAvatar;
  }
});
