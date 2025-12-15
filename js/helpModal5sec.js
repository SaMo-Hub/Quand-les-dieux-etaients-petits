// helpModal.js - Système de modal d'aide avec détection d'inactivité

let inactivityTimer;
let hasShownHelp = false;
const INACTIVITY_DELAY = 5000; // 5 secondes

document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.querySelector('.help-button .button');
  const helpModalOverlay = document.querySelector('.help-modal-overlay');
  const closeBtn = helpModalOverlay.querySelector('.close-modal');
  const okBtn = helpModalOverlay.querySelector('.secondary-button');
  const modalContent = helpModalOverlay.querySelector('.modal-content-help');

  // Fonction pour ouvrir la modal d'aide
  function openHelpModal() {
    helpModalOverlay.classList.add('active');
    hasShownHelp = true;
    
    // Animation d'ouverture avec GSAP
    const tl = gsap.timeline();
    tl.fromTo(
      modalContent,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    ).fromTo(
      closeBtn,
      { scale: 0.3, opacity: 0, rotation: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)", rotation: -45 },
      "-=0.2"
    );
    
    // Réinitialiser le timer
    resetInactivityTimer();
  }

  // Fonction pour fermer la modal d'aide
  function closeHelpModal() {
    const tl = gsap.timeline();
    tl.to(
      modalContent,
      { scale: 0.8, opacity: 0, duration: 0.2 }
    ).to(
      closeBtn,
      {
        scale: 0.8,
        opacity: 0,
        rotation: 0,
        duration: 0.2,
        onComplete: () => {
          helpModalOverlay.classList.remove('active');
        }
      },
      "-=0.2"
    );
  }

  // Fonction pour réinitialiser le timer d'inactivité
  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    
    // Ne relancer le timer que si on n'a jamais montré l'aide
    if (!hasShownHelp) {
      inactivityTimer = setTimeout(() => {
        openHelpModal();
      }, INACTIVITY_DELAY);
    }
  }

  // Détecter l'activité de l'utilisateur
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'wheel'];
  
  activityEvents.forEach(event => {
    document.addEventListener(event, resetInactivityTimer, { passive: true });
  });

  // Lancer le timer initial
  resetInactivityTimer();

  // Event listener pour ouvrir la modal via le bouton
  if (helpButton) {
    helpButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openHelpModal();
    });
  }

  // Event listener pour fermer la modal avec le bouton X
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeHelpModal();
    });
  }

  // Event listener pour fermer la modal avec le bouton "J'ai compris"
  if (okBtn) {
    okBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeHelpModal();
    });
  }

  // Fermer en cliquant sur l'overlay
  helpModalOverlay.addEventListener('click', (e) => {
    if (e.target === helpModalOverlay) {
      closeHelpModal();
    }
  });

  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && helpModalOverlay.classList.contains('active')) {
      closeHelpModal();
    }
  });
});


