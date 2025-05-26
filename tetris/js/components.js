// COMPONENTES REACT DEL TETRIS BALANCE

const { useState, useEffect, useRef, useCallback } = React;

// ICONOS SVG
const Icons = {
    Play: () => React.createElement('svg', {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    
    Pause: () => React.createElement('svg', {
        className: "w-6 h-6",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
    })),
    
    RotateCcw: () => React.createElement('svg', {
        className: "w-4 h-4",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
    })),
    
    Trophy: () => React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M12 15v5l-3-1 3-1 3 1-3 1zm0 0l-.5-3H12l-.5 3z"
    })),
    
    Zap: () => React.createElement('svg', {
        className: "w-5 h-5",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M13 10V3L4 14h7v7l9-11h-7z"
    })),
    
    Volume2: () => React.createElement('svg', {
        className: "w-4 h-4",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2l5 5V0L9 5z"
    })),
    
    VolumeX: () => React.createElement('svg', {
        className: "w-4 h-4",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
    }, React.createElement('path', {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
    }))
};

// COMPONENTE: HEADER DEL JUEGO
const GameHeader = () => {
    return React.createElement('div', {
        className: "text-center mb-6"
    }, [
        React.createElement('h1', {
            key: 'title',
            className: "text-3xl md:text-4xl font-bold mb-2"
        }, '🧩 Tetris Balance'),
        React.createElement('p', {
            key: 'subtitle',
            className: "text-lg opacity-90"
        }, '¡Clasifica los elementos contables mientras caen!')
    ]);
};

// COMPONENTE: PANEL DE CONTROL
const ControlPanel = ({ gameState, onStartGame, onTogglePause, onResetGame, onToggleMusic, onToggleSoundEffects }) => {
    return React.createElement('div', {
        className: "glass-panel p-4 mb-6"
    }, React.createElement('div', {
        className: "flex justify-between items-center flex-wrap gap-4"
    }, [
        // Estadísticas
        React.createElement('div', {
            key: 'stats',
            className: "flex items-center space-x-6 flex-wrap"
        }, [
            React.createElement('div', {
                key: 'score',
                className: "flex items-center space-x-2"
            }, [
                React.createElement(Icons.Trophy, { key: 'trophy-icon' }),
                React.createElement('span', {
                    key: 'score-text',
                    className: "font-bold text-lg"
                }, gameState.stats.score)
            ]),
            
            React.createElement('div', {
                key: 'level',
                className: "flex items-center space-x-2"
            }, React.createElement('span', {
                className: "text-blue-300"
            }, `Nivel ${gameState.stats.level}`)),
            
            React.createElement('div', {
                key: 'lives',
                className: "flex items-center space-x-2"
            }, React.createElement('span', {
                className: "text-red-300"
            }, `❤️ × ${gameState.stats.lives}`)),
            
            gameState.stats.streak > 0 && React.createElement('div', {
                key: 'streak',
                className: "flex items-center space-x-2"
            }, [
                React.createElement(Icons.Zap, { key: 'zap-icon' }),
                React.createElement('span', {
                    key: 'streak-text',
                    className: `text-yellow-300 font-bold ${gameState.stats.streak >= 5 ? 'streak-effect' : 'pulse'}`
                }, `Racha: ${gameState.stats.streak}`)
            ]),
            
            gameState.stats.bestStreak > 0 && React.createElement('div', {
                key: 'best-streak',
                className: "flex items-center space-x-2"
            }, React.createElement('span', {
                className: "text-purple-300 text-sm"
            }, `Mejor: ${gameState.stats.bestStreak}`))
        ]),
        
        // Botones de control
        React.createElement('div', {
            key: 'controls',
            className: "flex space-x-2"
        }, [
            // Botón principal (Jugar/Pausar)
            !gameState.gameState.isPlaying ? 
                React.createElement('button', {
                    key: 'play-btn',
                    onClick: onStartGame,
                    className: "flex items-center space-x-2 px-4 py-2 btn-primary rounded-lg font-bold"
                }, [
                    React.createElement(Icons.Play, { key: 'play-icon' }),
                    React.createElement('span', { key: 'play-text' }, 'JUGAR')
                ]) :
                React.createElement('button', {
                    key: 'pause-btn',
                    onClick: onTogglePause,
                    className: "flex items-center space-x-2 px-4 py-2 btn-secondary rounded-lg font-bold"
                }, [
                    React.createElement(Icons.Pause, { key: 'pause-icon' }),
                    React.createElement('span', { key: 'pause-text' }, gameState.gameState.isPaused ? 'REANUDAR' : 'PAUSA')
                ]),
            
            // Botón de reset
            React.createElement('button', {
                key: 'reset-btn',
                onClick: onResetGame,
                className: "flex items-center space-x-2 px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
            }, [
                React.createElement(Icons.RotateCcw, { key: 'reset-icon' }),
                React.createElement('span', { key: 'reset-text' }, 'RESET')
            ]),
            
            // Controles de audio
            React.createElement('button', {
                key: 'music-btn',
                onClick: onToggleMusic,
                className: `p-2 rounded-lg transition-colors ${
                    gameState.audioState.musicEnabled 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-500 text-gray-300'
                }`,
                title: gameState.audioState.musicEnabled ? 'Desactivar música' : 'Activar música'
            }, gameState.audioState.musicEnabled ? 
                React.createElement(Icons.Volume2, null) : 
                React.createElement(Icons.VolumeX, null)
            ),
            
            React.createElement('button', {
                key: 'sound-btn',
                onClick: onToggleSoundEffects,
                className: `p-2 rounded-lg transition-colors ${
                    gameState.audioState.soundEffectsEnabled 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-500 text-gray-300'
                }`,
                title: gameState.audioState.soundEffectsEnabled ? 'Desactivar efectos' : 'Activar efectos'
            }, gameState.audioState.soundEffectsEnabled ? 
                React.createElement('span', null, '🔊') : 
                React.createElement('span', null, '🔇')
            )
        ])
    ]));
};

// COMPONENTE: ÁREA DE CAÍDA
const GameArea = ({ gameState, gameAreaRef, onMouseDown }) => {
    if (!gameState.gameState.isPlaying || !gameState.gameState.currentElement || !gameState.gameState.isElementFalling) {
        return null;
    }
    
    const element = gameState.gameState.currentElement;
    
    return React.createElement('div', {
        className: "game-board p-6 mb-6"
    }, [
        React.createElement('div', {
            key: 'drop-zone',
            ref: gameAreaRef,
            className: "drop-zone mb-4",
            style: { minHeight: '280px', position: 'relative' }
        }, [
            // Barra de progreso
            React.createElement('div', {
                key: 'progress-bar',
                className: "absolute top-0 left-0 w-full progress-bar"
            }, React.createElement('div', {
                className: "progress-fill",
                style: { width: `${gameState.fallProgress}%` }
            })),
            
            // Elemento cayendo
            React.createElement('div', {
                key: 'falling-element',
                className: `absolute ${element.color} text-white px-6 py-4 rounded-lg shadow-lg glow falling-element ${gameState.gameState.isDragging ? 'scale-105' : ''}`,
                style: {
                    left: `${gameState.config.elementPosition}%`,
                    top: `${30 + (gameState.fallProgress * 0.6)}%`,
                    transform: 'translateX(-50%)',
                    zIndex: 10
                },
                onMouseDown: onMouseDown,
                onTouchStart: onMouseDown
            }, React.createElement('div', {
                className: "text-center"
            }, [
                React.createElement('div', {
                    key: 'icon',
                    className: "text-4xl mb-2"
                }, element.icon),
                React.createElement('div', {
                    key: 'name',
                    className: "text-sm font-bold whitespace-nowrap"
                }, element.name)
            ])),
            
            // Indicador de tiempo
            React.createElement('div', {
                key: 'time-indicator',
                className: "absolute bottom-4 left-0 right-0 text-center"
            }, React.createElement('div', {
                className: "text-white text-opacity-70 text-sm"
            }, `⏱️ ${gameState.timeRemaining}s restantes`))
        ]),
        
        // Controles visuales
        React.createElement('div', {
            key: 'controls-info',
            className: "text-center text-white text-opacity-70 text-sm"
        }, React.createElement('div', {
            className: "flex justify-center space-x-4 flex-wrap"
        }, [
            React.createElement('span', { key: 'left' }, '← A: Izquierda'),
            React.createElement('span', { key: 'right' }, 'D →: Derecha'),
            React.createElement('span', { key: 'drag' }, '🖱️ Arrastra'),
            React.createElement('span', { key: 'classify' }, '1-5: Clasificar'),
            React.createElement('span', { key: 'pause' }, 'Espacio: Pausa')
        ]))
    ]);
};

// COMPONENTE: MENSAJE DE PAUSA
const PauseMessage = ({ isPaused }) => {
    if (!isPaused) return null;
    
    return React.createElement('div', {
        className: "text-center mb-6"
    }, React.createElement('div', {
        className: "glass-panel p-6"
    }, [
        React.createElement('h2', {
            key: 'title',
            className: "text-2xl font-bold mb-2"
        }, '⏸️ JUEGO PAUSADO'),
        React.createElement('p', {
            key: 'subtitle',
            className: "text-lg opacity-80"
        }, 'Presiona ESPACIO o el botón REANUDAR para continuar')
    ]));
};

// COMPONENTE: FEEDBACK
const FeedbackPanel = ({ gameState }) => {
    if (!gameState.ui.showFeedback) return null;
    
    const isCorrect = gameState.ui.feedback.includes('Correcto') || gameState.ui.feedback.includes('¡Correcto!');
    const element = gameState.gameState.currentElement;
    
    return React.createElement('div', {
        className: `text-center p-4 rounded-lg mb-6 backdrop-blur-sm ${
            isCorrect ? 'feedback-correct' : 'feedback-incorrect'
        }`
    }, [
        React.createElement('p', {
            key: 'feedback-text',
            className: "font-bold text-lg"
        }, gameState.ui.feedback),
        
        element && React.createElement('div', {
            key: 'element-info',
            className: "mt-2 text-sm opacity-90"
        }, [
            React.createElement('span', {
                key: 'icon',
                className: "text-2xl mr-2"
            }, element.icon),
            React.createElement('span', {
                key: 'mapping'
            }, `${element.name} → ${CATEGORIES[element.category].name}`)
        ]),
        
        element && element.tip && React.createElement('div', {
            key: 'tip',
            className: "mt-3 p-3 bg-white bg-opacity-20 rounded-lg text-sm"
        }, [
            React.createElement('div', {
                key: 'tip-header',
                className: "font-bold mb-1"
            }, '💡 Tip:'),
            React.createElement('div', {
                key: 'tip-text'
            }, element.tip)
        ])
    ]);
};

// COMPONENTE: CATEGORÍAS
const CategoriesGrid = ({ gameState, onCategoryDrop }) => {
    if (gameState.gameState.gameOver) return null;
    
    return React.createElement('div', {
        className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
    }, Object.entries(CATEGORIES).map(([key, category], index) => {
        const stats = gameState.ui.categoryStats[key];
        const isActive = gameState.ui.activeSlot === key;
        const isEnabled = gameState.gameState.isElementFalling && !gameState.ui.showFeedback && !gameState.gameState.isPaused;
        
        return React.createElement('button', {
            key: key,
            onClick: () => onCategoryDrop(key),
            disabled: !isEnabled,
            className: `category-slot ${category.color} ${category.textColor} border-4 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 flex flex-col justify-center ${
                isActive ? 'active' : ''
            } ${
                isEnabled ? 'hover:scale-105 hover:shadow-lg' : 'opacity-60'
            }`
        }, [
            // Número de categoría
            React.createElement('div', {
                key: 'number',
                className: "font-bold text-2xl mb-2 bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
            }, index + 1),
            
            // Nombre de categoría
            React.createElement('h3', {
                key: 'name',
                className: "font-bold text-sm mb-2"
            }, category.name),
            
            // Estadísticas
            stats && React.createElement('div', {
                key: 'stats',
                className: "text-xs opacity-75 mt-2"
            }, [
                React.createElement('div', { key: 'correct' }, `✓ ${stats.correct}`),
                React.createElement('div', { key: 'total' }, `Total: ${stats.attempts}`),
                React.createElement('div', { key: 'percentage' }, 
                    `${stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0}%`
                )
            ]),
            
            // Indicador de tecla
            React.createElement('div', {
                key: 'key-indicator',
                className: "text-xs opacity-50 mt-1"
            }, `Tecla: ${index + 1}`)
        ]);
    }));
};

// COMPONENTE: ESTADÍSTICAS EN TIEMPO REAL
const LiveStats = ({ gameState }) => {
    if (!gameState.gameState.isPlaying || gameState.gameState.gameOver) return null;
    
    return React.createElement('div', {
        className: "glass-panel p-4 mb-6"
    }, React.createElement('div', {
        className: "stats-grid"
    }, [
        React.createElement('div', {
            key: 'score',
            className: "stat-item"
        }, [
            React.createElement('div', {
                key: 'value',
                className: "text-2xl font-bold text-green-400"
            }, gameState.stats.score),
            React.createElement('div', {
                key: 'label',
                className: "text-xs text-gray-300"
            }, 'Puntos')
        ]),
        
        React.createElement('div', {
            key: 'level',
            className: "stat-item"
        }, [
            React.createElement('div', {
                key: 'value',
                className: "text-2xl font-bold text-blue-400"
            }, gameState.stats.level),
            React.createElement('div', {
                key: 'label',
                className: "text-xs text-gray-300"
            }, 'Nivel')
        ]),
        
        React.createElement('div', {
            key: 'streak',
            className: "stat-item"
        }, [
            React.createElement('div', {
                key: 'value',
                className: "text-2xl font-bold text-yellow-400"
            }, gameState.stats.streak),
            React.createElement('div', {
                key: 'label',
                className: "text-xs text-gray-300"
            }, 'Racha Actual')
        ]),
        
        React.createElement('div', {
            key: 'speed',
            className: "stat-item"
        }, [
            React.createElement('div', {
                key: 'value',
                className: "text-2xl font-bold text-purple-400"
            }, `${Math.round(gameState.config.fallSpeed / 1000)}s`),
            React.createElement('div', {
                key: 'label',
                className: "text-xs text-gray-300"
            }, 'Velocidad')
        ])
    ]));
};

// COMPONENTE: GAME OVER
const GameOverScreen = ({ gameState, onStartGame }) => {
    if (!gameState.gameState.gameOver) return null;
    
    const grade = gameState.finalGrade;
    
    return React.createElement('div', {
        className: "glass-panel p-8 text-center mb-6"
    }, [
        React.createElement('div', {
            key: 'emoji',
            className: "text-6xl mb-4"
        }, grade.emoji),
        
        React.createElement('h2', {
            key: 'title',
            className: "text-3xl font-bold mb-4"
        }, '🎮 GAME OVER'),
        
        React.createElement('div', {
            key: 'grade',
            className: `text-4xl font-bold mb-4 ${grade.color}`
        }, `Calificación: ${grade.grade}`),
        
        React.createElement('p', {
            key: 'message',
            className: "text-xl mb-6"
        }, grade.message),
        
        // Estadísticas finales
        React.createElement('div', {
            key: 'final-stats',
            className: "bg-white bg-opacity-10 rounded-lg p-6 mb-6"
        }, React.createElement('div', {
            className: "grid grid-cols-2 md:grid-cols-4 gap-4"
        }, [
            React.createElement('div', {
                key: 'final-score'
            }, [
                React.createElement('div', {
                    key: 'value',
                    className: "text-2xl font-bold text-green-400"
                }, gameState.stats.score),
                React.createElement('div', {
                    key: 'label',
                    className: "text-sm"
                }, 'Puntuación Final')
            ]),
            
            React.createElement('div', {
                key: 'final-level'
            }, [
                React.createElement('div', {
                    key: 'value',
                    className: "text-2xl font-bold text-blue-400"
                }, gameState.stats.level),
                React.createElement('div', {
                    key: 'label',
                    className: "text-sm"
                }, 'Nivel Alcanzado')
            ]),
            
            React.createElement('div', {
                key: 'best-streak'
            }, [
                React.createElement('div', {
                    key: 'value',
                    className: "text-2xl font-bold text-purple-400"
                }, gameState.stats.bestStreak),
                React.createElement('div', {
                    key: 'label',
                    className: "text-sm"
                }, 'Mejor Racha')
            ]),
            
            React.createElement('div', {
                key: 'accuracy'
            }, [
                React.createElement('div', {
                    key: 'value',
                    className: "text-2xl font-bold text-yellow-400"
                }, `${gameState.stats.totalAttempts > 0 ? Math.round((gameState.stats.correctAnswers / gameState.stats.totalAttempts) * 100) : 0}%`),
                React.createElement('div', {
                    key: 'label',
                    className: "text-sm"
                }, 'Precisión')
            ])
        ])),
        
        React.createElement('button', {
            key: 'play-again',
            onClick: onStartGame,
            className: "px-8 py-4 btn-primary rounded-lg text-xl font-bold"
        }, '🚀 JUGAR DE NUEVO')
    ]);
};

// COMPONENTE: INSTRUCCIONES
const Instructions = ({ gameState }) => {
    if (gameState.gameState.isPlaying || gameState.gameState.gameOver) return null;
    
    return React.createElement('div', {
        className: "glass-panel p-6 mb-6"
    }, [
        React.createElement('h3', {
            key: 'title',
            className: "text-xl font-bold mb-4 text-center"
        }, '📚 CÓMO JUGAR'),
        
        React.createElement('div', {
            key: 'content',
            className: "grid md:grid-cols-2 gap-6"
        }, [
            React.createElement('div', {
                key: 'objective'
            }, [
                React.createElement('h4', {
                    key: 'title',
                    className: "font-bold mb-2 text-green-300"
                }, '🎯 Objetivo:'),
                React.createElement('ul', {
                    key: 'list',
                    className: "text-sm space-y-1 list-disc list-inside"
                }, [
                    React.createElement('li', { key: '1' }, 'Los elementos contables caen desde arriba'),
                    React.createElement('li', { key: '2' }, 'Muévelos con teclado o ratón'),
                    React.createElement('li', { key: '3' }, 'Clasifícalos en la categoría correcta'),
                    React.createElement('li', { key: '4' }, '¡Consigue la mayor puntuación posible!')
                ])
            ]),
            
            React.createElement('div', {
                key: 'mechanics'
            }, [
                React.createElement('h4', {
                    key: 'title',
                    className: "font-bold mb-2 text-blue-300"
                }, '⚡ Mecánicas:'),
                React.createElement('ul', {
                    key: 'list',
                    className: "text-sm space-y-1 list-disc list-inside"
                }, [
                    React.createElement('li', { key: '1' }, 'Tienes 3 vidas al comenzar'),
                    React.createElement('li', { key: '2' }, 'Cada nivel aumenta la velocidad'),
                    React.createElement('li', { key: '3' }, 'Las rachas te dan puntos bonus'),
                    React.createElement('li', { key: '4' }, '¡La música clásica del Tetris te acompaña!')
                ])
            ])
        ]),
        
        React.createElement('div', {
            key: 'scoring',
            className: "mt-4 p-4 bg-white bg-opacity-10 rounded-lg"
        }, [
            React.createElement('h4', {
                key: 'title',
                className: "font-bold mb-2 text-yellow-300"
            }, '🏆 Sistema de Puntuación:'),
            React.createElement('div', {
                key: 'rules',
                className: "text-sm grid md:grid-cols-3 gap-2"
            }, [
                React.createElement('div', { key: '1' }, '• Respuesta correcta: 10 × Nivel'),
                React.createElement('div', { key: '2' }, '• Racha de 5+: Bonus extra'),
                React.createElement('div', { key: '3' }, '• Cada 150 puntos = Nuevo nivel')
            ])
        ])
    ]);
};

// COMPONENTE: CONTROLES DETALLADOS
const ControlsGuide = () => {
    return React.createElement('div', {
        className: "glass-panel p-4 mb-6"
    }, [
        React.createElement('h3', {
            key: 'title',
            className: "font-bold mb-3 text-center"
        }, '🎮 CONTROLES'),
        
        React.createElement('div', {
            key: 'controls',
            className: "grid grid-cols-2 md:grid-cols-6 gap-2 text-sm"
        }, [
            React.createElement('div', {
                key: 'left',
                className: "text-center p-2 bg-white bg-opacity-10 rounded"
            }, [
                React.createElement('div', {
                    key: 'key',
                    className: "font-bold"
                }, '← A'),
                React.createElement('div', {
                    key: 'action',
                    className: "text-xs opacity-75"
                }, 'Mover Izq.')
            ]),
            
            React.createElement('div', {
                key: 'right',
                className: "text-center p-2 bg-white bg-opacity-10 rounded"
            }, [
                React.createElement('div', {
                    key: 'key',
                    className: "font-bold"
                }, 'D →'),
                React.createElement('div', {
                    key: 'action',
                    className: "text-xs opacity-75"
                }, 'Mover Der.')
            ]),
            
            React.createElement('div', {
                key: 'drag',
                className: "text-center p-2 bg-white bg-opacity-10 rounded"
            }, [
                React.createElement('div', {
                    key: 'key',
                    className: "font-bold"
                }, '🖱️'),
                React.createElement('div', {
                    key: 'action',
                    className: "text-xs opacity-75"
                }, 'Arrastrar')
            ]),
            
            React.createElement('div', {
                key: 'classify',
                className: "text-center p-2 bg-white bg-opacity-10 rounded"
            }, [
                React.createElement('div', {
                    key: 'key',
                    className: "font-bold"
                }, '1-5'),
                React.createElement('div', {
                    key: 'action',
                    className: "text-xs opacity-75"
                }, 'Clasificar')
            ]),
            
            React.createElement('div', {
                key: 'pause',
                className: "text-center p-2 bg-white bg-opacity-10 rounded"
            }, [
                React.createElement('div', {
                    key: 'key',
                    className: "font-bold"
                }, 'ESPACIO'),
                React.createElement('div', {
                    key: 'action',
                    className: "text-xs opacity-75"
                }, 'Pausa')
            ]),
            
            React.createElement('div', {
                key: 'audio',
                className: "text-center p-2 bg-white bg-opacity-10 rounded"
            }, [
                React.createElement('div', {
                    key: 'key',
                    className: "font-bold"
                }, 'M / S'),
                React.createElement('div', {
                    key: 'action',
                    className: "text-xs opacity-75"
                }, 'Audio')
            ])
        ])
    ]);
};

// COMPONENTE: REFERENCIA DE CATEGORÍAS
const CategoriesReference = ({ gameState }) => {
    if (gameState.gameState.isPlaying || gameState.gameState.gameOver) return null;
    
    return React.createElement('div', {
        className: "glass-panel p-6 mb-6"
    }, [
        React.createElement('h3', {
            key: 'title',
            className: "text-xl font-bold mb-4 text-center"
        }, '📊 CATEGORÍAS DEL BALANCE'),
        
        React.createElement('div', {
            key: 'categories',
            className: "grid md:grid-cols-5 gap-4 text-xs"
        }, Object.entries(CATEGORIES).map(([key, category], index) => 
            React.createElement('div', {
                key: key,
                className: `${category.color} ${category.textColor} p-3 rounded-lg`
            }, [
                React.createElement('div', {
                    key: 'name',
                    className: "font-bold mb-1"
                }, `${index + 1}. ${category.name}`),
                React.createElement('div', {
                    key: 'description',
                    className: "text-xs opacity-75"
                }, category.description),
                React.createElement('div', {
                    key: 'examples',
                    className: "text-xs opacity-60 mt-1 font-mono"
                }, category.examples)
            ])
        ))
    ]);
};

// COMPONENTE: FOOTER
const Footer = () => {
    return React.createElement('div', {
        className: "text-center text-white text-opacity-60 text-sm mt-8"
    }, [
        React.createElement('p', {
            key: 'main',
            className: "mb-2"
        }, [
            React.createElement('span', { key: 'icon' }, '🎓 '),
            React.createElement('strong', { key: 'title' }, 'Tetris Balance'),
            React.createElement('span', { key: 'desc' }, ' - Herramienta educativa para Bachillerato')
        ]),
        React.createElement('p', {
            key: 'features'
        }, '🎵 Con la música clásica del Tetris • 📱 Compatible móvil y PC • 🆓 Totalmente gratuito')
    ]);
};

// COMPONENTE PRINCIPAL DE LA APLICACIÓN
const TetrisBalanceApp = () => {
    // Estados de React
    const [gameState, setGameState] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    
    // Referencias
    const gameAreaRef = useRef(null);
    const gameInstanceRef = useRef(null);
    const updateIntervalRef = useRef(null);
    
    // Inicializar juego
    useEffect(() => {
        console.log('🚀 Inicializando aplicación React...');
        
        // Obtener o crear instancia del juego
        gameInstanceRef.current = getGameInstance();
        
        // Configurar referencia del área de juego
        gameInstanceRef.current.refs.gameAreaRef = gameAreaRef.current;
        
        // Configurar actualización periódica del estado
        updateIntervalRef.current = setInterval(() => {
            if (gameInstanceRef.current) {
                const currentState = gameInstanceRef.current.getGameState();
                setGameState(currentState);
            }
        }, 100); // Actualizar cada 100ms
        
        // Actualización inicial
        const initialState = gameInstanceRef.current.getGameState();
        setGameState(initialState);
        
        return () => {
            if (updateIntervalRef.current) {
                clearInterval(updateIntervalRef.current);
            }
        };
    }, []);
    
    // Actualizar referencia del área de juego cuando cambie
    useEffect(() => {
        if (gameInstanceRef.current && gameAreaRef.current) {
            gameInstanceRef.current.refs.gameAreaRef = gameAreaRef.current;
        }
    }, [gameAreaRef.current]);
    
    // Funciones de control del juego
    const handleStartGame = useCallback(() => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.startGame();
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    const handleTogglePause = useCallback(() => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.togglePause();
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    const handleResetGame = useCallback(() => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.resetGame();
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    const handleToggleMusic = useCallback(() => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.toggleMusic();
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    const handleToggleSoundEffects = useCallback(() => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.toggleSoundEffects();
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    const handleCategoryDrop = useCallback((category) => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.handleCategoryDrop(category);
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    const handleMouseDown = useCallback((e) => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.handleMouseDown(e);
            setUpdateTrigger(prev => prev + 1);
        }
    }, []);
    
    // Mostrar loading si no hay estado
    if (!gameState) {
        return React.createElement('div', {
            className: "min-h-screen game-container flex items-center justify-center text-white"
        }, React.createElement('div', {
            className: "text-center"
        }, [
            React.createElement('div', {
                key: 'loading-icon',
                className: "text-6xl mb-4"
            }, '🧩'),
            React.createElement('div', {
                key: 'loading-text',
                className: "text-xl"
            }, 'Cargando Tetris Balance...')
        ]));
    }
    
    // Render principal
    return React.createElement('div', {
        className: "min-h-screen game-container p-4 text-white"
    }, React.createElement('div', {
        className: "max-w-6xl mx-auto"
    }, [
        // Header
        React.createElement(GameHeader, { key: 'header' }),
        
        // Panel de control
        React.createElement(ControlPanel, {
            key: 'control-panel',
            gameState: gameState,
            onStartGame: handleStartGame,
            onTogglePause: handleTogglePause,
            onResetGame: handleResetGame,
            onToggleMusic: handleToggleMusic,
            onToggleSoundEffects: handleToggleSoundEffects
        }),
        
        // Área de juego
        React.createElement(GameArea, {
            key: 'game-area',
            gameState: gameState,
            gameAreaRef: gameAreaRef,
            onMouseDown: handleMouseDown
        }),
        
        // Mensaje de pausa
        React.createElement(PauseMessage, {
            key: 'pause-message',
            isPaused: gameState.gameState.isPaused
        }),
        
        // Feedback
        React.createElement(FeedbackPanel, {
            key: 'feedback',
            gameState: gameState
        }),
        
        // Categorías
        React.createElement(CategoriesGrid, {
            key: 'categories',
            gameState: gameState,
            onCategoryDrop: handleCategoryDrop
        }),
        
        // Estadísticas en vivo
        React.createElement(LiveStats, {
            key: 'live-stats',
            gameState: gameState
        }),
        
        // Game Over
        React.createElement(GameOverScreen, {
            key: 'game-over',
            gameState: gameState,
            onStartGame: handleStartGame
        }),
        
        // Guía de controles
        React.createElement(ControlsGuide, { key: 'controls-guide' }),
        
        // Instrucciones
        React.createElement(Instructions, {
            key: 'instructions',
            gameState: gameState
        }),
        
        // Referencia de categorías
        React.createElement(CategoriesReference, {
            key: 'categories-ref',
            gameState: gameState
        }),
        
        // Footer
        React.createElement(Footer, { key: 'footer' })
    ]));
};

// RENDERIZAR LA APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 Iniciando Tetris Balance...');
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(TetrisBalanceApp));
    
    console.log('✅ Aplicación renderizada correctamente');
});

// EXPORTAR (para uso con módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TetrisBalanceApp,
        Icons
    };
}