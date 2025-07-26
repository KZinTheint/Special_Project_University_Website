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
});
