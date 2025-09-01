// Handle mobile interactions for expertise cards
document.addEventListener('DOMContentLoaded', function() {
  const expertiseCards = document.querySelectorAll('.expertise-card');
  
  // Check if device is mobile
  const isMobile = window.innerWidth <= 1024;
  
  if (isMobile) {
    expertiseCards.forEach(card => {
      const learnMore = card.querySelector('.learn-more');
      
      learnMore?.addEventListener('click', function(e) {
        e.stopPropagation();
        card.classList.toggle('active');
        
        // Toggle the arrow icon
        const icon = learnMore.querySelector('i');
        if (icon) {
          icon.style.transform = card.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
        }
      });
    });
    
    // Close other cards when one is opened
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.expertise-card')) {
        expertiseCards.forEach(card => {
          card.classList.remove('active');
          const icon = card.querySelector('.learn-more i');
          if (icon) icon.style.transform = 'rotate(0)';
        });
      } else if (e.target.closest('.expertise-card')) {
        const clickedCard = e.target.closest('.expertise-card');
        expertiseCards.forEach(card => {
          if (card !== clickedCard) {
            card.classList.remove('active');
            const icon = card.querySelector('.learn-more i');
            if (icon) icon.style.transform = 'rotate(0)';
          }
        });
      }
    });
  }
});
