const languages = [
  "Francais",
  "Ελληνικά",   // Grec
  "Español",    // Espagnol
  "English",    // Anglais
  "العربية",    // Arabe
  "中文"         // Chinois
];

const container = document.getElementById("grid-langage");

languages.forEach(lang => {
  // Créer le bouton
  const btn = document.createElement("button");
  btn.className = "secondary-button langue-butt";
  btn.dataset.lang = lang;

  // Ajouter le texte
  const p = document.createElement("p");
  p.textContent = lang;
  btn.appendChild(p);

  // Ajouter le SVG
  const svg = `
    <svg class="btn-svg" width="288" height="62" viewBox="0 0 288 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="var(--color-bg)" stroke="#EB7333" stroke-width="var(--border-size)"/>
      <path class="bg-hover" d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="#57280F" />
      <path d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="none" stroke="#EB7333" stroke-width="var(--border-size)"/>
    </svg>
  `;

  btn.insertAdjacentHTML("beforeend", svg);
  container.appendChild(btn);
});