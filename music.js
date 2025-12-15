// ========================================
// SYSTÈME AUDIO GLOBAL AVEC TRANSITIONS
// ========================================

// Configuration des musiques par page/chapitre
const musicConfig = {
  // Même musique pour index, homePage et chapitre1
  ambient: {
    path: './public/music/NujabesLuv.mp3',
    name: 'Musique Ambient',
    pages: ['index.html', '', 'homePage.html', 'zeusPage.html#chapitre1']
  },
  // Musique pour chapitre 2
  battle: {
    path: './public/music/ChocDesTitan.mp3',
    name: 'Musique Bataille',
    pages: ['zeusPage.html#chapitre2']
  }
};

// Créer les éléments audio
const audioTracks = {
  ambient: new Audio(musicConfig.ambient.path),
  battle: new Audio(musicConfig.battle.path)
};

// Configurer les audios
Object.values(audioTracks).forEach(audio => {
  audio.loop = true;
  audio.volume = 0;
});

// État du système
let currentTrack = null;
let currentChapter = 1;
let isMusicPlaying = false;
let isTransitioning = false;
let musicEnabled = false;

// ========================================
// GESTION DU STOCKAGE LOCAL
// ========================================
function saveGlobalState() {
  localStorage.setItem('globalMusicEnabled', musicEnabled);
  localStorage.setItem('globalMusicVolume', currentTrack ? audioTracks[currentTrack].volume : 0);
  localStorage.setItem('globalCurrentTrack', currentTrack || '');
  if (isMusicPlaying && currentTrack) {
    localStorage.setItem('globalMusicTime', audioTracks[currentTrack].currentTime);
  }
}

function loadGlobalState() {
  const wasEnabled = localStorage.getItem('globalMusicEnabled') === 'true';
  const savedTrack = localStorage.getItem('globalCurrentTrack');
  const savedTime = parseFloat(localStorage.getItem('globalMusicTime')) || 0;
  const savedVolume = parseFloat(localStorage.getItem('globalMusicVolume')) || 0.3;
  
  return { wasEnabled, savedTrack, savedTime, savedVolume };
}

// ========================================
// FONCTIONS FADE
// ========================================
function fadeIn(audio, targetVolume = 0.3, duration = 1500) {
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

function fadeOut(audio, duration = 1500) {
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
// CROSSFADE ENTRE DEUX PISTES
// ========================================
async function crossfade(fromTrack, toTrack, duration = 2000) {
  if (isTransitioning || fromTrack === toTrack) return;
  isTransitioning = true;
  
  console.log(`🎵 Crossfade: ${fromTrack} → ${toTrack}`);
  
  const oldAudio = audioTracks[fromTrack];
  const newAudio = audioTracks[toTrack];
  
  try {
    newAudio.currentTime = 0;
    await newAudio.play();
    
    await Promise.all([
      fadeOut(oldAudio, duration),
      fadeIn(newAudio, 0.3, duration)
    ]);
    
    oldAudio.pause();
    oldAudio.currentTime = 0;
    
    currentTrack = toTrack;
    console.log('✅ Crossfade terminé');
  } catch (error) {
    console.error('❌ Erreur crossfade:', error);
  }
  
  isTransitioning = false;
}

// ========================================
// DÉTECTION DE LA PAGE/CHAPITRE ACTUEL
// ========================================
function getCurrentPageTrack() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  const hash = window.location.hash;
  
  // Page index (vide ou index.html) ou homePage → ambient
  if (filename === 'index.html' || filename === '' || filename === 'homePage.html') {
    console.log('📍 Page détectée:', filename || 'index', '→ ambient');
    return 'ambient';
  }
  
  // Page zeusPage
  if (filename === 'zeusPage.html') {
    // Détecter le chapitre actuel
    const chapters = document.querySelectorAll('.all-chapitre');
    if (chapters.length === 0) return 'ambient';
    
    const scrollX = window.scrollX || window.pageXOffset;
    const viewportWidth = window.innerWidth;
    const centerX = scrollX + (viewportWidth / 2);
    
    let detectedChapter = 1;
    chapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect();
      const chapterLeft = rect.left + scrollX;
      const chapterRight = chapterLeft + rect.width;
      
      if (centerX >= chapterLeft && centerX < chapterRight) {
        detectedChapter = index + 1;
      }
    });
    
    currentChapter = detectedChapter;
    console.log('📍 ZeusPage - Chapitre:', detectedChapter, '→', detectedChapter === 1 ? 'ambient' : 'battle');
    return detectedChapter === 1 ? 'ambient' : 'battle';
  }
  
  return 'ambient';
}

// ========================================
// GESTION DU CHANGEMENT DE CHAPITRE (zeusPage uniquement)
// ========================================
function handleChapterChange(newChapter) {
  if (newChapter === currentChapter || !musicEnabled) return;
  
  console.log(`📖 Changement de chapitre: ${currentChapter} → ${newChapter}`);
  currentChapter = newChapter;
  
  const newTrack = newChapter === 1 ? 'ambient' : 'battle';
  
  if (isMusicPlaying && !isTransitioning && currentTrack !== newTrack) {
    crossfade(currentTrack, newTrack, 2000);
  }
}

// ========================================
// OBSERVER LE SCROLL (zeusPage uniquement)
// ========================================
function setupScrollObserver() {
  if (window.location.pathname.includes('zeusPage.html')) {
    let scrollTimeout;
    
    function checkChapter() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const chapters = document.querySelectorAll('.all-chapitre');
        if (chapters.length === 0) return;
        
        const scrollX = window.scrollX || window.pageXOffset;
        const viewportWidth = window.innerWidth;
        const centerX = scrollX + (viewportWidth / 2);
        
        let detectedChapter = 1;
        chapters.forEach((chapter, index) => {
          const rect = chapter.getBoundingClientRect();
          const chapterLeft = rect.left + scrollX;
          const chapterRight = chapterLeft + rect.width;
          
          if (centerX >= chapterLeft && centerX < chapterRight) {
            detectedChapter = index + 1;
          }
        });
        
        handleChapterChange(detectedChapter);
      }, 100);
    }
    
    window.addEventListener('scroll', checkChapter, { passive: true });
    setTimeout(checkChapter, 500);
    
    console.log('✅ Observateur de scroll initialisé');
  }
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
  
  // Restaurer l'état visuel
  const { wasEnabled } = loadGlobalState();
  if (wasEnabled) {
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
  } else {
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
  }
  
  async function toggleSound() {
    if (isMusicPlaying) {
      // Arrêter la musique
      const currentAudio = audioTracks[currentTrack];
      await fadeOut(currentAudio, 500);
      currentAudio.pause();
      
      soundOn.style.display = 'none';
      soundOff.style.display = 'block';
      isMusicPlaying = false;
      musicEnabled = false;
      saveGlobalState();
      console.log('🔇 Musique désactivée');
    } else {
      // Démarrer la musique
      const trackToPlay = getCurrentPageTrack();
      const currentAudio = audioTracks[trackToPlay];
      
      try {
        await currentAudio.play();
        currentTrack = trackToPlay;
        soundOn.style.display = 'block';
        soundOff.style.display = 'none';
        isMusicPlaying = true;
        musicEnabled = true;
        await fadeIn(currentAudio, 0.3, 800);
        saveGlobalState();
        console.log(`🔊 Musique activée: ${musicConfig[trackToPlay].name}`);
      } catch (error) {
        console.error('❌ Erreur lecture audio:', error);
        alert('Impossible de lire la musique. Cliquez à nouveau pour réessayer.');
      }
    }
  }
  
  soundButtons.forEach(button => {
    button.addEventListener('click', (e) => {
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
// GESTION DES TRANSITIONS DE PAGE
// ========================================
async function handlePageTransition(href) {
  if (!isMusicPlaying || !currentTrack) {
    console.log('⏭️ Pas de musique active, navigation directe');
    return;
  }
  
  console.log('🔄 Transition de page vers:', href);
  
  // Fade out avant de changer de page
  const currentAudio = audioTracks[currentTrack];
  await fadeOut(currentAudio, 800);
  currentAudio.pause();
  
  saveGlobalState();
}

function setupPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', async (e) => {
      const href = link.getAttribute('href');
      
      // Ignorer les ancres, mailto, etc.
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) {
        return;
      }
      
      if (isMusicPlaying) {
        e.preventDefault();
        console.log('🎵 Fade out avant navigation');
        await handlePageTransition(href);
        window.location.href = href;
      } else {
        saveGlobalState();
      }
    });
  });
  
  console.log('✅ Transitions de page configurées');
}

// ========================================
// RESTAURATION DE LA MUSIQUE AU CHARGEMENT
// ========================================
async function restoreMusicOnPageLoad() {
  const { wasEnabled, savedTrack, savedTime, savedVolume } = loadGlobalState();
  
  console.log('📦 État chargé:', { wasEnabled, savedTrack, savedTime: savedTime.toFixed(2), savedVolume });
  
  if (!wasEnabled) {
    console.log('🔇 Musique désactivée par l\'utilisateur');
    return;
  }
  
  const trackToPlay = getCurrentPageTrack();
  const audio = audioTracks[trackToPlay];
  
  console.log('🎵 Track à jouer:', trackToPlay);
  console.log('🎵 Track précédente:', savedTrack);
  
  // Si même track que la page précédente, continuer depuis le même temps
  if (trackToPlay === savedTrack && savedTime > 0) {
    audio.currentTime = savedTime;
    console.log('⏱️ Reprise à', savedTime.toFixed(2), 's');
  } else {
    console.log('🔄 Nouvelle track, démarrage à 0');
  }
  
  try {
    await audio.play();
    currentTrack = trackToPlay;
    isMusicPlaying = true;
    musicEnabled = true;
    await fadeIn(audio, savedVolume, 1200);
    
    // Mettre à jour l'UI
    const soundOn = document.querySelector('.sound.on');
    const soundOff = document.querySelector('.sound.off');
    if (soundOn && soundOff) {
      soundOn.style.display = 'block';
      soundOff.style.display = 'none';
    }
    
    console.log(`✅ Musique restaurée: ${musicConfig[trackToPlay].name}`);
  } catch (error) {
    console.warn('⚠️ Impossible de restaurer la musique automatiquement:', error);
    console.log('💡 L\'utilisateur devra cliquer sur le bouton son');
  }
}

// ========================================
// GESTION DES ERREURS
// ========================================
function setupErrorHandling() {
  Object.entries(audioTracks).forEach(([key, audio]) => {
    audio.addEventListener('error', (e) => {
      console.error(`❌ Erreur audio ${key}:`, e);
      console.error('Vérifiez que le fichier existe:', audio.src);
    });
    
    audio.addEventListener('canplay', () => {
      console.log(`✅ Audio ${key} prêt:`, musicConfig[key].name);
    });
  });
}

// ========================================
// INITIALISATION COMPLÈTE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎵 Initialisation du système audio global...');
  
  setTimeout(async () => {
    initSoundButton();
    setupScrollObserver();
    setupErrorHandling();
    setupPageTransitions();
    
    // Restaurer la musique si elle était activée
    await restoreMusicOnPageLoad();
    
    console.log('✅ Système audio global prêt !');
    console.log('📍 Page actuelle:', window.location.pathname);
    console.log('🎵 Track actuelle:', getCurrentPageTrack());
  }, 100);
});

// Sauvegarder avant fermeture
window.addEventListener('beforeunload', () => {
  saveGlobalState();
});

// ========================================
// API PUBLIQUE
// ========================================
window.audioControls = {
  getCurrentChapter: () => currentChapter,
  getCurrentTrack: () => currentTrack,
  isPlaying: () => isMusicPlaying,
  forceTrack: (track) => {
    if (audioTracks[track] && currentTrack !== track && isMusicPlaying) {
      crossfade(currentTrack, track, 2000);
    }
  },
  setVolume: (vol) => {
    Object.values(audioTracks).forEach(audio => {
      audio.volume = Math.max(0, Math.min(1, vol));
    });
  }
};