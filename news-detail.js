document.addEventListener('DOMContentLoaded', () => {
  const newsDetailContainer = document.getElementById('news-detail-container');
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');

  if (newsDetailContainer && newsId) {
    fetch(`http://localhost:3000/news/${newsId}`)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        if (data.success) {
          const news = data.data; // Corrected to access the nested 'news' object
          console.log('News Data:', news);

          if (news) {
            const newsContentHtml = (news.content && news.content.length > 0) ?
              news.content.map(c => `
                ${c.subheading ? `<h5 class="fw-semibold mt-4">${c.subheading}</h5>` : ''}
                <p>${c.description}</p>
              `).join('') : '';

            const newsImagesHtml = (news.images && news.images.length > 0) ?
              `<div class="row g-4 mt-5">
                <h2 class="text-center mb-4">News Gallery</h2>
                ${news.images.map(img => `
                  <div class="col-12 col-md-6 col-lg-4">
                    <img src="${img}" class="img-fluid rounded-3 shadow-sm news-gallery-img" alt="News Image">
                  </div>
                `).join('')}
              </div>` : '';

            newsDetailContainer.innerHTML = `
              <div class="col-12 col-lg-10 offset-lg-1">
                <div class="mb-5">
                  <h1 class="display-4 fw-bold mb-3">${news.title}</h1>
                  <p class="text-muted mb-4"><strong>News Date:</strong> ${new Date(news.created_at).toLocaleDateString()}</p>
                  <img src="${news.images[0]}" class="img-fluid rounded-3 mb-4 single-news-cover-img" alt="${news.title}">
                  ${newsContentHtml}
                  ${news.files && news.files.length > 0 ? `
                    <div class="mt-4">
                      <h5 class="fw-semibold mb-3">Attached Files</h5>
                      <ul class="list-group">
                        ${news.files.map(file => `
                          <li class="list-group-item d-flex justify-content-between align-items-center">
                            <span>${file.filename}</span>
                            <a href="${file.url}" download class="btn btn-outline-primary btn-sm">
                              <i class="bi bi-download"></i> Download
                            </a>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  ` : ''}
                  </div>
                ${newsImagesHtml}
              </div>
            `;
          } else {
            console.error('News object is undefined.');
          }
        } else {
          console.error('API request was not successful:', data);
        }
      })
      .catch(error => console.error('Error fetching news details:', error));
  } else {
    console.error('Could not find news container or news ID.');
  }
});
