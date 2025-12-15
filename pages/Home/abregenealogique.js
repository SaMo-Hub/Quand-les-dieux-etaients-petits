const container = document.querySelector('.tree-container');
const treeData = {
  parents: [
    { name: "Ouranos" },
    { name: "Gaia" }
  ],

  titans: [
    { name: "Chronos" },
    { name: "Rhéa" }
  ],

  olympians: [
    { name: "Asteria" },
    { name: "Leto" },
    { name: "Hestia" },
    { name: "Hades" },
    { name: "Poseidon" },
    { name: "Demeter" },
    { name: "Hera" },
    { name: "Zeus", link: "../Zeus/zeusPage.html" },
    { name: "Metis" },
    { name: "Dione" },
    { name: "Atlas" }
  ],

  children: [
    { name: "Hecate" },
    { name: "Apollon" },
    { name: "Artemis" },
    { name: "Persephone" },
    { name: "Ilithie" },
    { name: "Hephaistos" },
    { name: "Hebe" },
    { name: "Ares" },
    { name: "Athena" },
    { name: "Aphrodite" },
    { name: "Maia" }
  ]
};
function createAbreButton(name, link = null) {
  const wrapper = document.createElement(link ? "a" : "div");
  if (link) wrapper.href = link;

  wrapper.innerHTML = `
     <div class="abre-button">
            <svg role="img" viewBox="0 0 294 50" preserveAspectRatio="xMinYMin meet" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M21 1H273L281 9V41L273 49H21L13 40.5V9L21 1Z" fill="var(--color-bg)" stroke="var(--color-primary)"
              stroke-width="var(--border-size)"></path>
              <path class="button-hover" d="M21 1H273L281 9V41L273 49H21L13 40.5V9L21 1Z" fill="#ff590069" stroke="none"
              stroke-width="var(--border-size)"></path>
              <path d="M21 1H273L281 9V41L273 49H21L13 40.5V9L21 1Z" fill="none" stroke="var(--color-primary)"
                stroke-width="var(--border-size)"></path>
            <rect x="2" y="25" width="15.5563" height="15.5563" transform="rotate(-45 2 25)" fill="var(--color-bg)"
              stroke="var(--color-primary)" stroke-width="var(--border-size)"></rect>
            <rect x="10" y="25" width="4.24264" height="4.24264" transform="rotate(-45 10 25)" fill="#fff"></rect>
            <rect x="270" y="25" width="15.5563" height="15.5563" transform="rotate(-45 270 25)" fill="var(--color-bg)"
              stroke="var(--color-primary)" stroke-width="var(--border-size)"></rect>
            <rect x="278" y="25" width="4.24264" height="4.24264" transform="rotate(-45 278 25)" fill="#fff"></rect>
          </svg>
              <div class="chapitre-name-overflow">
                <p class="">${name}</p>
              </div>
            </div>
  `;

  return wrapper;
}
function renderLine(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  data.forEach(item => {
    container.appendChild(
      createAbreButton(item.name, item.link)
    );
  });
}

renderLine("parents-line", treeData.parents);
renderLine("titans-line", treeData.titans);
renderLine("olympians-line", treeData.olympians);
renderLine("children-line", treeData.children);

let scale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let startX, startY;

// Nœuds Cronos et Gaia
const cronos = document.getElementById('cronos');
const gaia = document.getElementById('gaia');

// Fonction pour récupérer la position centrale d’un élément
function getCenter(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

// Centre initial : milieu entre Cronos et Gaia


// === Drag ===
container.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
});

window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
});

window.addEventListener('mouseup', () => isDragging = false);

// === Zoom ===
window.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale *= delta;
    container.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}, { passive: false });

// === Recentrage au redimensionnement de la fenêtre ===
window.addEventListener('resize', centerNodes);
