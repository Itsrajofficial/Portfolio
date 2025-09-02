// === Scroll-triggered animations ===
const scrollObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Staggered animations for children
        const children = entry.target.querySelectorAll(".stagger");
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.12}s`;
          child.classList.add("visible");
        });

        scrollObserver.unobserve(entry.target); // Animate only once
      }
    });
  },
  { threshold: 0.2 }
);

// Apply observer to all animated classes
document
  .querySelectorAll(
    `
    .scroll-fade,
    .scroll-slide-left,
    .scroll-slide-right,
    .scroll-slide-up,
    .scroll-slide-down,
    .scroll-zoom,
    .scroll-rotate,
    .scroll-flip,
    .scroll-scale,
    .scroll-blur,
    .navbar,
    .card
  `
  )
  .forEach(el => scrollObserver.observe(el));


// === Skills Carousel Auto-slide ===
const skillsTrack = document.querySelector(".skills-carousel-track");
const skillsCards = document.querySelectorAll(".skills-card");
let skillIndex = 0;
let skillsInterval;

function slideSkills() {
  if (!skillsTrack || skillsCards.length === 0) return;

  const cardWidth = skillsCards[0].offsetWidth;
  skillIndex = (skillIndex + 1) % skillsCards.length;
  skillsTrack.style.transform = `translateX(-${skillIndex * cardWidth}px)`;

  // Bounce effect on active card
  skillsCards.forEach(card => card.classList.remove("active"));
  skillsCards[skillIndex].classList.add("active");
}

function startSkillsAutoSlide() {
  if (skillsInterval) clearInterval(skillsInterval);
  skillsInterval = setInterval(slideSkills, 6000);
}

if (skillsTrack && skillsCards.length > 0) {
  startSkillsAutoSlide();

  // Pause carousel on hover
  skillsTrack.addEventListener("mouseenter", () =>
    clearInterval(skillsInterval)
  );
  skillsTrack.addEventListener("mouseleave", startSkillsAutoSlide);

  // Recalculate on window resize
  window.addEventListener("resize", () => {
    skillsTrack.style.transform = `translateX(-${
      skillIndex * skillsCards[0].offsetWidth
    }px)`;
  });
}


// === Mobile Navbar Toggle ===
// === Mobile Navbar Toggle ===
const menuBtn = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("open"); // hamburger animation
  });

  navLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.classList.remove("open");
    })
  );
}


// === Card Hover Animations ===
document.querySelectorAll(".card, .skills-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hover-animate");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("hover-animate");
  });
});
