// Configuration du scroll horizontal avec GSAP
gsap.registerPlugin(ScrollTrigger);

// Sélectionner le conteneur des illustrations
const illustrationList = document.querySelector('.illustration-list');
const sections = gsap.utils.toArray('.illustration-list > *');
const chapitreFrames = gsap.utils.toArray('.chapitre-frame');

console.log('Sections:', sections);
console.log('Chapitre frames:', chapitreFrames);

// Calculer la largeur totale à scroller
const getScrollAmount = () => {
  return illustrationList.scrollWidth - window.innerWidth;
};

const SCROLL_SPEED = 2; // 1 = normal, 2 = 2x plus lent, 3 = lent, etc.

const setBodyHeight = () => {
  document.body.style.height = `${(getScrollAmount() * SCROLL_SPEED) + window.innerHeight}px`;
};

// Initialiser la hauteur
setBodyHeight();

// Créer un wrapper pour le scroll horizontal
gsap.to(illustrationList, {
  x: () => -getScrollAmount(),
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
end: () => "+=" + (getScrollAmount() * SCROLL_SPEED),
    scrub: 1,
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
    scrub: 0.5
  }
});

// Animation parallax des textes
gsap.utils.toArray('.frame-texte').forEach((texte, index) => {
  gsap.to(texte, {
    x: () => {
      // Calculer la position de base de ce texte
      let basePosition = 0;
      for (let i = 0; i < sections.length; i++) {
        if (sections[i] === texte) break;
        basePosition += sections[i].offsetWidth;
      }
      // Le texte bouge moins vite (70% de la vitesse normale) = effet parallax
      return -(basePosition * 0.1);
    },
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: () => "+=" + getScrollAmount(),
      scrub: 1
    }
  });
});



// Animation des octogones de navigation
const octogones = document.querySelectorAll('.octogone');

// Configuration pour l'animation du texte du chapitre
const chapitreName = document.getElementById("chapitre-name");
const chapitreNames = [
  "L'enfant de la prophétie",
  "Le choc des Titans"
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

// Créer un mapping des chapitres avec leurs index dans sections
const chapitreIndexes = chapitreFrames.map(frame => {
  return sections.indexOf(frame);
});

console.log('Chapitre indexes:', chapitreIndexes);

// Créer des ScrollTriggers pour chaque chapitre
chapitreFrames.forEach((frame, chapIndex) => {
  const sectionIndex = chapitreIndexes[chapIndex];
  const nextChapIndex = chapIndex + 1;
  const nextSectionIndex = nextChapIndex < chapitreIndexes.length 
    ? chapitreIndexes[nextChapIndex] 
    : sections.length;

  // Calculer la position cumulative réelle en pixels jusqu'à cette section
  let startPosition = 0;
  for (let i = 0; i < sectionIndex; i++) {
    startPosition += sections[i].offsetWidth;
  }

  // Calculer la position de fin (prochaine section de chapitre)
  let endPosition = 0;
  for (let i = 0; i < nextSectionIndex; i++) {
    endPosition += sections[i].offsetWidth;
  }

  // Convertir en scroll vertical
  const maxScroll = getScrollAmount();
  const totalWidth = illustrationList.scrollWidth - window.innerWidth;
  const startScroll = (startPosition / totalWidth) * maxScroll;
  const endScroll = (endPosition / totalWidth) * maxScroll;

  console.log(`Chapitre ${chapIndex}: startScroll=${startScroll}, endScroll=${endScroll}`);

  ScrollTrigger.create({
    trigger: "body",
    start: () => `top top-=${startScroll}`,
    end: () => `top top-=${endScroll}`,
    onEnter: () => {
      console.log('Entering chapitre', chapIndex);
      if (chapIndex !== currentChapitreIndex && !isAnimating) {
        octogones.forEach(oct => oct.classList.remove('selected'));
        if (octogones[chapIndex]) octogones[chapIndex].classList.add('selected');
        isAnimating = true;
        animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[chapIndex]);
        currentChapitreIndex = chapIndex;
      }
    },
    onEnterBack: () => {
      console.log('Entering back chapitre', chapIndex);
      if (chapIndex !== currentChapitreIndex && !isAnimating) {
        octogones.forEach(oct => oct.classList.remove('selected'));
        if (octogones[chapIndex]) octogones[chapIndex].classList.add('selected');
        isAnimating = true;
        animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[chapIndex]);
        currentChapitreIndex = chapIndex;
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

    // Vérifier que l'index est valide
    if (index >= chapitreIndexes.length) return;

    // Set le flag d'animation
    isAnimating = true;

    // Trouver l'index de la section correspondante au chapitre
    const targetSectionIndex = chapitreIndexes[index];
    
    // Calculer le scroll nécessaire basé sur le nombre de sections
    const scrollPerSection = getScrollAmount() / (sections.length - 1);
    const targetScroll = scrollPerSection * targetSectionIndex;
    
    console.log('Clicking chapitre', index, 'section index:', targetSectionIndex, 'target scroll:', targetScroll);
    
    // Anime le scroll avec un objet temporaire
    const scrollObj = { y: window.pageYOffset };
    gsap.to(scrollObj, {
      y: targetScroll,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function() {
        window.scrollTo(0, scrollObj.y);
      }
    });

    // Retire l'ancien selected
    document.querySelector('.octogone.selected')?.classList.remove('selected');

    // Mets le nouveau
    octogone.classList.add('selected');

    // Lance l'animation du texte
    animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[index]);

    // Met à jour l'index
    currentChapitreIndex = index;
  });
});

// Animation de l'interaction Gaia (rotation des hexagones)
const spins = document.querySelectorAll('.spin');
spins.forEach((spin, index) => {
  spin.style.setProperty('--base-rotation', `${index * 45}deg`);
});

// Refresh ScrollTrigger au resize
window.addEventListener('resize', () => {
  setBodyHeight();
  ScrollTrigger.refresh();
});