// Animations d'entrée / sortie pour la page de sélection de langue
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
      duration: 0.8, 
      delay: 0.2,
      ease: 'power3.out' 
    }, 0);
    
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
    }, 0.4);
    
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
      
      // Sortie des boutons de navigation
     
      
      // Sortie des boutons de langue
      tl.to('.secondary-button', { 
        scale: 0.8,
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.06, 
        ease: 'power2.in' 
      }, 0.1);
      
      // Sortie du titre
      tl.to('h1 .word', { 
        y: -50, 
        opacity: 0, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: 'power3.in' 
      }, 0.2);
     
      
      // Ajouter un petit délai avant la redirection pour s'assurer que l'animation est visible
      tl.to({}, { duration: 0.2 });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');

    // Split le titre en mots
    splitWords(title);

    // États initiaux
    gsap.set('h1 .word', { opacity: 0, y: 50 });
    gsap.set('.window', { opacity: 0 });
    gsap.set('.secondary-button', { opacity: 0, scale: 0.8 });
    gsap.set('.nav-button .button', { opacity: 0, scale: 0 });
    
    // Nettoyer les propriétés transform après l'animation d'entrée
    gsap.delayedCall(1.5, () => {
      gsap.set('.secondary-button', { clearProps: 'transform' });
      gsap.set('.nav-button .button', { clearProps: 'transform' });
    });
    
    // Jouer l'animation d'entrée
    entryAnimation();

    // Intercepter les clics sur les boutons de langue
    document.querySelectorAll('.secondary-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Désactiver tous les boutons pour éviter les clics multiples
        document.querySelectorAll('.secondary-button').forEach(b => {
          b.style.pointerEvents = 'none';
        });
        
        // Animation de click sur le bouton sélectionné
        gsap.to(btn, {
          scale: 1.15,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            exitAnimation().then(() => {
              // Redirection vers la page appropriée
              const language = btn.querySelector('p').textContent.toLowerCase();
              console.log(`Langue sélectionnée: ${language}`);
              window.location.href = './homePage.html';
            });
          }
        });
      });
    });
  });
})();