 const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        navbar.classList.add('show');
      } else {
        navbar.classList.remove('show');
      }
    });