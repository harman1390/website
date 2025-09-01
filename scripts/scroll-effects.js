document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Observe sections
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.card, .portfolio-item, .testimonial');
    const animatedElements = [...sections, ...cards];

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('card')) {
                    entry.target.classList.add('visible');
                } else if (entry.target.tagName === 'SECTION') {
                    entry.target.classList.add('visible');
                    // Animate child elements with staggered delay
                    const childElements = entry.target.querySelectorAll('.card, .portfolio-item, .testimonial');
                    childElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 100); // Stagger the animation
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize observers
    animatedElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });

    // Hero element for parallax effect
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        // Navbar background change
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // Parallax effect for hero
        if (hero) {
            const scrollPosition = window.scrollY;
            hero.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    }

    // Initial call
    handleScroll();
    
    // Throttle scroll event
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(handleScroll);
    }, false);

    // Add active class to nav links on scroll
    function highlightNav() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
});
