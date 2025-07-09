// === Scroll-triggered animations ===
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      scrollObserver.unobserve(entry.target); // Animate only once
    }
  });
});

// Apply observer to all animated classes
document
  .querySelectorAll(".scroll-fade, .scroll-slide-left, .scroll-slide-right")
  .forEach(el => scrollObserver.observe(el));

// === Skills Carousel Auto-slide ===
const skillsTrack = document.querySelector(".skills-carousel-track");
const skillsCards = document.querySelectorAll(".skills-card");
let skillIndex = 0;

function slideSkills() {
  if (!skillsTrack || skillsCards.length === 0) return;

  const cardWidth = skillsCards[0].offsetWidth;
  skillIndex = (skillIndex + 1) % skillsCards.length;
  skillsTrack.style.transform = `translateX(-${skillIndex * cardWidth}px)`;
}

// Slide every 6 seconds
setInterval(slideSkills, 6000);
