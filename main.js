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

updateCarousel();