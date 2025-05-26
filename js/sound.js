// SISTEMA DE AUDIO DEL TETRIS BALANCE

// CONFIGURACIÓN DE AUDIO (por defecto apagado)
const AUDIO_CONFIG = {
    musicEnabled: false,        // Música apagada por defecto
    soundEffectsEnabled: true,  // Efectos de sonido activados por defecto
    masterVolume: 0.7,          // Volumen maestro (70%)
    musicVolume: 0.4,           // Volumen de música (40%)
    effectsVolume: 0.6          // Volumen de efectos (60%)
};

// CLASE PARA MANEJAR EL AUDIO
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.musicTimeout = null;
        this.isInitialized = false;
        
        // Estados de audio
        this.musicEnabled = AUDIO_CONFIG.musicEnabled;
        this.soundEffectsEnabled = AUDIO_CONFIG.soundEffectsEnabled;
        this.masterVolume = AUDIO_CONFIG.masterVolume;
        this.musicVolume = AUDIO_CONFIG.musicVolume;
        this.effectsVolume = AUDIO_CONFIG.effectsVolume;
    }

    // Inicializar contexto de audio
    init() {
        if (this.isInitialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
            console.log('🎵 Sistema de audio inicializado');
        } catch (error) {
            console.warn('❌ Audio no disponible:', error);
            this.isInitialized = false;
        }
    }

    // Activar/desactivar música
    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        
        if (!this.musicEnabled && this.musicTimeout) {
            clearTimeout(this.musicTimeout);
            this.musicTimeout = null;
        }
        
        return this.musicEnabled;
    }

    // Activar/desactivar efectos de sonido
    toggleSoundEffects() {
        this.soundEffectsEnabled = !this.soundEffectsEnabled;
        return this.soundEffectsEnabled;
    }

    // Ajustar volumen maestro
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }

    // Reproducir nota musical
    playNote(frequency, startTime, duration, volume = 0.1) {
        if (!this.isInitialized || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, startTime);
            oscillator.type = 'square'; // Sonido retro como el Tetris original
            
            const finalVolume = volume * this.musicVolume * this.masterVolume;
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(finalVolume, startTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(finalVolume * 0.8, startTime + duration - 0.05);
            gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        } catch (error) {
            console.warn('Error reproduciendo nota:', error);
        }
    }

    // MÚSICA CLÁSICA DEL TETRIS (Korobeiniki)
    playTetrisMusic() {
        if (!this.musicEnabled || !this.isInitialized || !this.audioContext) return;

        // Melodía completa del Tetris (más notas que antes)
        const melody = [
            // Primera sección
            { freq: 659.25, duration: 0.4 }, // E5
            { freq: 493.88, duration: 0.2 }, // B4
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 587.33, duration: 0.4 }, // D5
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 493.88, duration: 0.2 }, // B4
            { freq: 440.00, duration: 0.4 }, // A4
            { freq: 440.00, duration: 0.2 }, // A4
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 659.25, duration: 0.4 }, // E5
            { freq: 587.33, duration: 0.2 }, // D5
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 493.88, duration: 0.6 }, // B4
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 587.33, duration: 0.4 }, // D5
            { freq: 659.25, duration: 0.4 }, // E5
            { freq: 523.25, duration: 0.4 }, // C5
            { freq: 440.00, duration: 0.4 }, // A4
            { freq: 440.00, duration: 0.8 }, // A4 (más larga)
            
            { freq: 0, duration: 0.2 }, // Pausa
            
            // Segunda sección
            { freq: 587.33, duration: 0.4 }, // D5
            { freq: 698.46, duration: 0.2 }, // F5
            { freq: 880.00, duration: 0.4 }, // A5
            { freq: 783.99, duration: 0.2 }, // G5
            { freq: 698.46, duration: 0.2 }, // F5
            { freq: 659.25, duration: 0.6 }, // E5
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 659.25, duration: 0.4 }, // E5
            { freq: 587.33, duration: 0.2 }, // D5
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 493.88, duration: 0.4 }, // B4
            { freq: 493.88, duration: 0.2 }, // B4
            { freq: 523.25, duration: 0.2 }, // C5
            { freq: 587.33, duration: 0.4 }, // D5
            { freq: 659.25, duration: 0.4 }, // E5
            { freq: 523.25, duration: 0.4 }, // C5
            { freq: 440.00, duration: 0.4 }, // A4
            { freq: 440.00, duration: 0.8 }  // A4 (final)
        ];

        const currentTime = this.audioContext.currentTime;
        let totalTime = 0;

        // Reproducir cada nota
        melody.forEach((note) => {
            if (note.freq > 0) {
                this.playNote(note.freq, currentTime + totalTime, note.duration);
            }
            totalTime += note.duration;
        });

        // Programar repetición de la música
        if (this.musicEnabled) {
            this.musicTimeout = setTimeout(() => {
                if (this.musicEnabled) {
                    this.playTetrisMusic();
                }
            }, GAME_CONFIG.MUSIC_REPEAT_INTERVAL);
        }
    }

    // Detener música
    stopMusic() {
        if (this.musicTimeout) {
            clearTimeout(this.musicTimeout);
            this.musicTimeout = null;
        }
    }

    // EFECTOS DE SONIDO

    // Sonido de respuesta correcta
    playCorrectSound() {
        if (!this.soundEffectsEnabled || !this.isInitialized) return;

        try {
            const currentTime = this.audioContext.currentTime;
            const finalVolume = this.effectsVolume * this.masterVolume;

            // Acorde ascendente alegre
            [0, 0.1, 0.2].forEach((delay, index) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
                oscillator.frequency.setValueAtTime(frequencies[index], currentTime + delay);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, currentTime + delay);
                gainNode.gain.linearRampToValueAtTime(finalVolume * 0.4, currentTime + delay + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + delay + 0.3);
                
                oscillator.start(currentTime + delay);
                oscillator.stop(currentTime + delay + 0.3);
            });
        } catch (error) {
            console.warn('Error en sonido correcto:', error);
        }
    }

    // Sonido de respuesta incorrecta
    playIncorrectSound() {
        if (!this.soundEffectsEnabled || !this.isInitialized) return;

        try {
            const currentTime = this.audioContext.currentTime;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            const finalVolume = this.effectsVolume * this.masterVolume;
            
            // Sonido descendente de error
            oscillator.frequency.setValueAtTime(400, currentTime);
            oscillator.frequency.linearRampToValueAtTime(200, currentTime + 0.4);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(finalVolume * 0.3, currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.4);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + 0.4);
        } catch (error) {
            console.warn('Error en sonido incorrecto:', error);
        }
    }

    // Sonido de subida de nivel
    playLevelUpSound() {
        if (!this.soundEffectsEnabled || !this.isInitialized) return;

        try {
            const currentTime = this.audioContext.currentTime;
            const finalVolume = this.effectsVolume * this.masterVolume;

            // Fanfarria de nivel
            const levelUpMelody = [
                { freq: 523.25, time: 0.0, duration: 0.15 }, // C5
                { freq: 659.25, time: 0.1, duration: 0.15 }, // E5
                { freq: 783.99, time: 0.2, duration: 0.15 }, // G5
                { freq: 1046.5, time: 0.3, duration: 0.25 }  // C6
            ];

            levelUpMelody.forEach(note => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, currentTime + note.time);
                oscillator.type = 'triangle';
                
                gainNode.gain.setValueAtTime(0, currentTime + note.time);
                gainNode.gain.linearRampToValueAtTime(finalVolume * 0.5, currentTime + note.time + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.time + note.duration);
                
                oscillator.start(currentTime + note.time);
                oscillator.stop(currentTime + note.time + note.duration);
            });
        } catch (error) {
            console.warn('Error en sonido de nivel:', error);
        }
    }

    // Sonido de racha
    playStreakSound(streakCount) {
        if (!this.soundEffectsEnabled || !this.isInitialized) return;

        try {
            const currentTime = this.audioContext.currentTime;
            const finalVolume = this.effectsVolume * this.masterVolume;

            // Sonidos más intensos para rachas más altas
            const intensity = Math.min(streakCount / 10, 1);
            const baseFreq = 440 + (streakCount * 20);

            for (let i = 0; i < 3; i++) {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(baseFreq * (1 + i * 0.5), currentTime + i * 0.1);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, currentTime + i * 0.1);
                gainNode.gain.linearRampToValueAtTime(finalVolume * 0.3 * intensity, currentTime + i * 0.1 + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + i * 0.1 + 0.2);
                
                oscillator.start(currentTime + i * 0.1);
                oscillator.stop(currentTime + i * 0.1 + 0.2);
            }
        } catch (error) {
            console.warn('Error en sonido de racha:', error);
        }
    }

    // Sonido de Game Over
    playGameOverSound() {
        if (!this.soundEffectsEnabled || !this.isInitialized) return;

        try {
            const currentTime = this.audioContext.currentTime;
            const finalVolume = this.effectsVolume * this.masterVolume;

            // Melodía triste descendente
            const gameOverMelody = [
                { freq: 523.25, time: 0.0, duration: 0.3 }, // C5
                { freq: 493.88, time: 0.3, duration: 0.3 }, // B4
                { freq: 440.00, time: 0.6, duration: 0.3 }, // A4
                { freq: 392.00, time: 0.9, duration: 0.5 }  // G4
            ];

            gameOverMelody.forEach(note => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, currentTime + note.time);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, currentTime + note.time);
                gainNode.gain.linearRampToValueAtTime(finalVolume * 0.4, currentTime + note.time + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + note.time + note.duration);
                
                oscillator.start(currentTime + note.time);
                oscillator.stop(currentTime + note.time + note.duration);
            });
        } catch (error) {
            console.warn('Error en sonido game over:', error);
        }
    }

    // Obtener estado del audio
    getAudioState() {
        return {
            musicEnabled: this.musicEnabled,
            soundEffectsEnabled: this.soundEffectsEnabled,
            masterVolume: this.masterVolume,
            isInitialized: this.isInitialized
        };
    }
}

// INSTANCIA GLOBAL DEL ADMINISTRADOR DE AUDIO
const AudioManager_Instance = new AudioManager();

// FUNCIONES GLOBALES PARA USO FÁCIL
function initAudio() {
    AudioManager_Instance.init();
}

function toggleMusic() {
    return AudioManager_Instance.toggleMusic();
}

function toggleSoundEffects() {
    return AudioManager_Instance.toggleSoundEffects();
}

function playTetrisMusic() {
    AudioManager_Instance.playTetrisMusic();
}

function stopMusic() {
    AudioManager_Instance.stopMusic();
}

function playCorrectSound() {
    AudioManager_Instance.playCorrectSound();
}

function playIncorrectSound() {
    AudioManager_Instance.playIncorrectSound();
}

function playLevelUpSound() {
    AudioManager_Instance.playLevelUpSound();
}

function playStreakSound(streakCount) {
    AudioManager_Instance.playStreakSound(streakCount);
}

function playGameOverSound() {
    AudioManager_Instance.playGameOverSound();
}

function getAudioState() {
    return AudioManager_Instance.getAudioState();
}

// EXPORTAR (para uso con módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AudioManager,
        initAudio,
        toggleMusic,
        toggleSoundEffects,
        playTetrisMusic,
        stopMusic,
        playCorrectSound,
        playIncorrectSound,
        playLevelUpSound,
        playStreakSound,
        playGameOverSound,
        getAudioState
    };
}