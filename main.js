// Lógica de la Navbar
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
// Aseguramos que se apunte al elemento correcto, si no tienes un ID 'menu-list' en el ul,
// el selector '.menu-list' es más seguro. Si sí tienes el ID, puedes dejarlo como estaba.
const menuList = document.querySelector('.menu-list'); 

// NUEVO: Referencia al elemento que contiene el nombre de GitHub para móvil
const githubName = document.querySelector('#navbar .navbar-brand .github-name');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
});

// Lógica del menú desplegable
if (menuToggle && menuList) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuList.classList.toggle('open');

        // Lógica NUEVA: Mostrar/ocultar el nombre de GitHub en móvil al abrir/cerrar el menú
        if (window.innerWidth <= 768) { 
            githubName.classList.toggle('show-mobile');
        }
    });

    // Cierra el menú al hacer clic en un enlace (para la navegación de una sola página)
    const menuLinks = menuList.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuList.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Lógica NUEVA: Ocultar el nombre de GitHub en móvil al cerrar el menú
            if (window.innerWidth <= 768) {
                githubName.classList.remove('show-mobile');
            }
        });
    });
}

// Lógica del Carrusel de Proyectos
const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(carouselTrack.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const carouselNav = document.querySelector('.carousel-nav');
const indicators = Array.from(carouselNav.children);

let currentIndex = 0;

const updateCarousel = () => {
    if (!carouselTrack || slides.length === 0) return;

    carouselTrack.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
    indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    if (currentIndex === 0) {
        if (prevButton) prevButton.style.display = 'none';
    } else {
        if (prevButton) prevButton.style.display = 'block';
    }

    if (currentIndex === slides.length - 1) {
        if (nextButton) nextButton.style.display = 'none';
    } else {
        if (nextButton) nextButton.style.display = 'block';
    }
};

if (nextButton && prevButton) {
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

if (carouselNav) {
    carouselNav.addEventListener('click', e => {
        const targetIndicator = e.target.closest('.carousel-indicator');
        if (!targetIndicator) return;

        const targetIndex = parseInt(targetIndicator.dataset.slideIndex);
        currentIndex = targetIndex;
        updateCarousel();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');
    const githubName = document.querySelector('#navbar .navbar-brand .github-name'); // Seleccionamos el span del nombre de GitHub

    menuToggle.addEventListener('click', () => {
        menuList.classList.toggle('open'); // Esto ya abre/cierra el menú
        
        // Toggle la clase 'show-mobile' en el nombre de GitHub
        if (window.innerWidth <= 768) { // Solo aplica en móviles
            githubName.classList.toggle('show-mobile');
        }
    });

    // Opcional: Cerrar el menú y ocultar el nombre de GitHub si se hace clic fuera o se redimensiona
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuList.classList.contains('open')) {
            menuList.classList.remove('open');
            githubName.classList.remove('show-mobile'); // Ocultar si se pasa a desktop
        }
    });

    // Cerrar el menú y ocultar el nombre de GitHub si se hace clic en un enlace del menú
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo si estamos en móvil
                menuList.classList.remove('open');
                githubName.classList.remove('show-mobile');
            }
        });
    });

    // Lógica para mostrar/ocultar el navbar al scroll (existente en tu código)
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixeles a scroll para que aparezca/desaparezca

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scrolling down
            navbar.classList.remove('show');
        } else if (scrollTop < lastScrollTop || scrollTop <= scrollThreshold) {
            // Scrolling up or at the top
            navbar.classList.add('show');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // Asegurarse de que el navbar se muestre inicialmente si ya se ha desplazado un poco
    if (window.pageYOffset > scrollThreshold) {
        navbar.classList.add('show');
    } else {
        navbar.classList.add('show'); // Mostrarlo al cargar si está en la parte superior
    }
});

// Lógica del Modal de Contacto y Formulario
const contactModal = document.getElementById('contactModal');
const closeButton = document.querySelector('.close-button');
const contactForm = document.getElementById('contactForm');
// Asegúrate de que el id 'message' exista en tu textarea del formulario para que esta línea funcione
const messageInput = document.getElementById('message'); 
// Asegúrate de que el id 'successMessage' exista para tu div de mensaje de éxito
const successMessage = document.getElementById('successMessage'); 
const closeSuccessButton = document.querySelector('.close-success-message');
// Asegúrate de que el id 'whatsappLink' exista para tu enlace de WhatsApp
const whatsappLink = document.getElementById('whatsappLink'); 

const openFormButtons = document.querySelectorAll('.open-form-modal');

const planMessages = {
    esencial: "Hola, me interesa el Plan Presencia Esencial. Me gustaría obtener más información sobre cómo pueden ayudarme con mi landing page.",
    profesional: "Hola, me interesa el Plan Impulso Profesional. Estoy buscando una solución más robusta para mi negocio.",
    crecimiento: "Hola, me interesa el Plan Estrategia de Crecimiento. Estoy listo para llevar mi negocio al siguiente nivel y me gustaría discutir mis necesidades."
};
const whatsappNumber = "5493413690901"; // Tu número de WhatsApp

openFormButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const plan = event.target.dataset.plan;
        const predefinedMessage = planMessages[plan] || "Hola, me gustaría obtener más información sobre sus servicios de landing pages.";
        
        if (messageInput) {
            messageInput.value = predefinedMessage;
        }

        if (whatsappLink) {
            whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(predefinedMessage)}`;
        }
        
        if (contactModal) {
            contactModal.classList.add('active');
        }
    });
});

if (closeButton) {
    closeButton.addEventListener('click', () => {
        if (contactModal) {
            contactModal.classList.remove('active');
        }
    });
}

if (contactModal) {
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

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
                if (contactModal) contactModal.classList.remove('active');
                if (successMessage) successMessage.classList.add('show');
                form.reset();
            } else {
                console.error('Error al enviar el formulario:', response.statusText);
                alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error de red al enviar el formulario:', error);
            alert('Hubo un problema de conexión. Por favor, verifica tu internet e inténtalo de nuevo.');
        }
    });
}

if (closeSuccessButton) {
    closeSuccessButton.addEventListener('click', () => {
        if (successMessage) {
            successMessage.classList.remove('show');
        }
    });
}