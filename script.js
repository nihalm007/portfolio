// --- Particle.js configuration for realistic circuitry/network look ---
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 50,
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": ["#6366f1", "#4f46e5", "#cbd5e1"] },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.4,
      "random": true,
      "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.1, "sync": false }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": { "enable": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#6366f1",
      "opacity": 0.1,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.0,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": { "enable": false }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": { "enable": true, "mode": "grab" },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 180, "line_linked": { "opacity": 0.3 } },
      "push": { "particles_nb": 3 }
    }
  },
  "retina_detect": true
});

// --- Typewriter Effect for Hero Section ---
const roles = [
  "Electronics Engineer",
  "Embedded Systems Builder",
  "Vibe Coder",
  "Hardware Maker",
  "Robotics Enthusiast",
  "IoT Tinkerer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;
const deleteSpeed = 40;
const delayBetweenWords = 2000;

function typeWriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  const currentWord = roles[roleIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = delayBetweenWords;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 500;
  }

  setTimeout(typeWriter, delay);
}

// Start typewriter
if (document.readyState !== 'loading') {
  setTimeout(typeWriter, 1000);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 1000);
  });
}

// --- Intersection Observer for Scroll Fade-in ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
  observer.observe(element);
});



// --- Logo Hacking Animation ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const logoText = document.querySelector(".logo-text");

function triggerHackingEffect(element) {
  let iterations = 0;
  const targetText = "NIHAL M.";

  clearInterval(element.interval);

  element.interval = setInterval(() => {
    let currentText = targetText.split("")
      .map((letter, index) => {
        if (index < iterations) {
          return targetText[index];
        }
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    element.innerHTML = currentText.replace('.', '<span class="logo-highlight">.</span>');

    if (iterations >= targetText.length) {
      clearInterval(element.interval);
    }

    iterations += 1 / 3;
  }, 50);
}

if (logoText) {
  logoText.addEventListener("mouseover", () => triggerHackingEffect(logoText));
  setTimeout(() => triggerHackingEffect(logoText), 800);
  setInterval(() => triggerHackingEffect(logoText), 8000);
}

// --- Achievements 3D Carousel ---
function initAchievementsCarousel() {
  const cards = document.querySelectorAll('.achievement-card');
  const track = document.querySelector('.achievements-track');
  const dots = document.querySelectorAll('.achievements-dots .dot');
  if (cards.length === 0) return;

  let currentIndex = 2; // Index 2 ("Maker of the Month") starts centered/active
  let intervalId = null;

  function updateCarousel() {
    cards.forEach((card, index) => {
      // Clean up previous classes
      card.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');

      // Calculate relative circular loop offsets for 5 cards
      let offset = (index - currentIndex) % 5;
      if (offset < -2) offset += 5;
      if (offset > 2) offset -= 5;

      // Assign classes based on offsets
      if (offset === 0) {
        card.classList.add('active');
      } else if (offset === -1) {
        card.classList.add('prev');
      } else if (offset === 1) {
        card.classList.add('next');
      } else if (offset === -2) {
        card.classList.add('prev-2');
      } else if (offset === 2) {
        card.classList.add('next-2');
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function resetInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % 5;
      updateCarousel();
    }, 4500);
  }

  // Bind click navigation to cards
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetInterval();
    });
  });

  // Bind click navigation to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetInterval();
    });
  });

  // Swipe support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped Left -> next card
      currentIndex = (currentIndex + 1) % 5;
      updateCarousel();
      resetInterval();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped Right -> prev card
      currentIndex = (currentIndex - 1 + 5) % 5;
      updateCarousel();
      resetInterval();
    }
  }

  // Initialize display and start auto-timer
  updateCarousel();
  resetInterval();
}

// Start achievements carousel on load
initAchievementsCarousel();

// --- Interactive 3D Cursor-Following Mouse Tilt for Maker ID Card ---
function initMakerCardTilt() {
  const container = document.querySelector('.about-visual');
  const card = document.querySelector('.maker-id-card');
  const lanyard = document.querySelector('.maker-id-lanyard');
  if (!container || !card) return;

  // Add subtle glare element inside card if not present
  let glare = card.querySelector('.card-glare');
  if (!glare) {
    glare = document.createElement('div');
    glare.className = 'card-glare';
    card.appendChild(glare);
  }

  let bounds;
  let isHovered = false;
  let animId = null;

  // Target and current animated values for liquid smooth lerp physics
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currRotateX = 0;
  let currRotateY = 0;
  let mouseX = 0;
  let mouseY = 0;

  function updateBounds() {
    bounds = card.getBoundingClientRect();
  }

  function renderLoop() {
    if (!isHovered && Math.abs(currRotateX) < 0.05 && Math.abs(currRotateY) < 0.05) {
      currRotateX = 0;
      currRotateY = 0;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      if (lanyard) {
        lanyard.style.transform = 'translateX(-50%) rotateY(0deg) rotateX(0deg) translateZ(12px)';
      }
      if (glare) glare.style.opacity = '0';
      if (container) container.style.animationPlayState = 'running';
      animId = null;
      return;
    }

    // Linear interpolation (lerp) for 60fps buttery smooth movement
    currRotateX += (targetRotateX - currRotateX) * 0.08;
    currRotateY += (targetRotateY - currRotateY) * 0.08;

    // Apply smooth 3D perspective tilt to card
    card.style.transform = `perspective(1000px) rotateX(${currRotateX.toFixed(3)}deg) rotateY(${currRotateY.toFixed(3)}deg) translateZ(4px)`;

    // Keep lanyard strap & clip always in front of card (translateZ: 12px) and tilting in sync
    if (lanyard) {
      lanyard.style.transform = `translateX(-50%) rotateY(${(currRotateY * 0.45).toFixed(3)}deg) rotateX(${(currRotateX * 0.35).toFixed(3)}deg) translateZ(12px)`;
    }

    // Gentle glare sheen following cursor
    if (isHovered && glare) {
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.02) 60%, transparent 80%)`;
    }

    animId = requestAnimationFrame(renderLoop);
  }

  card.addEventListener('mouseenter', () => {
    isHovered = true;
    updateBounds();
    if (container) container.style.animationPlayState = 'paused';
    if (!animId) {
      animId = requestAnimationFrame(renderLoop);
    }
  });

  card.addEventListener('mousemove', (e) => {
    if (!bounds) updateBounds();
    mouseX = e.clientX - bounds.left;
    mouseY = e.clientY - bounds.top;

    const percentX = (mouseX / bounds.width) - 0.5; // -0.5 to +0.5
    const percentY = (mouseY / bounds.height) - 0.5;

    // Subtle max tilt (max ~4.5 degrees X & Y)
    targetRotateY = percentX * 9;
    targetRotateX = -percentY * 7;
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotateX = 0;
    targetRotateY = 0;
  });

  window.addEventListener('resize', updateBounds, { passive: true });
}

// Start card tilt initialization
if (document.readyState !== 'loading') {
  initMakerCardTilt();
} else {
  document.addEventListener('DOMContentLoaded', initMakerCardTilt);
}

// --- Retro Terminal Boot Loader ---
function initTerminalBootLoader() {
  const loader = document.getElementById('terminal-loader');
  const output = document.getElementById('terminal-output');
  const progressBar = document.getElementById('terminal-progress-fill');
  const progressPercent = document.getElementById('terminal-progress-percent');
  const statusText = document.getElementById('terminal-status-text');
  const skipBtn = document.getElementById('skip-loader-btn');

  if (!loader || !output) return;

  // Check if loader was already shown during this browser session
  if (sessionStorage.getItem('maker_terminal_shown') === 'true') {
    loader.style.display = 'none';
    return;
  }

  const bootMessages = [
    { time: "0.012", msg: "BIOS v2.026 - COLLEGE OF ENGINEERING MUNNAR", status: "OK" },
    { time: "0.058", msg: "CPU: ESP32-S3 Dual-Core @ 240MHz | SRAM: 512KB", status: "OK" },
    { time: "0.130", msg: "INITIALIZING HARDWARE INTERFACES (I2C, SPI, UART)...", status: "OK" },
    { time: "0.245", msg: "MOUNTING EMBEDDED SYSTEM FIRMWARE (C/C++, KMK)...", status: "OK" },
    { time: "0.410", msg: "CALIBRATING ROBOTICS KINEMATICS & SENSOR NODES...", status: "OK" },
    { time: "0.610", msg: "INITIALIZING SPLINE 3D ENGINE & ASSET PIPELINE...", status: "OK" },
    { time: "0.820", msg: "AUTHENTICATING MAKER DIGITAL ID (NM-2026-01)...", status: "OK" },
    { time: "0.970", msg: "SYSTEM STABLE. LAUNCHING NIHAL M. PORTFOLIO...", status: "READY" }
  ];

  let lineIndex = 0;
  let isCompleted = false;

  function dismissLoader() {
    if (isCompleted) return;
    isCompleted = true;
    sessionStorage.setItem('maker_terminal_shown', 'true');
    loader.classList.add('terminal-fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }

  // Keyboard shortcut listener (ESC key)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dismissLoader();
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissLoader);
  }

  function printNextLine() {
    if (isCompleted) return;

    if (lineIndex < bootMessages.length) {
      const item = bootMessages[lineIndex];
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';
      lineEl.innerHTML = `
        <span class="line-time">[ ${item.time}s ]</span>
        <span class="line-msg">${item.msg}</span>
        <span class="line-status">[ ${item.status} ]</span>
      `;
      output.appendChild(lineEl);
      output.scrollTop = output.scrollHeight;

      lineIndex++;
      const percent = Math.min(100, Math.round((lineIndex / bootMessages.length) * 100));
      if (progressBar) progressBar.style.width = percent + '%';
      if (progressPercent) progressPercent.textContent = percent + '%';
      if (statusText && item.msg) statusText.textContent = item.msg;

      // Line timing delay (~450ms per line for readable pace)
      setTimeout(printNextLine, 450);
    } else {
      // Finished all boot sequence lines
      if (progressBar) progressBar.style.width = '100%';
      if (progressPercent) progressPercent.textContent = '100%';
      if (statusText) statusText.textContent = 'BOOT COMPLETE. WELCOME!';
      setTimeout(dismissLoader, 400);
    }
  }

  // Start sequence
  setTimeout(printNextLine, 150);
}

// Start terminal boot loader on load
if (document.readyState !== 'loading') {
  initTerminalBootLoader();
} else {
  document.addEventListener('DOMContentLoaded', initTerminalBootLoader);
}

// --- Smart Scroll-Hide & Auto-Show on Stop Navigation Bar ---
function initSmartNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;
  let scrollStopTimer = null;
  let ticking = false;

  function updateNav() {
    const currentScrollY = window.scrollY;
    const scrollDiff = currentScrollY - lastScrollY;

    // 1. At top of page (first 60px): Always visible
    if (currentScrollY <= 60) {
      nav.classList.remove('nav-hidden');
    }
    // 2. Scrolling UP (negative diff < -2px): Instantly show navbar!
    else if (scrollDiff < -2) {
      nav.classList.remove('nav-hidden');
    }
    // 3. Scrolling DOWN (positive diff > 4px): Hide navbar while actively moving down
    else if (scrollDiff > 4) {
      nav.classList.add('nav-hidden');
    }

    lastScrollY = Math.max(0, currentScrollY);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    // Frame-synced 60fps scroll direction check
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }

    // Auto-reveal navbar when scrolling stops (after 180ms pause)
    if (scrollStopTimer) clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      nav.classList.remove('nav-hidden');
    }, 180);
  }, { passive: true });
}

// Start smart nav scroll initialization
if (document.readyState !== 'loading') {
  initSmartNavScroll();
} else {
  document.addEventListener('DOMContentLoaded', initSmartNavScroll);
}

// --- Auto-remove Live Server Disconnect Banner ---
function killDevServerBanner() {
  const elements = document.querySelectorAll('div, p, span, iframe');
  elements.forEach(el => {
    if (el.textContent && el.textContent.includes('lost connection to dev server')) {
      el.remove();
    }
  });
}
setInterval(killDevServerBanner, 300);



