document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = Math.ceil(target / 100);

    const updateCount = () => {
      const count = +counter.innerText;

      if (count < target) {
        counter.innerText = Math.min(count + increment, target);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.5 // At least 50% of element is visible
  });

  counters.forEach(counter => {
    counter.innerText = "0"; // Reset to 0
    observer.observe(counter);
  });

  const eventsContainer = document.getElementById('events-container');

  // Function to create different card layouts
  function createEventCard(event, layout = 'vertical', index = 0) {
    const eventDate = new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const eventDescription = event.content && event.content.length > 0 ? event.content[0].description : '';
    
    switch(layout) {
      case 'horizontal':
        return `
          <a href="events.html?id=${event.id}" class="event-card-link">
            <div class="event-card-horizontal">
              <div class="card-image">
                <img src="${event.cover_url}" alt="${event.title}">
              </div>
              <div class="card-body">
                <p class="card-text"><small>${eventDate}</small></p>
                <h5 class="card-title">${event.title}</h5>
              </div>
            </div>
          </a>
        `;
      
      case 'mixed':
        let cardClass = 'event-card-small';
        if (index === 0) cardClass = 'event-card-large';
        else if (index === 1 || index === 2) cardClass = 'event-card-medium';
        
        return `
          <a href="events.html?id=${event.id}" class="event-card-link">
            <div class="${cardClass}">
              <img src="${event.cover_url}" alt="${event.title}" style="height: ${cardClass === 'event-card-large' ? '200px' : cardClass === 'event-card-medium' ? '120px' : '100px'}; width: 100%; object-fit: cover;">
              <div class="card-body" style="padding: ${cardClass === 'event-card-large' ? '1.5rem' : '1rem'}">
                <p class="card-text"><small>${eventDate}</small></p>
                <h5 class="card-title" style="font-size: ${cardClass === 'event-card-large' ? '1.1rem' : '0.9rem'}">${event.title}</h5>
              </div>
            </div>
          </a>
        `;
      
      case 'vertical':
      default:
        return `
          <a href="events.html?id=${event.id}" class="event-card-link">
            <div class="event-card">
              <img src="${event.cover_url}" alt="${event.title}">
              <div class="card-body">
                <p class="card-text"><small>${eventDate}</small></p>
                <h5 class="card-title">${event.title}</h5>
              </div>
            </div>
          </a>
        `;
    }
  }

  if (eventsContainer) {
    // Get layout from container class or default to vertical
    const layoutType = eventsContainer.className.includes('horizontal') ? 'horizontal' : 
                      eventsContainer.className.includes('mixed') ? 'mixed' : 'vertical';
    
    fetch('http://localhost:3000/events')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const events = data.data.slice(0, 6); // Show 6 events instead of 4
          eventsContainer.innerHTML = ''; // Clear existing content
          events.forEach((event, index) => {
            const eventCard = createEventCard(event, layoutType, index);
            eventsContainer.innerHTML += eventCard;
          });
        }
      })
      .catch(error => console.error('Error fetching events:', error));
  }

// Function to create different news card layouts
function createNewsCard(newsItem, layout = 'vertical', index = 0) {
  const newsDate = new Date(newsItem.created_at || newsItem.news_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  
  switch(layout) {
    case 'horizontal':
      return `
        <a href="news-detail.html?id=${newsItem.id}" class="news-card-link">
          <div class="event-card-horizontal news-card">
            <div class="card-image">
              <img src="${newsItem.cover_url || (newsItem.images && newsItem.images[0])}" alt="${newsItem.title}">
            </div>
            <div class="card-body">
              <p class="card-text"><small>${newsDate}</small></p>
              <h5 class="card-title">${newsItem.title}</h5>
            </div>
          </div>
        </a>
      `;
    
    case 'mixed':
      let cardClass = 'event-card-small';
      if (index === 0) cardClass = 'event-card-large';
      else if (index === 1 || index === 2) cardClass = 'event-card-medium';
      
      return `
        <a href="news-detail.html?id=${newsItem.id}" class="news-card-link">
          <div class="${cardClass} news-card">
            <img src="${newsItem.cover_url || (newsItem.images && newsItem.images[0])}" alt="${newsItem.title}" style="height: ${cardClass === 'event-card-large' ? '200px' : cardClass === 'event-card-medium' ? '120px' : '100px'}; width: 100%; object-fit: cover;">
            <div class="card-body" style="padding: ${cardClass === 'event-card-large' ? '1.5rem' : '1rem'}">
              <p class="card-text"><small>${newsDate}</small></p>
              <h5 class="card-title" style="font-size: ${cardClass === 'event-card-large' ? '1.1rem' : '0.9rem'}">${newsItem.title}</h5>
            </div>
          </div>
        </a>
      `;
    
    case 'vertical':
    default:
      return `
        <a href="news-detail.html?id=${newsItem.id}" class="news-card-link">
          <div class="news-card">
            <img src="${newsItem.cover_url || (newsItem.images && newsItem.images[0])}" alt="${newsItem.title}">
            <div class="card-body">
              <p class="card-text"><small>${newsDate}</small></p>
              <h5 class="card-title">${newsItem.title}</h5>
            </div>
          </div>
        </a>
      `;
  }
}

// --- NEWS PREVIEW LOGIC (Latest 6 News with Multiple Layouts) ---
const newsContainer = document.getElementById('latest-news-container');

if (newsContainer) {
    // Get layout from container class or default to vertical
    const newsLayoutType = newsContainer.className.includes('horizontal') ? 'horizontal' : 
                          newsContainer.className.includes('mixed') ? 'mixed' : 'vertical';
    
    // Fetch data from the news API endpoint
    fetch('http://localhost:3000/news') 
        .then(response => response.json())
        .then(data => {
            // Assuming the news articles are in data.data.news
            if (data.success && data.data && data.data.news && data.data.news.length > 0) {
                
                // Limit to the latest 6 news items
                const latestNews = data.data.news.slice(0, 6); 
                newsContainer.innerHTML = ''; 

                latestNews.forEach((newsItem, index) => {
                    const newsCard = createNewsCard(newsItem, newsLayoutType, index);
                    newsContainer.innerHTML += newsCard;
                });
            } else {
                newsContainer.innerHTML = '<div class="text-center py-5"><p class="lead text-muted">No recent news available.</p></div>';
            }
        })
        .catch(error => {
            console.error('Error fetching latest news:', error);
            newsContainer.innerHTML = '<div class="text-center py-5"><p class="lead text-danger">Error loading news. Please check the server connection.</p></div>';
        });
}
// --- END OF NEWS PREVIEW LOGIC

});
