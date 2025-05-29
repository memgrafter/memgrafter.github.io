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

  // Define sunset colors in RGB format with more distinct stops
  const sunsetColors = [
    [255, 107, 107], // Deeper Reddish Orange (e.g., #FF6B6B)
    [255, 159, 66],  // Vibrant Orange (e.g., #FF9F42)
    [255, 199, 119], // Softer Peach/Orange (e.g., #FFC777)
    [255, 224, 130]  // Light Yellow/Gold (e.g., #FFE082)
  ];

  // Helper function for linear interpolation
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Helper function to interpolate between two RGB colors
  function interpolateColor(color1, color2, factor) {
    const r = Math.round(lerp(color1[0], color2[0], factor));
    const g = Math.round(lerp(color1[1], color2[1], factor));
    const b = Math.round(lerp(color1[2], color2[2], factor));
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Helper function to get a color from a multi-stop gradient based on a normalized position
  function getGradientColor(colors, normalizedPosition) {
    if (normalizedPosition <= 0) return `rgb(${colors[0].join(',')})`;
    if (normalizedPosition >= 1) return `rgb(${colors[colors.length - 1].join(',')})`;

    // Determine which segment of the gradient the position falls into
    const segmentLength = 1 / (colors.length - 1);
    const segmentIndex = Math.floor(normalizedPosition / segmentLength);
    // Calculate factor within that segment (0 to 1)
    const segmentFactor = (normalizedPosition % segmentLength) / segmentLength;

    const color1 = colors[segmentIndex];
    const color2 = colors[Math.min(segmentIndex + 1, colors.length - 1)]; // Ensure we don't go out of bounds

    return interpolateColor(color1, color2, segmentFactor);
  }

  if (numTitles === 0) {
    return; // No titles to process
  }

  postTitles.forEach((title, index) => {
    // Calculate a normalized position (0 to 1) for the current title
    // If only one title, it gets the start color (position 0).
    const normalizedPosition = numTitles === 1 ? 0 : index / (numTitles - 1);

    // Get the interpolated color for this position from the sunset gradient
    const color = getGradientColor(sunsetColors, normalizedPosition);

    // Apply the calculated color to the title's text
    title.style.color = color;
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
