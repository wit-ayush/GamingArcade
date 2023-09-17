function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
      screen.classList.remove('active');
  });

  const activeScreen = document.getElementById(screenId);
  activeScreen.classList.add('active');
}
