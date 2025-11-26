// gsap.registerPlugin(ScrollTrigger);

// // Sélectionner le conteneur des illustrations
// const illustrationList = document.querySelector('.illustration-list');
// const sections = gsap.utils.toArray('.illustration-list > *');

// // Calculer la largeur totale à scroller
// let totalWidth = 0;
// sections.forEach(section => {
//   totalWidth += section.offsetWidth;
// });

// // Créer le scroll horizontal
// gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".illustration-list",
//     pin: true,
//     scrub: 1,
//     snap: 1 / (sections.length - 1),
//     end: () => "+=" + totalWidth,
//     invalidateOnRefresh: true
//   }
// });

// // Animation du méandre (défilement parallaxe)
// gsap.to('.meandre', {
//   x: -2000,
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".illustration-list",
//     start: "top top",
//     end: () => "+=" + totalWidth,
//     scrub: 0.5
//   }
// });

// // Animation des octogones de navigation
// const octogones = document.querySelectorAll('.octogone');
// sections.forEach((section, index) => {
//   ScrollTrigger.create({
//     trigger: section,
//     start: "left center",
//     end: "right center",
//     onEnter: () => {
//       octogones.forEach(oct => oct.classList.remove('selected'));
//       if (octogones[index]) {
//         octogones[index].classList.add('selected');
//       }
//     },
//     onEnterBack: () => {
//       octogones.forEach(oct => oct.classList.remove('selected'));
//       if (octogones[index]) {
//         octogones[index].classList.add('selected');
//       }
//     }
//   });
// });

// // Navigation par clic sur les octogones
// octogones.forEach((octogone, index) => {
//   octogone.style.cursor = 'pointer';
//   octogone.addEventListener('click', () => {
//     const targetSection = sections[index];
//     if (targetSection) {
//       const scrollDistance = targetSection.offsetLeft;
//       gsap.to(window, {
//         scrollTo: {
//           y: scrollDistance,
//           autoKill: false
//         },
//         duration: 1,
//         ease: "power2.inOut"
//       });
//     }
//   });
// });

// // Animation de l'interaction Gaia (rotation des hexagones)
// const spins = document.querySelectorAll('.spin');
// spins.forEach((spin, index) => {
//   spin.style.setProperty('--base-rotation', `${index * 45}deg`);
// });

// // Refresh ScrollTrigger au resize
// window.addEventListener('resize', () => {
//   ScrollTrigger.refresh();
// });