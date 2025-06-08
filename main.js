const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});

const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(carouselTrack.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const carouselNav = document.querySelector('.carousel-nav');
const indicators = Array.from(carouselNav.children);

let currentIndex = 0;

const updateCarousel = () => {
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

carouselNav.addEventListener('click', e => {
    const targetIndicator = e.target.closest('.carousel-indicator');
    if (!targetIndicator) return;

    const targetIndex = parseInt(targetIndicator.dataset.slideIndex);
    currentIndex = targetIndex;
    updateCarousel();
});

window.addEventListener('resize', () => {
    updateCarousel();
});

if (slides.length > 0) {
    updateCarousel();
}


// Lógica del Modal de Contacto y Formulario
const contactModal = document.getElementById('contactModal');
const closeButton = document.querySelector('.close-button');
const contactForm = document.getElementById('contactForm');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const closeSuccessButton = document.querySelector('.close-success-message');

const openFormButtons = document.querySelectorAll('.open-form-modal');

// Mensajes predeterminados para cada plan
const planMessages = {
    esencial: "Hola, me interesa el Plan Presencia Esencial. Me gustaría obtener más información sobre cómo pueden ayudarme con mi landing page.",
    profesional: "Hola, me interesa el Plan Impulso Profesional. Estoy buscando una solución más robusta para mi negocio.",
    crecimiento: "Hola, me interesa el Plan Estrategia de Crecimiento. Estoy listo para llevar mi negocio al siguiente nivel y me gustaría discutir mis necesidades."
};

openFormButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const plan = event.target.dataset.plan;
        messageInput.value = planMessages[plan] || "Hola, me gustaría obtener más información sobre sus servicios de landing pages.";
        contactModal.classList.add('active');
    });
});

closeButton.addEventListener('click', () => {
    contactModal.classList.remove('active');
});

// Cierra el modal si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        contactModal.classList.remove('active');
    }
});

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
            contactModal.classList.remove('active'); // Cierra el modal
            successMessage.classList.add('show'); // Muestra el mensaje de éxito
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

closeSuccessButton.addEventListener('click', () => {
    successMessage.classList.remove('show'); // Cierra el mensaje de éxito
});