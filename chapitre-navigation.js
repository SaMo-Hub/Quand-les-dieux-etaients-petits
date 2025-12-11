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
  
  allChapitres.forEach((chapitre) => {
    positions.push(cumulativeWidth);
    cumulativeWidth += chapitre.offsetWidth ; // +24 pour le gap
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

// Animation du méandre (défilement parallaxe)
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
gsap.to('.fire', {
  x: () => -illustrationList.scrollWidth * 0.4,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: () => "+=" + (illustrationList.scrollWidth - window.innerWidth),
    scrub: 0.2
  }
});
gsap.to('.eclair', {
  x: () => -illustrationList.scrollWidth * 0.4,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: () => "+=" + (illustrationList.scrollWidth - window.innerWidth),
    scrub: 0.2
  }
});
gsap.to('.poseidon', {
  x: () => -illustrationList.scrollWidth * 0.4,
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

// Créer des ScrollTriggers pour chaque chapitre

let isClickScrolling = false; // NOUVEAU FLAG

// ... (reste du code identique)

// Créer des ScrollTriggers pour chaque chapitre
const chapitrePositions = getChapitrePositions();

allChapitres.forEach((chapitre, index) => {
  const startPosition = chapitrePositions[index];
  const endPosition = index < allChapitres.length - 1 
    ? chapitrePositions[index + 1] 
    : getScrollAmount();

  ScrollTrigger.create({
    trigger: "body",
    start: () => `top top-=${startPosition}`,
    end: () => `top top-=${endPosition}`,
    onEnter: () => {
      // Ignorer si on est en train de scroller via un clic
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
      // Ignorer si on est en train de scroller via un clic
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
    // Si une animation est en cours, ignore le clic
    if (isAnimating) return;

    // Si on clique sur le même chapitre, ne rien faire
    if (index === currentChapitreIndex) return;

    // Set les flags
    isAnimating = true;
    isClickScrolling = true; // ACTIVER LE FLAG

    // Récupérer les positions actuelles
    const positions = getChapitrePositions();
    const targetPosition = positions[index];
    
    // Retire l'ancien selected
    document.querySelector('.octogone.selected')?.classList.remove('selected');

    // Mets le nouveau
    octogone.classList.add('selected');

    // Lance l'animation du texte
    animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[index]);

    // Met à jour l'index
    currentChapitreIndex = index;
    
    // Anime le scroll window
    gsap.to(window, {
      scrollTo: {
        y: targetPosition,
        autoKill: false
      },
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Désactiver le flag quand le scroll est terminé
        isClickScrolling = false;
      }
    });
  });
});
const sections = gsap.utils.toArray('.all-chapitre');
sections.forEach((chapitre, index) => {
  const texts = chapitre.querySelectorAll('.text-parallax');
  console.log(`Chapitre ${index}:`, texts.length, 'text-parallax trouvés');

  if (texts.length === 0) return;

  const startPosition = chapitrePositions[index];
  const endPosition = index < sections.length - 1 
    ? chapitrePositions[index + 1] 
    : getScrollAmount();

  texts.forEach((text) => {
    // Calculer la position absolue du texte dans .illustration-list
    const illustrationListRect = illustrationList.getBoundingClientRect();
    const textRect = text.getBoundingClientRect();
    const textAbsoluteLeft = textRect.left - illustrationListRect.left + illustrationList.scrollLeft;
    
    // L'animation commence quand le texte entre dans le viewport (à droite de l'écran)
    const textStart = textAbsoluteLeft - window.innerWidth;
    // Continue jusqu'à la fin du chapitre
    const textEnd = endPosition;

    gsap.to(text, {
      x: () => -1500,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: () => `top top-=${Math.max(0, textStart)}`,
        end: () => `top top-=${textEnd}`,
        scrub: 1,
        markers: true,
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

// ===== AJUSTER LA TAILLE DU MÉANDRE =====
// À ajouter au début de chapitre-navigation.js, après les imports GSAP

// function updateMeandreWidth() {
//   const meandre = document.querySelector('.meandre');
//   const illustrationList = document.querySelector('.illustration-list');
  
//   if (meandre && illustrationList) {
//     // Calculer la largeur totale de tous les chapitres
//     const totalWidth = illustrationList.scrollWidth;
    
//     // Appliquer la largeur au méandre
//     meandre.style.width = `${totalWidth}px`;
    
//     console.log('Méandre width updated:', totalWidth + 'px');
//   }
// }

// // Mettre à jour au chargement
// window.addEventListener('load', () => {
//   updateMeandreWidth();
  
//   // Attendre un peu pour que tout soit bien chargé
//   setTimeout(updateMeandreWidth, 100);
//   setTimeout(updateMeandreWidth, 500);
// });

// // Mettre à jour au resize
// window.addEventListener('resize', () => {
//   updateMeandreWidth();
// });

// // Mettre à jour quand ScrollTrigger refresh
// ScrollTrigger.addEventListener('refresh', updateMeandreWidth);

// // Appel initial
// updateMeandreWidth();