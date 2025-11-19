const container = document.querySelector('.tree-container');
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
