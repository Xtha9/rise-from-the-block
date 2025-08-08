// Game logic for Rise from the Block
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const gameUI = document.getElementById("game-ui");
const userDisplay = document.getElementById("user-display");
const avatarIcon = document.getElementById("avatarIcon");
const avatarUpload = document.getElementById("avatarUpload");
const avatarConfirmBtn = document.getElementById("avatarConfirmBtn");

let users = JSON.parse(localStorage.getItem("users")) || {};
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function updateAvatarDisplay(user) {
  const defaultAvatar = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
  avatarIcon.style.backgroundImage = `url('${user.avatar || defaultAvatar}')`;
}

function showGameUI(user) {
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  gameUI.style.display = "block";
  document.getElementById("account-settings").style.display = "none";
  userDisplay.textContent = "";
  updateAvatarDisplay(user);
}

if (loggedInUser && users[loggedInUser.username]) {
  showGameUI(users[loggedInUser.username]);
}

document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  if (users[username] && users[username].password === password) {
    loggedInUser = { username };
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    showGameUI(users[username]);
  } else {
    alert("Invalid login credentials");
  }
});

document.getElementById("signupBtn").addEventListener("click", () => {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const email = document.getElementById("signup-email").value;
  if (!users[username]) {
    users[username] = { username, password, email, avatar: "" };
    saveUsers();
    alert("Signup successful. Please log in.");
  } else {
    alert("Username already exists");
  }
});

let tempAvatarData = null;

avatarUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (file && loggedInUser) {
    const reader = new FileReader();
    reader.onload = function (e) {
      tempAvatarData = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

avatarConfirmBtn.addEventListener("click", function () {
  if (tempAvatarData && loggedInUser) {
    users[loggedInUser.username].avatar = tempAvatarData;
    saveUsers();
    updateAvatarDisplay(users[loggedInUser.username]);
    alert("Avatar updated successfully!");
    tempAvatarData = null;
  }
});
