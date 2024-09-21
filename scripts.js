// Definir los sonidos de acierto y error
const successSound = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-27736/zapsplat_multimedia_game_sound_correct_positive_001_28778.mp3');
const errorSound = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-27736/zapsplat_multimedia_game_sound_wrong_error_001_28860.mp3');

// Función para reproducir sonido de acierto
function playSuccessSound() {
    successSound.play();
}

// Función para reproducir sonido de error
function playErrorSound() {
    errorSound.play();
}






document.addEventListener('DOMContentLoaded', () => {
    // --- Inicialización del temporizador ---
    let time = parseInt(localStorage.getItem('escapeTimer')) || 3600; // 60 minutos en segundos
    let interval;
    let isPaused = false;

    // --- Actualización del temporizador ---
    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeElement = document.getElementById('time');
        if (timeElement) {
            timeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        if (!isPaused && time > 0) {
            time--;
            localStorage.setItem('escapeTimer', time);
        }

        if (time <= 0) {
            clearInterval(interval);
            const resultMessage = document.getElementById('result-message');
            if (resultMessage) {
                resultMessage.textContent = "¡El tiempo ha terminado!";
            }
            document.body.classList.add('game-over');
        }
    }

    // --- Inicio del temporizador ---
    function startTimer() {
        interval = setInterval(updateTimer, 1000);
    }

    // --- Botón de pausa ---
    const pauseButton = document.getElementById('pause-button');
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseButton.textContent = isPaused ? 'Reanudar' : 'Pausar';
        });
    }

    // --- Botón de reinicio ---
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            clearInterval(interval);
            time = 3600; // Reinicia a 60 minutos
            localStorage.removeItem('escapeTimer');
            startTimer();
            const resultMessage = document.getElementById('result-message');
            if (resultMessage) {
                resultMessage.textContent = "";
            }
        });
    }

    // Iniciar temporizador al cargar
    startTimer();

    // --- Efecto de partículas flotantes en la introducción ---
    const particles = 30; // Número de partículas
    const container = document.querySelector('body');

    for (let i = 0; i < particles; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.width = `${Math.random() * 4 + 2}px`;
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
});


// --- Botón "Comenzar la Aventura" ---
const startButton = document.getElementById('start-button');
if (startButton) {
    startButton.addEventListener('click', function () {
        window.location.href = 'chapter1.html';
    });
}


// 1

document.addEventListener('DOMContentLoaded', () => {
    const bottles = document.querySelectorAll('.bottle');
    let selectedBottles = [];

    // Crear el contenedor para la animación de éxito
    const successAnimation = document.createElement('div');
    successAnimation.id = 'success-animation';

    // Crear humo, luces y burbujas para la animación
    for (let i = 0; i < 4; i++) {
        const smoke = document.createElement('div');
        smoke.classList.add('smoke');
        successAnimation.appendChild(smoke);
    }

    const flashLight = document.createElement('div');
    flashLight.classList.add('flash-light');
    successAnimation.appendChild(flashLight);

    for (let i = 0; i < 5; i++) {
        const bubbleSmall = document.createElement('div');
        bubbleSmall.classList.add('bubble-small');
        successAnimation.appendChild(bubbleSmall);
    }

    document.body.appendChild(successAnimation);

    // Función para manejar la selección de botellas
    function selectBottle(bottle) {
        if (selectedBottles.length >= 3 && !selectedBottles.includes(bottle)) return;

        if (selectedBottles.includes(bottle)) {
            bottle.classList.remove('selected');
            selectedBottles = selectedBottles.filter(b => b !== bottle);
        } else {
            bottle.classList.add('selected');
            selectedBottles.push(bottle);
        }

        if (selectedBottles.length === 3) {
            checkSolution();
        }
    }



    // Verificar si la selección es correcta
    const correctBottles = ['bottle-naranja', 'bottle-amarillo', 'bottle-verde'];

    function checkSolution() {
        const selectedIds = selectedBottles.map(bottle => bottle.id);

        if (selectedIds.sort().toString() === correctBottles.sort().toString()) {
            successAnimation.style.display = 'block';

            setTimeout(() => {
                successAnimation.style.display = 'none';
                window.location.href = 'chapter3.html';  // Redirigir al siguiente capítulo
            }, 4000);
        } else {
            selectedBottles.forEach(bottle => {
                bottle.classList.add('error');
            });

            setTimeout(resetSelection, 1000);
        }
    }

    // Función para reiniciar la selección
    function resetSelection() {
        selectedBottles.forEach(bottle => {
            bottle.classList.remove('selected', 'error');
        });
        selectedBottles = [];
    }

    // Asegurarse de que solo se agreguen eventos si hay botellas
    if (bottles.length > 0) {
        bottles.forEach(bottle => {
            bottle.addEventListener('click', () => {
                selectBottle(bottle);
            });
        });
    }
});



// --- Chapter 2: Interruptores ---
const switches = document.querySelectorAll('.switch');
const correctOrder = [0, 2, 3, 1];
let switchOrder = [];




switches.forEach((switchElement, index) => {
    switchElement.addEventListener('click', function () {
        if (!switchElement.classList.contains('up')) {
            switchElement.classList.add('up');
            switchOrder.push(index);

            if (switchOrder.length === correctOrder.length) {
                validateSwitchOrder();
            }
        }
    });
});

function validateSwitchOrder() {
    const resultMessage = document.getElementById('result-message');
    if (switchOrder.every((val, index) => val === correctOrder[index])) {
        document.body.classList.add('light-on');
        resultMessage.textContent = "";
        setTimeout(() => {
            window.location.href = 'chapter2.html';
        }, 2000);
    } else {
        shakeScreen();
        resetSwitches();
        resultMessage.textContent = "";
    }
}

function shakeScreen() {
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
}

function resetSwitches() {
    switches.forEach(switchElement => switchElement.classList.remove('up'));
    switchOrder = [];
}


// --- Chapter 3: Código de letras ---
let enteredCode = [];
const correctCode = ['C', 'U', 'R', 'E'];

function updateDisplay() {
    const display = document.getElementById('code-display');
    if (display) {
        display.textContent = enteredCode.join('') || '****';
    }
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const letter = key.dataset.letter;
        if (enteredCode.length < 4) {
            enteredCode.push(letter);
            updateDisplay();
        }
    });
});

const validateButton2 = document.getElementById('validate-button');
if (validateButton2) {
    validateButton2.addEventListener('click', () => {
        const resultMessage = document.getElementById('result-message');
        if (enteredCode.join('') === correctCode.join('')) {
            resultMessage.textContent = "¡Correcto!";
            setTimeout(() => {
                window.location.href = 'chapter4.html';
            }, 2000);
        } else {
            resultMessage.textContent = "ERROR. Intenta de nuevo.";
            enteredCode = [];
            updateDisplay();
        }
    });
}
// --- Chapter 4: Manejo de botones de opciones ---
document.addEventListener('DOMContentLoaded', () => {
    let time = parseInt(localStorage.getItem('escapeTimer')) || 3600; // 60 minutos en segundos
    let interval;

    // Función para actualizar el temporizador
    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const timeElement = document.getElementById('time');
        if (timeElement) {
            timeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        if (time > 0) {
            time--;
            localStorage.setItem('escapeTimer', time);
        }

        if (time <= 0) {
            clearInterval(interval);
            const resultMessage = document.getElementById('result-message');
            if (resultMessage) {
                resultMessage.textContent = "¡El tiempo ha terminado!";
            }
        }
    }

    // Iniciar el temporizador
    function startTimer() {
        interval = setInterval(updateTimer, 1000);
    }

    startTimer();

    // Función para mostrar la animación de la taquilla
    function openLockerAnimation() {
        const locker = document.getElementById('locker-animation');
        locker.style.display = 'flex'; // Mostrar la taquilla
        setTimeout(() => {
            locker.classList.add('open'); // Iniciar la animación de apertura de la puerta
        }, 100); // Pequeño retraso para asegurarse de que la taquilla aparezca antes de animar

        setTimeout(() => {
            locker.style.display = 'none'; // Ocultar la taquilla después de abrirla
        }, 2000); // Esperar 2 segundos antes de ocultar la taquilla
    }

    // Función para mostrar el efecto de humo
    function showFullScreenSmoke() {
        const smokeEffect = document.getElementById('smoke-effect');
        smokeEffect.style.display = 'flex';  // Mostrar el efecto de humo

        setTimeout(() => {
            smokeEffect.style.display = 'none';  // Ocultar el efecto de humo después de 5 segundos
        }, 5000);
    }

    // Función para restar 10 minutos (600 segundos) al tiempo
    function deductTime() {
        time = Math.max(0, time - 600); // Restar 600 segundos (10 minutos), sin que sea negativo
        localStorage.setItem('escapeTimer', time); // Guardar el nuevo tiempo en el almacenamiento local
    }

    // Manejo de opciones de selección
    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isCorrect = button.dataset.correct === 'true';

            if (isCorrect) {
                openLockerAnimation(); // Abrir la taquilla si la respuesta es correcta
                setTimeout(() => {
                    window.location.href = 'chapter5.html'; // Avanzar al siguiente capítulo
                }, 2000); // Dar tiempo para que la animación termine
            } else {
                showFullScreenSmoke(); // Mostrar el efecto de humo si la respuesta es incorrecta
                deductTime(); // Restar 10 minutos si la respuesta es incorrecta
            }
        });
    });
});


  // --- Chapter 5: Diales ---
    const correctDial1 = 7;
    const correctDial2 = 7;
    const dial1 = document.getElementById('dial1');
    const dial2 = document.getElementById('dial2');
    let dial1Value = 0;
    let dial2Value = 0;

    function rotateDial1(value) {
    dial1Value = value;
    dial1.style.transform = `rotate(${value * -18}deg)`; // Valor negativo para sentido antihorario
    checkCombination();
}

function rotateDial2(value) {
    dial2Value = value;
    dial2.style.transform = `rotate(${value * -18}deg)`; // Valor negativo para sentido antihorario
    checkCombination();
}

    dial1?.addEventListener('click', () => {
        dial1Value = (dial1Value + 1) % 20;
        rotateDial1(dial1Value);
    });

    dial2?.addEventListener('click', () => {
        dial2Value = (dial2Value + 1) % 20;
        rotateDial2(dial2Value);
    });

    function checkCombination() {
        const resultMessage = document.getElementById('result-message');
        if (dial1Value === correctDial1 && dial2Value === correctDial2) {
            resultMessage.textContent = "¡Correcto!";
            resultMessage.style.color = "#27ae60"; // Verde para correcto
            document.body.classList.add('light-on'); // Efecto de luz verde

            setTimeout(() => {
                window.location.href = 'chapter6.html'; // Redirigir al siguiente capítulo
            }, 1500);
        } else {
            resultMessage.textContent = "";
            resultMessage.style.color = "#e74c3c"; // Rojo para indicar que no está en la posición correcta
        }
    }

// --- Chapter 6: Escritura con Pluma ---
const textInput = document.getElementById('text-input');
const validateButton6 = document.getElementById('validate-button');
const resultMessage6 = document.getElementById('result-message');
const successAnimation = document.createElement('div');
successAnimation.id = 'chapter6-success-animation';

// Función para crear la animación de éxito
function createSuccessAnimation() {
    // Añadimos varias partículas de éxito que se expanden
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle-effect');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        successAnimation.appendChild(particle);
    }

    // Añadimos el destello central de luz
    const flash = document.createElement('div');
    flash.classList.add('flash-effect');
    flash.style.left = 'calc(50% - 75px)'; // Centrar
    flash.style.top = 'calc(50% - 75px)';  // Centrar
    successAnimation.appendChild(flash);

    document.body.appendChild(successAnimation);
}

// Definir la frase correcta
const correctPhrase = "move the locker"; // Frase correcta

// Validar la frase ingresada
if (validateButton6) {
    validateButton6.addEventListener('click', () => {
        const enteredText = textInput.value.trim().toLowerCase(); // Convertimos a minúsculas

        if (enteredText === correctPhrase) {
            // Limpiamos cualquier mensaje previo
            resultMessage6.textContent = "";

            // Iniciamos la animación de éxito
            createSuccessAnimation();
            successAnimation.style.display = 'flex';

            // Detenemos la animación después de 3.5 segundos y redirigimos al siguiente capítulo
            setTimeout(() => {
                successAnimation.style.display = 'none';
                window.location.href = 'chapter7.html'; // Cambiar al siguiente capítulo
            }, 3500);

        } else {
            // Si la frase es incorrecta
            resultMessage6.textContent = "ERROR.";
            resultMessage6.style.color = "red";
            textInput.value = ''; // Reiniciar el campo de texto después de un error
        }
    });
}



    // --- Chapter 7: Código Numérico ---
  document.addEventListener('DOMContentLoaded', () => {
  const correctCode = ['A', 'C', 'I', 'D']; // Código correcto
  let enteredCode = [];
  let initialPositions = {}; // Almacena posiciones iniciales de las teclas

  // Seleccionamos todas las teclas
  const keys = document.querySelectorAll('.key');
  const slots = document.querySelectorAll('.slot');
  const resultMessage = document.getElementById('result-message');

  // Creamos el contenedor de la animación del ascensor
  const elevatorAnimation = document.createElement('div');
  elevatorAnimation.classList.add('elevator-animation');
  document.body.appendChild(elevatorAnimation);

  // Guardamos las posiciones iniciales de las teclas
  keys.forEach(key => {
    const rect = key.getBoundingClientRect();
    initialPositions[key.textContent] = { top: rect.top, left: rect.left };
  });

  // Manejamos el evento de click de las teclas
  keys.forEach((key, index) => {
    key.addEventListener('click', () => {
      if (enteredCode.length < 4) {
        // Movemos la tecla a la siguiente ranura disponible
        key.classList.add('moving');
        const slotRect = slots[enteredCode.length].getBoundingClientRect();
        const keyRect = key.getBoundingClientRect();

        // Calculamos la diferencia de posición para mover la tecla
        const translateX = slotRect.left - keyRect.left;
        const translateY = slotRect.top - keyRect.top;

        key.style.transform = `translate(${translateX}px, ${translateY}px)`;
        enteredCode.push(key.textContent);

        // Verificamos si ya se han ingresado 4 teclas
        if (enteredCode.length === 4) {
          checkCode();
        }
      }
    });
  });

  // Función para verificar si el código ingresado es correcto
  function checkCode() {
    if (JSON.stringify(enteredCode) === JSON.stringify(correctCode)) {
      resultMessage.textContent = ''; // Ocultar el mensaje

      // Iniciar la animación de descenso del ascensor
      elevatorAnimation.style.display = 'flex';
      elevatorAnimation.classList.add('elevator-moving', 'elevator-shaking'); // Añadimos la vibración

      // Después de 3 segundos, redirigir al siguiente capítulo
      setTimeout(() => {
        elevatorAnimation.classList.remove('elevator-shaking'); // Quitamos la vibración
        window.location.href = 'chapter8.html'; // Redirige al siguiente capítulo
      }, 3000);
    } else {
      resultMessage.textContent = 'ERROR';
      resultMessage.style.color = 'red';
      resetKeys();
    }
  }

  // Función para resetear las teclas a sus posiciones originales
  function resetKeys() {
    setTimeout(() => {
      keys.forEach(key => {
        key.style.transform = ''; // Reseteamos la posición
        key.classList.remove('moving');
      });
      enteredCode = [];
      resultMessage.textContent = ''; // Limpiamos el mensaje
    }, 1000);
  }
});




// --- Chapter 8: Selección de Letra, Imagen y Código Numérico ---
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('code-input');
    const numberButtons = document.querySelectorAll('.num-button');
    const clearButton = document.getElementById('clear');
    const submitButton = document.getElementById('submit-button');
    let selectedLetter = null;
    let selectedImage = null;

    // Crear los efectos visuales
    const portalEffect = document.createElement('div');
    portalEffect.classList.add('portal-effect');
    document.body.appendChild(portalEffect);

    const fadeToNext = document.createElement('div');
    fadeToNext.classList.add('fade-to-next');
    document.body.appendChild(fadeToNext);

    // Selección de letras
    const letters = document.querySelectorAll('.letter-choice');
    letters.forEach(letter => {
        letter.addEventListener('click', () => {
            letters.forEach(l => l.classList.remove('selected'));
            letter.classList.add('selected');
            selectedLetter = letter.dataset.value;
        });
    });

    // Selección de imágenes
    const images = document.querySelectorAll('.image-choice');
    images.forEach(image => {
        image.addEventListener('click', () => {
            images.forEach(img => img.classList.remove('selected'));
            image.classList.add('selected');
            selectedImage = image.dataset.value;
        });
    });

    // Botones numéricos
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (inputField.value.length < 3) {
                inputField.value += button.textContent;
            }
        });
    });

    // Limpiar el campo
    clearButton.addEventListener('click', () => {
        resetSelections();
    });

    // Comprobar el código al enviar
    submitButton.addEventListener('click', () => {
        const code = inputField.value;
        if (selectedLetter && selectedImage && code.length === 3) {
            checkSolution(selectedLetter, selectedImage, code);
        }
    });

    // Validación del código
    function checkSolution(letter, image, code) {
        const correctLetter = 'B'; // Letra correcta
        const correctImage = 'img2'; // Imagen correcta
        const correctCode = '348'; // Código numérico correcto

        if (letter === correctLetter && image === correctImage && code === correctCode) {
            activatePortalEffect(); // Activar el portal
        } else {
            shakeScreen(); // Sacudir la pantalla si es incorrecto
            resetSelections(); // Reiniciar la selección
        }
    }

    // Efecto de activación del portal
    function activatePortalEffect() {
        portalEffect.style.display = 'block';
        portalEffect.classList.add('portal-activate');

        // Activar el desvanecimiento y redirigir a los créditos después de la animación
        setTimeout(() => {
            fadeToNext.style.display = 'block';
            fadeToNext.classList.add('fade-to-next');

            setTimeout(() => {
                window.location.href = 'chapter9.html'; // Redirigir a los créditos
            }, 3000); // 4 segundos después de la transición
        }, 2000); // 3 segundos para la animación del portal
    }

    // Función para sacudir la pantalla si es incorrecto
    function shakeScreen() {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 400); // Duración de la sacudida
    }

    // Reiniciar las selecciones
    function resetSelections() {
        inputField.value = '';
        letters.forEach(l => l.classList.remove('selected'));
        images.forEach(img => img.classList.remove('selected'));
        selectedLetter = null;
        selectedImage = null;
    }
});





document.addEventListener('DOMContentLoaded', () => {
    const hintButton = document.getElementById('hint-button');
    const hintModal = document.getElementById('hint-modal');
    const closeHint = document.getElementById('close-hint');
    const hintsList = document.getElementById('hints-list');
    const showNextHintButton = document.getElementById('show-next-hint');
    let currentHintIndex = 0;
    let currentLanguage = 'en'; // Idioma por defecto

    // Pistas para cada capítulo en diferentes idiomas
    const hintsByChapter = {
        chapter1: {
            es: [
                'Pista 1: Mira el patrón de los interruptores.',
                'Pista 2: Solo algunos deben estar arriba.',
                'Pista 3: Intenta un orden que mezcle los colores primarios.'
            ],
            en: [
                'Hint 1: Look at the pattern of the switches.',
                'Hint 2: Only some should be up.',
                'Hint 3: Try an order that mixes primary colors.'
            ]
        },
        chapter2: {
            es: [
                'Pista 1: Observa bien los colores.',
                'Pista 2: La combinación correcta tiene colores cálidos.',
                'Pista 3: Experimenta con las pociones naranjas y verdes.'
            ],
            en: [
                'Hint 1: Pay close attention to the colors.',
                'Hint 2: The correct combination has warm colors.',
                'Hint 3: Experiment with orange and green potions.'
            ]
        },
            chapter3: {
        es: [
            'Pista 1: El código está relacionado con la palabra CURA.',
            'Pista 2: Revisa las letras que has utilizado.',
            'Pista 3: A veces es mejor ir despacio.'
        ],
        en: [
            'Hint 1: The code is related to the word CURE.',
            'Hint 2: Check the letters you have used.',
            'Hint 3: Sometimes it is better to go slow.'
        ]
    },
    chapter4: {
        es: [
            'Pista 1: Recuerda que una opción está en el medio.',
            'Pista 2: Una de las imágenes te guiará a la solución.',
            'Pista 3: No tengas miedo de equivocarte y aprender.'
        ],
        en: [
            'Hint 1: Remember that one option is in the middle.',
            'Hint 2: One of the images will guide you to the solution.',
            'Hint 3: Do not be afraid to make mistakes and learn.'
        ]
    },
    chapter5: {
        es: [
            'Pista 1: Los diales tienen un patrón.',
            'Pista 2: No es necesario girar los diales rápidamente.',
            'Pista 3: Mantén la calma, los números te guiarán.'
        ],
        en: [
            'Hint 1: The dials have a pattern.',
            'Hint 2: You do not need to spin the dials quickly.',
            'Hint 3: Stay calm, the numbers will guide you.'
        ]
    },
    chapter6: {
        es: [
            'Pista 1: La frase correcta proviene de una famosa cita.',
            'Pista 2: Piensa en los antiguos científicos.',
            'Pista 3: Revisa las palabras clave, te ayudarán.'
        ],
        en: [
            'Hint 1: The correct phrase comes from a famous quote.',
            'Hint 2: Think of the ancient scientists.',
            'Hint 3: Review the keywords, they will help you.'
        ]
    },
    chapter7: {
        es: [
            'Pista 1: El orden de los números es clave.',
            'Pista 2: Cada tecla corresponde a una ranura.',
            'Pista 3: Piensa en la alineación correcta de los números.'
        ],
        en: [
            'Hint 1: The order of the numbers is key.',
            'Hint 2: Each key corresponds to a slot.',
            'Hint 3: Think of the correct alignment of the numbers.'
        ]
    },
    chapter8: {
        es: [
            'Pista 1: Observa detenidamente los símbolos.',
            'Pista 2: La secuencia tiene un patrón que se repite.',
            'Pista 3: Cada símbolo corresponde a una acción específica.'
        ],
        en: [
            'Hint 1: Carefully observe the symbols.',
            'Hint 2: The sequence has a repeating pattern.',
            'Hint 3: Each symbol corresponds to a specific action.'
        ]
    }
};
        // Añade más capítulos aquí...


    // Determinar el capítulo actual basado en la URL
    let currentChapter = 'chapter1'; // Cambia dinámicamente según el capítulo
    if (window.location.href.includes('chapter2')) {
        currentChapter = 'chapter2';
    } else if (window.location.href.includes('chapter3')) {
        currentChapter = 'chapter3';
    } else if (window.location.href.includes('chapter4')) {
        currentChapter = 'chapter4';
    } else if (window.location.href.includes('chapter5')) {
        currentChapter = 'chapter5';
    } else if (window.location.href.includes('chapter6')) {
        currentChapter = 'chapter6';
    } else if (window.location.href.includes('chapter7')) {
        currentChapter = 'chapter7';
    } else if (window.location.href.includes('chapter8')) {
        currentChapter = 'chapter8';
    }

    // --- Función para actualizar las pistas según el idioma ---
    function updateHints() {
        hintsList.innerHTML = ''; // Limpiar el contenido actual de las pistas

        // Verifica que existan pistas para el capítulo actual y el idioma
        if (hintsByChapter[currentChapter] && hintsByChapter[currentChapter][currentLanguage]) {
            hintsByChapter[currentChapter][currentLanguage].forEach(hint => {
                const listItem = document.createElement('li');
                listItem.textContent = hint;
                listItem.style.display = 'none'; // Ocultar las pistas al inicio
                hintsList.appendChild(listItem);
            });
        }

        currentHintIndex = 0;
        revealNextHint(); // Mostrar la primera pista
        showNextHintButton.style.display = 'block'; // Mostrar el botón de "Mostrar siguiente pista"
    }

    // --- Función para cambiar el idioma y actualizar las pistas ---
    function changeLanguage(lang) {
        currentLanguage = lang; // Actualizar el idioma actual
        updateHints(); // Actualizar las pistas en el idioma seleccionado
        updateUITexts(lang); // Actualizar otros textos de la interfaz
    }

    // --- Función para revelar la siguiente pista ---
    function revealNextHint() {
        const hintItems = hintsList.querySelectorAll('li');
        if (currentHintIndex < hintItems.length) {
            hintItems[currentHintIndex].style.display = 'block'; // Mostrar la pista actual
            currentHintIndex++;
        }

        if (currentHintIndex === hintItems.length) {
            showNextHintButton.style.display = 'none'; // Ocultar el botón si no hay más pistas
        }
    }

    // --- Evento para abrir el modal de pistas ---
    hintButton.addEventListener('click', () => {
        hintModal.style.display = 'block'; // Mostrar el modal de pistas
        updateHints(); // Asegurarse de mostrar las pistas correctas al abrir el modal
    });

    // --- Mostrar la siguiente pista al hacer clic en el botón "Mostrar Pista" ---
    showNextHintButton.addEventListener('click', () => {
        revealNextHint();
    });

    // --- Cerrar el modal al hacer clic en la "X" ---
    closeHint.addEventListener('click', () => {
        hintModal.style.display = 'none'; // Ocultar el modal
    });

    // --- Cerrar el modal si se hace clic fuera del contenido ---
    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none'; // Ocultar el modal si se hace clic fuera del contenido
        }
    });

    // --- Implementar los botones para cambiar idioma ---
    const languageButtons = document.querySelectorAll('.language-selector button');
    languageButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedLanguage = event.target.getAttribute('data-lang');
            changeLanguage(selectedLanguage); // Cambiar idioma al hacer clic en el botón
        });
    });

    // --- Actualizar otros textos de la interfaz (por ejemplo, botones de la interfaz principal) ---
    const translations = {
        es: {
            hintButton: "💡 Ver Pistas",
            showNextHint: "Mostrar Siguiente Pista",
            hintsTitle: "Pistas"
            // Añadir más textos que necesiten traducción aquí
        },
        en: {
            hintButton: "💡 View Hints",
            showNextHint: "Show Next Hint",
            hintsTitle: "Hints"
            // Añadir más textos que necesiten traducción aquí
        }
    };

    function updateUITexts(lang) {
        const translation = translations[lang];
        if (translation) {
            const hintButton = document.getElementById("hint-button");
            const nextHintButton = document.getElementById("show-next-hint");
            const hintsTitle = document.getElementById("hints-title");

            if (hintButton) {
                hintButton.textContent = translation.hintButton;
            }

            if (nextHintButton) {
                nextHintButton.textContent = translation.showNextHint;
            }

            if (hintsTitle) {
                hintsTitle.textContent = translation.hintsTitle;
            }
        }
    }

    // --- Cargar el idioma correcto al inicio ---
    updateHints(); // Actualizar pistas desde el inicio en el idioma por defecto
    updateUITexts(currentLanguage); // Asegurarse de que los textos de la UI estén en el idioma por defecto
});
document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Mostrar/ocultar el contenido desplegable cuando se hace clic en el botón
    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    // Cerrar el menú si se hace clic fuera del menú
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropdown-button')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        es: {
            pageTitle: "Escape Room - Introducción",
            startButton: "Comenzar la Aventura",
            title: "Escape Room Challenge",
            subtitle: "Un viaje lleno de enigmas y aventuras te espera.",
        },
        en: {
            pageTitle: "Escape Room - Introduction",
            startButton: "Start the Adventure",
            title: "Escape Room Challenge",
            subtitle: "A journey full of puzzles and adventures awaits you.",
        }
    };

    // Función para cambiar el idioma y actualizar el contenido
    function changeLanguage(lang) {
        const selectedLanguage = translations[lang];
        if (selectedLanguage) {
            // Actualizar los elementos de la página con el idioma seleccionado
            document.title = selectedLanguage.pageTitle;
            const startButton = document.getElementById('start-button');
            const title = document.getElementById('title');
            const subtitle = document.getElementById('subtitle');

            if (startButton) startButton.textContent = selectedLanguage.startButton;
            if (title) title.textContent = selectedLanguage.title;
            if (subtitle) subtitle.textContent = selectedLanguage.subtitle;

            // Guardar el idioma en localStorage
            localStorage.setItem('selectedLanguage', lang);
        }
    }

    // Función para aplicar el idioma guardado
    function applySavedLanguage() {
        let savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Idioma por defecto: inglés
        changeLanguage(savedLanguage);
    }

    // Evento para los botones del selector de idioma
    const languageButtons = document.querySelectorAll('.language-selector button');
    languageButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedLanguage = event.target.dataset.lang;
            changeLanguage(selectedLanguage);
        });
    });

    // Aplicar el idioma guardado al cargar la página
    applySavedLanguage();

    // Botón para iniciar la aventura
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            window.location.href = 'chapter1.html'; // Cambia a la URL del primer capítulo
        });
    }
});


