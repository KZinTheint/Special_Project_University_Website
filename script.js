document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('mainNavbar');
  const miitLogo = document.getElementById('miitLogo');
  const navbarTitle = document.querySelector('.navbar-brand .navbar-title'); // Select the strong tag

  // Define scroll threshold
  const scrollThreshold = 100; // Pixels to scroll before animation starts

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    if (scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Handle hash navigation for library sections
  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }

  // Handle hash navigation on page load
  handleHashNavigation();

  // Handle hash changes (when navigating within the same page)
  window.addEventListener('hashchange', handleHashNavigation);
});
