document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const gameUI = document.getElementById("game-ui");

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");

  const signupUsername = document.getElementById("signup-username");
  const signupPassword = document.getElementById("signup-password");
  const signupEmail = document.getElementById("signup-email");

  function showGameUI(user) {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    gameUI.style.display = "block";

    const avatarIcon = document.getElementById("avatarIcon");
    if (user.avatar) {
      avatarIcon.style.backgroundImage = `url(${user.avatar})`;
    } else {
      avatarIcon.style.backgroundImage = "none";
    }
  }

  function getStoredUsers() {
    try {
      const data = JSON.parse(localStorage.getItem("users"));
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn("Corrupted users data in localStorage. Resetting.");
      localStorage.removeItem("users");
      return [];
    }
  }

  loginBtn.addEventListener("click", function () {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    const users = getStoredUsers();
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      showGameUI(foundUser);
    } else {
      alert("Invalid login credentials");
    }
  });

  signupBtn.addEventListener("click", function () {
    const username = signupUsername.value.trim();
    const password = signupPassword.value.trim();
    const email = signupEmail.value.trim();

    if (!username || !password || !email) {
      alert("Please fill out all fields");
      return;
    }

    let users = getStoredUsers();

    if (users.some((user) => user.username === username)) {
      alert("Username already exists");
      return;
    }

    const newUser = { username, password, email, avatar: "" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    showGameUI(newUser);
  });

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    showGameUI(loggedInUser);
  }
});
