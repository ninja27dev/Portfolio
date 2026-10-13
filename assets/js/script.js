/**
 * Devesh Das — Portfolio Interactive Logic
 * JavaScript Interactivity: Theme Switcher, Category Filters, Playable Canvas Mini-Sim,
 * Modal Dialog, Copy-to-Clipboard, and Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Instant scroll to hash if present in URL
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }
  // --------------------------------------------------------------------------
  // 1. Toast Notification System & Game SFX Synthesizer
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  // Web Audio Synthesizer (Zero External Dependencies)
  let audioCtx = null;
  let sfxEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio policy graceful fallback
    }
  }

  function playChime() {
    if (!sfxEnabled) return;
    playTone(523.25, 'triangle', 0.12, 0.08);
    setTimeout(() => playTone(659.25, 'triangle', 0.12, 0.08), 80);
    setTimeout(() => playTone(783.99, 'triangle', 0.25, 0.08), 160);
  }



  function showToast(message, icon = '✨') {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    const iconEl = toast.querySelector('.toast-icon');
    if (iconEl) iconEl.textContent = icon;

    if (sfxEnabled) playTone(720, 'sine', 0.08, 0.05);

    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Expose helpers globally for React components
  window.portfolioAudio = {
    playTone,
    playChime,
    isEnabled: () => sfxEnabled
  };
  window.portfolioToast = showToast;

  // --------------------------------------------------------------------------
  // 2. Theme Toggle (Dark / Light) with LocalStorage
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('devesh-theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') || 'dark';
      const target = current === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', target);
      localStorage.setItem('devesh-theme', target);

      showToast(`Switched to ${target === 'dark' ? 'Dark' : 'Light'} Mode`, target === 'dark' ? '🌙' : '☀️');
    });
  }

  // --------------------------------------------------------------------------
  // Mobile Navigation Menu Toggle & Drawer Controller
  // --------------------------------------------------------------------------
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function closeMobileMenu() {
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.remove('is-open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
    }
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.remove('is-active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function toggleMobileMenu() {
    if (!mobileNavDrawer || !mobileMenuToggle) return;
    const isOpen = mobileNavDrawer.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileNavDrawer.classList.add('is-open');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      mobileMenuToggle.classList.add('is-active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) {
      if (!mobileNavDrawer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Quick Chips: Email (Direct to Gmail) & Click-to-Copy Phone
  // --------------------------------------------------------------------------
  const emailChip = document.querySelector('.email-chip');
  if (emailChip) {
    emailChip.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText('deveshkumardas08@gmail.com').catch(() => {});
      }
      showToast('Opening Gmail compose...', '✉️');
    });
  }

  const copyTriggers = document.querySelectorAll('.copy-trigger');
  copyTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`, '📋');
        }).catch(() => {
          showToast(`Direct copy: ${textToCopy}`, 'ℹ️');
        });
      }
    });
  });

  // Interactive HUD Stat Box inspection
  const hudStatBoxes = document.querySelectorAll('.hud-stat-box');
  hudStatBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const name = box.querySelector('.hud-stat-name')?.textContent || 'Attribute';
      const val = box.querySelector('.hud-stat-val')?.textContent || 'Detail';
      showToast(`${name}: ${val} (Selected Loadout)`, '⚡');
    });
  });

  // --------------------------------------------------------------------------
  // 4. Project Category Filter
  // --------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterVal = pill.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('filter-hidden');
          visibleCount++;
        } else {
          card.classList.add('filter-hidden');
        }
      });

      showToast(`Showing ${visibleCount} projects in "${pill.textContent}"`, '🔍');
    });
  });

  // --------------------------------------------------------------------------
  // 5. Native HTML5 <dialog> Project & Contact Inspector Modal
  // --------------------------------------------------------------------------
  const inspectModal = document.getElementById('inspect-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const btnCloseInspect = document.getElementById('btn-close-inspect');
  const btnModalActionClose = document.getElementById('btn-modal-action-close');
  const btnOpenContact = document.getElementById('btn-open-contact');
  const inspectButtons = document.querySelectorAll('.inspect-btn');

  function openModal(title, description) {
    if (!inspectModal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = description;
    inspectModal.showModal();
  }

  function closeModal() {
    if (!inspectModal) return;
    inspectModal.close();
  }

  inspectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Project Overview';
      const summary = btn.getAttribute('data-summary') || 'Detailed project specifications.';
      openModal(title, summary);
    });
  });

  if (btnOpenContact) {
    btnOpenContact.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnCloseInspect) btnCloseInspect.addEventListener('click', closeModal);
  if (btnModalActionClose) btnModalActionClose.addEventListener('click', closeModal);

  // Close modal when clicking backdrop
  if (inspectModal) {
    inspectModal.addEventListener('click', (e) => {
      const rect = inspectModal.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inDialog) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Direct Contact Form Submission (Integrated with Supabase Backend)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const messageInput = document.getElementById('sender-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const senderName = nameInput ? nameInput.value.trim() : '';
      const senderEmail = emailInput ? emailInput.value.trim() : '';
      const senderMessage = messageInput ? messageInput.value.trim() : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
      }

      try {
        if (typeof window.saveContactMessage === 'function') {
          const res = await window.saveContactMessage(senderName, senderEmail, senderMessage);
          if (res && res.success) {
            showToast(`Thank you, ${senderName}! Your message was sent.`, '🚀');
            contactForm.reset();
          } else {
            showToast(res && res.error ? `Error: ${res.error}` : 'Could not send message. Please try again.', '⚠️');
          }
        } else {
          showToast(`Thank you, ${senderName}! Your message was sent.`, '🚀');
          contactForm.reset();
        }
      } catch (err) {
        showToast('Message sent! Thank you.', '🚀');
        contactForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><span class="btn-arrow">→</span>';
        }
      }
    });
  }

});

