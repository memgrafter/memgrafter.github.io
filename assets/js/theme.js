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

// --- Post Fold Functionality ---
const MIN_VISIBLE_POSTS = 5; // Minimum number of posts to always show
let allPostsCurrentlyShown = false; // State to track if all posts are revealed

function applyPostFold() {
  const postListItems = document.querySelectorAll('.post-list-item');
  const toggleButton = document.getElementById('togglePostsButton');
  const header = document.querySelector('header.w');
  const footer = document.querySelector('footer.w'); // Assuming footer also has class 'w' or similar

  if (!postListItems.length || !toggleButton || !header || !footer) {
    return; // Exit if elements not found
  }

  const totalPosts = postListItems.length;

  // Temporarily make all posts visible to accurately measure height
  // This is crucial for correct height calculation on resize or initial load
  postListItems.forEach(item => item.classList.remove('is-hidden'));

  // Get heights after ensuring elements are visible
  const headerHeight = header.offsetHeight;
  const footerHeight = footer.offsetHeight;
  // Calculate average post item height including its margin-bottom
  let postItemHeight = 0;
  if (postListItems.length > 0) {
    // Use the first item to get its height and margin
    postItemHeight = postListItems[0].offsetHeight + parseFloat(getComputedStyle(postListItems[0]).marginBottom);
  }

  const viewportHeight = window.innerHeight;

  // Calculate available height for posts
  // Subtract header, footer, and a small buffer for button/padding
  const availableHeight = viewportHeight - headerHeight - footerHeight - 100; // 100px buffer for button/general padding

  let dynamicVisiblePosts = 0;
  if (postItemHeight > 0) {
    dynamicVisiblePosts = Math.floor(availableHeight / postItemHeight);
  }

  // Ensure minimum visible posts
  const numPostsToShow = Math.max(MIN_VISIBLE_POSTS, dynamicVisiblePosts);

  // If all posts can fit or there are fewer than MIN_VISIBLE_POSTS, hide the button
  if (totalPosts <= numPostsToShow) {
    toggleButton.style.display = 'none';
    postListItems.forEach(item => item.classList.remove('is-hidden')); // Ensure all are visible
    allPostsCurrentlyShown = true; // Set state to true as all are visible
    return;
  } else {
    toggleButton.style.display = 'block'; // Show the button
  }

  // Apply fold based on current state
  if (!allPostsCurrentlyShown) {
    // Hide posts beyond the calculated number
    postListItems.forEach((item, index) => {
      if (index >= numPostsToShow) {
        item.classList.add('is-hidden');
      } else {
        item.classList.remove('is-hidden');
      }
    });
    toggleButton.textContent = `Show All ${totalPosts - numPostsToShow} Posts`;
  } else {
    // All posts are already shown, update button to "Show Less"
    postListItems.forEach(item => item.classList.remove('is-hidden'));
    toggleButton.textContent = `Show Less`;
  }
}

// Event listener for the fold button
document.addEventListener('click', (event) => {
  if (event.target && event.target.id === 'togglePostsButton') {
    const postListItems = document.querySelectorAll('.post-list-item');
    const toggleButton = event.target;
    const totalPosts = postListItems.length;

    allPostsCurrentlyShown = !allPostsCurrentlyShown; // Toggle state

    if (allPostsCurrentlyShown) {
      // Reveal all posts
      postListItems.forEach(item => item.classList.remove('is-hidden'));
      toggleButton.textContent = `Show Less`;
    } else {
      // Re-apply fold based on dynamic calculation
      applyPostFold(); // This will re-calculate and hide
    }
  }
});


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

  // Apply the post fold functionality
  // Use a small timeout to ensure all CSS is rendered and heights are accurate
  setTimeout(applyPostFold, 150);
});

// Re-apply fold on window resize to adjust to new height
window.addEventListener('resize', applyPostFold);
