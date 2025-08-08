document.addEventListener('DOMContentLoaded', () => {
  const avatar = document.getElementById('avatar');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const accountSettingsBtn = document.getElementById('accountSettingsBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const accountSettings = document.getElementById('account-settings');
  const gameUI = document.getElementById('game-ui');
  const homeBtn = document.getElementById('homeBtn');
  const backBtn = document.getElementById('backBtn');
  const avatarUpload = document.getElementById('avatarUpload');
  const confirmUpload = document.getElementById('confirmUpload');

  let uploadedAvatar = localStorage.getItem('userAvatar');
  if (uploadedAvatar) {
    avatar.src = uploadedAvatar;
  }

  // Toggle dropdown on avatar click
  avatar.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Navigate to account settings
  accountSettingsBtn.addEventListener('click', () => {
    gameUI.style.display = 'none';
    accountSettings.style.display = 'block';
    dropdownMenu.style.display = 'none';
  });

  // Logout logic (basic placeholder)
  logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });

  // Home button shows main UI
  homeBtn.addEventListener('click', () => {
    accountSettings.style.display = 'none';
    gameUI.style.display = 'block';
  });

  // Back button hides settings and shows game UI
  backBtn.addEventListener('click', () => {
    accountSettings.style.display = 'none';
    gameUI.style.display = 'block';
  });

  // Confirm avatar upload
  confirmUpload.addEventListener('click', () => {
    const file = avatarUpload.files[0];
    if (!file) return alert("Please select an image first.");

    const reader = new FileReader();
    reader.onload = () => {
      avatar.src = reader.result;
      localStorage.setItem('userAvatar', reader.result);
      avatarUpload.value = '';
    };
    reader.readAsDataURL(file);
  });
});
