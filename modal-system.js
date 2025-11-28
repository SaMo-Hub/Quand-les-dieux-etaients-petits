// ===== SYSTÈME DE MODAL =====

// Données des personnages et lieux
// const personnagesData = {
//   'Gaia': {
//     nom: 'Gaïa',
//     description: 'Dans la mythologie grecque, Gaïa (du grec ancien Γαῖα / Gaîa ou Γαῖη / Gaîē), ou Gê (du grec ancien Γῆ / Gê, « Terre »), est la déesse primordiale identifiée à la « Déesse Mère » et à la « Mère des titans ». Ancêtre maternelle des races divines (grand-mère de Zeus), elle enfante aussi de nombreuses créatures. Divinité chtonienne, on l\'invoquait et lui sacrifiait des animaux de couleur noire. Unie à Ouranos, le dieu du Ciel, elle engendra les six Titans et les six Titanides, puis les Cyclopes, suivi des Hécatonchires (les monstres aux cent bras) et enfin les Géants.'
//   },
//   'Ouranos': {
//     nom: 'Ouranos',
//     description: 'Ouranos (en grec ancien Οὐρανός / Ouranós, « Ciel ») est une divinité primordiale personnifiant le Ciel. Il est le fils et l\'époux de Gaïa (la Terre). De leur union naquirent les Titans, les Cyclopes et les Hécatonchires. Ouranos détestait ses enfants et les enfermait dans le Tartare dès leur naissance, causant une grande douleur à Gaïa. C\'est pourquoi elle incita son plus jeune fils, Cronos, à le renverser.'
//   },
//   'Cronos': {
//     nom: 'Cronos',
//     description: 'Cronos (en grec ancien Κρόνος / Krónos) est le plus jeune des Titans, fils d\'Ouranos et de Gaïa. Il renversa son père pour devenir le roi des Titans. Ayant appris qu\'il serait à son tour renversé par l\'un de ses enfants, il les dévorait dès leur naissance. Son épouse Rhéa réussit à sauver Zeus en lui donnant une pierre emmaillotée à la place du nouveau-né.'
//   },
//   'Titans': {
//     nom: 'Les Titans',
//     description: 'Les Titans sont les divinités primordiales nées de l\'union de Gaïa (la Terre) et d\'Ouranos (le Ciel). Ils sont au nombre de douze : six titans (Océan, Coeos, Crios, Hypérion, Japet et Cronos) et six titanides (Théia, Rhéa, Thémis, Mnémosyne, Phœbé et Téthys). Cronos, le plus jeune, devint leur roi après avoir renversé son père Ouranos.'
//   },
//   'Rhea': {
//     nom: 'Rhéa',
//     description: 'Rhéa est une titanide, fille de Gaïa et Ouranos, et l\'épouse de Cronos. Elle est la mère des dieux olympiens : Hestia, Déméter, Héra, Hadès, Poséidon et Zeus. Désespérée de voir Cronos dévorer ses enfants, elle sauva Zeus en cachant sa naissance et en donnant à Cronos une pierre emmaillotée. Elle est souvent associée à la fertilité et à la maternité.'
//   },
//   'Hestia': {
//     nom: 'Hestia',
//     description: 'Hestia est la déesse du foyer et du feu sacré. Fille aînée de Cronos et Rhéa, elle fut la première à être avalée par son père et la dernière à être régurgitée. Déesse vierge, elle refusa les avances d\'Apollon et Poséidon. Elle représente la stabilité du foyer familial et de la cité.'
//   },
//   'Demeter': {
//     nom: 'Déméter',
//     description: 'Déméter est la déesse de l\'agriculture, des moissons et de la fertilité de la terre. Fille de Cronos et Rhéa, elle est la mère de Perséphone (avec Zeus). Son mythe le plus célèbre raconte l\'enlèvement de sa fille par Hadès, causant l\'hiver pendant qu\'elle cherchait Perséphone.'
//   },
//   'Hera': {
//     nom: 'Héra',
//     description: 'Héra est la reine des dieux, déesse du mariage et de la famille. Fille de Cronos et Rhéa, elle devint l\'épouse de Zeus. Connue pour sa jalousie envers les nombreuses conquêtes de son mari, elle est une déesse majestueuse et puissante qui protège les femmes mariées et les naissances légitimes.'
//   },
//   'Hades': {
//     nom: 'Hadès',
//     description: 'Hadès est le dieu des Enfers et des morts. Fils de Cronos et Rhéa, il reçut le royaume souterrain lors du partage du monde avec ses frères Zeus et Poséidon. Malgré sa réputation sombre, il est un dieu juste qui veille sur les âmes des défunts. Il possède un casque qui rend invisible.'
//   },
//   'Poseidon': {
//     nom: 'Poséidon',
//     description: 'Poséidon est le dieu des mers, des océans et des tremblements de terre. Fils de Cronos et Rhéa, frère de Zeus et Hadès, il reçut les mers lors du partage du monde. Armé de son trident, il peut déchaîner ou calmer les tempêtes. Il est également créateur du cheval et protecteur des navigateurs.'
//   },
//   'Amalthee': {
//     nom: 'Amalthée',
//     description: 'Amalthée est la chèvre sacrée qui nourrit et protégea Zeus enfant dans la grotte du mont Ida, en Crète. Selon certaines versions, elle est une nymphe qui utilisa le lait d\'une chèvre. En remerciement, Zeus plaça Amalthée parmi les étoiles (constellation du Capricorne) et utilisa sa peau pour créer l\'égide, son bouclier protecteur.'
//   },
//   'Curete': {
//     nom: 'Les Curètes',
//     description: 'Les Curètes sont des guerriers divins ou des démons protecteurs associés à la Crète. Ils protégèrent Zeus enfant en frappant leurs boucliers et leurs lances pour couvrir ses pleurs et empêcher Cronos de le découvrir. Ils étaient également associés aux rites initiatiques et à la fertilité.'
//   },
//   'Crete': {
//     nom: 'La Crète',
//     description: 'La Crète est la plus grande île de Grèce et un lieu mythologique majeur. C\'est là que Zeus naquit en secret dans une grotte du mont Ida (ou mont Dicté selon les versions). L\'île est également célèbre pour le palais de Cnossos, le Minotaure et le roi Minos. La civilisation minoenne y prospéra et influença profondément la mythologie grecque.'
//   },
//   'Metis': {
//     nom: 'Métis',
//     description: 'Métis est la déesse de la sagesse, de la ruse et de la prudence. Océanide (fille d\'Océan et Téthys), elle fut la première épouse de Zeus. C\'est elle qui donna à Zeus la potion permettant à Cronos de régurgiter ses enfants. Zeus l\'avala alors qu\'elle était enceinte d\'Athéna, par crainte d\'une prophétie. Athéna naquit plus tard directement de la tête de Zeus.'
//   },
//   'Tartare': {
//     nom: 'Le Tartare',
//     description: 'Le Tartare est la région la plus profonde des Enfers, située sous les enfers d\'Hadès. C\'est une prison pour les plus grands criminels et les ennemis des dieux. Ouranos y enferma les Cyclopes et les Hécatonchires. Après la Titanomachie, Zeus y emprisonna les Titans vaincus. C\'est un lieu de tourments éternels, entouré de murs de bronze.'
//   },
//   'Cyclopes': {
//     nom: 'Les Cyclopes',
//     description: 'Les Cyclopes sont des géants dotés d\'un seul œil au milieu du front. Fils de Gaïa et Ouranos, ils sont trois : Brontès (le Tonnerre), Stéropès (l\'Éclair) et Argès (la Foudre). Ouranos les emprisonna dans le Tartare par peur de leur puissance. Libérés par Zeus, ils forgèrent ses foudres, le trident de Poséidon et le casque d\'invisibilité d\'Hadès.'
//   },
//   'Hecatonchires': {
//     nom: 'Les Hécatonchires',
//     description: 'Les Hécatonchires (ou Cent-Bras) sont trois géants dotés de cent bras et cinquante têtes chacun : Briarée, Cottos et Gyès. Fils de Gaïa et Ouranos, ils furent enfermés dans le Tartare par leur père qui les trouvait monstrueux. Zeus les libéra durant la Titanomachie et, grâce à leur force colossale, ils aidèrent les Olympiens à vaincre les Titans.'
//   }
// };
// ===== SYSTÈME DE MODAL =====

// Données des personnages et lieux

let personnagesData = {};

fetch('../personageLieuxData.json')
  .then(response => response.json())
  .then(data => {
    personnagesData = data;
  })
  .catch(err => console.error("Erreur chargement JSON :", err));

// Créer la modal dynamiquement
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <svg class="close-modal" width="24" height="24" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.707031 0.707031L5.27539 5.27539M9.84375 9.84375L5.27539 5.27539M5.27539 5.27539L0.707031 9.84375L9.84375 0.707031" stroke="#EB7333" stroke-width="2"/>
      </svg>
      <h4 class="modal-name"></h4>
      <p class="modal-paragraphe"></p>
      <button class="modal-button">Tu veux en savoir plus ?</button>
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
const modalName = modalOverlay.querySelector('.modal-name');
const modalParagraphe = modalOverlay.querySelector('.modal-paragraphe');
const closeModalBtn = modalOverlay.querySelector('.close-modal');
const modalButton = modalOverlay.querySelector('.modal-button');

// Fonction pour ouvrir la modal
function openModal(personnageId) {
  const data = personnagesData[personnageId];
  if (!data) return;

  // Remplir le contenu
  modalName.textContent = data.nom;
  modalParagraphe.textContent = data.description;

  // Réinitialiser les styles inline qui pourraient causer des problèmes
  modalContent.style.left = '';
  modalContent.style.top = '';
  modalContent.style.transform = '';

  // Afficher la modal avec animation
  modalOverlay.classList.add('active');
  
  // Petite animation d'entrée
  gsap.fromTo(modalContent, 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
  );
}

// Fonction pour fermer la modal
function closeModal() {
  gsap.to(modalContent, {
    scale: 0.8,
    opacity: 0,
    duration: 0.2,
    onComplete: () => {
      modalOverlay.classList.remove('active');
    }
  });
}

// Event listeners pour tous les boutons de texte modal
document.querySelectorAll('.text-modal').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const personnageId = button.id;
    openModal(personnageId);
  });
});

// Fermer la modal
closeModalBtn.addEventListener('click', closeModal);

// Fermer en cliquant sur l'overlay
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// Action du bouton "Tu veux en savoir plus ?"
modalButton.addEventListener('click', () => {
  const personnageNom = modalName.textContent;
  // Ouvrir Wikipédia dans un nouvel onglet
  window.open(`https://fr.wikipedia.org/wiki/${encodeURIComponent(personnageNom)}`, '_blank');
    // window.open(`./zeusPage.html`, '_blank');

});