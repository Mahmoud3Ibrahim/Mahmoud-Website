
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    let currentIndex = 0;
    let autoSlideInterval = null;
    const slideInterval = 5000;

    function showProject(index) {
        if (projectCards.length === 0) return;

        projectCards.forEach(card => {
            card.style.opacity = 0;
            card.style.display = 'none';
        });

        currentIndex = (index + projectCards.length) % projectCards.length;

        const currentCard = projectCards[currentIndex];
        currentCard.style.display = 'flex';
        setTimeout(() => {
            currentCard.style.opacity = 1;
        }, 50);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showProject(currentIndex + 1);
        }, slideInterval);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    window.nextProject = () => {
        stopAutoSlide();
        showProject(currentIndex + 1);
        startAutoSlide();
    };

    window.prevProject = () => {
        stopAutoSlide();
        showProject(currentIndex - 1);
        startAutoSlide();
    };

    showProject(currentIndex);
    startAutoSlide();
});
