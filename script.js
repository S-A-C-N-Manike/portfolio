const FORMSPREE_ENDPOINT = ''; // Add your Formspree endpoint here, e.g., 'https://formspree.io/f/yourcode'

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const scrollTopBtn = document.getElementById('scrollTop');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const currentYearSpan = document.getElementById('currentYear');

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // NAV TOGGLE
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('active');
  });

  // THEME TOGGLE
  const applyTheme = theme => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  };
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const cur = document.body.classList.contains('light') ? 'light' : 'dark';
    applyTheme(cur === 'light' ? 'dark' : 'light');
  });

  // Smooth scroll and close nav on link click
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      // Do not prevent default for mailto or download links
      if (!href || href.startsWith('mailto:') || href.endsWith('.pdf')) return; 
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Offset scroll by header height for fixed header
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
      }
      
      // Close mobile menu
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        navToggle.classList.remove('active');
      }
    });
  });

  // Scroll top button visibility
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
        scrollTopBtn.style.visibility = window.scrollY > 400 ? 'visible' : 'hidden';
    }
  });

  // Scroll top button action
  scrollTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

/**
 * Opens the certificate modal.
 * @param {string} modalId - The ID of the modal to open (e.g., 'modal-1').
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
}

/**
 * Closes the certificate modal.
 * @param {string} modalId - The ID of the modal to close (e.g., 'modal-1').
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore background scrolling
    }
}

// Optional: Close the modal when the user clicks anywhere outside of the image
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto"; // Restore background scrolling
    }
}
  // PORTFOLIO MODALS
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');

  const projects = {
    project1: { title: 'FoT TechSphere News App', img: 'images/project1.jpg', tools: 'Figma, Java, Firebase, Android Studio', desc: 'Mobile news app for Faculty of Technology. Focused on user-friendly UI/UX, wireframing, high-fidelity prototyping, and integration with a Firebase backend.', repo: 'https://github.com/S-A-C-N-Manike/FoT-TechSphere-App' },
    project2: { title: 'Kylie Skin Web UI Prototype', img: 'images/project2.jpg', tools: 'Figma, Photoshop, Illustrator', desc: 'A high-end website UI prototype for a luxury skincare brand, focusing on elegant layout, color psychology, and responsive design principles.', repo: 'https://github.com/S-A-C-N-Manike/Kylie-Skin-WebUI' },
    project3: { title: 'AyurGlow — Logo & Branding', img: 'images/project3.jpg', tools: 'Illustrator, Photoshop', desc: 'Complete logo design and brand identity development inspired by Ayurvedic wellness, utilizing natural color palettes and sophisticated typography.', repo: '#' },
    project4: { title: 'Driving School Management System', img: 'images/project4.jpg', tools: 'React, Tailwind CSS, MERN Stack, Figma', desc: 'A full-stack web application designed for driving school management, featuring intuitive dashboards, scheduling, and user management with a strong UX focus.', repo: 'https://github.com/S-A-C-N-Manike/Driving-School-MERN' },
    project5: { title: 'EcoLearn – Interactive Environmental Awareness Platform', img: 'images/project5.jpg', tools: 'Adobe Animate, Figma, Photoshop, Illustrator', desc: 'An interactive multimedia project designed to promote environmental conservation through engaging visuals, animation, and a nature-inspired UI.', repo: 'https://github.com/S-A-C-N-Manike/EcoLearn-Multimedia' }
  };

  const showModal = (key) => {
    const data = projects[key];
    if (!data) return;

    modalBody.innerHTML = `
      <h2 id="modalTitle">${data.title}</h2>
      <img src="${data.img}" alt="${data.title}" />
      <p><strong>Tools & Technologies:</strong> ${data.tools}</p>
      <p>${data.desc}</p>
      <div class="hero-cta" style="margin-top:20px;">
        <a class="btn primary" href="${data.img}" download>Download Preview</a>
        ${data.repo && data.repo !== '#' ? 
            `<a class="btn outline" href="${data.repo}" target="_blank" rel="noopener">View Source Code</a>` : 
            `<button class="btn outline" disabled>Repo Not Public</button>`
        }
      </div>
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  }

  const hideModal = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  }

  document.querySelectorAll('.btn.view, .view').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project') || btn.closest('.portfolio-item')?.dataset?.project;
      showModal(key);
    });
  });

  modalClose?.addEventListener('click', hideModal);
  modal.addEventListener('click', e => { 
    if (e.target === modal) hideModal(); 
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      hideModal();
    }
  });


  // CONTACT FORM SUBMISSION
  contactForm?.addEventListener('submit', async e => {
    e.preventDefault();
    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#fff';

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    // Simple client-side validation
    if (!payload.name || !payload.email || !payload.message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.style.color = 'red';
        setTimeout(() => formStatus.textContent = '', 5000);
        return;
    }

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          formStatus.textContent = 'Message sent — thank you!';
          formStatus.style.color = '#38bdf8'; // Success color
          contactForm.reset();
        } else {
          formStatus.textContent = 'Error sending message. Please try again or email directly.';
          formStatus.style.color = 'red';
        }
      } catch (err) {
        console.error(err);
        formStatus.textContent = 'Network error. Please try again later.';
        formStatus.style.color = 'red';
      }
    } else {
      // Mailto fallback
      const mailto = `mailto:chalaninethranjalimanike@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + payload.name)}&body=${encodeURIComponent(payload.message + '\n\nContact: ' + payload.email)}`;
      window.location.href = mailto;
      formStatus.textContent = 'Opening your mail client…';
      formStatus.style.color = '#38bdf8';
    }
    
    // Clear status after 5 seconds
    setTimeout(() => formStatus.textContent = '', 5000);
  });
});