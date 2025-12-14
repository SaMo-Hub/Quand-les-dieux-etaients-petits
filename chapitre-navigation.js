// Configuration du scroll horizontal avec GSAP + Interactions bulles
gsap.registerPlugin(ScrollTrigger);

// ========================================
// VARIABLES GLOBALES
// ========================================
let isClickScrolling = false;
let isAnimating = false;
let currentChapitreIndex = 0;

// Sélection des éléments
const illustrationList = document.querySelector('.illustration-list');
const allChapitres = gsap.utils.toArray('.all-chapitre');
const octogones = document.querySelectorAll('.octogone');
const chapitreName = document.getElementById("chapitre-name");
const chapitreNames = [
  "L'enfant de la prophétie",
  "Le choc des Titans",
  "Chapitre 3",
  "Chapitre 4",
];

// Points d'interaction avec bulles
const interactionPoints = {
  gaiaTalk: {
    frame: document.getElementById('gaia-talk'),
    interaction: document.getElementById('gaia-interaction'),
    bulle: document.getElementById('gaia-talk-bulle'),
    revealed: false
  },
  gaiaBebe: {
    frame: document.getElementById('gaia-bebe-frame'),
    interaction: document.getElementById('gaia-bebe-interaction'),
    bulle: document.getElementById('gaia-bebe-talk'),
    revealed: false
  }
};

// ========================================
// CALCULS DE BASE
// ========================================
const getScrollAmount = () => {
  return illustrationList.scrollWidth - window.innerWidth;
};

function getChapitrePositions() {
  const positions = [];
  let cumulativeWidth = 0;
  
  allChapitres.forEach((chapitre, index) => {
    positions.push(cumulativeWidth);
    const rect = chapitre.getBoundingClientRect();
    cumulativeWidth += rect.width;
  });
  
  return positions;
}

// ========================================
// CALCUL DES POSITIONS DES INTERACTIONS
// ========================================
function getInteractionPosition(frame) {
  if (!frame) return null;
  
  const listRect = illustrationList.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();
  
  // Position absolue de la frame dans le scroll horizontal
  const frameLeft = frameRect.left - listRect.left;
  
  return frameLeft;
}

// ========================================
// ANIMATION DES BULLES
// ========================================
function showBulle(bulle) {
  if (!bulle) return;
  
  gsap.to(bulle, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  });
}

function hideBulle(bulle) {
  if (!bulle) return;
  
  gsap.to(bulle, {
    opacity: 0,
    scale: 0.8,
    y: 20,
    duration: 0.3,
    ease: "power2.in"
  });
}

// ========================================
// GESTION DES INTERACTIONS
// ========================================
function setupInteractions() {
  Object.entries(interactionPoints).forEach(([key, point]) => {
    if (!point.interaction || !point.bulle) return;
    
    point.interaction.style.cursor = 'pointer';
    
    // Au clic : afficher la bulle et cacher l'interaction
    point.interaction.addEventListener('click', () => {
      console.log(`✨ Interaction cliquée: ${key}`);
      
      point.revealed = true;
      
      // Afficher la bulle
      showBulle(point.bulle);
      
      // Animation de disparition de l'icône d'interaction
      gsap.to(point.interaction, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
          point.interaction.style.pointerEvents = 'none';
          point.interaction.style.display = 'none';
        }
      });
    });
    
    // Animation de pulsation pour attirer l'attention
    gsap.to(point.interaction, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  });
}

// ========================================
// DÉTECTION DU DÉPASSEMENT (AUTO-REVEAL)
// ========================================
function setupAutoReveal() {
  Object.entries(interactionPoints).forEach(([key, point]) => {
    if (!point.frame || !point.bulle) return;
    
    const position = getInteractionPosition(point.frame);
    if (position === null) return;
    
    // Créer un trigger qui détecte quand on dépasse la frame
    ScrollTrigger.create({
      trigger: document.body,
      start: () => `top top-=${position + 500}`, // 500px après la frame
      id: `auto-reveal-${key}`,
      onEnter: () => {
        // Si on dépasse sans avoir cliqué, révéler automatiquement
        if (!point.revealed) {
          console.log(`🔄 Auto-révélation: ${key}`);
          point.revealed = true;
          
          // Afficher la bulle
          showBulle(point.bulle);
          
          // Cacher l'interaction
          if (point.interaction) {
            gsap.to(point.interaction, {
              opacity: 0,
              scale: 0,
              duration: 0.3,
              onComplete: () => {
                point.interaction.style.display = 'none';
              }
            });
          }
        }
      }
    });
  });
}

// ========================================
// INITIALISATION
// ========================================
function init() {
  window.scrollTo(0, 0);
  chapitreName.textContent = chapitreNames[0];
  
  const scrollAmount = getScrollAmount();
  document.body.style.height = `${scrollAmount + window.innerHeight}px`;
  
  console.log(`📏 Scroll amount: ${scrollAmount}px`);
  
  // Cacher les bulles au départ
  Object.values(interactionPoints).forEach(point => {
    if (point.bulle) {
      gsap.set(point.bulle, { opacity: 0, scale: 0.8, y: 20 });
    }
  });
}

init();

// ========================================
// ANIMATION PRINCIPALE DU SCROLL HORIZONTAL
// ========================================
const horizontalScroll = gsap.to(illustrationList, {
  x: () => -getScrollAmount(),
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: () => `+=${getScrollAmount()}`,
    scrub: 1,
    pin: illustrationList,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onRefresh: () => {
      const scrollAmount = getScrollAmount();
      document.body.style.height = `${scrollAmount + window.innerHeight}px`;
    }
  }
});

// ========================================
// ANIMATION DU MÉANDRE
// ========================================
gsap.to('.meandre', {
  x: () => -getScrollAmount() * 0.5,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: () => `+=${getScrollAmount()}`,
    scrub: 0.5
  }
});

// ========================================
// ANIMATIONS DU TEXTE DU CHAPITRE
// ========================================
function animateEntree(newText) {
  chapitreName.innerHTML = '';

  [...newText].forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') letter = '\u00A0';
    if (letter === 'f') span.style.marginRight = '-2px';

    span.textContent = letter;
    span.style.display = 'inline-block';
    span.style.opacity = 0;
    span.style.transform = 'translateY(50px)';
    chapitreName.appendChild(span);
  });

  gsap.to(chapitreName.querySelectorAll('span'), {
    y: 0,
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
    stagger: 0.04,
    onComplete: () => {
      isAnimating = false;
    }
  });
}

function animateSortie(oldText, newText) {
  chapitreName.innerHTML = '';

  [...oldText].forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') letter = '\u00A0';
    span.textContent = letter;
    span.style.display = 'inline-block';
    span.style.opacity = 1;
    span.style.transform = 'translateY(0px)';
    chapitreName.appendChild(span);
  });

  const tl = gsap.timeline();

  tl.to(chapitreName.querySelectorAll('span'), {
    y: 50,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    stagger: 0.03
  });

  tl.add(() => animateEntree(newText));
}

// ========================================
// SYSTÈME DE PROGRESSION ET NAVIGATION
// ========================================
function setupChapitreNavigation() {
  const chapitrePositions = getChapitrePositions();
  const totalScrollAmount = getScrollAmount();

  allChapitres.forEach((chapitre, index) => {
    const startPosition = chapitrePositions[index];
    const endPosition = index < allChapitres.length - 1 
      ? chapitrePositions[index + 1] 
      : totalScrollAmount;
    
    const octBgPourcentage = octogones[index]?.querySelector('.oct-bg-pourcentage');
    
    if (octBgPourcentage) {
      ScrollTrigger.create({
        trigger: document.body,
        start: () => `top top-=${startPosition}`,
        end: () => `top top-=${endPosition}`,
        scrub: 1,
        id: `progress-chapitre-${index + 1}`,
        onUpdate: (self) => {
          const progress = self.progress;
          const clipValue = 100 - (progress * 100);
          octBgPourcentage.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
        }
      });
    }

    ScrollTrigger.create({
      trigger: document.body,
      start: () => `top top-=${startPosition}`,
      end: () => `top top-=${endPosition}`,
      id: `chapitre-${index + 1}`,
      onEnter: () => updateActiveChapitre(index),
      onEnterBack: () => updateActiveChapitre(index)
    });
  });
}

function updateActiveChapitre(index) {
  if (isClickScrolling) return;
  
  octogones.forEach(oct => oct.classList.remove('selected'));
  if (octogones[index]) {
    octogones[index].classList.add('selected');
    
    if (index !== currentChapitreIndex && !isAnimating) {
      isAnimating = true;
      animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[index]);
      currentChapitreIndex = index;
    }
  }
}

// ========================================
// NAVIGATION PAR CLIC SUR LES OCTOGONES
// ========================================
function setupOctogoneNavigation() {
  octogones.forEach((octogone, index) => {
    octogone.style.cursor = 'pointer';
    octogone.addEventListener('click', () => {
      if (isAnimating || index === currentChapitreIndex) return;

      isAnimating = true;
      isClickScrolling = true;

      const positions = getChapitrePositions();
      const targetPosition = positions[index];
      
      document.querySelector('.octogone.selected')?.classList.remove('selected');
      octogone.classList.add('selected');

      animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[index]);
      currentChapitreIndex = index;
      
      gsap.to(window, {
        scrollTo: {
          y: targetPosition,
          autoKill: false
        },
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            isClickScrolling = false;
          }, 300);
        }
      });
    });
  });
}

// ========================================
// ANIMATION PARALLAXE DES TEXTES
// ========================================
function setupTextParallax() {
  const chapitrePositions = getChapitrePositions();
  
  allChapitres.forEach((chapitre, index) => {
    const texts = chapitre.querySelectorAll('.text-parallax');
    if (texts.length === 0) return;

    const startPosition = chapitrePositions[index];
    const endPosition = index < allChapitres.length - 1 
      ? chapitrePositions[index + 1] 
      : getScrollAmount();

    texts.forEach((text) => {
      const illustrationListRect = illustrationList.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();
      const textAbsoluteLeft = textRect.left - illustrationListRect.left;
      
      const textStart = Math.max(0, textAbsoluteLeft - window.innerWidth);
      const textEnd = endPosition;

      gsap.to(text, {
        x: -1500,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: () => `top top-=${textStart}`,
          end: () => `top top-=${textEnd}`,
          scrub: 1.5,
          invalidateOnRefresh: true
        }
      });
    });
  });
}

// ========================================
// ANIMATION PARALLAXE DES EFFETS VISUELS
// ========================================
function setupEffectsParallax() {
  const effects = [
    {
      selector: '.fire',
      speed: 0.5, // Plus lent que le scroll
      moveX: -300,
    },
    {
      selector: '.collonnes',
      speed: 0.5, // Plus lent que le scroll
      moveX: -300,
    },
    {
      selector: '.grotte',
      speed: 0.5, // Plus lent que le scroll
      moveX: -400,
    },
    {
      selector: '.eclair',
      speed: 0.4, // Vitesse moyenne
      moveX: -800,
    },
    {
      selector: '.poseidon',
      speed: 0.4, // Légèrement plus lent
      moveX: -600,
    }
  ];

  effects.forEach(effect => {
    const element = document.querySelector(effect.selector);
    if (!element) return;

    // Trouver le parent .illustration ou .illustration-large
    const parentFrame = element.closest('.illustration, .illustration-large, .frame');
    if (!parentFrame) return;

    // Calculer la position de la frame
    const listRect = illustrationList.getBoundingClientRect();
    const frameRect = parentFrame.getBoundingClientRect();
    const frameLeft = frameRect.left - listRect.left;
    
    // Zone de début et fin du parallaxe
    const startPos = Math.max(0, frameLeft - window.innerWidth);
    const endPos = frameLeft + frameRect.width;

    console.log(`🎨 Parallaxe ${effect.selector}:`, {
      start: startPos,
      end: endPos,
      moveX: effect.moveX,
    });

    // Créer l'animation parallaxe
    gsap.to(element, {
      x: effect.moveX,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: () => `top top-=${startPos}`,
        end: () => `top top-=${endPos}`,
        scrub: effect.speed,
        invalidateOnRefresh: true,
        id: `parallax-${effect.selector}`
      }
    });
  });
}

// ========================================
// PARALLAXE SPÉCIAL POUR POSEIDON + VAGUE
// ========================================


// ========================================
// GESTION DU RESIZE
// ========================================
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const scrollAmount = getScrollAmount();
    document.body.style.height = `${scrollAmount + window.innerHeight}px`;
    ScrollTrigger.refresh();
  }, 250);
});

// ========================================
// CHARGEMENT FINAL
// ========================================
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  
  requestAnimationFrame(() => {
    setupChapitreNavigation();
    setupOctogoneNavigation();
    setupTextParallax();
    setupEffectsParallax();
    setupPoseidonParallax();
    setupInteractions();
    setupAutoReveal();
    
    ScrollTrigger.refresh();
    console.log('✅ Page chargée - Système d\'interactions et parallaxe actifs');
  });
});