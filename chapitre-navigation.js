// Configuration du scroll horizontal avec GSAP
gsap.registerPlugin(ScrollTrigger);

// Sélectionner le conteneur des illustrations
const illustrationList = document.querySelector('.illustration-list');

// Sélectionner uniquement les conteneurs de chapitres
const allChapitres = gsap.utils.toArray('.all-chapitre');

// Calculer la largeur totale à scroller
const getScrollAmount = () => {
  return illustrationList.scrollWidth - window.innerWidth;
};

// Définir la hauteur du body en fonction de la largeur à scroller
const setBodyHeight = () => {
  document.body.style.height = `${getScrollAmount() + window.innerHeight}px`;
};

// Calculer la position de chaque chapitre
const getChapitrePositions = () => {
  const positions = [];
  let cumulativeWidth = 0;
  
  allChapitres.forEach((chapitre, index) => {
    positions.push(cumulativeWidth);
    // Utiliser scrollWidth pour obtenir la largeur réelle du contenu
    const realWidth = chapitre.scrollWidth;
    cumulativeWidth += realWidth;
    
    console.log(`Chapitre ${index + 1} - Position: ${positions[index]}px, Largeur: ${realWidth}px`);
  });
  
  return positions;
};

// Initialiser la hauteur
setBodyHeight();

// Forcer le scroll au début
window.scrollTo(0, 0);

// Créer un wrapper pour le scroll horizontal
gsap.to(illustrationList, {
  x: () => -getScrollAmount(),
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: () => "+=" + getScrollAmount(),
    scrub: 0.5,
    pin: ".illustration-list",
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onRefresh: setBodyHeight
  }
});

// Animation du méandre
gsap.to('.meandre', {
  x: () => -illustrationList.scrollWidth * 0.5,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: () => "+=" + (illustrationList.scrollWidth - window.innerWidth),
    scrub: 0.2
  }
});

// Animation des octogones de navigation
const octogones = document.querySelectorAll('.octogone');

// Configuration pour l'animation du texte du chapitre
const chapitreName = document.getElementById("chapitre-name");
const chapitreNames = [
  "L'enfant de la prophétie",
  "Le choc des Titans",
  "Chapitre 3",
  "Chapitre 4",
];

let currentChapitreIndex = 0;
let isAnimating = false;

// Initialisation
chapitreName.textContent = chapitreNames[0];

// ANIMATION ENTREE
function animateEntree(newText) {
  chapitreName.innerHTML = '';

  [...newText].forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') {
      letter = '\u00A0';
    }
    if (letter === 'f') {
      span.style.marginRight = '-2px';
    }

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

// ANIMATION SORTIE + ENTRÉE
function animateSortie(oldText, newText) {
  chapitreName.innerHTML = '';

  [...oldText].forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') {
      letter = '\u00A0';
    }
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

let isClickScrolling = false;

// Créer des ScrollTriggers pour chaque chapitre
const chapitrePositions = getChapitrePositions();

// ===== SYSTÈME DE PROGRESSION DES CHAPITRES =====
allChapitres.forEach((chapitre, index) => {
  const startPosition = chapitrePositions[index];
  // Utiliser scrollWidth pour obtenir la largeur réelle du contenu
  const endPosition = index < allChapitres.length - 1 
    ? chapitrePositions[index + 1] 
    : startPosition + chapitre.scrollWidth;
  
  const chapitreWidth = endPosition - startPosition;
  
  console.log(`Chapitre ${index + 1} - Start: ${startPosition}px, End: ${endPosition}px, Width: ${chapitreWidth}px`);
  
  // Récupérer l'élément de remplissage pour ce chapitre
  const octBgPourcentage = octogones[index]?.querySelector('.oct-bg-pourcentage');
  
  if (octBgPourcentage) {
    // Créer un ScrollTrigger pour la progression
    ScrollTrigger.create({
      trigger: "body",
      start: () => `top top-=${startPosition}`,
      end: () => `top top-=${endPosition}`,
      scrub: 0.5,
      id: `progress-chapitre-${index + 1}`,
      onUpdate: (self) => {
        // Calculer le pourcentage de progression dans ce chapitre
        const progress = self.progress;
        const percentage = Math.round(progress * 100);
        
        // Animer le clip-path de droite à gauche (0% = caché, 100% = visible)
        const clipValue = 100 - (progress * 100);
        octBgPourcentage.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
      }
    });
  }

  // ScrollTrigger pour le changement de chapitre actif
  ScrollTrigger.create({
    trigger: "body",
    start: () => `top top-=${startPosition}`,
    end: () => `top top-=${endPosition}`,
    onEnter: () => {
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
    },
    onEnterBack: () => {
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
  });
});

// Navigation par clic sur les octogones
octogones.forEach((octogone, index) => {
  octogone.style.cursor = 'pointer';
  octogone.addEventListener('click', () => {
    if (isAnimating) return;
    if (index === currentChapitreIndex) return;

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
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        isClickScrolling = false;
      }
    });
  });
});

// Animation parallaxe des textes
const sections = gsap.utils.toArray('.all-chapitre');
sections.forEach((chapitre, index) => {
  const texts = chapitre.querySelectorAll('.text-parallax');

  if (texts.length === 0) return;

  const startPosition = chapitrePositions[index];
  const endPosition = index < sections.length - 1 
    ? chapitrePositions[index + 1] 
    : getScrollAmount();

  texts.forEach((text) => {
    const illustrationListRect = illustrationList.getBoundingClientRect();
    const textRect = text.getBoundingClientRect();
    const textAbsoluteLeft = textRect.left - illustrationListRect.left + illustrationList.scrollLeft;
    
    const textStart = textAbsoluteLeft - window.innerWidth;
    const textEnd = endPosition;

    gsap.to(text, {
      x: () => -1500,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: () => `top top-=${Math.max(0, textStart)}`,
        end: () => `top top-=${textEnd}`,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  });
});

// Refresh ScrollTrigger au resize
window.addEventListener('resize', () => {
  setBodyHeight();
  ScrollTrigger.refresh();
});

// S'assurer que la page commence au début après le chargement
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh();
});