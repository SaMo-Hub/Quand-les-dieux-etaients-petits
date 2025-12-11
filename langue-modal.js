// Script pour la modal de langue

document.addEventListener('DOMContentLoaded', () => {
  const langueButton = document.querySelector('.langue');
  const langueModalOverlay = document.querySelector('.langue-modal-overlay');
  const closeModalBtn = langueModalOverlay.querySelector('.close-modal');
  const modalContent = langueModalOverlay.querySelector('.modal-content-langue');

  // Fonction pour ouvrir la modal langue
  function openModal() {
    langueModalOverlay.classList.add('active');
    
    // Animation d'ouverture avec GSAP
    const tl = gsap.timeline();
    tl.fromTo(
      modalContent,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    ).fromTo(
      closeModalBtn,
      { scale: 0.3, opacity: 0, rotation: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)", rotation: -45 },
      "-=0.2"
    );
  }

  // Fonction pour fermer la modal langue
  function closeLangueModal() {
    const tl = gsap.timeline();
    tl.to(
      modalContent,
      { scale: 0.8, opacity: 0, duration: 0.2 }
    ).to(
      closeModalBtn,
      {
        scale: 0.8,
        opacity: 0,
        rotation: 0,
        duration: 0.2,
        onComplete: () => {
          langueModalOverlay.classList.remove('active');
        }
      },
      "-=0.2"
    );
  }

  // Event listener pour ouvrir la modal
  if (langueButton) {
    langueButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    });
  }

  // Event listener pour fermer la modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeLangueModal();
    });
  }

  // Fermer en cliquant sur l'overlay
  langueModalOverlay.addEventListener('click', (e) => {
    if (e.target === langueModalOverlay) {
      closeLangueModal();
    }
  });

  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && langueModalOverlay.classList.contains('active')) {
      closeLangueModal();
    }
  });
});