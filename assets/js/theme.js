// Function to set the theme
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Function to toggle between light and dark mode
function modeSwitcher() {
  let currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// Function to apply sunset gradient to post titles
function applySunsetGradientToTitles() {
  const postTitles = document.querySelectorAll('.post-list-item a');
  const numTitles = postTitles.length;

  if (numTitles <= 1) {
    // If there's only one or no title, apply a default position
    if (numTitles === 1) {
      postTitles[0].style.backgroundPositionX = '0%';
    }
    return;
  }

  postTitles.forEach((title, index) => {
    // Calculate a normalized position (0 to 1) for the current title
    // This will range from 0 for the first title to 1 for the last
    const normalizedPosition = index / (numTitles - 1);

    // Map the normalized position to a background-position-x value
    // For background-size: 200%, 0% shows the start, -100% shows the end of the gradient
    const backgroundPositionX = -(normalizedPosition * 100); // Value from 0 to -100

    title.style.backgroundPositionX = `${backgroundPositionX}%`;
  });
}

// Check for saved theme preference or system preference on load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  } else {
    setTheme('light'); // Default to light if no preference is found
  }

  // Add a class to html to enable smooth transitions after initial load
  setTimeout(() => {
    document.documentElement.classList.add('transition');
  }, 100);

  // Apply the sunset gradient to titles after the DOM is loaded
  applySunsetGradientToTitles();
});
