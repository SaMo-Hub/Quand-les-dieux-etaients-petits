// Animations d'entrée / sortie pour la home
(function(){
  function splitWords(el){
    if(!el) return;
    const text = el.textContent.trim();
    if(!text) return;
    const words = text.split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word" style="display:inline-block">${w}</span>`).join(' ');
  }

  function entryAnimation(){
    gsap.to('.tree', { opacity: 1, duration: 0.8, ease: 'power1.out' });
    gsap.to('h1 .word', { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' });
    gsap.to('.explication .word', { y: 0, opacity: 1, duration: 0.6, stagger: 0.02, delay: 0.15, ease: 'power3.out' });
  }

  function exitAnimation(){
    return new Promise(resolve => {
      const tl = gsap.timeline({ onComplete: resolve });
      tl.to('.explication .word', { y: -20, opacity: 0, duration: 0.35, stagger: 0.02, ease: 'power2.in' }, 0);
      tl.to('h1 .word', { y: -50, opacity: 0, duration: 0.6, stagger: 0.03, ease: 'power3.in' }, 0);
      tl.to('.tree', { opacity: 0, duration: 0.45, ease: 'power1.in' }, 0);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    const p = document.querySelector('.explication');

    splitWords(title);
    splitWords(p);

    // initial states
    gsap.set('.word', { opacity: 0, y: 50 });
    gsap.set('.tree', { opacity: 0 });

    // run entry
    entryAnimation();

    // intercepter les liens pour jouer l'animation de sortie
    document.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        // ignore anchors, mailto, and javascript pseudo-links
        if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;
        e.preventDefault();
        exitAnimation().then(() => {
          window.location.href = href;
        });
      });
    });
  });
})();
