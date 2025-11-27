
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

const btn = document.getElementById("toggle-btn");

const iconOn = btn.querySelector(".on");
const iconOff = btn.querySelector(".off");
console.log(btn, iconOn, iconOff);

btn.addEventListener("click", () => {
  const isOn = iconOn.style.display !== "none";

  if (isOn) {
    iconOn.style.display = "none";
    iconOff.style.display = "block";
  } else {
    iconOn.style.display = "block";
    iconOff.style.display = "none";
  }
});