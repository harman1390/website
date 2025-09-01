document.addEventListener('DOMContentLoaded', () => {
    // Update logo to just "CT"
    const logo = document.querySelector('.logo');
    if (logo) logo.textContent = 'CT';

    // Create innovation text element
    const innovationText = document.createElement('div');
    innovationText.className = 'innovation-text';
    innovationText.innerHTML = 'INNOVATION';
    
    // Insert after logo
    if (logo) {
        logo.insertAdjacentElement('afterend', innovationText);
    }

    // Handle scroll animations
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // Add/remove scrolled class to navbar
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
            
            // Move innovation text next to logo when scrolled
            if (scrollPosition > heroHeight - 100) {
                navbar.classList.add('show-innovation');
            } else {
                navbar.classList.remove('show-innovation');
            }
        } else {
            navbar.classList.remove('scrolled', 'show-innovation');
        }
        
        // Parallax effect for hero background
        if (heroSection) {
            const yPos = -(scrollPosition * 0.5);
            heroSection.style.backgroundPositionY = `${yPos}px`;
        }
    }
    
    // Initial call
    handleScroll();
    
    // Throttle scroll event
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 16);
    });
});
