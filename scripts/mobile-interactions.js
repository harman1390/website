// Handle mobile interactions for expertise cards
document.addEventListener('DOMContentLoaded', function() {
  const expertiseCards = document.querySelectorAll('.expertise-card');
  
  // Check if device is mobile
  const isMobile = window.innerWidth <= 1024;
  
  if (isMobile) {
    // Initialize all cards as inactive
    expertiseCards.forEach(card => {
      const learnMore = card.querySelector('.learn-more');
      const backContent = card.querySelector('.expertise-back');
      
      // Set initial state
      if (backContent) {
        backContent.style.display = 'none';
      }
      
      learnMore?.addEventListener('click', function(e) {
        e.stopPropagation();
        const wasActive = card.classList.contains('active');
        
        // Close all cards first
        expertiseCards.forEach(c => {
          c.classList.remove('active');
          const icon = c.querySelector('.learn-more i');
          const back = c.querySelector('.expertise-back');
          if (icon) icon.style.transform = 'rotate(0)';
          if (back) back.style.display = 'none';
        });
        
        // Toggle current card if it wasn't active
        if (!wasActive) {
          card.classList.add('active');
          const icon = learnMore.querySelector('i');
          const back = card.querySelector('.expertise-back');
          if (icon) icon.style.transform = 'rotate(90deg)';
          if (back) back.style.display = 'block';
        }
      });
    });
    
    // Close cards when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.expertise-card')) {
        expertiseCards.forEach(card => {
          card.classList.remove('active');
          const icon = card.querySelector('.learn-more i');
          const back = card.querySelector('.expertise-back');
          if (icon) icon.style.transform = 'rotate(0)';
          if (back) back.style.display = 'none';
        });
      }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 1024) {
          // Reset all cards on desktop view
          expertiseCards.forEach(card => {
            card.classList.remove('active');
            const back = card.querySelector('.expertise-back');
            if (back) back.style.display = '';
          });
        }
      }, 250);
    });
  }
});
