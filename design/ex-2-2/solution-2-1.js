document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  
  // Check if a theme is already stored in localStorage
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) {
      themeStylesheet.setAttribute('href', savedTheme);
  }

  // Add theme toggle functionality
  themeToggleButton.addEventListener('click', function () {
      if (themeStylesheet.getAttribute('href') === 'solution-2-1-light.css') {
          themeStylesheet.setAttribute('href', 'solution-2-1-dark.css');
          localStorage.setItem('site-theme', 'solution-2-1-dark.css');
      } else {
          themeStylesheet.setAttribute('href', 'solution-2-1-light.css');
          localStorage.setItem('site-theme', 'solution-2-1-light.css');
      }
  });
});