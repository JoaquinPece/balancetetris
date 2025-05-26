// CONFIGURACIÓN PRINCIPAL DEL TETRIS BALANCE

// Configuración del juego
const GAME_CONFIG = {
    // Velocidades (en milisegundos)
    INITIAL_FALL_SPEED: 8000,        // 8 segundos iniciales
    MIN_FALL_SPEED: 3000,            // Velocidad mínima (3 segundos)
    SPEED_DECREASE_PER_LEVEL: 800,   // Reduce 0.8s por nivel
    
    // Puntuación
    BASE_POINTS: 10,                 // Puntos base por acierto
    STREAK_BONUS_THRESHOLD: 5,       // A partir de qué racha dar bonus
    STREAK_BONUS_MULTIPLIER: 10,     // Multiplicador del bonus por racha
    LEVEL_UP_POINTS: 150,            // Puntos necesarios por nivel
    
    // Vidas y tiempo
    INITIAL_LIVES: 3,
    FEEDBACK_DURATION: 3000,         // 3 segundos de feedback
    
    // Posicionamiento
    MIN_ELEMENT_POSITION: 15,        // 15% del ancho mínimo
    MAX_ELEMENT_POSITION: 85,        // 85% del ancho máximo
    MOVEMENT_STEP: 12,               // Paso de movimiento (12%)
    
    // Temporizadores
    TIMER_INTERVAL: 100,             // Actualización cada 100ms
    MUSIC_DELAY: 1000,               // Delay inicial de música
    MUSIC_REPEAT_INTERVAL: 18000     // Repetir música cada 18s
};

// ELEMENTOS DEL BALANCE (30 elementos educativos)
const BALANCE_ELEMENTS = [
    // ACTIVO CORRIENTE (bienes que se convierten en dinero < 1 año)
    { 
        name: 'Existencias', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '📦',
        tip: 'Mercaderías, materias primas y productos que la empresa tiene para vender'
    },
    { 
        name: 'Clientes', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '👥',
        tip: 'Personas o empresas que nos deben dinero por ventas a crédito'
    },
    { 
        name: 'Bancos', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '🏛️',
        tip: 'Dinero que tenemos depositado en cuentas bancarias'
    },
    { 
        name: 'Caja', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '💵',
        tip: 'Dinero en efectivo que tiene la empresa'
    },
    { 
        name: 'IVA Soportado', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '📊',
        tip: 'IVA que hemos pagado en nuestras compras y podemos recuperar'
    },
    { 
        name: 'Deudores', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '👤',
        tip: 'Personas que nos deben dinero por conceptos distintos a las ventas'
    },
    { 
        name: 'H.P. Deudora', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '🏛️',
        tip: 'Hacienda Pública nos debe dinero (devoluciones, subvenciones)'
    },
    { 
        name: 'Efectos a Cobrar', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '📋',
        tip: 'Letras de cambio y pagarés que tenemos pendientes de cobro'
    },
    { 
        name: 'Inversiones Financieras C/P', 
        category: 'activo-corriente', 
        color: 'bg-green-400', 
        icon: '💹',
        tip: 'Inversiones que podemos convertir en dinero en menos de un año'
    },

    // ACTIVO NO CORRIENTE (bienes permanentes > 1 año)
    { 
        name: 'Inmovilizado Material', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '🏢',
        tip: 'Bienes físicos que duran más de un año: edificios, maquinaria, etc.'
    },
    { 
        name: 'Terrenos', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '🏞️',
        tip: 'Solares y terrenos propiedad de la empresa'
    },
    { 
        name: 'Construcciones', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '🏗️',
        tip: 'Edificios, naves industriales y otras construcciones'
    },
    { 
        name: 'Maquinaria', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '⚙️',
        tip: 'Máquinas y equipos de producción de la empresa'
    },
    { 
        name: 'Mobiliario', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '🪑',
        tip: 'Muebles y enseres de oficina que duran varios años'
    },
    { 
        name: 'Equipos Informáticos', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '💻',
        tip: 'Ordenadores y equipos tecnológicos de uso prolongado'
    },
    { 
        name: 'Elementos de Transporte', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '🚛',
        tip: 'Vehículos y medios de transporte de la empresa'
    },
    { 
        name: 'Inversiones Financieras L/P', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-400', 
        icon: '📈',
        tip: 'Inversiones que mantendremos más de un año'
    },
    { 
        name: 'Amortización Acumulada', 
        category: 'activo-no-corriente', 
        color: 'bg-blue-300', 
        icon: '📉',
        tip: 'Pérdida de valor acumulada del inmovilizado (resta al activo)'
    },

    // PASIVO CORRIENTE (deudas < 1 año)
    { 
        name: 'Proveedores', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '🏪',
        tip: 'Dinero que debemos a proveedores por compras a crédito'
    },
    { 
        name: 'Préstamos C/P', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '📄',
        tip: 'Préstamos y deudas que debemos pagar en menos de un año'
    },
    { 
        name: 'Acreedores', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '💳',
        tip: 'Deudas con terceros por servicios recibidos'
    },
    { 
        name: 'IVA Repercutido', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '📈',
        tip: 'IVA que hemos cobrado en ventas y debemos entregar a Hacienda'
    },
    { 
        name: 'H.P. Acreedora', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '🏛️',
        tip: 'Dinero que debemos a Hacienda Pública (impuestos pendientes)'
    },
    { 
        name: 'Anticipos de Clientes', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '💸',
        tip: 'Dinero que nos han pagado los clientes por adelantado'
    },
    { 
        name: 'Efectos a Pagar', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '📋',
        tip: 'Letras de cambio y pagarés que debemos pagar'
    },
    { 
        name: 'Sueldos Pendientes', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '👷',
        tip: 'Salarios devengados pero aún no pagados a los trabajadores'
    },
    { 
        name: 'Seguridad Social Acreedora', 
        category: 'pasivo-corriente', 
        color: 'bg-red-400', 
        icon: '🏥',
        tip: 'Cotizaciones a la Seguridad Social pendientes de pago'
    },

    // PASIVO NO CORRIENTE (deudas > 1 año)
    { 
        name: 'Préstamos L/P', 
        category: 'pasivo-no-corriente', 
        color: 'bg-orange-400', 
        icon: '📋',
        tip: 'Préstamos y deudas con vencimiento superior a un año'
    },
    { 
        name: 'Deudas L/P', 
        category: 'pasivo-no-corriente', 
        color: 'bg-orange-400', 
        icon: '📜',
        tip: 'Otras deudas a largo plazo con terceros'
    },

    // FONDOS PROPIOS (recursos propios de la empresa)
    { 
        name: 'Capital Social', 
        category: 'fondos-propios', 
        color: 'bg-purple-400', 
        icon: '💰',
        tip: 'Dinero que han aportado los socios o accionistas'
    },
    { 
        name: 'Reservas', 
        category: 'fondos-propios', 
        color: 'bg-purple-400', 
        icon: '🏦',
        tip: 'Beneficios de años anteriores que se quedaron en la empresa'
    },
    { 
        name: 'Resultado del Ejercicio', 
        category: 'fondos-propios', 
        color: 'bg-purple-400', 
        icon: '📊',
        tip: 'Beneficio o pérdida obtenida durante el año actual'
    }
];

// CATEGORÍAS DEL BALANCE
const CATEGORIES = {
    'activo-corriente': { 
        name: 'Activo Corriente',
        shortName: 'A.C.',
        color: 'bg-green-100 border-green-400', 
        textColor: 'text-green-800',
        description: 'Bienes y derechos que se convierten en dinero en menos de un año',
        examples: 'Existencias, Clientes, Bancos, Caja...'
    },
    'activo-no-corriente': { 
        name: 'Activo No Corriente',
        shortName: 'A.N.C.',
        color: 'bg-blue-100 border-blue-400', 
        textColor: 'text-blue-800',
        description: 'Bienes y derechos de carácter permanente (más de un año)',
        examples: 'Terrenos, Construcciones, Maquinaria...'
    },
    'pasivo-corriente': { 
        name: 'Pasivo Corriente',
        shortName: 'P.C.',
        color: 'bg-red-100 border-red-400', 
        textColor: 'text-red-800',
        description: 'Deudas y obligaciones con vencimiento inferior a un año',
        examples: 'Proveedores, Préstamos C/P, Acreedores...'
    },
    'pasivo-no-corriente': { 
        name: 'Pasivo No Corriente',
        shortName: 'P.N.C.',
        color: 'bg-orange-100 border-orange-400', 
        textColor: 'text-orange-800',
        description: 'Deudas y obligaciones con vencimiento superior a un año',
        examples: 'Préstamos L/P, Deudas L/P...'
    },
    'fondos-propios': { 
        name: 'Fondos Propios',
        shortName: 'F.P.',
        color: 'bg-purple-100 border-purple-400', 
        textColor: 'text-purple-800',
        description: 'Recursos propios de la empresa (capital y reservas)',
        examples: 'Capital Social, Reservas, Resultado...'
    }
};

// CONFIGURACIÓN DE CALIFICACIONES
const GRADING_SYSTEM = {
    'S': { 
        minScore: 500, 
        message: '¡Maestro del Balance!', 
        color: 'text-yellow-400', 
        emoji: '👑',
        description: 'Conocimiento excepcional de contabilidad'
    },
    'A+': { 
        minScore: 350, 
        message: '¡Excelente dominio!', 
        color: 'text-green-400', 
        emoji: '🏆',
        description: 'Dominas perfectamente el balance'
    },
    'A': { 
        minScore: 250, 
        message: '¡Muy buen trabajo!', 
        color: 'text-green-300', 
        emoji: '⭐',
        description: 'Tienes un gran conocimiento'
    },
    'B+': { 
        minScore: 180, 
        message: 'Buen desempeño', 
        color: 'text-blue-400', 
        emoji: '👍',
        description: 'Vas por buen camino'
    },
    'B': { 
        minScore: 120, 
        message: 'Progreso adecuado', 
        color: 'text-blue-300', 
        emoji: '📚',
        description: 'Sigue practicando así'
    },
    'C': { 
        minScore: 70, 
        message: 'Necesitas más práctica', 
        color: 'text-yellow-300', 
        emoji: '📖',
        description: 'Repasa los conceptos básicos'
    },
    'D': { 
        minScore: 0, 
        message: 'Sigue intentando', 
        color: 'text-red-300', 
        emoji: '💪',
        description: 'No te rindas, practica más'
    }
};

// MENSAJES MOTIVACIONALES
const MOTIVATIONAL_MESSAGES = {
    firstCorrect: ['¡Buen comienzo!', '¡Así se hace!', '¡Perfecto!'],
    streak3: ['¡Vas bien!', '¡Sigue así!', '¡Excelente!'],
    streak5: ['¡Racha fantástica!', '🔥 ¡Imparable!', '¡Increíble dominio!'],
    streak10: ['🚀 ¡LEYENDA!', '👑 ¡MAESTRO!', '🏆 ¡FENÓMENO!'],
    levelUp: ['🎉 ¡Nivel superado!', '⬆️ ¡Subiendo de nivel!', '🌟 ¡Progreso!'],
    almostGameOver: ['¡Cuidado!', '⚠️ ¡Última oportunidad!', '💪 ¡Tú puedes!']
};

// EXPORTAR (para uso con módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_CONFIG,
        BALANCE_ELEMENTS,
        CATEGORIES,
        GRADING_SYSTEM,
        MOTIVATIONAL_MESSAGES
    };
}