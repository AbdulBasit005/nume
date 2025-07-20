// Optional: Add interactivity for language selection or buttons if needed
// For now, this file can be empty or used for future enhancements

// Scroll-triggered animations for fade-in, slide-in, zoom-in, and staggered children
function animateOnScroll(selector, activeClass, stagger = false) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (stagger) {
            entry.target.classList.add('stagger-active');
            // Stagger children
            const children = entry.target.children;
            Array.from(children).forEach((child, idx) => {
              child.style.transitionDelay = `${idx * 120}ms`;
            });
          } else {
            entry.target.classList.add(activeClass);
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach(el => observer.observe(el));
}

window.addEventListener('DOMContentLoaded', () => {
  // Fade-in for sections
  animateOnScroll('.animated-fadein', 'fadein-active');
  // Slide-in for why-nume cards
  animateOnScroll('.animated-slidein', 'slidein-active');
  // Zoom-in for specialist cards
  animateOnScroll('.animated-zoomin', 'zoomin-active');
  // Staggered for services and testimonials
  animateOnScroll('.stagger-children', '', true);
});