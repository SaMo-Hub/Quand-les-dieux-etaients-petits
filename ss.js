// ===== SYSTÈME DE BLOCAGE DU SCROLL MULTI-ÉTAPES =====

// Variables pour suivre l'état du déblocage
let currentBlockIndex = 0; // Index du blocage actuel (0 = premier blocage, 1 = second blocage)
let isFullyUnlocked = true; // Scroll complètement débloqué
let isChapitreNavigation = true; // Flag pour la navigation entre chapitres

// Configuration des points de blocage
const blockPoints = [
  {
    interactionId: 'gaia-interaction',
    bulleSelector: '.bulle-gai-talk',
    frameId: 'gaia-talk'
  },
  {
    interactionId: 'gaia-bebe-interaction',
    bulleSelector: '#gaia-bebe-talk',
    frameId: 'gaia-bebe-frame'
  }
];

// Fonction pour calculer la position de blocage pour un élément donné
function calculateBlockPosition(frameId, interactionId) {
  const illustrationList = document.querySelector('.illustration-list');
  const frame = document.getElementById(frameId);
  const interaction = document.getElementById(interactionId);
  
  if (!illustrationList || !frame || !interaction) {
    console.error('Éléments requis non trouvés pour le calcul:', frameId, interactionId);
    return 0;
  }
  
  // Obtenir les rectangles des éléments
  const illustrationListRect = illustrationList.getBoundingClientRect();
  const interactionRect = interaction.getBoundingClientRect();
  
  // Calculer la position absolue de l'interaction dans le conteneur
  const interactionAbsoluteLeft = interactionRect.left - illustrationListRect.left + illustrationList.scrollLeft;
  
  // Calculer la position pour centrer l'interaction à l'écran
  const centerOffset = (window.innerWidth / 2) - (interactionRect.width / 2);
  
  // Position de blocage = position de l'interaction - offset pour la centrer
  const blockPosition = interactionAbsoluteLeft - centerOffset;
  
  console.log(`Position de blocage calculée pour ${frameId}:`, blockPosition);
  
  return blockPosition;
}

// Fonction pour obtenir la position de blocage actuelle
function getCurrentMaxScroll() {
  if (isFullyUnlocked || currentBlockIndex >= blockPoints.length) {
    return Infinity;
  }
  
  const currentBlock = blockPoints[currentBlockIndex];
  return calculateBlockPosition(currentBlock.frameId, currentBlock.interactionId);
}

// Initialiser le système de blocage
function initScrollBlock() {
  // Vérifier que tous les éléments nécessaires existent
  blockPoints.forEach((block, index) => {
    const interaction = document.getElementById(block.interactionId);
    const bulle = document.querySelector(block.bulleSelector);
    
    if (!interaction || !bulle) {
      console.error(`Éléments non trouvés pour le blocage ${index}:`, block);
      return;
    }
    
    // Cacher les bulles initialement (sauf si déjà débloquées)
    if (index >= currentBlockIndex) {
      bulle.style.opacity = '0';
      bulle.style.pointerEvents = 'none';
    }
    
    // Configurer le style du bouton d'interaction
    interaction.style.cursor = 'pointer';
    interaction.style.transition = 'transform 0.3s ease';
    
    // Hover effects
    interaction.addEventListener('mouseenter', function() {
      if (currentBlockIndex === index && !isFullyUnlocked) {
        gsap.to(this, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    interaction.addEventListener('mouseleave', function() {
      if (currentBlockIndex === index && !isFullyUnlocked) {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    // Gestion du clic sur l'interaction
    interaction.addEventListener('click', function() {
      if (currentBlockIndex === index && !isFullyUnlocked) {
        unlockCurrentBlock(index);
      }
    });
  });
  
  // Ajouter une classe au body pour indiquer le blocage
  document.body.classList.add('scroll-blocked');
  
  // Intercepter le scroll
  window.addEventListener('scroll', function(e) {
    // Ne pas bloquer si c'est une navigation entre chapitres ou si complètement débloqué
    if (!isFullyUnlocked && !isChapitreNavigation) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = getCurrentMaxScroll();
      
      // Si on essaie d'aller au-delà de la limite
      if (currentScroll > maxScroll) {
        window.scrollTo(0, maxScroll);
      }
    }
  }, false);
  
  // ===== GESTION DE LA NAVIGATION ENTRE CHAPITRES =====
  const octogones = document.querySelectorAll('.octogone');
  
  octogones.forEach((octogone, index) => {
    octogone.addEventListener('click', function() {
      // Si on change de chapitre et qu'on n'est pas au chapitre 1
      if (index !== 0) {
        // Débloquer complètement pour la navigation
        isChapitreNavigation = true;
        isFullyUnlocked = true;
        document.body.classList.remove('scroll-blocked');
        document.body.classList.add('scroll-unlocked');
        
        // Afficher toutes les bulles et cacher toutes les interactions
        blockPoints.forEach((block) => {
          const bulle = document.querySelector(block.bulleSelector);
          const interaction = document.getElementById(block.interactionId);
          
          if (bulle) {
            gsap.to(bulle, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
            bulle.style.pointerEvents = 'auto';
          }
          
          if (interaction) {
            gsap.to(interaction, {
              scale: 0,
              opacity: 0,
              duration: 0.4,
              ease: "back.in(1.7)",
              onComplete: () => {
                interaction.style.display = 'none';
              }
            });
          }
        });
        
        console.log('Navigation vers chapitre', index + 1, '- Scroll complètement débloqué');
      }
    });
  });
}

// Fonction pour débloquer un point de blocage
function unlockCurrentBlock(index) {
  const block = blockPoints[index];
  const interaction = document.getElementById(block.interactionId);
  const bulle = document.querySelector(block.bulleSelector);
  
  console.log(`Déblocage du point ${index}:`, block.interactionId);
  
  // Afficher la bulle avec animation
  gsap.to(bulle, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  });
  bulle.style.pointerEvents = 'auto';
  
  // Animation de l'icône d'interaction (disparition)
  gsap.to(interaction, {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    ease: "back.in(1.7)",
    onComplete: () => {
      interaction.style.display = 'none';
    }
  });
  
  // Animation du bouton de fermeture de la modal (si c'est le premier blocage)
  if (index === 0) {
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
      gsap.to(closeModal, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        delay: 0.2,
        ease: "back.out(1.7)"
      });
    }
  }
  
  // Passer au prochain point de blocage
  currentBlockIndex++;
  
  // Si tous les points sont débloqués
  if (currentBlockIndex >= blockPoints.length) {
    isFullyUnlocked = true;
    document.body.classList.remove('scroll-blocked');
    document.body.classList.add('scroll-unlocked');
    console.log('Scroll complètement débloqué !');
  } else {
    console.log(`Prochain point de blocage: ${blockPoints[currentBlockIndex].interactionId}`);
  }
}

// Attendre que GSAP et le DOM soient prêts
window.addEventListener('load', () => {
  // Petit délai pour s'assurer que tout est initialisé
  setTimeout(() => {
    initScrollBlock();
  }, 500);
});

// ===== STYLES CSS À AJOUTER =====
// Ajout dynamique des styles pour l'indicateur
const style = document.createElement('style');
style.textContent = `
  body.scroll-blocked::after {
    content: "Cliquez sur l'icône pour continuer";
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(235, 115, 51, 0.9);
    color: #140100;
    padding: 12px 24px;
    border-radius: 8px;
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: bold;
    z-index: 1000;
    animation: pulseIndicator 2s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes pulseIndicator {
    0%, 100% {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    50% {
      opacity: 0.7;
      transform: translateX(-50%) scale(1.05);
    }
  }
  
  body.scroll-unlocked::after {
    display: none;
  }
  
  .interaction-bouton {
    animation: pulseInteraction 2s ease-in-out infinite;
  }
  
  @keyframes pulseInteraction {
    0%, 100% {
      transform: scale(1);
      filter: drop-shadow(0 0 10px rgba(255, 255, 158, 0.5));
    }
    50% {
      transform: scale(1.1);
      filter: drop-shadow(0 0 20px rgba(255, 255, 158, 0.8));
    }
  }
`;
document.head.appendChild(style);