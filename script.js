/* =========================
   MOBILE NAV TOGGLE
========================= */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("primary-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.style.display === "flex";

  navMenu.style.display = isOpen ? "none" : "flex";
  navToggle.setAttribute("aria-expanded", !isOpen);
});


/* =========================
   CLOSE NAV ON LINK CLICK (MOBILE)
========================= */
const navLinks = document.querySelectorAll(".nav-list a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      navMenu.style.display = "none";
      navToggle.setAttribute("aria-expanded", false);
    }
  });
});


/* =========================
   SMOOTH SCROLL OFFSET FIX
========================= */
const headerHeight = document.querySelector(".site-header").offsetHeight;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offsetPosition =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  });
});


/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-list a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 10;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


/* =========================
   FOOTER YEAR AUTO UPDATE
========================= */
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* =========================
   CONTACT FORM VALIDATION
========================= */
const contactForm = document.getElementById("contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      showMessage("Please fill in all fields.", false);
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", false);
      return;
    }

    showMessage("✅ Thank you! Your message has been sent.", true);
    contactForm.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, success) {
  formNote.textContent = text;
  formNote.style.color = success ? "green" : "red";
}


/* =========================
   SIMPLE SCROLL ANIMATION
========================= */
const revealElements = document.querySelectorAll(
  ".skill-card, .project-card, .about, .contact"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => observer.observe(el));

/* ===== DARK MODE ===== */
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

/* ===== PROJECT FILTER ===== */
const filterButtons = document.querySelectorAll(".project-filters button");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projects.forEach(project => {
      project.style.display =
        filter === "all" || project.dataset.category === filter
          ? "block"
          : "none";
    });
  });
});

/* ===== PROJECT MODAL ===== */
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalImg = document.getElementById("modal-image");
const modalTech = document.getElementById("modal-tech");
const modalLive = document.getElementById("modal-live");
const modalGithub = document.getElementById("modal-github");

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.description;
    modalTech.innerHTML = `<strong>Tech:</strong> ${card.dataset.tech}`;
    modalImg.src = card.dataset.image;
    modalLive.href = card.dataset.live;
    modalGithub.href = card.dataset.github;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

/* Close modal */
modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.querySelector(".modal-overlay").addEventListener("click", closeModal);

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

