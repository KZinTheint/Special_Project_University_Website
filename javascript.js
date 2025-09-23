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
          const events = data.data.slice(0, 3);
          eventsContainer.innerHTML = ''; // Clear existing content
          events.forEach(event => {
            const eventDate = new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const eventDescription = event.content && event.content.length > 0 ? event.content[0].description : '';
            const eventCard = `
              <div class="col-lg-4 col-md-6 mb-4">
                <a href="events.html?id=${event.id}" class="event-card-link">
                  <div class="card h-100 event-card">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${event.cover_url}" class="img-fluid rounded-start" alt="${event.title}">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <p class="card-text"><small class="text-muted">${eventDate}</small></p>
                          <h5 class="card-title">${event.title}</h5>
                          <p class="card-text">${eventDescription.substring(0, 100)}${eventDescription.length > 100 ? '...' : ''}</p>
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
});
