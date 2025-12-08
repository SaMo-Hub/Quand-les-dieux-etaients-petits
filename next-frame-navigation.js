// // ===== NAVIGATION NEXT FRAME =====

// // Attendre que le DOM et GSAP soient chargés
// document.addEventListener('DOMContentLoaded', () => {
//   const nextFrameBtn = document.querySelector('.next-frame .button');
  
//   if (!nextFrameBtn) return;

//   // Fonction pour trouver la prochaine frame visible
//   function getNextFramePosition() {
//     const currentScroll = window.scrollY;
//     const illustrationList = document.querySelector('.illustration-list');
//     const illustrationListRect = illustrationList.getBoundingClientRect();
    
//     // Récupérer toutes les frames (frame-space, illustration, illustration-large, etc.)
//     const allFrames = document.querySelectorAll('.frame-space, .illustration, .illustration-large, .chapitre-frame');
    
//     // Convertir NodeList en Array et filtrer/trier
//     const frames = Array.from(allFrames).map(frame => {
//       const rect = frame.getBoundingClientRect();
//       // Calculer la position absolue dans le scroll horizontal
//       const absoluteLeft = rect.left - illustrationListRect.left + illustrationList.scrollLeft;
//       return {
//         element: frame,
//         position: absoluteLeft
//       };
//     }).sort((a, b) => a.position - b.position);
    
//     // Trouver la frame actuelle (celle qui est visible ou proche du viewport)
//     const viewportCenter = -illustrationList.getBoundingClientRect().left + window.innerWidth / 2;
    
//     let currentFrameIndex = 0;
//     let minDistance = Infinity;
    
//     frames.forEach((frame, index) => {
//       const distance = Math.abs(frame.position - viewportCenter);
//       if (distance < minDistance) {
//         minDistance = distance;
//         currentFrameIndex = index;
//       }
//     });
    
//     // Retourner la position de la frame suivante
//     if (currentFrameIndex < frames.length - 1) {
//       return frames[currentFrameIndex + 1].position;
//     }
    
//     // Si on est à la dernière frame, retourner null
//     return null;
//   }

//   // Événement de clic sur le bouton
//   nextFrameBtn.addEventListener('click', () => {
//     const nextPosition = getNextFramePosition();
    
//     if (nextPosition !== null) {
//       // Animer le scroll vers la prochaine frame
//       gsap.to(window, {
//         scrollTo: {
//           y: nextPosition,
//           autoKill: false
//         },
//         duration: 1,
//         ease: "power2.inOut"
//       });
      
//       // Animation du bouton au clic
//       gsap.to(nextFrameBtn, {
//         scale: 0.9,
//         duration: 0.1,
//         yoyo: true,
//         repeat: 1,
//         ease: "power2.inOut"
//       });
//     } else {
//       // On est à la fin, peut-être faire un effet visuel
//       gsap.to(nextFrameBtn, {
//         x: [0, 10, -10, 10, 0],
//         duration: 0.4,
//         ease: "power2.inOut"
//       });
//     }
//   });
  
//   // Animation de pulse sur le bouton pour attirer l'attention
//   gsap.to(nextFrameBtn, {
//     scale: 1.1,
//     duration: 1,
//     ease: "sine.inOut",
//     yoyo: true,
//     repeat: -1
//   });
// });