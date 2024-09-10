// --- Temporizador ---
document.addEventListener('DOMContentLoaded', () => {
    let time = parseInt(localStorage.getItem('escapeTimer')) || 3600;
    let interval;
    let isPaused = false;

    function startTimer() {
        interval = setInterval(() => {
            if (!isPaused) {
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                const timeElement = document.getElementById('time');
                if (timeElement) {
                    timeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }
                time--;
                localStorage.setItem('escapeTimer', time);

                if (time <= 0) {
                    clearInterval(interval);
                    const resultMessage = document.getElementById('result-message');
                    if (resultMessage) {
                        resultMessage.textContent = "¡El tiempo ha terminado!";
                    }
                    document.body.classList.add('game-over');
                }
            }
        }, 1000);
    }

    const timeElement = document.getElementById('time');
    if (timeElement) {
        startTimer();
    }

    const pauseButton = document.getElementById('pause-button');
    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseButton.textContent = isPaused ? 'Reanudar' : 'Pausar';
        });
    }

    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            clearInterval(interval);
            time = 3600;
            localStorage.removeItem('escapeTimer');
            startTimer();
            const resultMessage = document.getElementById('result-message');
            if (resultMessage) {
                resultMessage.textContent = "";
            }
        });
    }
document.addEventListener('DOMContentLoaded', () => {
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

            if (selectedColors.includes(color)) {
                selectedColors = selectedColors.filter(c => c !== color);
                bottle.classList.remove('selected');
            } else if (selectedColors.length < maxSelection) {
                selectedColors.push(color);
                bottle.classList.add('selected');
            } else {
                const firstSelectedColor = selectedColors.shift();
                document.querySelector(`[data-color="${firstSelectedColor}"]`).classList.remove('selected');
                selectedColors.push(color);
                bottle.classList.add('selected');
            }
        });
    });

    const validateButton1 = document.getElementById('validate-button');
    if (validateButton1) {
        validateButton1.addEventListener('click', () => {
            const resultMessage = document.getElementById('result-message');
            if (selectedColors.length !== maxSelection) {
                resultMessage.textContent = "¡Debes seleccionar 3 pociones!";
            } else {
                const correctCombination = ['naranja', 'verde', 'amarillo'];
                if (selectedColors.sort().toString() === correctCombination.sort().toString()) {
                    resultMessage.textContent = "¡Correcto!";
                    setTimeout(() => {
                        window.location.href = 'chapter2.html';
                    }, 1500);
                } else {
                    resultMessage.textContent = "Combinación incorrecta. Intenta de nuevo.";
                    selectedColors = [];
                    bottles.forEach(bottle => bottle.classList.remove('selected'));
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
                window.location.href = 'chapter3.html';
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

 // --- Chapter 4: Botones de imágenes ---

const optionButtons = document.querySelectorAll('.option-button');

// Función para mostrar el efecto de humo realista en toda la pantalla
function showFullScreenSmoke() {
    const smokeScreen = document.createElement('div');
    smokeScreen.classList.add('full-screen-smoke');

    // Crear más nubes de humo para un efecto más denso
    for (let i = 0; i < 5; i++) {
        const smokeCloud = document.createElement('div');
        smokeCloud.classList.add('smoke-cloud');
        smokeScreen.appendChild(smokeCloud);
    }

    document.body.appendChild(smokeScreen);

    // Mantener el humo visible durante 5 segundos y luego eliminarlo
    setTimeout(() => {
        document.body.removeChild(smokeScreen);
    }, 5000); // Mantener el humo visible durante 5 segundos
}

// Función para manejar el clic en los botones de opciones
optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const isCorrect = this.dataset.correct === "true";

        if (isCorrect) {
            document.getElementById('result-message').textContent = "¡Correcto!";
            document.getElementById('result-message').style.color = '#27ae60'; // Mensaje verde
            setTimeout(() => {
                window.location.href = 'chapter5.html'; // Redirigir al siguiente capítulo
            }, 2000);
        } else {
            document.getElementById('result-message').textContent = "¡Incorrecto! Se han descontado 10 minutos.";
            document.getElementById('result-message').style.color = '#e74c3c'; // Mensaje rojo
            showFullScreenSmoke(); // Mostrar humo cubriendo la pantalla

            // Descontar 10 minutos del temporizador
            time -= 600;
            localStorage.setItem('escapeTimer', time); // Guardar el nuevo tiempo en localStorage
        }
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
        dial1.style.transform = `rotate(${value * 18}deg)`;
        checkCombination();
    }

    function rotateDial2(value) {
        dial2Value = value;
        dial2.style.transform = `rotate(${value * 18}deg)`;
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
});


document.addEventListener('DOMContentLoaded', () => {
  const correctCode = ['R', 'A', 'P', 'O']; // Código correcto
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










document.addEventListener('DOMContentLoaded', () => {
    let selectedImage = '';
    let selectedNumber = '';
    let selectedLetter = '';

    const correctImage = 'img3';  // Imagen correcta
    const correctNumber = '4';    // Número correcto
    const correctLetter = 'A';    // Letra correcta

    const resultMessage = document.getElementById('result-message');

    // Selección de Imagen
    document.querySelectorAll('.code-image').forEach(image => {
        image.addEventListener('click', () => {
            selectedImage = image.dataset.code;
            document.querySelectorAll('.code-image').forEach(img => img.classList.remove('selected'));
            image.classList.add('selected');
            checkCode();
        });
    });

    // Selección de Número
    document.querySelectorAll('.code-number').forEach(number => {
        number.addEventListener('click', () => {
            selectedNumber = number.dataset.code;
            document.querySelectorAll('.code-number').forEach(num => num.classList.remove('selected'));
            number.classList.add('selected');
            checkCode();
        });
    });

    // Selección de Letra
    document.querySelectorAll('.code-letter').forEach(letter => {
        letter.addEventListener('click', () => {
            selectedLetter = letter.dataset.code;
            document.querySelectorAll('.code-letter').forEach(let => let.classList.remove('selected'));
            letter.classList.add('selected');
            checkCode();
        });
    });

    // Función para comprobar el código
    function checkCode() {
        if (selectedImage && selectedNumber && selectedLetter) {
            if (selectedImage === correctImage && selectedNumber === correctNumber && selectedLetter === correctLetter) {
                resultMessage.textContent = "¡Código correcto!";
                resultMessage.style.color = "green";
                setTimeout(() => {
                    window.location.href = 'chapter9.html';  // Redirige al siguiente capítulo
                }, 2000);
            } else {
                resultMessage.textContent = "Código incorrecto. Intenta de nuevo.";
                resultMessage.style.color = "red";
                resetSelections();
            }
        }
    }

    // Función para reiniciar las selecciones
    function resetSelections() {
        selectedImage = '';
        selectedNumber = '';
        selectedLetter = '';

        // Quitar selección visual
        document.querySelectorAll('.code-image').forEach(img => img.classList.remove('selected'));
        document.querySelectorAll('.code-number').forEach(num => num.classList.remove('selected'));
        document.querySelectorAll('.code-letter').forEach(let => let.classList.remove('selected'));
    }
});
