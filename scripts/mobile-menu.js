document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Only proceed if hamburger menu exists (mobile view)
    if (hamburger && navLinks) {
        // Toggle mobile menu
        const toggleMenu = () => {
            const isOpen = hamburger.classList.contains('active');
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            
            // Update aria-expanded for accessibility
            hamburger.setAttribute('aria-expanded', !isOpen);
            
            // Focus management for better keyboard navigation
            if (!isOpen) {
                // When opening menu, focus on first link
                navLinksItems[0]?.focus();
            } else {
                // When closing menu, return focus to hamburger button
                hamburger.focus();
            }
        };

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on a nav link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
            
            // Handle keyboard navigation
            link.addEventListener('keydown', (e) => {
                // Close menu on Escape key
                if (e.key === 'Escape') {
                    toggleMenu();
                }
                // Trap focus within menu when open
                else if (e.key === 'Tab') {
                    const focusableElements = Array.from(navLinks.querySelectorAll('a, button, [tabindex]'));
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Close menu on window resize (in case user rotates device)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            }, 250);
        });
        
        // Initialize ARIA attributes
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'main-navigation');
        navLinks.setAttribute('id', 'main-navigation');
    }
});
