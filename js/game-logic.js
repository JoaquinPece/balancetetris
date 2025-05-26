// LÓGICA PRINCIPAL DEL TETRIS BALANCE

// CLASE PRINCIPAL DEL JUEGO
class TetrisBalanceGame {
    constructor() {
        // Estados del juego
        this.gameState = {
            isPlaying: false,
            isPaused: false,
            gameOver: false,
            currentElement: null,
            isElementFalling: false,
            isDragging: false
        };

        // Estadísticas
        this.stats = {
            score: 0,
            level: 1,
            lives: GAME_CONFIG.INITIAL_LIVES,
            streak: 0,
            bestStreak: 0,
            totalAttempts: 0,
            correctAnswers: 0
        };

        // Configuración dinámica
        this.config = {
            fallSpeed: GAME_CONFIG.INITIAL_FALL_SPEED,
            elementPosition: 50, // Posición horizontal del elemento (0-100%)
            fallTimer: 0
        };

        // Feedback y UI
        this.ui = {
            feedback: '',
            showFeedback: false,
            activeSlot: null,
            categoryStats: {}
        };

        // Referencias y temporizadores
        this.refs = {
            gameAreaRef: null,
            fallInterval: null,
            gameInterval: null
        };

        // Eventos del mouse/touch
        this.mouse = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0
        };

        // Bind de métodos
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    // INICIALIZAR JUEGO
    initGame() {
        console.log('🎮 Inicializando Tetris Balance...');
        
        // Inicializar audio
        initAudio();
        
        // Configurar eventos globales
        this.setupEventListeners();
        
        console.log('✅ Juego inicializado correctamente');
    }

    // CONFIGURAR EVENT LISTENERS
    setupEventListeners() {
        // Eventos de teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Eventos de visibilidad (pausar cuando se cambia de pestaña)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.gameState.isPlaying && !this.gameState.isPaused) {
                this.pauseGame();
            }
        });
    }

    // GENERAR NUEVO ELEMENTO
    generateNewElement() {
        // Seleccionar elemento aleatorio
        const randomIndex = Math.floor(Math.random() * BALANCE_ELEMENTS.length);
        const element = BALANCE_ELEMENTS[randomIndex];
        
        // Configurar nuevo elemento
        this.gameState.currentElement = element;
        this.gameState.isElementFalling = true;
        this.gameState.isDragging = false;
        
        // Posición aleatoria pero centrada
        this.config.elementPosition = Math.random() * 40 + 30; // Entre 30% y 70%
        this.config.fallTimer = 0;

        console.log(`🎯 Nuevo elemento: ${element.name} (${element.category})`);
    }

    // INICIAR JUEGO
    startGame() {
        console.log('🚀 Iniciando juego...');
        
        // Resetear estados
        this.gameState = {
            isPlaying: true,
            isPaused: false,
            gameOver: false,
            currentElement: null,
            isElementFalling: false,
            isDragging: false
        };

        // Resetear estadísticas
        this.stats = {
            score: 0,
            level: 1,
            lives: GAME_CONFIG.INITIAL_LIVES,
            streak: 0,
            bestStreak: 0,
            totalAttempts: 0,
            correctAnswers: 0
        };

        // Resetear configuración
        this.config = {
            fallSpeed: GAME_CONFIG.INITIAL_FALL_SPEED,
            elementPosition: 50,
            fallTimer: 0
        };

        // Resetear UI
        this.ui = {
            feedback: '',
            showFeedback: false,
            activeSlot: null,
            categoryStats: {}
        };

        // Generar primer elemento
        this.generateNewElement();
        
        // Iniciar bucle de juego
        this.startGameLoop();
        
        // Iniciar música si está habilitada
        const audioState = getAudioState();
        if (audioState.musicEnabled) {
            setTimeout(() => {
                playTetrisMusic();
            }, GAME_CONFIG.MUSIC_DELAY);
        }
    }

    // PAUSAR/REANUDAR JUEGO
    togglePause() {
        if (!this.gameState.isPlaying) return;

        this.gameState.isPaused = !this.gameState.isPaused;
        
        if (this.gameState.isPaused) {
            this.pauseGame();
        } else {
            this.resumeGame();
        }
    }

    pauseGame() {
        this.gameState.isPaused = true;
        this.clearIntervals();
        stopMusic();
        console.log('⏸️ Juego pausado');
    }

    resumeGame() {
        this.gameState.isPaused = false;
        this.startGameLoop();
        
        const audioState = getAudioState();
        if (audioState.musicEnabled) {
            playTetrisMusic();
        }
        console.log('▶️ Juego reanudado');
    }

    // REINICIAR JUEGO
    resetGame() {
        console.log('🔄 Reiniciando juego...');
        
        this.gameState.isPlaying = false;
        this.gameState.isPaused = false;
        this.gameState.gameOver = false;
        this.gameState.currentElement = null;
        this.gameState.isElementFalling = false;
        this.gameState.isDragging = false;
        
        this.clearIntervals();
        stopMusic();
    }

    // BUCLE PRINCIPAL DEL JUEGO
    startGameLoop() {
        if (this.gameState.isPaused || !this.gameState.isPlaying) return;

        this.refs.fallInterval = setInterval(() => {
            if (this.gameState.isElementFalling && !this.ui.showFeedback && !this.gameState.isDragging) {
                this.updateFallTimer();
            }
        }, GAME_CONFIG.TIMER_INTERVAL);
    }

    // ACTUALIZAR TEMPORIZADOR DE CAÍDA
    updateFallTimer() {
        this.config.fallTimer += GAME_CONFIG.TIMER_INTERVAL;
        
        if (this.config.fallTimer >= this.config.fallSpeed) {
            this.handleElementFall();
        }
    }

    // MANEJAR CAÍDA AUTOMÁTICA DEL ELEMENTO
    handleElementFall() {
        if (!this.gameState.isElementFalling || this.ui.showFeedback) return;

        console.log('⏰ Elemento se escapó');
        
        this.stats.lives--;
        this.stats.streak = 0;
        this.stats.totalAttempts++;
        
        this.gameState.isElementFalling = false;
        
        this.ui.feedback = `⏰ ¡Se escapó! ${this.gameState.currentElement.name} pertenece a ${CATEGORIES[this.gameState.currentElement.category].name}`;
        this.ui.showFeedback = true;
        
        playIncorrectSound();
        
        setTimeout(() => {
            this.processFeedbackEnd();
        }, GAME_CONFIG.FEEDBACK_DURATION);
    }

    // MOVER ELEMENTO CON TECLADO
    moveElement(direction) {
        if (!this.gameState.isPlaying || this.gameState.isPaused || 
            !this.gameState.isElementFalling || this.gameState.isDragging) return;

        const step = GAME_CONFIG.MOVEMENT_STEP;
        
        if (direction === 'left') {
            this.config.elementPosition = Math.max(
                GAME_CONFIG.MIN_ELEMENT_POSITION, 
                this.config.elementPosition - step
            );
        } else if (direction === 'right') {
            this.config.elementPosition = Math.min(
                GAME_CONFIG.MAX_ELEMENT_POSITION, 
                this.config.elementPosition + step
            );
        }
    }

    // MANEJO DE MOUSE/TOUCH - INICIO
    handleMouseDown(e) {
        if (!this.gameState.isElementFalling || this.ui.showFeedback) return;
        
        this.gameState.isDragging = true;
        
        // Obtener posición inicial
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.mouse.startX = clientX;
        this.mouse.startY = clientY;
        this.mouse.currentX = clientX;
        this.mouse.currentY = clientY;
        
        // Prevenir comportamientos por defecto
        e.preventDefault();
        
        // Añadir event listeners globales
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd);
        
        console.log('🖱️ Iniciado arrastre del elemento');
    }

    // MANEJO DE MOUSE - MOVIMIENTO
    handleMouseMove(e) {
        if (!this.gameState.isDragging || !this.refs.gameAreaRef) return;
        
        const rect = this.refs.gameAreaRef.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        this.config.elementPosition = Math.max(
            GAME_CONFIG.MIN_ELEMENT_POSITION,
            Math.min(GAME_CONFIG.MAX_ELEMENT_POSITION, percentage)
        );
        
        e.preventDefault();
    }

    // MANEJO DE TOUCH - MOVIMIENTO
    handleTouchMove(e) {
        if (!this.gameState.isDragging || !this.refs.gameAreaRef) return;
        
        const touch = e.touches[0];
        const rect = this.refs.gameAreaRef.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        this.config.elementPosition = Math.max(
            GAME_CONFIG.MIN_ELEMENT_POSITION,
            Math.min(GAME_CONFIG.MAX_ELEMENT_POSITION, percentage)
        );
        
        e.preventDefault();
    }

    // MANEJO DE MOUSE/TOUCH - FIN
    handleMouseUp(e) {
        if (!this.gameState.isDragging) return;
        
        this.gameState.isDragging = false;
        
        // Remover event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
        
        console.log('🖱️ Finalizado arrastre del elemento');
    }

    handleTouchEnd(e) {
        this.handleMouseUp(e);
    }

    // MANEJAR CLASIFICACIÓN DE ELEMENTO
    handleCategoryDrop(selectedCategory) {
        if (!this.gameState.isElementFalling || !this.gameState.currentElement || this.ui.showFeedback) {
            return;
        }

        console.log(`🎯 Clasificando ${this.gameState.currentElement.name} en ${selectedCategory}`);
        
        // Detener caída y arrastre
        this.ui.activeSlot = selectedCategory;
        this.gameState.isElementFalling = false;
        this.gameState.isDragging = false;
        this.clearIntervals();
        
        // Verificar respuesta
        const isCorrect = selectedCategory === this.gameState.currentElement.category;
        
        // Actualizar estadísticas generales
        this.stats.totalAttempts++;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
        
        // Actualizar estadísticas por categoría
        this.updateCategoryStats(selectedCategory, isCorrect);
        
        // Mostrar feedback
        this.ui.showFeedback = true;
        
        // Programar fin del feedback
        setTimeout(() => {
            this.processFeedbackEnd();
        }, GAME_CONFIG.FEEDBACK_DURATION);
    }

    // MANEJAR RESPUESTA CORRECTA
    handleCorrectAnswer() {
        const pointsEarned = GAME_CONFIG.BASE_POINTS * this.stats.level;
        
        this.stats.score += pointsEarned;
        this.stats.correctAnswers++;
        this.stats.streak++;
        
        if (this.stats.streak > this.stats.bestStreak) {
            this.stats.bestStreak = this.stats.streak;
        }
        
        let feedbackText = `¡Correcto! +${pointsEarned} puntos`;
        
        // Bonificación por racha
        if (this.stats.streak >= GAME_CONFIG.STREAK_BONUS_THRESHOLD) {
            const bonus = this.stats.streak * GAME_CONFIG.STREAK_BONUS_MULTIPLIER;
            this.stats.score += bonus;
            feedbackText += ` 🔥 ¡Racha de ${this.stats.streak}! +${bonus} bonus`;
            
            playStreakSound(this.stats.streak);
        } else {
            playCorrectSound();
        }
        
        // Verificar subida de nivel
        const requiredScore = this.stats.level * GAME_CONFIG.LEVEL_UP_POINTS;
        if (this.stats.score >= requiredScore) {
            this.levelUp();
            feedbackText += ` 🎉 ¡Nivel ${this.stats.level}!`;
        }
        
        this.ui.feedback = feedbackText;
        
        console.log(`✅ Respuesta correcta! Puntos: ${this.stats.score}, Racha: ${this.stats.streak}`);
    }

    // MANEJAR RESPUESTA INCORRECTA
    handleIncorrectAnswer() {
        this.stats.lives--;
        this.stats.streak = 0;
        
        this.ui.feedback = `❌ Incorrecto. ${this.gameState.currentElement.name} va en ${CATEGORIES[this.gameState.currentElement.category].name}`;
        
        playIncorrectSound();
        
        console.log(`❌ Respuesta incorrecta. Vidas restantes: ${this.stats.lives}`);
    }

    // SUBIR DE NIVEL
    levelUp() {
        this.stats.level++;
        this.config.fallSpeed = Math.max(
            GAME_CONFIG.MIN_FALL_SPEED,
            this.config.fallSpeed - GAME_CONFIG.SPEED_DECREASE_PER_LEVEL
        );
        
        playLevelUpSound();
        
        console.log(`📈 ¡Nivel ${this.stats.level}! Nueva velocidad: ${this.config.fallSpeed}ms`);
    }

    // ACTUALIZAR ESTADÍSTICAS POR CATEGORÍA
    updateCategoryStats(category, isCorrect) {
        if (!this.ui.categoryStats[category]) {
            this.ui.categoryStats[category] = {
                attempts: 0,
                correct: 0
            };
        }
        
        this.ui.categoryStats[category].attempts++;
        if (isCorrect) {
            this.ui.categoryStats[category].correct++;
        }
    }

    // PROCESAR FIN DEL FEEDBACK
    processFeedbackEnd() {
        this.ui.showFeedback = false;
        this.ui.activeSlot = null;
        
        // Verificar fin del juego
        if (this.stats.lives <= 0) {
            this.endGame();
        } else {
            // Continuar con nuevo elemento
            this.generateNewElement();
            this.startGameLoop();
        }
    }

    // TERMINAR JUEGO
    endGame() {
        console.log('🎮 Game Over!');
        
        this.gameState.gameOver = true;
        this.gameState.isPlaying = false;
        
        this.clearIntervals();
        stopMusic();
        playGameOverSound();
    }

    // MANEJAR TECLAS
    handleKeyPress(e) {
        if (!this.gameState.isPlaying || this.gameState.gameOver) return;
        
        switch(e.key.toLowerCase()) {
            case 'arrowleft':
            case 'a':
                e.preventDefault();
                this.moveElement('left');
                break;
                
            case 'arrowright':
            case 'd':
                e.preventDefault();
                this.moveElement('right');
                break;
                
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
                
            case '1':
                e.preventDefault();
                this.handleCategoryDrop('activo-corriente');
                break;
                
            case '2':
                e.preventDefault();
                this.handleCategoryDrop('activo-no-corriente');
                break;
                
            case '3':
                e.preventDefault();
                this.handleCategoryDrop('pasivo-corriente');
                break;
                
            case '4':
                e.preventDefault();
                this.handleCategoryDrop('pasivo-no-corriente');
                break;
                
            case '5':
                e.preventDefault();
                this.handleCategoryDrop('fondos-propios');
                break;
                
            case 'escape':
                e.preventDefault();
                this.resetGame();
                break;
                
            case 'm':
                e.preventDefault();
                this.toggleMusic();
                break;
                
            case 's':
                e.preventDefault();
                this.toggleSoundEffects();
                break;
        }
    }

    // ALTERNAR MÚSICA
    toggleMusic() {
        const newState = toggleMusic();
        
        if (newState && this.gameState.isPlaying && !this.gameState.isPaused) {
            playTetrisMusic();
        } else if (!newState) {
            stopMusic();
        }
        
        return newState;
    }

    // ALTERNAR EFECTOS DE SONIDO
    toggleSoundEffects() {
        return toggleSoundEffects();
    }

    // OBTENER CALIFICACIÓN FINAL
    getFinalGrade() {
        const score = this.stats.score;
        
        for (const [grade, config] of Object.entries(GRADING_SYSTEM)) {
            if (score >= config.minScore) {
                return {
                    grade: grade,
                    ...config
                };
            }
        }
        
        return GRADING_SYSTEM['D'];
    }

    // CALCULAR PROGRESO DE CAÍDA
    getFallProgress() {
        if (!this.gameState.isElementFalling || this.gameState.isDragging) return 0;
        return (this.config.fallTimer / this.config.fallSpeed) * 100;
    }

    // OBTENER TIEMPO RESTANTE
    getTimeRemaining() {
        if (!this.gameState.isElementFalling) return 0;
        return Math.ceil((this.config.fallSpeed - this.config.fallTimer) / 1000);
    }

    // LIMPIAR INTERVALOS
    clearIntervals() {
        if (this.refs.fallInterval) {
            clearInterval(this.refs.fallInterval);
            this.refs.fallInterval = null;
        }
        
        if (this.refs.gameInterval) {
            clearInterval(this.refs.gameInterval);
            this.refs.gameInterval = null;
        }
    }

    // OBTENER ESTADO COMPLETO DEL JUEGO
    getGameState() {
        return {
            gameState: { ...this.gameState },
            stats: { ...this.stats },
            config: { ...this.config },
            ui: { ...this.ui },
            fallProgress: this.getFallProgress(),
            timeRemaining: this.getTimeRemaining(),
            finalGrade: this.gameState.gameOver ? this.getFinalGrade() : null,
            audioState: getAudioState()
        };
    }

    // DESTRUCTOR
    destroy() {
        this.clearIntervals();
        stopMusic();
        
        // Remover event listeners si existen
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    }
}

// INSTANCIA GLOBAL DEL JUEGO
let gameInstance = null;

// FUNCIONES GLOBALES PARA USO FÁCIL
function initGameInstance() {
    if (gameInstance) {
        gameInstance.destroy();
    }
    gameInstance = new TetrisBalanceGame();
    gameInstance.initGame();
    return gameInstance;
}

function getGameInstance() {
    if (!gameInstance) {
        initGameInstance();
    }
    return gameInstance;
}

// EXPORTAR (para uso con módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TetrisBalanceGame,
        initGameInstance,
        getGameInstance
    };
}