// Define sunsetColors globally as it's used by multiple functions
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

  const segmentLength = 1 / (colors.length - 1);
  const segmentIndex = Math.floor(normalizedPosition / segmentLength);
  const segmentFactor = (normalizedPosition % segmentLength) / segmentLength;

  const color1 = colors[segmentIndex];
  const color2 = colors[Math.min(segmentIndex + 1, colors.length - 1)];

  return interpolateColor(color1, color2, segmentFactor);
}

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

  if (numTitles === 0) {
    return; // No titles to process
  }

  postTitles.forEach((title, index) => {
    // Calculate a normalized position (0 to 1) for the current title
    const normalizedPosition = index / (numTitles > 1 ? numTitles - 1 : 1);

    // Get the interpolated color for this position from the sunset gradient
    const color = getGradientColor(sunsetColors, normalizedPosition);

    // Apply the calculated color as a linear gradient for text fill
    title.style.backgroundImage = `linear-gradient(to right, ${color}, ${color})`;
    title.style.webkitBackgroundClip = 'text';
    title.style.webkitTextFillColor = 'transparent';
    title.style.backgroundClip = 'text';
    title.style.textFillColor = 'transparent';
  });
}

// New function to handle post visibility and toggle functionality
function handlePostVisibilityAndToggle() {
  const postListItems = document.querySelectorAll('.post-list-item');
  // Assuming the post list items are directly within a container like <ul class="post-list"> or <div class="post-list">
  // If your posts are directly under main.page-content .w, you might need to adjust this selector.
  // For now, let's assume there's a parent container for the list items.
  const postListContainer = document.querySelector('.post-list') || document.querySelector('main.page-content .w');

  if (!postListItems.length || !postListContainer) {
    return; // Exit if elements not found
  }

  const initialVisiblePosts = 5;
  let downArrow = document.getElementById('downArrow');
  let upArrow = document.getElementById('upArrow');

  // Helper to create and style an arrow element
  function createArrow(id, char, color, opacity = 1) { // Added opacity parameter
    const arrow = document.createElement('div');
    arrow.id = id;
    arrow.className = 'post-toggle-arrow';
    arrow.textContent = char;
    arrow.style.color = color; // Apply the calculated gradient color
    arrow.style.opacity = opacity; // Apply opacity
    return arrow;
  }

  // Helper to get the appropriate gradient color for an arrow based on its conceptual index
  function getArrowColorForIndex(index) {
    const numTitles = postListItems.length;
    if (numTitles === 0) return `rgb(${sunsetColors[0].join(',')})`; // Default if no titles

    // Calculate normalized position for the arrow (representing the 'next' post in the gradient sequence)
    // If the arrow is for "show more", its color should be based on the first hidden post.
    // If the arrow is for "show less", its color should be based on the last visible post.
    const normalizedPosition = index / (numTitles > 1 ? numTitles - 1 : 1);
    return getGradientColor(sunsetColors, normalizedPosition);
  }

  // Function to set the initial state of posts (first 5 visible, with fading)
  function showInitialState() {
    // Remove any existing arrows before setting the state
    if (downArrow) downArrow.remove();
    if (upArrow) upArrow.remove();

    postListItems.forEach((item, index) => {
      item.style.display = 'block'; // Ensure all are visible before applying specific rules
      item.style.opacity = '1'; // Reset opacity for all items

      if (index >= initialVisiblePosts) {
        item.style.display = 'none'; // Hide posts beyond the initial count
      } else if (index === initialVisiblePosts - 2) { // 4th post (index 3)
        item.style.opacity = '0.75';
      } else if (index === initialVisiblePosts - 1) { // 5th post (index 4)
        item.style.opacity = '0.5';
      }
    });

    // Only show down arrow if there are more posts to reveal than the initial visible count
    if (postListItems.length > initialVisiblePosts) {
      const arrowColor = getArrowColorForIndex(initialVisiblePosts); // Color for the 6th post's position
      downArrow = createArrow('downArrow', '▼', arrowColor, 0.3); // Set opacity for down arrow
      postListContainer.appendChild(downArrow);
      downArrow.addEventListener('click', showAllPosts);
    }
  }

  // Function to show all posts and replace the down arrow with an up arrow
  function showAllPosts() {
    postListItems.forEach(item => {
      item.style.display = 'block'; // Make all posts visible
      item.style.opacity = '1'; // Ensure full opacity when all are shown
    });

    // Remove the down arrow
    if (downArrow) downArrow.remove();

    // Add the up arrow at the end of the post list
    // The up arrow's color should be based on the last post's position
    const arrowColor = getArrowColorForIndex(postListItems.length - 1);
    upArrow = createArrow('upArrow', '^', arrowColor); // Up arrow remains full opacity
    postListContainer.appendChild(upArrow);
    upArrow.addEventListener('click', showInitialState); // Attach listener to revert to initial state
  }

  // Call the initial state function when this script runs
  showInitialState();
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

  // Handle post visibility and toggle functionality
  handlePostVisibilityAndToggle();

  // Attach mode switcher to the theme toggle button if it exists
  const themeToggleButton = document.getElementById('theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', modeSwitcher);
  }
});

// Re-apply post visibility on window resize to adjust to new height
window.addEventListener('resize', handlePostVisibilityAndToggle);
