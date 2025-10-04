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

  if (eventsContainer) {
    fetch('http://localhost:3000/events')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const events = data.data.slice(0, 4);
          eventsContainer.innerHTML = ''; // Clear existing content
          events.forEach(event => {
            const eventDate = new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const eventDescription = event.content && event.content.length > 0 ? event.content[0].description : '';
            const eventCard = `
              <div class="col-lg-6 mb-4">
                <a href="events.html?id=${event.id}" class="event-card-link text-decoration-none text-dark">
                  <div class="card h-100 event-card shadow-sm transition-300ms hover-shadow-lg overflow-hidden">
                    <div class="row g-0 h-100">
                      <div class="col-4">
                        <img src="${event.cover_url}" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${event.title}">
                      </div>
                      <div class="col-8">
                        <div class="card-body d-flex flex-column">
                          <p class="card-text mb-1"><small class="text-muted">${eventDate}</small></p>
                          <h6 class="card-title fw-bold flex-grow-1">${event.title}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            `;
            eventsContainer.innerHTML += eventCard;
          });
        }
      })
      .catch(error => console.error('Error fetching events:', error));
  }

// --- NEWS PREVIEW LOGIC (Latest 4 News, Minimal Horizontal Style) ---
const newsContainer = document.getElementById('latest-news-container');

if (newsContainer) {
    // Fetch data from the news API endpoint
    fetch('http://localhost:3000/news') 
        .then(response => response.json())
        .then(data => {
            // Assuming the news articles are in data.data.news
            if (data.success && data.data && data.data.news && data.data.news.length > 0) {
                
                // Limit to the latest 4 news items to match the events section
                const latestNews = data.data.news.slice(0, 4); 
                newsContainer.innerHTML = ''; 

                latestNews.forEach(newsItem => {
                    // Use 'created_at' or 'news_date' for the date
                    const newsDate = new Date(newsItem.created_at || newsItem.news_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                    
                    // Use col-lg-6 to enforce a 2x2 grid layout (2 cards per row)
                    const newsCard = `
                        <div class="col-lg-6 mb-4">
                            <a href="news-detail.html?id=${newsItem.id}" class="news-card-link text-decoration-none text-dark">
                                <div class="card h-100 news-card shadow-sm transition-300ms hover-shadow-lg overflow-hidden">
                                    <div class="row g-0 h-100">
                                        
                                        <div class="col-4">
                                            <img src="${newsItem.images[0] || newsItem.cover_url}" 
                                                 class="img-fluid rounded-start h-100" 
                                                 style="object-fit: cover;" 
                                                 alt="${newsItem.title}">
                                        </div>
                                        
                                        <div class="col-8">
                                            <div class="card-body d-flex flex-column">
                                                <p class="card-text mb-1"><small class="text-muted">${newsDate}</small></p>
                                                <h6 class="card-title fw-bold flex-grow-1">${newsItem.title}</h6>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                    newsContainer.innerHTML += newsCard;
                });
            } else {
                newsContainer.innerHTML = '<div class="col-12 text-center py-5"><p class="lead text-muted">No recent news available.</p></div>';
            }
        })
        .catch(error => {
            console.error('Error fetching latest news:', error);
            newsContainer.innerHTML = '<div class="col-12 text-center py-5"><p class="lead text-danger">Error loading news. Please check the server connection.</p></div>';
        });
}
// --- END OF NEWS PREVIEW LOGIC

});
