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
    avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIA..."
  };
  users.push(newUser);
  saveUsers();
  currentUser = newUser;
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  showHomePage();
  return true;
}

function login(username, password) {
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    showHomePage();
    return true;
  }
  return false;
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  document.getElementById("homePage").style.display = "none";
  document.getElementById("authContainer").style.display = "flex";
  document.querySelector(".tab-content.active").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("loginTab").classList.add("active");
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

function showHomePage() {
  document.getElementById("authContainer").style.display = "none";
  document.getElementById("homePage").style.display = "block";
  if (currentUser && currentUser.avatar) {
    const avatarImg = document.getElementById("avatar");
    if (avatarImg) avatarImg.src = currentUser.avatar;
  }
  document.getElementById("accountSettings").style.display = "none";
  document.getElementById("dropdownMenu").style.display = "none";

  // Update homepage content based on context
  const mainHeader = document.querySelector("#homePage h2");
  const mainParagraph = document.querySelector("#homePage p");
  if (mainHeader && mainParagraph) {
    mainHeader.textContent = "Welcome to the game";
    mainParagraph.textContent = "Game functions will appear here.";
  }
}

function showAccountSettings() {
  document.getElementById("accountSettings").style.display = "block";
  document.getElementById("dropdownMenu").style.display = "none";

  // Change homepage text to reflect account settings context
  const mainHeader = document.querySelector("#homePage h2");
  const mainParagraph = document.querySelector("#homePage p");
  if (mainHeader && mainParagraph) {
    mainHeader.textContent = "Account Settings";
    mainParagraph.textContent = "Upload avatar picture.";
  }
}

// Load avatar and homepage on startup
window.addEventListener("DOMContentLoaded", () => {
  if (currentUser) {
    showHomePage();
  } else {
    document.getElementById("authContainer").style.display = "flex";
  }
});

// Hide dropdown when mouse leaves the avatar or dropdown
window.addEventListener("DOMContentLoaded", () => {
  const avatar = document.getElementById("avatar");
  const dropdown = document.getElementById("dropdownMenu");

  if (avatar && dropdown) {
    avatar.addEventListener("mouseenter", () => {
      dropdown.style.display = "block";
    });

    avatar.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!dropdown.matches(":hover")) {
          dropdown.style.display = "none";
        }
      }, 300);
    });

    dropdown.addEventListener("mouseleave", () => {
      dropdown.style.display = "none";
    });
  }
});
