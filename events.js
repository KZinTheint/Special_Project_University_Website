document.addEventListener('DOMContentLoaded', () => {
  const allEventsContainer = document.getElementById('all-events-container');
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (allEventsContainer) {
    if (eventId) {
      fetch(`http://localhost:3000/events/${eventId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const event = data.data;

            const eventContentHtml = (event.content && event.content.length > 0) ?
              event.content.map(c => `
                ${c.subheading ? `<h5 class="fw-semibold mt-4">${c.subheading}</h5>` : ''}
                <p>${c.description}</p>
              `).join('') : '';

            const eventImagesHtml = (event.images && event.images.length > 0) ?
              `<div class="row g-4 mt-5">
                <h2 class="text-center mb-4">Event Gallery</h2>
                ${event.images.map(img => `
                  <div class="col-12 col-md-6 col-lg-4">
                    <img src="${img}" class="img-fluid rounded-3 shadow-sm event-gallery-img" alt="Event Image">
                  </div>
                `).join('')}
              </div>` : '';

            allEventsContainer.innerHTML = `
              <div class="col-12 col-lg-10 offset-lg-1">
                <div class="mb-5">
                  <h1 class="display-4 fw-bold mb-3">${event.title}</h1>
                  <p class="text-muted mb-4"><strong>Event Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                  <img src="${event.cover_url}" class="img-fluid rounded-3 mb-4 single-event-cover-img" alt="${event.title}">
                  ${eventContentHtml}
                  ${event.additional_links ? `<a href="${event.additional_links}" class="btn btn-primary mt-3" target="_blank">More Info</a>` : ''}
                </div>
                ${eventImagesHtml}
              </div>
            `;
          }
        })
        .catch(error => console.error('Error fetching event details:', error));
    } else {
      fetch('http://localhost:3000/events')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const events = data.data;
            allEventsContainer.innerHTML = ''; // Clear existing content
            events.forEach(event => {
              const eventDate = new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              const eventDescription = event.content && event.content.length > 0 ? event.content[0].description : '';
              const eventCard = `
              <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2 mb-4">
                <a href="events.html?id=${event.id}" class="event-card-link">
                  <div class="card event-card">
                    <img src="${event.cover_url}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                      <p class="card-text"><small class="text-muted">${eventDate}</small></p>
                      <h5 class="card-title">${event.title}</h5>
                      <p class="card-text">${eventDescription.substring(0, 150)}${eventDescription.length > 150 ? '...' : ''}</p>
                    </div>
                  </div>
                </a>
              </div>
            `;
              allEventsContainer.innerHTML += eventCard;
            });
          }
        })
        .catch(error => console.error('Error fetching events:', error));
    }
  }
});
