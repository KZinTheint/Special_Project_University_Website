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
});
