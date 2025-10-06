# Reusable Navbar Component

This directory contains the reusable navbar component for the MIIT website, featuring the beautiful animation from the library.html page.

## Components

### 1. `navbar.html`
Contains the HTML structure of the navbar with:
- Bootstrap navbar with fixed-top positioning
- MIIT logo and title
- Dropdown navigation menus
- Hover cards for submenu items
- Responsive mobile toggle

### 2. `navbar.css`
Contains the styling for:
- Logo animations on scroll
- Dropdown hover effects
- Navbar positioning
- Active link styling

### 3. `navbar.js`
Contains the JavaScript functionality for:
- Scroll-based animations (logo scaling and title hiding)
- Active link detection
- Dropdown positioning to prevent overflow
- Mobile responsiveness

## How to Implement

To use this navbar component in any HTML page:

### 1. Add CSS Link
Add this line in the `<head>` section after your main CSS:
```html
<link rel="stylesheet" href="./components/navbar.css">
```

### 2. Add Navbar HTML
Replace the existing navbar with this standardized structure:
```html
<!-- Reusable Navbar Component -->
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top" id="mainNavbar">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center" href="main.html">
      <img src="images/MIIT_Logo.png" alt="MIIT Logo" width="50" height="50" class="me-2" id="miitLogo" />
      <strong class="navbar-title">Myanmar Institute of Information Technology</strong>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="main.html">Home</a>
        </li>
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="#">About</a>
          <div class="hover-card">
            <div class="card">
              <div class="card-body">
                <ul>
                  <li><a href="history.html">History</a></li>
                  <li><a href="./vision-mission.html">Vision & Mission</a></li>
                  <li><a href="./contact-us.html">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="admission.html">Admission</a>
        </li>
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="#">Academic</a>
          <div class="hover-card">
            <div class="card">
              <div class="card-body">
                <ul>
                  <li><a href="./academic-calendar.html">Academic Calendar</a></li>
                  <li><a href="./academic-programs.html">Academic Programs</a></li>
                  <li><a href="./academic-rules.html">Academic Rules</a></li>
                  <li><a href="./lms-moodle.html">LMS Moodle</a></li>
                  <li><a href="./student-registration.html">Student Registration</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="faculties.html">Faculties</a>
        </li>
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="library.html">Library</a>
          <div class="hover-card">
            <div class="card">
              <div class="card-body">
                <ul>
                  <li><a href="library.html#digital-design">Digital Design</a></li>
                  <li><a href="library.html#control-system">Control System</a></li>
                  <li><a href="library.html#computer-architecture">Computer Architecture</a></li>
                  <li><a href="library.html#data-structures">Data Structures & Algorithms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li class="nav-item dropdown-hover">
          <a class="nav-link" href="./Collaboration1.html">Collaboration</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Push content down because navbar is fixed -->
<div style="height: 70px;"></div>
```

### 3. Set Active Link
Add the `active` class to the appropriate nav-link for each page:
```html
<!-- For the current page, add 'active' class -->
<a class="nav-link active" href="currentpage.html">Current Page</a>
```

### 4. Add JavaScript
Add the navbar script before your other JavaScript files:
```html
<!-- Navbar Component JS -->
<script src="./components/navbar.js"></script>
```

## Features

### Animations
- **Scroll Animation**: When user scrolls down 100px, the logo scales up 1.5x and the title fades out
- **Smooth Transitions**: All animations use CSS transitions for smooth effects
- **Hover Effects**: Dropdown menus appear on hover with smooth transitions

### Responsive Design
- Mobile-friendly with Bootstrap navbar-toggler
- Dropdown positioning adjusts to prevent overflow
- Works on all screen sizes

### Active State
- Automatically detects current page and highlights the active nav link
- Manual override available via JavaScript API

## Pages Updated

✅ **Completed:**
- `main.html` - Home page with active state
- `library.html` - Library page with active state
- `faculties.html` - Faculties page with active state

📝 **Remaining to update:**
- `history.html`
- `vision-mission.html`
- `contact-us.html`
- `admission.html`
- `academic-calendar.html`
- `academic-programs.html`
- `academic-rules.html`
- `lms-moodle.html`
- `student-registration.html`
- `events.html`
- `latest-news.html`
- `news-detail.html`
- `Collaboration1.html`

## Customization

### Adding New Menu Items
To add new menu items, add them to the `<ul class="navbar-nav">` section:
```html
<li class="nav-item dropdown-hover">
  <a class="nav-link" href="newpage.html">New Page</a>
</li>
```

### Modifying Animations
Adjust animation parameters in `navbar.css`:
- Change scroll threshold in `navbar.js` (line 9)
- Modify logo scale and position in CSS (lines 28-30)
- Adjust transition duration (line 14)

### Styling Changes
All navbar styling is contained in `navbar.css` for easy customization.

## Dependencies

- Bootstrap 5.3.7 (CSS and JS)
- Font Awesome (for icons in dropdowns)
- Modern browser with CSS3 support

## Browser Support

- Chrome/Safari/Firefox (latest)
- Internet Explorer 11+
- Mobile browsers (iOS Safari, Chrome Mobile)