document.addEventListener('DOMContentLoaded', () => {
  const allEventsContainer = document.getElementById('all-events-container');
  const eventsPageHeading = document.getElementById('events-page-heading');
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');

  if (allEventsContainer) {
    if (eventId) {
      // --- Event Detail View (Centering is now handled by the outer wrapper for consistency) ---
      if (eventsPageHeading) eventsPageHeading.style.display = 'none';
      
      // Show loading spinner for event details
      allEventsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading event details...</p>
        </div>
      `;

      fetch(`http://localhost:3000/events/${eventId}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const event = data.data;

            const eventContentHtml = (event.content && event.content.length > 0) ?
              event.content.map(c => `
                ${c.subheading ? `<h4 class="fw-semibold mt-4">${c.subheading}</h4>` : ''}
                ${c.description ? `<p>${c.description}</p>` : ''}
              `).join('') : '';

            const eventImagesHtml = (event.images && event.images.length > 0) ?
              `<div class="row g-4 mt-5">
                <h3 class="text-center mb-4 section-heading fw-bold">Event Gallery</h3>
                ${event.images.map(img => `
                  <div class="col-12 col-md-6 col-lg-4">
                    <img src="${img}" class="img-fluid rounded-3 shadow-sm event-gallery-img" alt="Event Image">
                  </div>
                `).join('')}
              </div>` : '';

            allEventsContainer.innerHTML = `
              <div class="col-12">
                <div class="mb-5 border-bottom pb-4">
                  <h1 class="display-5 fw-bold mb-3">${event.title}</h1>
                  <p class="text-muted mb-4"><i class="far fa-calendar-alt me-2"></i> <strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                  <img src="${event.cover_url || event.images[0]}" class="img-fluid rounded-3 mb-4 shadow single-event-cover-img" alt="${event.title}">
                  ${eventContentHtml}
                  ${event.additional_links ? `<a href="${event.additional_links}" class="btn btn-primary-miit mt-3" target="_blank">Register/More Info <i class="fas fa-external-link-alt ms-2"></i></a>` : ''}
                </div>
                ${eventImagesHtml}
                <div class="text-center mt-5">
                  <a href="events.html" class="btn btn-outline-secondary"><i class="fas fa-arrow-left me-2"></i> Back to All Events</a>
                </div>
              </div>
            `;
          }
        })
        .catch(error => console.error('Error fetching event details:', error));
    } else {
      // --- All Events List View (Horizontal Card Layout) ---
      if (eventsPageHeading) eventsPageHeading.style.display = 'block';
      
      // Show loading spinner for events list
      allEventsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading events...</p>
        </div>
      `;

      fetch('http://localhost:3000/events')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched events data:', data);
          if (data.success) {
            const events = data.data;
            allEventsContainer.innerHTML = '';
            
            events.forEach(event => {
              const eventDate = new Date(event.event_date).toLocaleDateString();
              const rawDescription = event.content && event.content.length > 0 ? event.content[0].description : '';
              //const eventDescription = rawDescription.substring(0, 200).trim();

              const eventCardHtml = `
              <div class="col-md-6 g-4">
                <a href="events.html?id=${event.id}" class="event-card-link text-decoration-none">
                  <div class="card event-horizontal-card shadow transition-300ms hover-shadow-lg">
                        <img src="${event.cover_url}" class="img-fluid event-list-img-horizontal" alt="${event.title}">
                        <div class="card-body d-flex flex-column">
                          <p class="card-text mb-2"><small class="text-muted text-uppercase fw-medium"><i class="far fa-calendar-alt me-1"></i> ${eventDate}</small></p>
                          <h4 class="card-title fw-bold fs-5 mb-3">${event.title}</h4>
                          <button class="btn btn-sm btn-outline-primary mt-auto text-decoration-none align-self-start">Read More</button>
                        </div>
                  </div>
                </a>
              </div>
            `;
              allEventsContainer.innerHTML += eventCardHtml;
            });
          } else {
            // Display message when no events are available
            allEventsContainer.innerHTML = '<div class="col-12"><p class="text-center py-5">No events found at this time.</p></div>';
          }
        })
        .catch(error => {
             console.error('Error fetching events:', error);
             allEventsContainer.innerHTML = '<div class="col-12"><p class="text-center py-5">Error loading events. Please try again later.</p></div>';
        });
    }
  }
});
