// Animation d'entrée avec GSAP
document.addEventListener('DOMContentLoaded', () => {
  
  // ========== ANIMATION DES BOUTONS DE NAVIGATION ==========
  const btn = document.querySelectorAll('.button');

  // initial state for all buttons
  gsap.set(btn, {
    scale: 0.1,
    rotation: 0,
    // opacity: 0
  });

  // Animation d'entrée — on utilise `stagger` pour l'échelonnement
  // (ancien code utilisait `index` qui n'était pas défini dans ce scope)
  gsap.to(btn, {
    scale: 1,
    rotation: 45,
    opacity: 1,
    delay:0.4,
    duration: 0.4,
    stagger: 0.2, // échelonne automatiquement chaque élément
    ease: "back.out(1.5)"
  });
  
  // ========== ANIMATION DU TITRE ==========
  const titleElement = document.querySelector('h1');
  
  if (titleElement) {
    const titleText = titleElement.textContent;
    
    // Vider le titre et créer des spans pour chaque lettre
    titleElement.innerHTML = '';
    
    const titleLetters = titleText.split('');
    titleLetters.forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      if (letter === ' ') {
        span.style.width = '0.3em';
      }
      
      // State initial pour chaque lettre
      gsap.set(span, {
        y: 30,
        opacity: 0
      });
      
      titleElement.appendChild(span);
    });
    
    // Animer chaque lettre du titre
    const titleLetterSpans = titleElement.querySelectorAll('span');
    titleLetterSpans.forEach((span, letterIndex) => {
      gsap.to(span, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.3 + (letterIndex * 0.08), // Délai initial + délai par lettre
        ease: "back.out(1.2)"
      });
    });
  }
  
  // ========== ANIMATION DU TEXTE DES BOUTONS DE LANGUE ==========
  const secondaryButtons = document.querySelectorAll('.secondary-button p');
  
  secondaryButtons.forEach((textElement, index) => {
    const text = textElement.textContent;
    
    // Vider le texte et créer des spans pour chaque lettre
    textElement.innerHTML = '';
    
    const letters = text.split('');
    letters.forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      if (letter === ' ') {
        span.style.width = '0.3em';
      }
      
      // State initial pour chaque lettre
      gsap.set(span, {
        y: 20,
        opacity: 0
      });
      
      textElement.appendChild(span);
    });
    
    // Animer chaque lettre avec délai échelonné
    const letterSpans = textElement.querySelectorAll('span');
    letterSpans.forEach((span, letterIndex) => {
      gsap.to(span, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: (index * 0.15) + (letterIndex * 0.05), // Délai par bouton + délai par lettre
        ease: "back.out(1.2)"
      });
    });
  });
  
  // ========== ANIMATION DU BUTTON-PRIMARY ==========
  const buttonPrimary = document.querySelector('.button-primary');
  
  if (buttonPrimary) {
    // Animation du bouton depuis le haut
    gsap.set(buttonPrimary, {
      y: -100,
      opacity: 0
    });
    
    gsap.to(buttonPrimary, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      // delay: 0.5,
      // ease: "ease"
    });
    
    // Animation du texte à l'intérieur du bouton
    const buttonText = buttonPrimary.querySelector('p');
    if (buttonText) {
      const text = buttonText.textContent;
      
      // Vider le texte et créer des spans pour chaque lettre
      buttonText.innerHTML = '';
      
      const letters = text.split('');
      letters.forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        if (letter === ' ') {
          span.style.width = '0.3em';
        }
        
        // State initial pour chaque lettre
        gsap.set(span, {
          y: 15,
          opacity: 0
        });
        
        buttonText.appendChild(span);
      });
      
      // Animer chaque lettre du texte du bouton
      const buttonLetterSpans = buttonText.querySelectorAll('span');
      buttonLetterSpans.forEach((span, letterIndex) => {
        gsap.to(span, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 1.3 + (letterIndex * 0.06), // Délai après l'arrivée du bouton + délai par lettre
          ease: "back.out(1.2)"
        });
      });
    }
  }
  
  // ========== ANIMATION DE LA NAVIGATION CHAPITRE ==========
  const navChapitre = document.querySelector('.nav-chapitre');
  
  if (navChapitre) {
    // Animer les flèches gauche et droite
    const arrows = navChapitre.querySelectorAll('.arrow');
    arrows.forEach((arrow, index) => {
      gsap.set(arrow, {
        opacity: 0,
        x: index === 0 ? -30 : 30
      });
      
      gsap.to(arrow, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 1.5 + (index * 0.3),
        ease: "back.out(1.2)"
      });
    });
    
    // Animer les octogones
    const octogones = navChapitre.querySelectorAll('.octogone');
    octogones.forEach((octogone, index) => {
      // état initial de l'octogone
      gsap.set(octogone, {
        scale: 0.1,
        opacity: 0
      });

      // sélectionner le chiffre à l'intérieur (si présent)
      const octNumber = octogone.querySelector('p');
      if (octNumber) {
        // état initial du chiffre (léger décalage pour effet pop)
        gsap.set(octNumber, {
          y: 8,
          scale: 0.1,
          opacity: 0,
          transformOrigin: '50% 50%'
        });
      }

      // animation de l'octogone
      const baseDelay = 1.8 + (index * 0.2);
      gsap.to(octogone, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        delay: baseDelay,
        ease: "back.out(1.5)"
      });

      // animation du chiffre — légèrement après l'octogone pour synchroniser
      if (octNumber) {
        gsap.to(octNumber, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          delay: baseDelay + 0.5,
          ease: 'power2.out'
        });
      }
    });
  }
  
  // ========== ANIMATION DU CHAPITRE 1 ==========
  const chapitreFrame = document.querySelector('.chapitre-frame');
  const chapitreImg = document.querySelector('.chapitre-img');
  
  if (chapitreFrame) {
    // Timeline pour le chapitre
    const tlChapitre = gsap.timeline({
      defaults: { ease: "power3.out" }
    });
    
    // Sélectionner les éléments
    const rightHand = document.querySelector('.rightHand');
    const leftHand = document.querySelector('.leftHand');
    const star = document.querySelector('.star');
    const baby = document.querySelector('.baby');
    const title = document.querySelector('.chapitre-title');
    
    // État initial : cacher tous les éléments
    gsap.set(chapitreImg, {
      y: 520,
            // opacity: 0,

      rotation: 0
    });
    
    gsap.set(star, {
      scale: 0,
            // y: 200,

      // opacsity: 0,
      // rotation: -80
    });
    
    gsap.set(baby, {
      // opacity: 0,
      scale: 0
    });
    
    gsap.set(title, {
      opacity: 0,
      y: -30
    });
    
    // Animation séquence
    
    // 1. Les mains apparaissent depuis le bas (0.5s de délai)
    tlChapitre.to(chapitreImg, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, 0.5);
    
    // 2. Les mains pivotent légèrement
    tlChapitre.to(rightHand, {
      rotation: -8,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");
    
    tlChapitre.to(leftHand, {
      rotation: 8,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.6");
    
    // 3. En même temps que la rotation, l'étoile apparaît (scale 0 à 1)
    tlChapitre.to(star, {
            y: 0,

      scale: 1,
      opacity: 1,
      // rotation: -90,
      duration: 0.8,
      ease: "back.out(1.5)"
    }, "-=0.7");
    
    // 4. Le bébé apparaît légèrement après l'étoile
    tlChapitre.to(baby, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.65");
    
    // 5. Le titre apparaît en dernier
    tlChapitre.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, "-=0.3");
    
    // Animation de respiration pour l'étoile (boucle infinie après l'animation d'entrée)
    tlChapitre.add(() => {
      gsap.to(star, {
        scale: 1.3,
        // rotation: 45,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }, "-=0.5");
    
    // Animation subtile pour le bébé (boucle infinie)
    tlChapitre.add(() => {
      gsap.to(baby, {
        y: -8,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }, "-=0");
    tlChapitre.add(() => {
      gsap.to(leftHand, {
        y: -16,
        x: 26,
                rotation: 12,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }, "-=0");
    tlChapitre.add(() => {
      gsap.to(rightHand, {
        y: -16,
        x: -26,
                rotation: -12,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }, "-=0.1");
  }
  
});

