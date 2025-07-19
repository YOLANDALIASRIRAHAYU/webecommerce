// HEADER SCRIPT - KONSISTEN DI SEMUA HALAMAN
document.addEventListener('DOMContentLoaded', function() {
  // Tandai halaman aktif di navigation
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Update cart count dari localStorage
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }
  
  // Update cart count saat halaman dimuat
  updateCartCount();
  
  // Search functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
          // Redirect ke halaman shop dengan query search
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
  
  // Header button hover effects
  const headerBtns = document.querySelectorAll('.header-btn');
  headerBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Responsive menu toggle (untuk mobile)
  function createMobileMenu() {
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
      const mobileBtn = document.createElement('button');
      mobileBtn.className = 'mobile-menu-btn';
      mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
      mobileBtn.style.cssText = `
        background: none;
        border: none;
        color: #2d3748;
        font-size: 1.3rem;
        cursor: pointer;
        padding: 0.5rem;
        display: none;
      `;
      
      header.insertBefore(mobileBtn, header.firstChild);
      
      mobileBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      });
    }
  }
  
  // Initialize mobile menu
  createMobileMenu();
  
  // Recreate mobile menu on resize
  window.addEventListener('resize', createMobileMenu);
}); 