(function(){
  function splitWords(el){
    if(!el) return;
    const text = el.textContent.trim();
    if(!text) return;
    const words = text.split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word" style="display:inline-block">${w}</span>`).join(' ');
  }

  function entryAnimation(){
    const tl = gsap.timeline();

    // Animation de la fenêtre
    tl.to('.window', { 
      opacity: 1, 
      duration: 3, 
      delay: 0.2,
      ease: 'power3.out' 
    }, 0);
    gsap.to('h1', { opacity: 1 });

    // Animation du titre
    tl.to('h1 .word', { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.08, 
      ease: 'power3.out' 
    }, 0.35);
    
    // Animation des boutons de langue avec un délai
    tl.to('.secondary-button', { 
      scale: 1,
      opacity: 1, 
      duration: 0.15, 
      stagger: 0.085, 
      ease: 'back.out(1.2)' 
    }, 0.5);
    
    // Animation des boutons de navigation
    tl.to('.nav-button .button', { 
      scale: 1,
      opacity: 1, 
      duration: 0.4, 
      stagger: 0.1, 
      ease: 'back.out(1.2)' 
    }, 0.5);
  }

  function exitAnimation(){
    return new Promise(resolve => {
      const tl = gsap.timeline({ onComplete: resolve });
      
      // Sortie du bouton d'interaction
      tl.to('#enter-site', { 
        scale: 0.1,
        opacity: 0, 
        duration: 0.5, 
        ease: 'back.in(1.7)' 
      }, 0);
      
      // Sortie des boutons de langue
      tl.to('.secondary-button', { 
        scale: 0.8,
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.06, 
        ease: 'power2.in' 
      }, 0.2);
      
      // Sortie du titre et sous-titre
      tl.to('h2', { 
        y: -30, 
        opacity: 0, 
        duration: 0.4, 
        ease: 'power3.in' 
      }, 0.3);
      
      tl.to('h1 .word', { 
        y: -50, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: 'power3.in' 
      }, 0.35);
      
      // Sortie de l'image Intro
      tl.to('.Intro', { 
        opacity: 0, 
        duration: 0.6, 
        ease: 'power2.in' 
      }, 0.4);
      
      // Ajouter un petit délai avant la redirection
      tl.to({}, { duration: 0.2 });
    });
  }

  let selectedLanguage = null;

  document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    const interactionBtn = document.getElementById('enter-site');

    // Split le titre en mots
    splitWords(title);

    // États initiaux
    gsap.set('h1 .word', { opacity: 0, y: 50 });
    gsap.set('.window', { opacity: 0 });
    gsap.set('.secondary-button', { opacity: 0, scale: 0.8 });
    gsap.set('.nav-button .button', { opacity: 0, scale: 0 });
    
    // Cacher le bouton d'interaction au départ
    if (interactionBtn) {
      gsap.set(interactionBtn, { opacity: 0, scale: 0.1, display: 'none' });
    }
    
    // Nettoyer les propriétés transform après l'animation d'entrée
    gsap.delayedCall(1.5, () => {
      gsap.set('.secondary-button', { clearProps: 'transform' });
      gsap.set('.nav-button .button', { clearProps: 'transform' });
    });
    
    // Jouer l'animation d'entrée
    entryAnimation();

    // Gérer la sélection des langues (sans redirection)
    document.querySelectorAll('.secondary-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Retirer la classe selected de tous les boutons
        document.querySelectorAll('.secondary-button').forEach(b => {
          b.classList.remove('selected');
        });
        
        // Ajouter la classe selected au bouton cliqué
        btn.classList.add('selected');
        
        // Sauvegarder la langue sélectionnée
        selectedLanguage = btn.querySelector('p').textContent;
        
        // Animation du bouton sélectionné
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.2,
          ease: 'back.out(1.7)',
          onComplete: () => {
            gsap.to(btn, { scale: 1, duration: 0.15 });
          }
        });
        
        // Afficher le bouton d'interaction avec animation
        if (interactionBtn) {
          interactionBtn.style.display = 'block';
          gsap.to(interactionBtn, {
            opacity: 1,
            scale: 3,
            duration: 0.5,
            ease: 'back.out(1.7)'
          });
        }
      });
    });

    // Gérer le clic sur le bouton d'interaction
    if (interactionBtn) {
      interactionBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!selectedLanguage) return;

  localStorage.setItem('selectedLanguage', selectedLanguage);

  exitAnimation().then(() => {
    window.location.href = './pages/Home/homePage.html';
           
          
        });
      });
    }
  });
})();