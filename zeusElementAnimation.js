// Animation d'entrée avec GSAP
document.addEventListener('DOMContentLoaded', () => {
  
  
  
  // Utility: split an element's text into <span class="word"> per word
  function splitWords(el) {
    if (!el) return;
    const text = el.textContent.trim();
    if (!text) return;
    const tokens = text.split(/(\s+)/);
    el.innerHTML = '';
    tokens.forEach(token => {
      if (/^\s+$/.test(token)) {
        el.appendChild(document.createTextNode(token));
      } else if (token.length > 0) {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = token;
        span.style.display = 'inline-block';
        span.style.verticalAlign = 'bottom';
        el.appendChild(span);
      }
    });
  }
  
   const meandre = document.querySelector('.meandre');
  gsap.to(meandre, {
      
      opacity: 1,
      duration: 0,

// ease: "elastic.inOut(1)",
    });
  if (meandre) {
    // État initial : décalé vers la gauche et transparent
    gsap.set(meandre, {
      x: 2700,
    });
    
    // Animation d'entrée
    gsap.to(meandre, {
      x: 0,
      opacity: 1,
      duration: 1.4,
      delay:1,
// ease: "elastic.inOut(1)",
    });
  }
  

  
  // ========== ANIMATION DU BUTTON-PRIMARY ==========
  const buttonPrimary = document.querySelector('.chapitre-name-animation');
  
  if (buttonPrimary) {
    // Animation du bouton depuis le haut
    gsap.set(buttonPrimary, {
      y: -100,
      opacity: 0
    });
    
    gsap.to(buttonPrimary, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      delay: 0.5,
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
          delay: 1.3 + (letterIndex * 0.02), // Délai après l'arrivée du bouton + délai par lettre
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
ease: "expo.inOut",

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

    // GSAP hover handlers — use JS so hover fonctionne malgré les transforms inline de GSAP
    navChapitre.querySelectorAll('.octogone').forEach(oct => {
      oct.addEventListener('mouseenter', () => {
        gsap.to(oct, { scale: 1.12, duration: 0.22, ease: 'power2.out' });
      });
      oct.addEventListener('mouseleave', () => {
        gsap.to(oct, { scale: 1, duration: 0.22, ease: 'power2.in' });
      });
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
    
    // We'll animate the chapitre title by words inside the timeline.
    // Split the title into word spans and set initial state on those words.
    splitWords(title);
    const titleWords = title ? title.querySelectorAll('.word') : [];
    if (titleWords.length) {
      gsap.set(titleWords, { y: 110 });
    }
   gsap.to(title, {
         
          opacity: 1,
          duration: 0,
         
        });
    // Retirer la classe preload après avoir défini les états initiaux
    if (document.body.classList.contains('preload')) {
      document.body.classList.remove('preload');
    }
    
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
    
    // 5. Le titre (par mot) apparaît en dernier — animation intégrée dans la timeline
    if (titleWords && titleWords.length) {
      tlChapitre.to(titleWords, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        stagger: 0.1
      }, "-=0.3");
    }
    
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
    }, "-=0.75");
    
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
    }, "-=1.1");
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
    }, "-=1.2");
  }
  
  
});

// ===== REMPLACER LA SECTION "ANIMATION PAR-MOT AU SCROLL" dans zeusElementAnimation.js =====

// Animation par mot au scroll - ADAPTÉE POUR SCROLL HORIZONTAL
const chapitretitle = document.querySelector('.text-animate')
// ===== ANIMATION PAR-MOT AU SCROLL - VERSION CORRIGÉE =====
 
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const animateParagraphWords = (rootSelector = '.frame-texte p, .explication, .text-parallax p, .text-animate') => {
    const elems = document.querySelectorAll(rootSelector);
    
    elems.forEach(p => {
      // Éviter le double-split
      if (p.dataset._wordsSplit) return;

      // Fonction récursive pour splitter le texte en préservant les éléments HTML
      function splitTextNodes(node) {
        const fragment = document.createDocumentFragment();
        
        node.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            // C'est un nœud texte : on le split en mots
            const text = child.textContent;
            const tokens = text.split(/(\s+)/);
            
            tokens.forEach(token => {
              if (/^\s+$/.test(token)) {
                // Espace : garder tel quel
                fragment.appendChild(document.createTextNode(token));
              } else if (token.length > 0) {
                // Mot : wrapper dans un span
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = token;
                span.style.display = 'inline-block';
                span.style.verticalAlign = 'bottom';
                span.style.marginRight = '0.06em';
                fragment.appendChild(span);
              }
            });
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            // C'est un élément HTML (comme un bouton) : le garder et splitter son texte
            const clonedChild = child.cloneNode(false);
            
            // Copier tous les attributs (id, class, etc.) pour garder les event listeners
            Array.from(child.attributes).forEach(attr => {
              clonedChild.setAttribute(attr.name, attr.value);
            });
            
            // Splitter le texte à l'intérieur du bouton aussi
            child.childNodes.forEach(subChild => {
              if (subChild.nodeType === Node.TEXT_NODE) {
                const text = subChild.textContent;
                const tokens = text.split(/(\s+)/);
                
                tokens.forEach(token => {
                  if (/^\s+$/.test(token)) {
                    clonedChild.appendChild(document.createTextNode(token));
                  } else if (token.length > 0) {
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = token;
                    span.style.display = 'inline-block';
                    span.style.verticalAlign = 'bottom';
                    clonedChild.appendChild(span);
                  }
                });
              } else {
                clonedChild.appendChild(subChild.cloneNode(true));
              }
            });
            
            fragment.appendChild(clonedChild);
          }
        });
        
        return fragment;
      }

      // Créer un conteneur temporaire avec le contenu original
      const tempContainer = document.createElement('div');
      tempContainer.appendChild(p.cloneNode(true));
      
      // Splitter le contenu
      const splitContent = splitTextNodes(tempContainer.firstChild);
      
      // Remplacer le contenu du paragraphe
      p.innerHTML = '';
      p.appendChild(splitContent);
      
      p.dataset._wordsSplit = '1';

      // Récupérer TOUS les mots (y compris ceux dans les boutons)
      const words = p.querySelectorAll('.word');
      if (words.length === 0) return;

      // Cacher les mots initialement
      gsap.set(words, { y: 24, opacity: 0 });

      // Calculer la position du paragraphe dans le scroll horizontal
      const illustrationList = document.querySelector('.illustration-list');
      const illustrationListRect = illustrationList.getBoundingClientRect();
      const pRect = p.getBoundingClientRect();
      
      const pAbsoluteLeft = pRect.left - illustrationListRect.left + illustrationList.scrollLeft;
      
      const TRIGGER_OFFSET = 200;
      const triggerStart = pAbsoluteLeft - window.innerWidth + TRIGGER_OFFSET;
      
      // Créer une timeline pausée
      const tl = gsap.timeline({ paused: true });

     tl.to(words, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.015,
        immediateRender: false
      });

      // Utiliser ScrollTrigger
      ScrollTrigger.create({
        trigger: "body",
        start: () => `top top-=${Math.max(0, triggerStart)}`,
        end: () => `top top-=${triggerStart + 500}`,
        onEnter: () => {
          if (!tl.isActive() && tl.progress() === 0) {
            tl.play();
          }
        },
        once: true,
        invalidateOnRefresh: true
      });
    });
  };

  // Attendre que le scroll horizontal soit bien initialisé
  window.addEventListener('load', () => {
    setTimeout(() => {
      animateParagraphWords();
      ScrollTrigger.refresh();
    }, 500);
  });

  // Re-run au resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  });
}

// Animation de sortie pour la page Zeus
(function(){
  
  function exitAnimation(){
    return new Promise(resolve => {
      const tl = gsap.timeline({ onComplete: resolve });
      
      // 1. Fade out de l'illustration-list (tout le contenu scrollable)
      tl.to('.illustration-list', { 
        opacity: 0, 
        duration: 0.5, 
        ease: 'power2.in' 
      }, 0);
      
      // 2. Les octogones disparaissent (inverse de l'entrée)
      const octogones = document.querySelectorAll('.octogone');
      tl.to(octogones, {
        scale: 0.1,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.in(1.5)"
      }, 0.1);
      
      // 3. Les flèches disparaissent (inverse de l'entrée)
      const arrows = document.querySelectorAll('.arrow');
      arrows.forEach((arrow, index) => {
        tl.to(arrow, {
          opacity: 0,
          x: index === 0 ? -30 : 30,
          duration: 0.4,
          ease: "expo.in"
        }, 0.15 + (index * 0.1));
      });
      
      // 4. Le bouton chapitre-name remonte (inverse de l'entrée)
      const buttonPrimary = document.querySelector('.chapitre-name-animation');
      if (buttonPrimary) {
        const buttonText = buttonPrimary.querySelector('p');
        const buttonLetterSpans = buttonText ? buttonText.querySelectorAll('span') : [];
        
        // Faire disparaître les lettres d'abord
        if (buttonLetterSpans.length > 0) {
          tl.to(buttonLetterSpans, {
            y: -15,
            opacity: 0,
            duration: 0.3,
            stagger: 0.01,
            ease: "power2.in"
          }, 0.2);
        }
        
        // Puis le bouton lui-même
        tl.to(buttonPrimary, {
          y: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, 0.3);
      }
      
 
      // Petit délai pour s'assurer que l'animation est visible
      tl.to({}, { duration: 0.1 });
    });
  }
  
  // Fonction pour initialiser l'animation de sortie
  function initExitAnimation() {
    // Intercepter tous les liens de navigation
    document.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        // Ignorer les ancres, mailto, et liens javascript
        if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;
        
        e.preventDefault();
        
        // Désactiver tous les liens pour éviter les clics multiples
        document.querySelectorAll('a[href], button').forEach(el => {
          el.style.pointerEvents = 'none';
        });
        
        exitAnimation().then(() => {
          window.location.href = href;
        });
      });
    });
    
    // Intercepter aussi les boutons avec des redirections spécifiques
    // Par exemple si vous avez des boutons qui changent de page
    const navigationButtons = document.querySelectorAll('[data-redirect]');
    navigationButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const redirectUrl = btn.getAttribute('data-redirect');
        
        if (redirectUrl) {
          document.querySelectorAll('a[href], button').forEach(el => {
            el.style.pointerEvents = 'none';
          });
          
          exitAnimation().then(() => {
            window.location.href = redirectUrl;
          });
        }
      });
    });
  }
  
  // Attendre que le DOM soit chargé et que les animations d'entrée soient terminées
  document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu que les animations d'entrée se terminent
    setTimeout(() => {
      initExitAnimation();
    }, 3000); // Ajuster ce délai selon la durée de vos animations d'entrée
  });
  
})();