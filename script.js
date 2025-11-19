document.addEventListener("DOMContentLoaded", () => {
  const boutons = document.querySelectorAll(".bouton");

  boutons.forEach(bouton => {
    const text = bouton.dataset.text || "Bouton";

    bouton.innerHTML = `
      <div class="square left"></div>

      <div class="fond-texte">
        <svg class="svg-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 107" fill="none">
          <path d="M31 2V105H19.4414L18.8535 104.396L2.56836 87.708L2 87.125V19.875L2.56836 19.292L18.8535 2.60352L19.4414 2H31Z"
                fill="#140100" stroke="#EB7333" />
        </svg>

        <div class="texte">${text}</div>

        <svg class="svg-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 107" fill="none">
          <path d="M2 2V105H13.5586L14.1465 104.396L30.4316 87.708L31 87.125V19.875L30.4316 19.292L14.1465 2.60352L13.5586 2H2Z"
                fill="#140100" stroke="#EB7333"/>
        </svg>
      </div>

      <div class="square right"></div>
    `;
  });
});

const svgs = document.querySelectorAll('.spin');
let currentIndex = 0;

svgs.forEach((svg, index) => {
  const angle = index * 45; // 0°, 45°, 90°, 135°, etc.
  svg.style.setProperty('--base-rotation', angle + 'deg');
  
});


function updateOpacities() {
  svgs.forEach((svg, index) => {
    // L'opacité est 1 seulement pour l'élément courant et le suivant
    if (index === currentIndex ) {
      svg.style.opacity = '1';
    } else {
      svg.style.opacity = '0.5';
    }
  });

  currentIndex = (currentIndex + 1) % svgs.length;
}

// Initialisation
updateOpacities();

// Changer toutes les 1 seconde (ajuster le timing si besoin)
setInterval(updateOpacities, 600);