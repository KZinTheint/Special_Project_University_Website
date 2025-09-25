document.addEventListener('DOMContentLoaded', () => {
  const newsPageContainer = document.getElementById('news-page-container');

  if (newsPageContainer) {
    // Fetch and display all news articles
    fetch('http://localhost:3000/news')
      .then(response => response.json())
      .then(data => {
        if (data.success && data.data.news.length > 0) {
          const allNews = data.data.news;

          // Map all news items to the same card layout
          const allNewsHtml = allNews.map(newsItem => {
            const description = newsItem.content && newsItem.content.length > 0 ? newsItem.content[0].description.substring(0, 100) + '...' : '';
            return `
              <div class="col-md-6 col-lg-4 mb-4">
                <a href="news-detail.html?id=${newsItem.id}" class="news-card-link">
                  <div class="card h-100">
                    <img src="${newsItem.images[0]}" class="card-img-top" alt="${newsItem.title}">
                    <div class="card-body d-flex flex-column">
                      <h5 class="card-title">${newsItem.title}</h5>
                      <p class="card-text flex-grow-1">${description}</p>
                      <p class="card-text mt-auto"><small class="text-muted">${new Date(newsItem.created_at).toLocaleDateString()}</small></p>
                    </div>
                  </div>
                </a>
              </div>
            `;
          }).join('');

          newsPageContainer.innerHTML = `
            <h2 class="mb-4 text-center news-heading">All News</h2>
            <div class="row">
              ${allNewsHtml}
            </div>
          `;
        } else {
          newsPageContainer.innerHTML = '<p class="text-center">No news articles found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        newsPageContainer.innerHTML = '<p class="text-center">Error loading news. Please try again later.</p>';
      });
  }
});