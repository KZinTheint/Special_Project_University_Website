// Reusable Navbar Component JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('mainNavbar');
  const miitLogo = document.getElementById('miitLogo');
  const navbarTitle = document.querySelector('.navbar-brand .navbar-title');

  // Define scroll threshold
  const scrollThreshold = 100; // Pixels to scroll before animation starts

  // Scroll animation handler
  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Function to set active nav link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'main.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Define page categories
    const aboutPages = ['history.html', 'vision-mission.html', 'contact-us.html'];
    const academicPages = ['academic-calendar.html', 'academic-programs.html', 'academic-rules.html', 'lms-moodle.html', 'lms-module.html', 'student-registration.html'];
    const libraryPages = ['library.html'];
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const linkHref = link.getAttribute('href');
      const linkText = link.textContent.trim();
      
      // Direct page matches
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'main.html') ||
          (currentPage === 'index.html' && linkHref === 'main.html')) {
        link.classList.add('active');
      }
      // About dropdown pages
      else if (aboutPages.includes(currentPage) && linkText === 'About') {
        link.classList.add('active');
      }
      // Academic dropdown pages
      else if (academicPages.includes(currentPage) && linkText === 'Academic') {
        link.classList.add('active');
      }
      // Library pages
      else if (libraryPages.includes(currentPage) && linkText === 'Library') {
        link.classList.add('active');
      }
      // Faculties page
      else if (currentPage === 'faculties.html' && linkText === 'Faculties') {
        link.classList.add('active');
      }
      // Admission page
      else if (currentPage === 'admission.html' && linkText === 'Admission') {
        link.classList.add('active');
      }
      // Collaboration page
      else if (currentPage === 'Collaboration1.html' && linkText === 'Collaboration') {
        link.classList.add('active');
      }
    });
  }

  // Set active link on page load
  setActiveNavLink();

  // Handle dropdown positioning to prevent overflow
  function handleDropdownPosition() {
    const dropdowns = document.querySelectorAll('.dropdown-hover');
    
    dropdowns.forEach(dropdown => {
      const hoverCard = dropdown.querySelector('.hover-card');
      if (hoverCard) {
        dropdown.addEventListener('mouseenter', function() {
          const rect = hoverCard.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          // If dropdown would go off the right edge, align it to the right
          if (rect.right > viewportWidth) {
            hoverCard.style.left = 'auto';
            hoverCard.style.right = '0';
          } else {
            hoverCard.style.left = '0';
            hoverCard.style.right = 'auto';
          }
        });
      }
    });
  }

  // Initialize dropdown positioning
  handleDropdownPosition();

  // Reinitialize on window resize
  window.addEventListener('resize', handleDropdownPosition);
});

// Export functions for potential external use
window.NavbarComponent = {
  setActiveLink: function(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    const aboutPages = ['history.html', 'vision-mission.html', 'contact-us.html'];
    const academicPages = ['academic-calendar.html', 'academic-programs.html', 'academic-rules.html', 'lms-moodle.html', 'lms-module.html', 'student-registration.html'];
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');
      const linkText = link.textContent.trim();
      
      // Direct matches
      if (linkHref === pageName) {
        link.classList.add('active');
      }
      // Category matches
      else if (aboutPages.includes(pageName) && linkText === 'About') {
        link.classList.add('active');
      }
      else if (academicPages.includes(pageName) && linkText === 'Academic') {
        link.classList.add('active');
      }
    });
  }
};
