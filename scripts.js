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

// --- Chapter 1: Funcionalidad de selección de botellas ---
const bottles = document.querySelectorAll('.bottle');
let selectedColors = [];
const maxSelection = 3;

bottles.forEach(bottle => {
    bottle.addEventListener('click', () => {
        const color = bottle.dataset.color;

        // Si ya está seleccionada, deselecciona
        if (selectedColors.includes(color)) {
            selectedColors = selectedColors.filter(c => c !== color);
            bottle.classList.remove('selected');
        } else if (selectedColors.length < maxSelection) {
            // Añade el color seleccionado
            selectedColors.push(color);
            bottle.classList.add('selected');
        } else {
            // Cambia el primer color seleccionado por uno nuevo
            const firstSelectedColor = selectedColors.shift();
            document.querySelector(`[data-color="${firstSelectedColor}"]`).classList.remove('selected');
            selectedColors.push(color);
            bottle.classList.add('selected');
        }
    });
});

const validateButton = document.getElementById('validate-button');
if (validateButton) {
    validateButton.addEventListener('click', () => {
        const resultMessage = document.getElementById('result-message');
        if (selectedColors.length !== maxSelection) {
            resultMessage.textContent = "¡Debes seleccionar 3 pociones!";
        } else {
            const correctCombination = ['naranja', 'verde', 'amarillo'];

            if (selectedColors.sort().toString() === correctCombination.sort().toString()) {
                resultMessage.textContent = "¡Correcto!";
                setTimeout(() => {
                    window.location.href = 'chapter3.html';
                }, 1500);
            } else {
                resultMessage.textContent = "Combinación incorrecta. ¡Explosión!";

                // Añadir la animación de explosión a las botellas seleccionadas
                selectedColors.forEach(color => {
                    const bottleElement = document.querySelector(`[data-color="${color}"]`);
                    bottleElement.classList.add('error');

                    // Quitar la clase de error después de la animación
                    setTimeout(() => {
                        bottleElement.classList.remove('error', 'selected');
                    }, 1000);
                });

                // Limpiar selección
                selectedColors = [];
            }
        }
    });
}
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
        resultMessage.textContent = "¡Correcto!";
        setTimeout(() => {
            window.location.href = 'chapter2.html';
        }, 2000);
    } else {
        shakeScreen();
        resetSwitches();
        resultMessage.textContent = "Orden incorrecto. Intenta de nuevo.";
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

    // Iniciar temporizador al cargar
    startTimer();

    // --- Función para mostrar el efecto de humo ---
    const smokeEffect = document.getElementById('smoke-effect');

    function showFullScreenSmoke() {
        smokeEffect.style.display = 'flex';  // Muestra el efecto de humo

        // Bloquear el scroll para evitar que la pantalla se mueva
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            smokeEffect.style.display = 'none';  // Oculta el efecto de humo
            document.body.style.overflow = '';  // Restaurar el scroll
        }, 10000);  // La animación dura 10 segundos
    }

    // --- Función para manejar las opciones de selección ---
    const optionButtons = document.querySelectorAll('.option-button');
    const resultMessage = document.getElementById('result-message');

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isCorrect = button.dataset.correct === 'true';

            if (isCorrect) {
                resultMessage.textContent = "¡Correcto! Avanzando...";
                resultMessage.style.backgroundColor = 'rgba(39, 174, 96, 0.8)';
                setTimeout(() => {
                    // Redirigir al capítulo 5
                    window.location.href = 'chapter5.html';
                }, 2000);
            } else {
                resultMessage.textContent = "¡Error! Restando 10 minutos...";
                resultMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.8)';

                // Restar 10 minutos (600 segundos) al cronómetro
                time = Math.max(0, time - 600);
                localStorage.setItem('escapeTimer', time);

                // Mostrar el efecto de humo
                showFullScreenSmoke();
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
            resultMessage.textContent = "Girando...";
            resultMessage.style.color = "#e74c3c"; // Rojo para indicar que no está en la posición correcta
        }
    }

    // --- Chapter 6: Escritura con Pluma ---
    const textInput = document.getElementById('text-input');
    const validateButton6 = document.getElementById('validate-button');
    const resultMessage6 = document.getElementById('result-message');

    const correctPhrase = "move the locker"; // Frase correcta

    // Validar la frase ingresada
    if (validateButton6) {
        validateButton6.addEventListener('click', () => {
            const enteredText = textInput.value.trim().toLowerCase(); // Convertimos a minúsculas

            if (enteredText === correctPhrase) {
                resultMessage6.textContent = "¡Frase correcta!";
                resultMessage6.style.color = "green";

                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'chapter7.html'; // Cambiar al siguiente capítulo
                }, 2000);
            } else {
                // Si la frase es incorrecta
                resultMessage6.textContent = "ERROR. Intenta de nuevo.";
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
          resultMessage.textContent = '¡Código correcto!';
          resultMessage.style.color = 'green';
          setTimeout(() => {
            window.location.href = 'chapter8.html'; // Redirige al siguiente capítulo
          }, 2000);
        } else {
          resultMessage.textContent = 'Código incorrecto. Intenta de nuevo.';
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


    // --- Chapter 8: Selección de Imagen, Número y Letra ---
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('code-input');
    const numberButtons = document.querySelectorAll('.num-button');
    const clearButton = document.getElementById('clear');
    const submitButton = document.getElementById('submit-button');
    const resultMessage = document.getElementById('result-message');

    let selectedImage = null;
    let selectedSymbol = null;

    // Image selection
    const images = document.querySelectorAll('.image-choice');
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            images.forEach(img => img.classList.remove('selected'));
            image.classList.add('selected');
            selectedImage = index + 1; // Assuming images are indexed 1 to 6
        });
    });

    // Symbol selection
    const symbols = document.querySelectorAll('.symbol-choice');
    symbols.forEach((symbol, index) => {
        symbol.addEventListener('click', () => {
            symbols.forEach(sym => sym.classList.remove('selected'));
            symbol.classList.add('selected');
            selectedSymbol = index + 1; // Assuming symbols are indexed 1 to 6
        });
    });

    // Add event listener to each number button
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (inputField.value.length < 3) {
                inputField.value += button.textContent;
            }
        });
    });

    // Clear input field
    clearButton.addEventListener('click', () => {
        resetSelections();
    });

    // Handle submission
    submitButton.addEventListener('click', () => {
        const code = inputField.value;
        if (selectedImage && selectedSymbol && code.length === 3) {
            checkSolution(selectedImage, selectedSymbol, code); // Validate the combination
        } else {
            resultMessage.textContent = 'Please select an image, a symbol, and enter a 3-digit code.';
        }
    });

    // Function to validate the solution
    function checkSolution(image, symbol, code) {
        const correctImage = 2; // The second image is correct
        const correctSymbol = 4; // The fourth symbol is correct
        const correctCode = '348'; // Correct 3-digit code

        if (image === correctImage && symbol === correctSymbol && code === correctCode) {
            resultMessage.textContent = 'Correct! You have solved the puzzle.';
            resultMessage.style.color = 'green';
        } else {
            resultMessage.textContent = 'Wrong combination. Resetting...';
            resultMessage.style.color = 'red';

            // Reset the selections after a short delay
            setTimeout(() => {
                resetSelections();
            }, 1500); // 1.5 second delay before resetting
        }
    }

    // Function to reset all selections
    function resetSelections() {
        // Clear input field and result message
        inputField.value = '';
        resultMessage.textContent = '';

        // Remove selected class from images and symbols
        images.forEach(img => img.classList.remove('selected'));
        symbols.forEach(sym => sym.classList.remove('selected'));

        // Reset selected variables
        selectedImage = null;
        selectedSymbol = null;
    }
});







document.addEventListener('DOMContentLoaded', () => {
    const hintButton = document.getElementById('hint-button');
    const hintModal = document.getElementById('hint-modal');
    const closeHint = document.getElementById('close-hint');
    const hintsList = document.getElementById('hints-list');
    const showNextHintButton = document.getElementById('show-next-hint');
    let currentHintIndex = 0;

    // Pistas para cada capítulo
    const hintsByChapter = {
        chapter1: [
             'Pista 1: Mira el patrón de los interruptores.',
            'Pista 2: Solo algunos deben estar arriba.',
            'Pista 3: Intenta un orden que mezcle los colores primarios.'

        ],
        chapter2: [
            'Pista 1: Observa bien los colores.',
            'Pista 2: La combinación correcta tiene colores cálidos.',
            'Pista 3: Experimenta con las pociones naranjas y verdes.'
        ],
        chapter3: [
            'Pista 1: El código está relacionado con la palabra CURA.',
            'Pista 2: Revisa las letras que has utilizado.',
            'Pista 3: A veces es mejor ir despacio.'
        ],
        chapter4: [
            'Pista 1: Recuerda que una opción está en el medio.',
            'Pista 2: Una de las imágenes te guiará a la solución.',
            'Pista 3: No tengas miedo de equivocarte y aprender.'
        ],
        chapter5: [
            'Pista 1: Los diales tienen un patrón.',
            'Pista 2: No es necesario girar los diales rápidamente.',
            'Pista 3: Mantén la calma, los números te guiarán.'
        ],
        chapter6: [
            'Pista 1: La frase correcta proviene de una famosa cita.',
            'Pista 2: Piensa en los antiguos científicos.',
            'Pista 3: Revisa las palabras clave, te ayudarán.'
        ],
        chapter7: [
            'Pista 1: El orden de los números es clave.',
            'Pista 2: Cada tecla corresponde a una ranura.',
            'Pista 3: Piensa en la alineación correcta de los números.'
        ],
        chapter8: [
            'Pista 1: Observa detenidamente los símbolos.',
            'Pista 2: La secuencia tiene un patrón que se repite.',
            'Pista 3: Cada símbolo corresponde a una acción específica.'
        ]
    };

    // Determinar el capítulo actual basado en la URL o algún identificador en la página
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

    // Abrir el modal al hacer clic en el botón de pistas
    hintButton.addEventListener('click', () => {
        // Limpiar el contenido actual del modal
        hintsList.innerHTML = '';

        // Añadir las pistas del capítulo actual como elementos de lista ocultos
        if (hintsByChapter[currentChapter]) {
            hintsByChapter[currentChapter].forEach(hint => {
                const listItem = document.createElement('li');
                listItem.textContent = hint;
                listItem.style.display = 'none'; // Ocultar las pistas al inicio
                hintsList.appendChild(listItem);
            });
        }

        // Resetear el índice y el botón de mostrar pistas
        currentHintIndex = 0;
        revealNextHint(); // Revela la primera pista
        showNextHintButton.style.display = 'block'; // Asegura que el botón de pistas esté visible

        hintModal.style.display = 'block'; // Mostrar el modal de pistas
    });

    // Función para revelar la siguiente pista
    function revealNextHint() {
        const hintItems = hintsList.querySelectorAll('li');
        if (currentHintIndex < hintItems.length) {
            hintItems[currentHintIndex].style.display = 'block'; // Muestra la pista actual
            currentHintIndex++;
        }

        // Si ya se han mostrado todas las pistas, ocultar el botón
        if (currentHintIndex === hintItems.length) {
            showNextHintButton.style.display = 'none';
        }
    }

    // Mostrar la siguiente pista al hacer clic en el botón "Mostrar Pista"
    showNextHintButton.addEventListener('click', () => {
        revealNextHint();
    });

    // Cerrar el modal al hacer clic en la "X"
    closeHint.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});
