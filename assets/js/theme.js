// Add this at the very top of the script to apply the loading class immediately
document.documentElement.classList.add('js-loading');

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

// Debounce utility function
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// NEW FUNCTION: Calculate the number of posts that can initially fit
function calculateInitialVisiblePosts(postListItems) {
  const minVisiblePosts = 5; // Minimum number of posts to always show
  if (postListItems.length === 0) {
    return minVisiblePosts;
  }

  // Assuming header and footer elements exist with these tags
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  if (!header || !footer) {
    console.warn("Could not find header or footer elements. Defaulting to minVisiblePosts.");
    return minVisiblePosts;
  }

  const headerHeight = header.offsetHeight;
  const footerHeight = footer.offsetHeight;
  const windowHeight = window.innerHeight;

  // Estimate the height of the down arrow and some general padding/margin buffer.
  // This is an approximation as the arrow is added dynamically.
  // You might need to adjust this value (in pixels) based on your site's specific layout
  // to ensure the arrow and footer fit comfortably without scrollbars appearing prematurely.
  const arrowAndPaddingBuffer = 60;

  // Calculate available height and round it to the nearest integer.
  // This provides a slightly less conservative estimate than Math.floor,
  // which can help at fractional pixel boundaries.
  let availableHeightForPosts = Math.round(windowHeight - headerHeight - footerHeight - arrowAndPaddingBuffer);

  // Ensure availableHeightForPosts is not negative
  if (availableHeightForPosts < 0) availableHeightForPosts = 0;

  let visibleCount = 0;
  let currentAccumulatedHeight = 0;

  // Iterate through posts to see how many fit
  for (let i = 0; i < postListItems.length; i++) {
    const item = postListItems[i];
    const itemStyle = getComputedStyle(item);
    // Calculate item height including margins, and ceil it to the nearest integer.
    // This ensures we account for the full space an item might occupy, including sub-pixel rendering.
    const itemHeight = Math.ceil(item.offsetHeight + parseFloat(itemStyle.marginTop) + parseFloat(itemStyle.marginBottom));

    if ((currentAccumulatedHeight + itemHeight) <= availableHeightForPosts) {
      currentAccumulatedHeight += itemHeight;
      visibleCount++;
    } else {
      break; // No more posts fit
    }
  }

  // Ensure at least minVisiblePosts are always shown
  return Math.max(visibleCount, minVisiblePosts);
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

// Function to apply one shared sunset gradient sequence across post accent elements
function applySunsetGradientToPostAccentElements() {
  const accentElements = Array.from(document.querySelectorAll(
    '.post .post-title, .post .post-meta, .post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6, .post-content a, .post-content em, .post-content i, .post-content strong, .post-content b, .post-content code, .post-content del, .post-content s, .post-content abbr, .post-content hr, .post-content blockquote, .post-content blockquote p'
  )).filter((el) => !el.closest('pre'));

  const numElements = accentElements.length;

  if (numElements === 0) {
    return; // No accent elements to process
  }

  accentElements.forEach((el, index) => {
    const normalizedPosition = index / (numElements > 1 ? numElements - 1 : 1);
    const color = getGradientColor(sunsetColors, normalizedPosition);

    if (el.tagName === 'HR') {
      el.style.borderTopColor = color;
      el.style.borderColor = color;
    } else {
      el.style.color = color;
    }
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
    // If elements not found, ensure the page becomes visible
    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');
    return; // Exit if elements not found
  }

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

  // Function to set the initial state of posts (first N visible, with fading)
  function showInitialState() {
    // Ensure all posts are temporarily visible to get accurate measurements
    postListItems.forEach(item => {
      item.style.display = 'block'; // Ensure display is block for measurement
      item.style.opacity = '1'; // Ensure opacity is 1 for measurement
    });

    // Force a reflow to ensure layout is calculated after making all items visible.
    // This is crucial when elements are initially hidden or their layout might be unstable.
    if (postListContainer) {
      // Accessing offsetHeight forces the browser to re-calculate layout
      // eslint-disable-next-line no-unused-vars
      const forceReflow = postListContainer.offsetHeight;
    } else if (postListItems.length > 0) {
      // Fallback if container not found, force reflow on the first item
      // eslint-disable-next-line no-unused-vars
      const forceReflow = postListItems[0].offsetHeight;
    }

    // Recalculate initialVisiblePosts after ensuring layout is settled
    const initialVisiblePosts = calculateInitialVisiblePosts(postListItems);

    // Remove any existing arrows before setting the state
    if (downArrow) downArrow.remove();
    if (upArrow) upArrow.remove();

    postListItems.forEach((item, index) => {
      // Apply hiding/fading based on calculated initialVisiblePosts
      if (index >= initialVisiblePosts) {
        item.style.display = 'none'; // Hide posts beyond the initial count
      } else if (index === initialVisiblePosts - 2 && initialVisiblePosts >= 2) { // Second to last visible post
        item.style.opacity = '0.75';
      } else if (index === initialVisiblePosts - 1 && initialVisiblePosts >= 1) { // Last visible post
        item.style.opacity = '0.5';
      }
    });

    // Only show down arrow if there are more posts to reveal than the initial visible count
    if (postListItems.length > initialVisiblePosts) {
      const arrowColor = getArrowColorForIndex(initialVisiblePosts); // Color for the first hidden post's position
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
    upArrow = createArrow('upArrow', '▲', arrowColor); // Changed '^' to '▲', Up arrow remains full opacity
    postListContainer.appendChild(upArrow);
    upArrow.addEventListener('click', showInitialState); // Attach listener to revert to initial state
  }

  // Call the initial state function when this script runs
  showInitialState();

  // After initial state is set, remove loading class and add loaded class
  // This makes the content visible
  document.documentElement.classList.remove('js-loading');
  document.documentElement.classList.add('js-loaded');
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

  // Attach mode switcher to the theme toggle button if it exists
  const themeToggleButton = document.getElementById('theme-toggle');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', modeSwitcher);
  }
});

// Functions that require all resources to be loaded and layout stable
window.addEventListener('load', () => {
  // Call handlePostVisibilityAndToggle first as it sets up the main content visibility
  handlePostVisibilityAndToggle();
  // Then apply gradients, which might depend on the visible state of posts
  applySunsetGradientToTitles();
  applySunsetGradientToPostAccentElements();
});


// Re-apply post visibility on window resize to adjust to new height
// Debounce the resize event to prevent "twitchy" behavior
const debouncedHandlePostVisibilityAndToggle = debounce(() => {
  handlePostVisibilityAndToggle();
  applySunsetGradientToTitles(); // Re-apply gradients on resize as well
  applySunsetGradientToPostAccentElements();
}, 150); // 150ms delay
window.addEventListener('resize', debouncedHandlePostVisibilityAndToggle);
