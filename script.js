// ===== ANIMATION DES SPINS =====
const svgs = document.querySelectorAll('.spin');
let currentIndex = 0;

if (svgs.length > 0) {
  svgs.forEach((svg, index) => {
    const angle = index * 45;
    svg.style.setProperty('--base-rotation', angle + 'deg');
  });

  function updateOpacities() {
    svgs.forEach((svg, index) => {
      if (index === currentIndex) {
        svg.style.opacity = '1';
      } else {
        svg.style.opacity = '0.5';
      }
    });
    currentIndex = (currentIndex + 1) % svgs.length;
  }

  updateOpacities();
  setInterval(updateOpacities, 600);
}

// ===== SYSTÈME AUDIO PERSISTANT VIA IFRAME =====




function checkScreenSize() {
  console.log(window.innerWidth);
  const modal = document.querySelector(".screen-small");

  if (window.innerWidth < 900) {
    
    modal.style.display = "flex"; // ou block selon ton design
  } else {
    modal.style.display = "none";
  }
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);