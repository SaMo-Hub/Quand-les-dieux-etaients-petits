// ========================================
// SYSTÈME AUDIO GLOBAL
// ========================================

// Créer l'élément audio
const audio = new Audio('./public/music/NujabesLuv.mp3'); // Remplacez par le chemin de votre musique
audio.loop = true;
audio.volume = 0.3;

// État du son
let isMusicPlaying = false;
let isTransitioning = false;

// ========================================
// FONCTIONS FADE IN / FADE OUT
// ========================================
function fadeIn(targetVolume = 0.3, duration = 1000) {
  return new Promise((resolve) => {
    const startVolume = 0;
    const volumeStep = targetVolume / (duration / 50);
    let currentVolume = startVolume;
    
    audio.volume = startVolume;
    
    const fadeInterval = setInterval(() => {
      if (currentVolume < targetVolume) {
        currentVolume += volumeStep;
        audio.volume = Math.min(currentVolume, targetVolume);
      } else {
        clearInterval(fadeInterval);
        audio.volume = targetVolume;
        resolve();
      }
    }, 50);
  });
}

function fadeOut(duration = 800) {
  return new Promise((resolve) => {
    const startVolume = audio.volume;
    const volumeStep = startVolume / (duration / 50);
    let currentVolume = startVolume;
    
    const fadeInterval = setInterval(() => {
      if (currentVolume > 0) {
        currentVolume -= volumeStep;
        audio.volume = Math.max(currentVolume, 0);
      } else {
        clearInterval(fadeInterval);
        audio.volume = 0;
        resolve();
      }
    }, 50);
  });
}

// ========================================
// GESTION DU BOUTON SON
// ========================================
function initSoundButton() {
  const soundButtons = document.querySelectorAll('#toggle-btn');
  const soundOn = document.querySelector('.sound.on');
  const soundOff = document.querySelector('.sound.off');
  
  if (!soundButtons.length || !soundOn || !soundOff) {
    console.warn('⚠️ Bouton son introuvable');
    return;
  }
  
  // Fonction pour basculer le son
  async function toggleSound() {
    if (isMusicPlaying) {
      // Arrêter la musique avec fade out
      await fadeOut(500);
      audio.pause();
      soundOn.style.display = 'none';
      soundOff.style.display = 'block';
      isMusicPlaying = false;
      console.log('🔇 Musique désactivée');
    } else {
      // Démarrer la musique avec fade in
      try {
        await audio.play();
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
        isMusicPlaying = true;
        await fadeIn(0.3, 800);
        console.log('🔊 Musique activée');
      } catch (error) {
        console.error('❌ Erreur lecture audio:', error);
        alert('Impossible de lire la musique. Cliquez à nouveau pour réessayer.');
      }
    }
  }
  
  // Ajouter l'événement de clic sur tous les boutons son
  soundButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Éviter les clics multiples pendant une transition
      if (isTransitioning) {
        e.stopPropagation();
        return;
      }
      toggleSound();
    });
  });
  
  console.log('✅ Système audio initialisé');
}

// ========================================
// GESTION DE LA NAVIGATION ENTRE PAGES
// ========================================
function setupPageTransitions() {
  // Sauvegarder l'état du son dans le localStorage
  function saveSoundState() {
    localStorage.setItem('musicPlaying', isMusicPlaying);
    localStorage.setItem('musicTime', audio.currentTime);
    localStorage.setItem('musicVolume', audio.volume);
    console.log('💾 État audio sauvegardé:', {
      playing: isMusicPlaying,
      time: audio.currentTime.toFixed(2),
      volume: audio.volume
    });
  }
  
  // Restaurer l'état du son
  async function restoreSoundState() {
    const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
    const savedVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.3;
    
    if (wasPlaying) {
      try {
        audio.currentTime = savedTime;
        await audio.play();
        isMusicPlaying = true;
        document.querySelector('.sound.on').style.display = 'block';
        document.querySelector('.sound.off').style.display = 'none';
        await fadeIn(savedVolume, 800);
        console.log('🔊 Musique restaurée');
      } catch (error) {
        console.error('❌ Erreur restauration audio:', error);
      }
    }
  }
  
  // Restaurer au chargement
  restoreSoundState();
  
  // Intercepter les clics sur les liens pour fade out
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', async (e) => {
      const href = link.getAttribute('href');
      
      // Ignorer les ancres et liens spéciaux
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }
      
      // Si la musique joue, faire un fade out avant de naviguer
      if (isMusicPlaying && !isTransitioning) {
        e.preventDefault();
        isTransitioning = true;
        
        console.log('🌊 Fade out en cours...');
        
        // Sauvegarder l'état avant le fade out
        saveSoundState();
        
        // Faire le fade out
        await fadeOut(600);
        
        // Naviguer vers la nouvelle page
        window.location.href = href;
      } else {
        // Pas de musique, juste sauvegarder et naviguer
        saveSoundState();
      }
    });
  });
}

// ========================================
// GESTION DES ANIMATIONS DE PAGE EXISTANTES
// ========================================
function integrateWithExitAnimations() {
  // Si vous avez déjà une fonction exitAnimation dans vos autres scripts
  // On peut l'intercepter pour synchroniser le fade out audio
  
  // Exemple pour homePage:
  const originalExitAnimation = window.exitAnimation;
  
  if (typeof originalExitAnimation === 'function') {
    window.exitAnimation = async function() {
      console.log('🎬 Animation de sortie + fade audio');
      
      // Lancer le fade out audio en parallèle de l'animation visuelle
      const audioFade = isMusicPlaying ? fadeOut(800) : Promise.resolve();
      const visualAnimation = originalExitAnimation();
      
      // Attendre que les deux soient terminées
      await Promise.all([audioFade, visualAnimation]);
      
      return Promise.resolve();
    };
    
    console.log('✅ Fade audio intégré aux animations');
  }
}

// ========================================
// GESTION DES ERREURS
// ========================================
function setupErrorHandling() {
  audio.addEventListener('error', (e) => {
    console.error('❌ Erreur audio:', e);
    console.error('Vérifiez que le fichier existe:', audio.src);
    
    // Réinitialiser l'interface
    const soundOn = document.querySelector('.sound.on');
    const soundOff = document.querySelector('.sound.off');
    if (soundOn) soundOn.style.display = 'none';
    if (soundOff) soundOff.style.display = 'block';
    isMusicPlaying = false;
  });
  
  audio.addEventListener('canplay', () => {
    console.log('✅ Audio prêt à être joué');
  });
  
  audio.addEventListener('ended', () => {
    console.log('🔁 Audio terminé (loop activé)');
  });
}

// ========================================
// CONTRÔLES PUBLICS
// ========================================
window.audioControls = {
  play: async () => {
    if (!isMusicPlaying) {
      await audio.play();
      isMusicPlaying = true;
      await fadeIn(0.3);
    }
  },
  pause: async () => {
    if (isMusicPlaying) {
      await fadeOut(500);
      audio.pause();
      isMusicPlaying = false;
    }
  },
  setVolume: (vol) => {
    audio.volume = Math.max(0, Math.min(1, vol));
  },
  fadeOut: (duration) => fadeOut(duration),
  fadeIn: (targetVol, duration) => fadeIn(targetVol, duration),
  isPlaying: () => isMusicPlaying,
  getCurrentTime: () => audio.currentTime,
  getDuration: () => audio.duration
};

// ========================================
// EFFET SONORE (BONUS)
// ========================================
function playSoundEffect(soundPath, volume = 0.5) {
  const sfx = new Audio(soundPath);
  sfx.volume = volume;
  sfx.play().catch(error => {
    console.error('❌ Erreur effet sonore:', error);
  });
}

window.playSoundEffect = playSoundEffect;

// ========================================
// INITIALISATION COMPLÈTE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎵 Initialisation du système audio...');
  
  // Attendre un peu pour s'assurer que le DOM est bien chargé
  setTimeout(() => {
    initSoundButton();
    setupPageTransitions();
    setupErrorHandling();
    integrateWithExitAnimations();
    
    console.log('✅ Système audio avec fade out prêt !');
  }, 100);
});

// ========================================
// FADE OUT AUTOMATIQUE AVANT FERMETURE
// ========================================
window.addEventListener('beforeunload', async (e) => {
  if (isMusicPlaying) {
    // Note: beforeunload ne permet pas vraiment d'attendre les promesses
    // Mais on sauvegarde quand même l'état
    localStorage.setItem('musicPlaying', isMusicPlaying);
    localStorage.setItem('musicTime', audio.currentTime);
    localStorage.setItem('musicVolume', audio.volume);
  }
});