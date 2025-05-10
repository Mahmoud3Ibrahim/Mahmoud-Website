document.addEventListener('DOMContentLoaded', () => {
    // Profile Image Slideshow
    const profileImages = [
        'image/Mahmoud_Ibrahim01.jpg',
        'image/Mahmoud_Ibrahim02.jpg',
        'image/Mahmoud_Ibrahim03.jpg',
        'image/Mahmoud_Ibrahim04.jpg',
        'image/Mahmoud_Ibrahim05.jpg',
        'image/Mahmoud_Ibrahim06.jpg'
    ];
    let profileIndex = 0;
    const profileImageElement = document.getElementById('profile-image');

    if (profileImageElement) {
        setInterval(() => {
            profileImageElement.classList.add('fade');
            setTimeout(() => {
                profileIndex = (profileIndex + 1) % profileImages.length;
                profileImageElement.src = profileImages[profileIndex];
                profileImageElement.alt = `Mahmoud Ibrahim ${profileIndex + 1}`;
                profileImageElement.classList.remove('fade');
            }, 500);
        }, 2000);
    }

    // Project Carousel
    const projectCards = document.querySelectorAll('.project-card');
    const carouselInner = document.querySelector('.carousel-inner');
    let currentIndex = 0;

    if (projectCards.length > 0) {
        // Set the width of each card dynamically
        projectCards.forEach(card => {
        });

        function updateCarousel() {
            // Set the total width of carousel-inner
            carouselInner.style.width = `${projectCards.length * 100}%`;

            // Update transform based on the current index
            carouselInner.style.transform = `translateX(-${(currentIndex * 100) / projectCards.length}%)`;
        }

        function showProject(index) {
            if (projectCards.length === 0) return;

            currentIndex = (index + projectCards.length) % projectCards.length;

            projectCards.forEach((card, i) => {
                card.classList.toggle('active', i === currentIndex);
            });

            updateCarousel();
        }

        window.nextProject = function () {
            showProject(currentIndex + 1);
        };

        window.prevProject = function () {
            showProject(currentIndex - 1);
        };

        // Initialize the carousel
        updateCarousel();
        showProject(currentIndex);

        // Recalculate on window resize to ensure proper sliding
        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill out all required fields.';
                formMessage.style.color = '#e53e3e';
            } else if (!emailRegex.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = '#e53e3e';
            } else {
                formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
                formMessage.style.color = '#38b2ac';
                contactForm.reset();
            }
        });
    }
});