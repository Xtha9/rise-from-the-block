// Auto-create owner account
const ownerAccount = {
  username: "X",
  password: "SmileKid18$",
  email: "sicrug@gmail.com",
  role: "owner"
};

const existingUser = localStorage.getItem("user");
if (!existingUser) {
  localStorage.setItem("user", JSON.stringify(ownerAccount));
}

function login(username, password) {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser && savedUser.username === username && savedUser.password === password) {
    localStorage.setItem("loggedIn", "true");
    updateUI();
  } else {
    alert("Invalid username or password");
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

  const user = { username, password, email };
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");
  updateUI();
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  updateUI();
}

function updateUI() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  document.getElementById("login-form").style.display = isLoggedIn ? "none" : "block";
  document.getElementById("signup-form").style.display = isLoggedIn ? "none" : "block";
  document.getElementById("game-ui").style.display = isLoggedIn ? "block" : "none";
}

// Hook up UI on load
window.onload = () => {
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

  updateUI();
};
