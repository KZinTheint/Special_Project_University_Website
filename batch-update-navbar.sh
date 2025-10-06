#!/bin/bash

# Batch script to update all HTML files with reusable navbar component

# Pages that need to be updated (excluding already completed ones)
pages=(
  "vision-mission.html"
  "contact-us.html"
  "admission.html"
  "academic-calendar.html"
  "academic-programs.html"
  "academic-rules.html"
  "lms-moodle.html"
  "student-registration.html"
  "events.html"
  "latest-news.html"
  "news-detail.html"
  "Collaboration1.html"
)

echo "Starting batch update of navbar components..."

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    echo "Processing $page..."
    
    # 1. Add navbar CSS if not already present
    if ! grep -q "components/navbar.css" "$page"; then
      # Find the index.css line and add navbar.css after it
      sed -i '' '/href="\.\/index\.css"/a\
  <link rel="stylesheet" href="./components/navbar.css">' "$page"
      echo "  ✓ Added navbar.css to $page"
    fi
    
    # 2. Add navbar JavaScript if not already present
    if ! grep -q "components/navbar.js" "$page"; then
      # Find Bootstrap JS and add navbar.js after it
      sed -i '' '/bootstrap@5\.3\.7.*bootstrap\.bundle\.min\.js/a\
  \
  <!-- Navbar Component JS -->\
  <script src="./components/navbar.js"></script>' "$page"
      echo "  ✓ Added navbar.js to $page"
    fi
    
    echo "  ✓ Updated $page"
  else
    echo "  ✗ $page not found"
  fi
done

echo ""
echo "Batch update completed!"
echo ""
echo "Manual steps still required for each page:"
echo "1. Replace navbar HTML with reusable component structure"
echo "2. Set correct 'active' class on the appropriate nav-link"
echo "3. Test each page to ensure functionality"