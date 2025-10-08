// Function to handle file downloads
async function downloadFile(event, url, filename) {
  const downloadButton = event.target.closest('button');
  const originalButtonText = downloadButton.innerHTML;

  try {
    // Optional: Provide user feedback
    downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    downloadButton.disabled = true;

    // Fetch the file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'download';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);

  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download file. Please try again later.');
  } finally {
    // Restore button state
    downloadButton.innerHTML = originalButtonText;
    downloadButton.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newsDetailContainer = document.getElementById('news-detail-container');
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');

  if (newsDetailContainer && newsId) {
    // Show loading spinner
    newsDetailContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading news details...</p>
      </div>
    `;
    
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

            const newsFilesHtml = (news.files && news.files.length > 0) ?
              `<div class="files-section mt-5">
                <h2>Files</h2>
                <div class="files-list">
                  ${news.files.map(file => `
                    <div class="file-item">
                      <div class="file-left">
                        <div class="file-icon">
                          <i class="fas fa-file-alt"></i>
                        </div>
                        <h6 class="file-name">${file.filename}</h6>
                      </div>
                      <button class="btn btn-sm" onclick="downloadFile(event, '${file.url}', '${file.filename}')">
                        <i class="fas fa-download"></i>Download
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>` : '';

            newsDetailContainer.innerHTML = `
              <div class="col-12 col-lg-10 offset-lg-1">
                <div class="mb-5 border-bottom pb-4">
                  <h1 class="display-4 fw-bold mb-3">${news.title}</h1>
                  <p class="text-muted mb-4"><strong>News Date:</strong> ${new Date(news.created_at).toLocaleDateString()}</p>
                  ${news.images && news.images.length > 0 ? `<img src="${news.images[0]}" class="img-fluid rounded-3 mb-4 single-news-cover-img" alt="${news.title}">` : ''}
                  ${newsContentHtml}
                </div>
                ${newsImagesHtml}
                ${newsFilesHtml}
                <div class="text-center mt-5">
                  <a href="latest-news.html" class="btn btn-outline-secondary"><i class="fas fa-arrow-left me-2"></i> Back to All News</a>
                </div>
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
