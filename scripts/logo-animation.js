document.addEventListener('DOMContentLoaded', function() {
  const logoContainer = document.querySelector('.logo-container');
  const heroSection = document.querySelector('.hero');
  
  // Initial check in case page is loaded scrolled
  if (window.scrollY > 50) {
    logoContainer.classList.add('scrolled');
    heroSection.classList.add('scrolled');
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      logoContainer.classList.add('scrolled');
      heroSection.classList.add('scrolled');
    } else {
      logoContainer.classList.remove('scrolled');
      heroSection.classList.remove('scrolled');
    }
  });
});
