const counters = document.querySelectorAll('.stat-number');

      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = Math.ceil(target / 100);

          if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });