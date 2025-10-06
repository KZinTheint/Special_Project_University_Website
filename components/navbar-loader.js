// Navbar Loader Utility
// This script dynamically loads the navbar component into any page

(function() {
  // Function to load navbar component
  function loadNavbar() {
    // Create navbar container if it doesn't exist
    let navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) {
      navbarContainer = document.createElement('div');
      navbarContainer.id = 'navbar-container';
      document.body.insertBefore(navbarContainer, document.body.firstChild);
    }

    // Fetch and insert navbar HTML
    fetch('./components/navbar.html')
      .then(response => response.text())
      .then(html => {
        navbarContainer.innerHTML = html;
        
        // Load navbar CSS if not already loaded
        if (!document.querySelector('link[href*="navbar.css"]')) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = './components/navbar.css';
          document.head.appendChild(cssLink);
        }
        
        // Load navbar JavaScript if not already loaded
        if (!document.querySelector('script[src*="navbar.js"]')) {
          const script = document.createElement('script');
          script.src = './components/navbar.js';
          document.head.appendChild(script);
        }
      })
      .catch(error => {
        console.error('Error loading navbar:', error);
        // Fallback: show a message or handle error gracefully
      });
  }

  // Load navbar when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();

// Alternative approach for pages that want to load navbar manually
window.loadMiitNavbar = function() {
  const script = document.createElement('script');
  script.src = './components/navbar-loader.js';
  document.head.appendChild(script);
};