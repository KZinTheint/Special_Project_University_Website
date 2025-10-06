// Script to help identify pages that need navbar updates
// This is a helper script to identify which pages need to be updated

const fs = require('fs');
const path = require('path');

// List of HTML files to update (excluding main.html and library.html which are already done)
const filesToUpdate = [
  'faculties.html',
  'history.html',
  'vision-mission.html',
  'contact-us.html',
  'admission.html',
  'academic-calendar.html',
  'academic-programs.html',
  'academic-rules.html',
  'lms-moodle.html',
  'student-registration.html',
  'events.html',
  'latest-news.html',
  'news-detail.html',
  'Collaboration1.html'
];

console.log('Files that need navbar updates:');
filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} - File not found`);
  }
});

console.log('\nTo update each file:');
console.log('1. Add: <link rel="stylesheet" href="./components/navbar.css"> after index.css');
console.log('2. Replace the navbar HTML with the reusable component structure');
console.log('3. Add: <script src="./components/navbar.js"></script> before other scripts');
console.log('4. Ensure the active nav-link class is set correctly for each page');