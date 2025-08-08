// gamelogic.js
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function saveCurrentUser(user) {
  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function signup(username, password) {
  if (users.some(user => user.username === username)) {
    alert("Username already taken");
    return false;
  }
  const newUser = {
    username,
    password,
    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABGklEQVR4nO3PMQ0AIAwDsJn/pT3sQgAIg+L+ZxgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQoigJw3gAbeOYHV9zfgb8gST7ZHyF5EMo3QZQiilNQpRSmFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFJUaYUpRSFLV/nUX0r9+fpwAAAABJRU5ErkJggg=="
  };
  users.push(newUser);
  saveUsers();
  saveCurrentUser(newUser);
  return true;
}

function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert("Invalid credentials");
    return false;
  }
  saveCurrentUser(user);
  return true;
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUser = null;
}

function updateAvatarImage(file) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const base64 = event.target.result;
    if (currentUser) {
      currentUser.avatar = base64;
      users = users.map(user =>
        user.username === currentUser.username ? currentUser : user
      );
      saveUsers();
      saveCurrentUser(currentUser);
      document.getElementById("avatar").src = base64;
    }
  };
  reader.readAsDataURL(file);
}

// Auto-login and avatar restore
window.addEventListener("DOMContentLoaded", () => {
  if (currentUser) {
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("gameSection").classList.remove("hidden");
    document.getElementById("avatar").src = currentUser.avatar;
  }
});
