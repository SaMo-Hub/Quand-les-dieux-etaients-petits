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

// Créer l'iframe audio une seule fois
if (!document.getElementById('audio-player-frame')) {
  const iframe = document.createElement('iframe');
  iframe.id = 'audio-player-frame';
  iframe.src = 'audio-player.html';
  iframe.style.display = 'none';
  iframe.style.position = 'fixed';
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);
}

// Attendre que l'iframe soit chargée
let audioPlayer = null;
const audioFrame = document.getElementById('audio-player-frame');

audioFrame.addEventListener('load', () => {
  audioPlayer = audioFrame.contentWindow;
  initAudioControls();
});

// Sélectionner les éléments
const btn = document.getElementById("toggle-btn");
const iconOn = btn?.querySelector(".on");
const iconOff = btn?.querySelector(".off");

function initAudioControls() {
  if (!audioPlayer) return;

  // Récupérer l'état
  const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
  const hasInteracted = localStorage.getItem('hasInteracted') === 'true';

  // Fonction pour jouer la musique
  window.playMusic = function() {
    if (!audioPlayer) return;
    
    audioPlayer.playAudio().then(() => {
      localStorage.setItem('musicPlaying', 'true');
      
      if (iconOn && iconOff) {
        iconOn.style.display = "block";
        iconOff.style.display = "none";
      }
    }).catch(err => console.error('Erreur play:', err));
  };

  // Fonction pour mettre en pause
  window.pauseMusic = function() {
    if (!audioPlayer) return;
    
    audioPlayer.pauseAudio();
    localStorage.setItem('musicPlaying', 'false');
    
    if (iconOn && iconOff) {
      iconOn.style.display = "none";
      iconOff.style.display = "block";
    }
  };

  // Toggle au clic
  if (btn) {
    btn.addEventListener("click", () => {
      if (audioPlayer && audioPlayer.isPlaying()) {
        window.pauseMusic();
      } else {
        window.playMusic();
      }
    });
  }

  // Initialiser l'icône
  if (iconOn && iconOff) {
    if (isMusicPlaying && audioPlayer.isPlaying()) {
      iconOn.style.display = "block";
      iconOff.style.display = "none";
    } else if (isMusicPlaying && hasInteracted) {
      iconOn.style.display = "block";
      iconOff.style.display = "none";
      setTimeout(() => window.playMusic(), 100);
    } else {
      iconOn.style.display = "none";
      iconOff.style.display = "block";
    }
  }

  // Démarrage automatique au premier clic
  if (!hasInteracted) {
    const startMusic = (e) => {
      if (!audioPlayer.isPlaying() && btn && !e.target.closest('#toggle-btn')) {
        window.playMusic();
        localStorage.setItem('hasInteracted', 'true');
        document.removeEventListener('click', startMusic);
      }
    };
    document.addEventListener('click', startMusic);
  }
}

// Si l'iframe est déjà chargée
if (audioFrame.contentWindow && audioFrame.contentWindow.playAudio) {
  audioPlayer = audioFrame.contentWindow;
  initAudioControls();
}