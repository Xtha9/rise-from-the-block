/* style.css */

body {
  background-color: #111;
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#authContainer {
  display: flex;
  height: 100vh;
}

.tab-container {
  display: flex;
  flex-direction: column;
  width: 80px;
  background-color: #333;
}

.tab {
  padding: 20px 10px;
  text-align: center;
  cursor: pointer;
  background-color: #444;
  color: white;
  border: none;
  outline: none;
}

.tab.active {
  background-color: #222;
}

.tab-content {
  flex: 1;
  display: none;
  padding: 20px;
}

.tab-content.active {
  display: block;
}

input[type="text"],
input[type="password"],
input[type="email"] {
  padding: 8px;
  margin: 5px 0;
  width: 200px;
}

button {
  padding: 8px 12px;
  margin-top: 10px;
}

#homePage {
  display: none;
  padding: 20px;
}

#avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: none; /* Hide by default until user is logged in */
}

#dropdownMenu {
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #222;
  border: 1px solid #555;
  padding: 10px;
  display: none;
  z-index: 1000;
}

#dropdownMenu button {
  display: block;
  background: none;
  border: none;
  color: white;
  text-align: left;
  width: 100%;
  padding: 5px 0;
}

#accountSettings {
  display: none;
  margin-top: 20px;
}

h2, p {
  margin: 0 0 10px 0;
}
