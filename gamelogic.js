document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const gameUI = document.getElementById("game-ui");
  const accountSettingsSection = document.getElementById("account-settings");
  const homeSection = document.getElementById("home-section");

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");

  const signupUsername = document.getElementById("signup-username");
  const signupPassword = document.getElementById("signup-password");
  const signupEmail = document.getElementById("signup-email");

  const avatarInput = document.getElementById("avatarInput");
  const confirmAvatarBtn = document.getElementById("confirmAvatarBtn");
  const backBtn = document.getElementById("backBtn");
  const homeBtn = document.getElementById("homeBtn");

  function showGameUI(user) {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    gameUI.style.display = "block";
    accountSettingsSection.style.display = "none";
    homeSection.style.display = "block";

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

  const loggedInUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser"));
    } catch (e) {
      localStorage.removeItem("loggedInUser");
      return null;
    }
  })();

  if (loggedInUser) {
    showGameUI(loggedInUser);
  }

  // Avatar dropdown toggle logic
  const avatarIcon = document.getElementById("avatarIcon");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (avatarIcon && dropdownMenu) {
    avatarIcon.addEventListener("click", function () {
      const isVisible = dropdownMenu.style.display === "flex";
      dropdownMenu.style.display = isVisible ? "none" : "flex";
    });

    document.addEventListener("click", function (event) {
      if (!avatarIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
      }
    });
  }

  // Navigation buttons
  document.getElementById("accountSettingsBtn").addEventListener("click", function () {
    gameUI.style.display = "none";
    accountSettingsSection.style.display = "block";
  });

  backBtn.addEventListener("click", function () {
    accountSettingsSection.style.display = "none";
    gameUI.style.display = "block";
  });

  homeBtn.addEventListener("click", function () {
    accountSettingsSection.style.display = "none";
    gameUI.style.display = "block";
  });

  confirmAvatarBtn.addEventListener("click", function () {
    const file = avatarInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const avatarUrl = e.target.result;
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      user.avatar = avatarUrl;
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      const users = getStoredUsers();
      const updatedUsers = users.map(u => u.username === user.username ? user : u);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      document.getElementById("avatarIcon").style.backgroundImage = `url(${avatarUrl})`;
      accountSettingsSection.style.display = "none";
      gameUI.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
});
