// modal-system.js - Système de modal amélioré avec catégories

let personnagesData = {
  // ===== PERSONNAGES =====
  "Gaia": {
    "type": "personnage",
    "nom": "Gaïa",
    "description": "Dans la mythologie grecque, Gaïa (du grec ancien Γαῖα / Gaîa ou Γαῖη / Gaîē), ou Gê (du grec ancien Γῆ / Gê, « Terre »), est la déesse primordiale identifiée à la « Déesse Mère » et à la « Mère des titans ». Ancêtre maternelle des races divines (grand-mère de Zeus), elle enfante aussi de nombreuses créatures. Divinité chtonienne, on l'invoquait et lui sacrifiait des animaux de couleur noire. Unie à Ouranos, le dieu du Ciel, elle engendra les six Titans et les six Titanides, puis les Cyclopes, suivi des Hécatonchires (les monstres aux cent bras) et enfin les Géants."
  },
  "Ouranos": {
    "type": "personnage",
    "nom": "Ouranos",
    "description": "Ouranos (en grec ancien Οὐρανός / Ouranós, « Ciel ») est une divinité primordiale personnifiant le Ciel. Il est le fils et l'époux de Gaïa (la Terre). De leur union naquirent les Titans, les Cyclopes et les Hécatonchires. Ouranos détestait ses enfants et les enfermait dans le Tartare dès leur naissance, causant une grande douleur à Gaïa. C'est pourquoi elle incita son plus jeune fils, Cronos, à le renverser."
  },
  "Cronos": {
    "type": "personnage",
    "nom": "Cronos",
    "description": "Cronos (en grec ancien Κρόνος / Krónos) est le plus jeune des Titans, fils d'Ouranos et de Gaïa. Il renversa son père pour devenir le roi des Titans. Ayant appris qu'il serait à son tour renversé par l'un de ses enfants, il les dévorait dès leur naissance. Son épouse Rhéa réussit à sauver Zeus en lui donnant une pierre emmaillotée à la place du nouveau-né."
  },
  "Titans": {
    "type": "groupe",
    "nom": "Les Titans",
    "description": "Les Titans sont les divinités primordiales nées de l'union de Gaïa (la Terre) et d'Ouranos (le Ciel). Ils sont au nombre de douze : six titans (Océan, Coeos, Crios, Hypérion, Japet et Cronos) et six titanides (Théia, Rhéa, Thémis, Mnémosyne, Phœbé et Téthys). Cronos, le plus jeune, devint leur roi après avoir renversé son père Ouranos."
  },
  "Rhea": {
    "type": "personnage",
    "nom": "Rhéa",
    "description": "Rhéa est une titanide, fille de Gaïa et Ouranos, et l'épouse de Cronos. Elle est la mère des dieux olympiens : Hestia, Déméter, Héra, Hadès, Poséidon et Zeus. Désespérée de voir Cronos dévorer ses enfants, elle sauva Zeus en cachant sa naissance et en donnant à Cronos une pierre emmaillotée. Elle est souvent associée à la fertilité et à la maternité."
  },
  "Zeus": {
    "type": "personnage",
    "nom": "Zeus",
    "description": "Zeus est le roi des dieux de l'Olympe, dieu du ciel et de la foudre. Fils cadet de Cronos et Rhéa, il fut sauvé par sa mère et élevé en secret en Crète. Après avoir libéré ses frères et sœurs, il mena la guerre contre les Titans (Titanomachie) et devint le maître de l'univers. Il règne depuis le mont Olympe avec sa foudre comme arme."
  },
  "Hestia": {
    "type": "personnage",
    "nom": "Hestia",
    "description": "Hestia est la déesse du foyer et du feu sacré. Fille aînée de Cronos et Rhéa, elle fut la première à être avalée par son père et la dernière à être régurgitée. Déesse vierge, elle refusa les avances d'Apollon et Poséidon. Elle représente la stabilité du foyer familial et de la cité."
  },
  "Demeter": {
    "type": "personnage",
    "nom": "Déméter",
    "description": "Déméter est la déesse de l'agriculture, des moissons et de la fertilité de la terre. Fille de Cronos et Rhéa, elle est la mère de Perséphone (avec Zeus). Son mythe le plus célèbre raconte l'enlèvement de sa fille par Hadès, causant l'hiver pendant qu'elle cherchait Perséphone."
  },
  "Hera": {
    "type": "personnage",
    "nom": "Héra",
    "description": "Héra est la reine des dieux, déesse du mariage et de la famille. Fille de Cronos et Rhéa, elle devint l'épouse de Zeus. Connue pour sa jalousie envers les nombreuses conquêtes de son mari, elle est une déesse majestueuse et puissante qui protège les femmes mariées et les naissances légitimes."
  },
  "Hades": {
    "type": "personnage",
    "nom": "Hadès",
    "description": "Hadès est le dieu des Enfers et des morts. Fils de Cronos et Rhéa, il reçut le royaume souterrain lors du partage du monde avec ses frères Zeus et Poséidon. Malgré sa réputation sombre, il est un dieu juste qui veille sur les âmes des défunts. Il possède un casque qui rend invisible."
  },
  "Poseidon": {
    "type": "personnage",
    "nom": "Poséidon",
    "description": "Poséidon est le dieu des mers, des océans et des tremblements de terre. Fils de Cronos et Rhéa, frère de Zeus et Hadès, il reçut les mers lors du partage du monde. Armé de son trident, il peut déchaîner ou calmer les tempêtes. Il est également créateur du cheval et protecteur des navigateurs."
  },
  "Amalthee": {
    "type": "creature",
    "nom": "Amalthée",
    "description": "Amalthée est la chèvre sacrée qui nourrit et protégea Zeus enfant dans la grotte du mont Ida, en Crète. Selon certaines versions, elle est une nymphe qui utilisa le lait d'une chèvre. En remerciement, Zeus plaça Amalthée parmi les étoiles (constellation du Capricorne) et utilisa sa peau pour créer l'égide, son bouclier protecteur."
  },
  "Curete": {
    "type": "groupe",
    "nom": "Les Curètes",
    "description": "Les Curètes sont des guerriers divins ou des démons protecteurs associés à la Crète. Ils protégèrent Zeus enfant en frappant leurs boucliers et leurs lances pour couvrir ses pleurs et empêcher Cronos de le découvrir. Ils étaient également associés aux rites initiatiques et à la fertilité."
  },
  "Metis": {
    "type": "personnage",
    "nom": "Métis",
    "description": "Métis est la déesse de la sagesse, de la ruse et de la prudence. Océanide (fille d'Océan et Téthys), elle fut la première épouse de Zeus. C'est elle qui donna à Zeus la potion permettant à Cronos de régurgiter ses enfants. Zeus l'avala alors qu'elle était enceinte d'Athéna, par crainte d'une prophétie. Athéna naquit plus tard directement de la tête de Zeus."
  },
  "Cyclopes": {
    "type": "groupe",
    "nom": "Les Cyclopes",
    "description": "Les Cyclopes sont des géants dotés d'un seul œil au milieu du front. Fils de Gaïa et Ouranos, ils sont trois : Brontès (le Tonnerre), Stéropès (l'Éclair) et Argès (la Foudre). Ouranos les emprisonna dans le Tartare par peur de leur puissance. Libérés par Zeus, ils forgèrent ses foudres, le trident de Poséidon et le casque d'invisibilité d'Hadès."
  },
  "Hecatonchires": {
    "type": "groupe",
    "nom": "Les Hécatonchires",
    "description": "Les Hécatonchires (ou Cent-Bras) sont trois géants dotés de cent bras et cinquante têtes chacun : Briarée, Cottos et Gyès. Fils de Gaïa et Ouranos, ils furent enfermés dans le Tartare par leur père qui les trouvait monstrueux. Zeus les libéra durant la Titanomachie et, grâce à leur force colossale, ils aidèrent les Olympiens à vaincre les Titans."
  },
  
  // ===== LIEUX =====
  "Crete": {
    "type": "lieu",
    "nom": "La Crète",
    "description": "La Crète est la plus grande île de Grèce et un lieu mythologique majeur. C'est là que Zeus naquit en secret dans une grotte du mont Ida (ou mont Dicté selon les versions). L'île est également célèbre pour le palais de Cnossos, le Minotaure et le roi Minos. La civilisation minoenne y prospéra et influença profondément la mythologie grecque."
  },
  "Tartare": {
    "type": "lieu",
    "nom": "Le Tartare",
    "description": "Le Tartare est la région la plus profonde des Enfers, située sous les enfers d'Hadès. C'est une prison pour les plus grands criminels et les ennemis des dieux. Ouranos y enferma les Cyclopes et les Hécatonchires. Après la Titanomachie, Zeus y emprisonna les Titans vaincus. C'est un lieu de tourments éternels, entouré de murs de bronze."
  },
  "Olympe": {
    "type": "lieu",
    "nom": "L'Olympe",
    "description": "L'Olympe est la plus haute montagne de Grèce et la demeure des douze dieux olympiens. Après leur victoire sur les Titans, Zeus et les autres dieux s'y installèrent pour régner sur le monde. Le sommet est toujours caché par les nuages et inaccessible aux mortels. C'est de là que Zeus lance ses éclairs."
  },
  
  // ===== ARMES =====
  "Foudre": {
    "type": "arme",
    "nom": "La Foudre",
    "description": "La foudre de Zeus est l'arme la plus puissante de l'univers. Forgée par les Cyclopes en remerciement de leur libération, elle peut lancer des éclairs dévastateurs capables de réduire en cendres n'importe quel ennemi. Elle symbolise la puissance absolue de Zeus en tant que roi des dieux et maître du ciel."
  },
  "Trident": {
    "type": "arme",
    "nom": "Le Trident",
    "description": "Le trident est l'arme légendaire de Poséidon, forgée par les Cyclopes. Avec ses trois pointes acérées, il peut contrôler les mers, déclencher des tremblements de terre et créer des sources d'eau. Un seul coup de trident peut soulever des vagues titanesques ou faire jaillir des îles du fond des océans."
  },
  "CasqueOmbre": {
    "type": "arme",
    "nom": "Le Casque d'Ombre",
    "description": "Le casque d'ombre (ou casque d'invisibilité) est l'arme d'Hadès, forgée par les Cyclopes. Celui qui le porte devient complètement invisible, même aux yeux des dieux. Hadès l'utilisa durant la Titanomachie pour s'infiltrer dans le camp ennemi. Ce casque représente le pouvoir mystérieux et insaisissable du dieu des Enfers."
  },
  
  // ===== CONCEPTS =====
  "Titanomachie": {
    "type": "evenement",
    "nom": "La Titanomachie",
    "description": "La Titanomachie est la guerre légendaire qui opposa les jeunes dieux olympiens menés par Zeus aux Titans dirigés par Cronos. Cette bataille titanesque dura dix ans et secoua l'univers entier. Grâce aux Cyclopes, aux Hécatonchires et à leur détermination, Zeus et ses alliés remportèrent la victoire et enfermèrent les Titans dans le Tartare."
  }
};

// Titres de modal selon le type
const modalTitles = {
  "personnage": "C'EST QUI ?",
  "groupe": "C'EST QUI ?",
  "creature": "C'EST QUOI ?",
  "lieu": "C'EST OÙ ?",
  "arme": "C'EST QUOI ?",
  "evenement": "C'EST QUOI ?",
  "default": "EN SAVOIR PLUS"
};

// Créer la modal dynamiquement
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
   <div class="modal">
   <div class="modal-content">
              <div class="modal-name">
              <div class="button-primary">
        <svg role="img" viewBox="0 0 294 50" preserveAspectRatio="xMinYMin meet" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M21 1H273L281 9V41L273 49H21L13 40.5V9L21 1Z" fill="var(--color-bg)" stroke="var(--color-primary)"
            stroke-width="var(--border-size)"></path>
          <rect x="2" y="25" width="15.5563" height="15.5563" transform="rotate(-45 2 25)" fill="var(--color-bg)"
            stroke="var(--color-primary)" stroke-width="var(--border-size)"></rect>
          <rect x="10" y="25" width="4.24264" height="4.24264" transform="rotate(-45 10 25)" fill="#fff"></rect>
          <rect x="270" y="25" width="15.5563" height="15.5563" transform="rotate(-45 270 25)" fill="var(--color-bg)"
            stroke="var(--color-primary)" stroke-width="var(--border-size)"></rect>
          <rect x="278" y="25" width="4.24264" height="4.24264" transform="rotate(-45 278 25)" fill="#fff"></rect>
        </svg>
<div class="chapitre-name-overflow">
  <p id="modal-entity-name" class="">...</p>
</div>
      </div>
            </div>
              <h4 class="modal-h1">C'EST QUI ?</h4>
              <p class="modal-paragraphe">...</p>
            
                <button class="secondary-button">
            <p>Tu veux en savoir plus ?</p>
            <svg  class="btn-svg" width="288" height="62" viewBox="0 0 288 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="bg-hover" d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="#57280F" />
    <path d="M261.263 1L286.688 31L261.263 61H26.7373L1.31055 31L26.7373 1H261.263Z" fill="#" stroke="#EB7333" stroke-width="var(--border-size)"/>
    </svg>
          </button>
            </div>
             <button class="button close-modal">
              <div class="item">
              <svg width="16" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.707031 0.707031L5.27539 5.27539M9.84375 9.84375L5.27539 5.27539M5.27539 5.27539L0.707031 9.84375L9.84375 0.707031" stroke="#EB7333" stroke-width="var(--border-size)"/>
</svg>
</div>
            </button>
             </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

// Obtenir la modal (créer si elle n'existe pas)
let modalOverlay = document.querySelector('.modal-overlay');
if (!modalOverlay) {
  modalOverlay = createModal();
}

const modalContent = modalOverlay.querySelector('.modal-content');
const modalEntityName = modalOverlay.querySelector('#modal-entity-name');
const modalH1 = modalOverlay.querySelector('.modal-h1');
const modalParagraphe = modalOverlay.querySelector('.modal-paragraphe');
const closeModalBtn = modalOverlay.querySelector('.close-modal');
const modalButton = modalOverlay.querySelector('.secondary-button');

// Fonction pour ouvrir la modal
function openModal(entityId) {
  const data = personnagesData[entityId];
  if (!data) return;

  // Définir le titre selon le type
  const title = modalTitles[data.type] || modalTitles.default;
  modalH1.textContent = title;

  // Remplir le contenu
  modalEntityName.textContent = data.nom;
  modalParagraphe.textContent = data.description;

  // Réinitialiser les styles
  modalContent.style.left = '';
  modalContent.style.top = '';
  modalContent.style.transform = '';

  // Afficher la modal avec animation
  modalOverlay.classList.add('active');
  
  // Animation d'entrée
  const tl = gsap.timeline();
  tl.fromTo(
      modalContent,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
  )
  .fromTo(
      closeModalBtn,
      { scale: 0.3, opacity: 0, rotation: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.7)", rotation: 45 },
      "-=0.2"
  );
}

// Fonction pour fermer la modal
function closeModal() {
  const tl = gsap.timeline();
  tl.to(
      modalContent, {
         scale: 0.8,
      opacity: 0,
      duration: 0.2,
      }
  ).to(
    closeModalBtn, {
       scale: 0.8,
      opacity: 0,
      rotation: 0,
      duration: 0.2,
      onComplete: () => {
        modalOverlay.classList.remove('active');
      }
    }, "-=0.2"
  );
}

// FONCTION POUR ATTACHER LES EVENT LISTENERS
function attachModalListeners() {
  document.querySelectorAll('.text-modal').forEach(button => {
    button.removeEventListener('click', handleModalClick);
    button.addEventListener('click', handleModalClick);
  });
}

// Handler pour les clics
function handleModalClick(e) {
  e.preventDefault();
  e.stopPropagation();
  const entityId = this.id;
  openModal(entityId);
}

// Attacher les listeners au chargement initial
attachModalListeners();

// Réattacher après animations
window.addEventListener('load', () => {
  setTimeout(() => {
    attachModalListeners();
  }, 1000);
});

// Observer les changements du DOM
const observer = new MutationObserver(() => {
  attachModalListeners();
});

document.querySelectorAll('.frame-texte').forEach(frame => {
  observer.observe(frame, {
    childList: true,
    subtree: true
  });
});

// Fermer la modal
closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Action du bouton "Tu veux en savoir plus ?"
modalButton.addEventListener('click', () => {
  const entityNom = modalEntityName.textContent;
  window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(entityNom)}`, '_blank');
});