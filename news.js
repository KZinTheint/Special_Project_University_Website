document.addEventListener('DOMContentLoaded', () => {
  const newsContainer = document.getElementById('news-container');

  if (newsContainer) {
    fetch('http://localhost:3000/news')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const news = data.data.news;
          console.log('Fetched News:', news);
          newsContainer.innerHTML = ''; // Clear existing content
          news.forEach(newsItem => {
            const newsDate = new Date(newsItem.news_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const newsDescription = newsItem.content && newsItem.content.length > 0 ? newsItem.content[0].description : '';
            const newsCard = `
            <div class="col-md-4 mb-4">
              <a href="latest-news.html?id=${newsItem.id}" class="news-card-link">
                <div class="card news-card h-100">
                  <img src="${newsItem.cover_url}" class="card-img-top" alt="${newsItem.title}">
                  <div class="card-body">
                    <p class="card-text"><small class="text-muted">${newsDate}</small></p>
                    <h5 class="card-title">${newsItem.title}</h5>
                    <p class="card-text">${newsDescription.substring(0, 100)}${newsDescription.length > 100 ? '...' : ''}</p>
                  </div>
                </div>
              </a>
            </div>
          `;
            newsContainer.innerHTML += newsCard;
          });
        }
      })
      .catch(error => console.error('Error fetching news:', error));
  }
});
