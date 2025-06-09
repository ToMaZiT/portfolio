// Lógica de la Navbar (código original de tu archivo main.js)
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});


// Lógica del Carrusel de Proyectos (código original de tu archivo main.js)
const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(carouselTrack.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const carouselNav = document.querySelector('.carousel-nav');
const indicators = Array.from(carouselNav.children);

let currentIndex = 0;

const updateCarousel = () => {
    if (!carouselTrack || slides.length === 0) return; // Asegurarse de que el carrusel exista

    carouselTrack.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    if (currentIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'block';
    }

    if (currentIndex === slides.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
};

if (nextButton && prevButton) { // Asegurarse de que los botones existan antes de añadir listeners
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
}

if (carouselNav) { // Asegurarse de que la navegación del carrusel exista
    carouselNav.addEventListener('click', e => {
        const targetIndicator = e.target.closest('.carousel-indicator');
        if (!targetIndicator) return;

        const targetIndex = parseInt(targetIndicator.dataset.slideIndex);
        currentIndex = targetIndex;
        updateCarousel();
    });
}


window.addEventListener('resize', () => {
    updateCarousel();
});

// Inicializar el carrusel si hay slides
if (slides.length > 0 && carouselTrack) {
    updateCarousel();
}


// Lógica del Modal de Contacto y Formulario (código añadido recientemente)
const contactModal = document.getElementById('contactModal');
const closeButton = document.querySelector('.close-button');
const contactForm = document.getElementById('contactForm');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const closeSuccessButton = document.querySelector('.close-success-message');
const whatsappLink = document.getElementById('whatsappLink'); // Nuevo elemento de WhatsApp

const openFormButtons = document.querySelectorAll('.open-form-modal');

// Mensajes predeterminados para cada plan
const planMessages = {
    esencial: "Hola, me interesa el Plan Presencia Esencial. Me gustaría obtener más información sobre cómo pueden ayudarme con mi landing page.",
    profesional: "Hola, me interesa el Plan Impulso Profesional. Estoy buscando una solución más robusta para mi negocio.",
    crecimiento: "Hola, me interesa el Plan Estrategia de Crecimiento. Estoy listo para llevar mi negocio al siguiente nivel y me gustaría discutir mis necesidades."
};
const whatsappNumber = "5493413690901"; // Tu número de WhatsApp sin '+' y sin espacios

openFormButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const plan = event.target.dataset.plan;
        const predefinedMessage = planMessages[plan] || "Hola, me gustaría obtener más información sobre sus servicios de landing pages.";
        
        if (messageInput) { // Verificar si el input existe antes de asignarle un valor
            messageInput.value = predefinedMessage; // Asigna al textarea
        }

        if (whatsappLink) { // Verificar si el enlace de WhatsApp existe
            // Asigna la URL de WhatsApp con el mensaje predefinido
            whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(predefinedMessage)}`;
        }
        
        if (contactModal) { // Verificar si el modal existe antes de activarlo
            contactModal.classList.add('active');
        }
    });
});

if (closeButton) { // Verificar si el botón de cerrar existe
    closeButton.addEventListener('click', () => {
        if (contactModal) {
            contactModal.classList.remove('active');
        }
    });
}

// Cierra el modal si se hace clic fuera del contenido
if (contactModal) { // Verificar si el modal existe
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });
}


if (contactForm) { // Verificar si el formulario existe
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                if (contactModal) contactModal.classList.remove('active'); // Cierra el modal
                if (successMessage) successMessage.classList.add('show'); // Muestra el mensaje de éxito
                contactForm.reset(); // Limpia el formulario
            } else {
                // Manejar errores de Formspree o red
                console.error('Error al enviar el formulario:', response.statusText);
                alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error de red al enviar el formulario:', error);
            alert('Hubo un problema de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
        }
    });
}


if (closeSuccessButton) { // Verificar si el botón de cerrar mensaje de éxito existe
    closeSuccessButton.addEventListener('click', () => {
        if (successMessage) {
            successMessage.classList.remove('show'); // Cierra el mensaje de éxito
        }
    });
}