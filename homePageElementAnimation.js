

(function(){
  function splitWords(el){
    if(!el) return;
    const text = el.textContent.trim();
    if(!text) return;
    const words = text.split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word" style="display:inline-block">${w}</span>`).join(' ');
  }

  // Détecter si on vient de zeusPage.html
  function isComingFromZeusPage(){
    const referrer = document.referrer;
    return referrer.includes('zeusPage.html') || referrer.includes('zeus');
  }

  function entryAnimation(){
    const fromZeus = isComingFromZeusPage();
    const tl = gsap.timeline();
   gsap.to('h1', { opacity: 1 });
    // Animation du titre
    tl.to('h1 .word', { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.05, 
      ease: 'power3.out' 
    }, 0.2);
    
    // Animation de l'arbre
    tl.to('.tree', { 
      opacity: 1, 
      duration: 0.8, 
      ease: 'power1.out' 
    }, 0.3);
    
    // Animation des boutons de navigation
    // Si on vient de zeusPage, ils apparaissent directement
    if (fromZeus) {
      tl.set('.home-nav', { 
        scale: 1,
        opacity: 1
      }, 0)
      
      
    } else {
      tl.to('.home-nav', { 
        scale: 1,
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.1, 
        ease: 'back.out(1.2)',
        clearProps: 'transform'
      }, 0.3);
      
    }
  }

  function exitAnimation(){
    return new Promise(resolve => {
      const tl = gsap.timeline({ onComplete: resolve });
      
      // Sortie du titre
      tl.to('h1 .word', { 
        y: -50, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.03, 
        ease: 'power3.in' 
      }, 0.15);
      
      // Sortie de l'arbre
      tl.to('.tree', { 
        opacity: 0, 
        duration: 0.45, 
        ease: 'power1.in' 
      }, 0.2);
      
      // Délai final pour s'assurer que l'animation est visible
      tl.to({}, { duration: 0.1 });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    const explication = document.querySelector('.explication');
    const fromZeus = isComingFromZeusPage();

    // Split les textes en mots
    splitWords(title);
    splitWords(explication);

    // États initiaux
    gsap.set('.word', { opacity: 0, y: 50 });
    gsap.set('.tree', { opacity: 0 });
    gsap.set('.contour-window', { opacity: 1 });
    
    // Si on vient de zeusPage, les nav sont déjà visibles
    if (fromZeus) {
      gsap.set('.home-nav', { opacity: 1, scale: 1 });
      console.log('Coming from zeusPage.html - skipping .home-nav animation');
    } else {
      gsap.set('.home-nav', { opacity: 0, scale: 0 });
    }

    // Nettoyer les propriétés transform après l'animation d'entrée
    if (!fromZeus) {
      gsap.delayedCall(1.8, () => {
        gsap.set('.home-nav', { clearProps: 'transform' });
      });
    }

    // Lancer l'animation d'entrée
    entryAnimation();

    // Intercepter les liens pour jouer l'animation de sortie
    document.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        // Ignorer les ancres, mailto, et liens javascript
        if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;
        
        e.preventDefault();
        
        // Désactiver tous les liens pour éviter les clics multiples
        document.querySelectorAll('a[href]').forEach(link => {
          link.style.pointerEvents = 'none';
        });
        
        exitAnimation().then(() => {
          window.location.href = href;
        });
      });
    });
  });
})();