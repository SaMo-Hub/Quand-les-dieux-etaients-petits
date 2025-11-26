const chapitreName = document.getElementById("chapitre-name");


const chapitreNames = [
  "L'enfant de la prophétie",
  "Chapitre 2",
  "Chapitre 3",
  "Chapitre 4",
];

let currentChapitreIndex = 0;
let isAnimating = false; // flag pour tracker si une animation est en cours

// Initialisation
chapitreName.textContent = chapitreNames[0];


// ANIMATION ENTREE
function animateEntree(newText) {

  chapitreName.innerHTML = '';

  [...newText].forEach(letter => {
    const span = document.createElement('span');
    if (letter === ' ') {
     letter = '\u00A0'; // espace insécable pour conserver les espaces
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
      isAnimating = false; // animation terminée
    }
  });
}


// ANIMATION SORTIE + ENTRÉE
function animateSortie(oldText, newText) {
  
  chapitreName.innerHTML = '';
  console.log(chapitreName,newText);

  [...oldText].forEach(letter => {
    console.log(letter);

    
    const span = document.createElement('span');
    if (letter === ' ') {
      letter = '\u00A0'; // espace insécable pour conserver les espaces
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



// 📌 SELECTION DES OCTOGONES
const octogones = document.querySelectorAll('.octogone');

octogones.forEach(octo => {
  octo.addEventListener('click', () => {
// si une animation est en cours, ignore le clic
    if (isAnimating) return;

    const index = parseInt(octo.dataset.index);

    // si on clique sur le même chapitre → ne rien faire
    if (index === currentChapitreIndex) return;

    // set le flag d'animation
    isAnimating = true;

    // retire l'ancien selected
    document.querySelector('.octogone.selected')?.classList.remove('selected');

    // mets le nouveau
    octo.classList.add('selected');
// console.log(chapitreNames[index]);

    // lance l'animation
    animateSortie(chapitreNames[currentChapitreIndex], chapitreNames[index]);

    // met à jour l'index
    currentChapitreIndex = index;
  });
});
