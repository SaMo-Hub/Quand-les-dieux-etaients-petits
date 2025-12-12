let personnagesData = {};

fetch('./personageLieuxData.json')
  .then(response => response.json())
  .then(data => {
    personnagesData = data;
  })
  .catch(err => console.error("Erreur chargement JSON :", err));

// Créer la modal dynamiquement
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
   <div class="modal">
   <div class="modal-content">
              <div class="modal-name">
              <div class="button-primary">
        <svg role="img" viewBox="0 0 294 50" preserveAspectRatio="xMinYMin meet" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M21 1H273L281 9V41L273 49H21L13 40.5V9L21 1Z" fill="var(--color-bg)" stroke="var(--color-primary)"
            stroke-width="var(--border-size)"></path>
          <rect x="2" y="25" width="15.5563" height="15.5563" transform="rotate(-45 2 25)" fill="var(--color-bg)"
            stroke="var(--color-primary)" stroke-width="var(--border-size)"></rect>
          <rect x="10" y="25" width="4.24264" height="4.24264" transform="rotate(-45 10 25)" fill="#fff"></rect>
          <rect x="270" y="25" width="15.5563" height="15.5563" transform="rotate(-45 270 25)" fill="var(--color-bg)"
            stroke="var(--color-primary)" stroke-width="var(--border-size)"></rect>
          <rect x="278" y="25" width="4.24264" height="4.24264" transform="rotate(-45 278 25)" fill="#fff"></rect>
        </svg>
<div class="chapitre-name-overflow">
  <p id="chapitre-name" class="">You selected...</p>
</div>


      </div>
            </div>
              <h4 class="modal-h1">QUI C'EST ?</h4>
              <p class="modal-paragraphe">dddddddddd</p>
            
                <button class="secondary-button">
            <p>
    
                Tu veux en savoir plus ?
            </p>
            <svg  class="btn-svg" width="288" height="62" viewBox="0 0 288 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="bg-hover" d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="#57280F" />
    <path d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="#" stroke="#EB7333" stroke-width="var(--border-size)"/>
    </svg>
    
          </button>
            </div>
             <button class="button close-modal">
              <div class="item">
              <svg width="16" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.707031 0.707031L5.27539 5.27539M9.84375 9.84375L5.27539 5.27539M5.27539 5.27539L0.707031 9.84375L9.84375 0.707031" stroke="#EB7333" stroke-width="var(--border-size)"/>
</svg>
</div>
            </button>
             </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

// Obtenir la modal (créer si elle n'existe pas)
let modalOverlay = document.querySelector('.modal-overlay');
if (!modalOverlay) {
  modalOverlay = createModal();
}

const modalContent = modalOverlay.querySelector('.modal-content');
const modalName = modalOverlay.querySelector('.modal-name p');
const modalH1 = modalOverlay.querySelector('.modal-h1');
const modalParagraphe = modalOverlay.querySelector('.modal-paragraphe');
const closeModalBtn = modalOverlay.querySelector('.close-modal');
const modalButton = modalOverlay.querySelector('.secondary-button');

// Fonction pour ouvrir la modal
function openModal(personnageId) {
  const data = personnagesData[personnageId];
  if (!data) return;

  // Remplir le contenu
  modalName.textContent = data.nom;
  modalParagraphe.textContent = data.description;

  // Réinitialiser les styles inline qui pourraient causer des problèmes
  modalContent.style.left = '';
  modalContent.style.top = '';
  modalContent.style.transform = '';

  // Afficher la modal avec animation
  modalOverlay.classList.add('active');
  
  // Petite animation d'entrée
  const tl = gsap.timeline();
  tl.fromTo(
      modalContent,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
  )
  .fromTo(
      closeModalBtn,
      { scale: 0.3, opacity: 0, rotation: -0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)", rotation: -45 },
      "-=0.2"
  );
}

// Fonction pour fermer la modal
function closeModal() {
  const tl = gsap.timeline();
  tl.to(
      modalContent, {
         scale: 0.8,
      opacity: 0,
      duration: 0.2,
      }
  ).to(
    closeModalBtn, {
       scale: 0.8,
      opacity: 0,
      rotation: -0,
      duration: 0.2,
      onComplete: () => {
        modalOverlay.classList.remove('active');
      }
    }, "-=0.2"
  )
}

// FONCTION POUR ATTACHER LES EVENT LISTENERS
function attachModalListeners() {
  document.querySelectorAll('.text-modal').forEach(button => {
    // Retirer les anciens listeners pour éviter les doublons
    button.removeEventListener('click', handleModalClick);
    // Ajouter le nouveau listener
    button.addEventListener('click', handleModalClick);
  });
}

// Handler séparé pour pouvoir le retirer
function handleModalClick(e) {
  e.preventDefault();
  const personnageId = this.id;
  openModal(personnageId);
}

// Attacher les listeners au chargement initial
attachModalListeners();

// IMPORTANT: Réattacher les listeners après l'animation des mots
// Cette fonction doit être appelée après que l'animation modifie le DOM
window.addEventListener('load', () => {
  setTimeout(() => {
    attachModalListeners();
  }, 1000); // Délai pour laisser l'animation se terminer
});

// Observer les changements du DOM pour réattacher les listeners si nécessaire
const observer = new MutationObserver(() => {
  attachModalListeners();
});

// Observer les changements dans les éléments qui contiennent du texte
document.querySelectorAll('.frame-texte').forEach(frame => {
  observer.observe(frame, {
    childList: true,
    subtree: true
  });
});

// Fermer la modal
closeModalBtn.addEventListener('click', closeModal);

// Fermer en cliquant sur l'overlay
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Action du bouton "Tu veux en savoir plus ?"
modalButton.addEventListener('click', () => {
  const personnageNom = modalH1.textContent;
  window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(personnageNom)}`, '_blank');
});