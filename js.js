// --- Chapter 9: Efecto de partículas y portal ---
document.addEventListener('DOMContentLoaded', function () {
    const particleContainer = document.getElementById('particles');
    const portalFrame = document.getElementById('portal-frame');

    // Asegurarse de que el contenedor del portal existe
    if (!portalFrame) {
        console.error('El portal no existe en el DOM');
        return; // Salir si el portal no está presente
    }

    // Crear partículas que parpadeen suavemente
    function createBlinkingParticles() {
        if (!particleContainer) {
            console.error('El contenedor de partículas no existe en el DOM');
            return;
        }
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 2 + 1.5}s`; // Parpadeo aleatorio
            particleContainer.appendChild(particle);
        }
    }

    // Efecto de zoom hacia el portal
    function startPortalEffect() {
        portalFrame.classList.add('active');

        // Redirigir a chapter10.html después de 2 segundos (cuando termine el zoom)
        setTimeout(() => {
            window.location.href = 'chapter10.html';
        }, 2000);
    }

    // Crear partículas de efectos dinámicos alrededor del portal
    function createDynamicEffects() {
        for (let i = 0; i < 30; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            spark.style.top = `${Math.random() * 100}%`;
            spark.style.left = `${Math.random() * 100}%`;
            portalFrame.appendChild(spark);
        }
    }

    // Evento de clic para activar el portal
    portalFrame.addEventListener('click', startPortalEffect);

    // Iniciar efectos dinámicos
    createBlinkingParticles();
    createDynamicEffects();
});

// --- Chapter 10: Efecto de velocidad luz y créditos ---
document.addEventListener('DOMContentLoaded', function () {
    const lightSpeed = document.getElementById('light-speed');
    const credits = document.getElementById('credits');

    // Asegurarse de que los elementos existen
    if (!lightSpeed || !credits) {
        console.error('El elemento de velocidad luz o créditos no existe en el DOM');
        return;
    }

    // Efecto de velocidad luz
    function startLightSpeedEffect() {
        lightSpeed.style.opacity = '1';
        lightSpeed.style.animation = 'lightSpeed 3s ease-in-out forwards';

        // Mostrar los créditos después de que termine el efecto de velocidad luz
        setTimeout(() => {
            showCredits();
        }, 3000); // Mostrar los créditos después de 3 segundos
    }

    // Mostrar los créditos
    function showCredits() {
        credits.classList.add('show-credits');
    }

    // Iniciar la animación de velocidad luz
    startLightSpeedEffect();
});
