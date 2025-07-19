// Home page product display functionality
// Gunakan allProducts dari products.js langsung, tidak perlu fetch
// allProducts sudah tersedia secara global
let currentCategory = 'latest';
let currentPage = 0;
const productsPerPage = 8;

// Kategori produk
function displayProductsByCategory(category) {
  currentCategory = category;
  currentPage = 0;
  let productsToShow = [];
  switch(category) {
    case 'latest':
      productsToShow = allProducts.slice(0, 16); // 16 produk pertama
      break;
    case 'top':
      productsToShow = allProducts.slice(16, 33); // 17 produk berikutnya
      break;
    case 'best':
      productsToShow = allProducts.slice(33, 50); // 17 produk terakhir
      break;
  }
  // Tampilkan produk halaman pertama
  displayProducts(productsToShow.slice(0, productsPerPage));
  // Atur tombol paginasi
  const prevBtn = document.getElementById('prev-products-btn');
  const nextBtn = document.getElementById('next-products-btn');
  if (productsToShow.length > productsPerPage) {
    nextBtn.style.display = 'inline-block';
    prevBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
  }
  window.currentProducts = productsToShow;
}

// Display products in grid
function displayProducts(products) {
  const productGrid = document.querySelector('.product-grid');
  if (!productGrid) return;
  productGrid.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.style.position = 'relative';
    // Create discount badge if applicable
    let badgeHtml = '';
    if (product.discount) {
      badgeHtml = `<div class="badge-discount">${product.discount}</div>`;
    }
    // Format price
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(product.price);
    const formattedOldPrice = product.oldprice ? new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(product.oldprice) : '';
    productCard.innerHTML = `
      ${badgeHtml}
      <img src="${product.img}" alt="${product.name}" class="product-img">
      <div class="product-name">${product.name}</div>
      <div class="product-rating" style="justify-content:center;align-items:center;text-align:center;width:100%;">
        <span style="display:inline-flex;align-items:center;gap:0.2rem;">
          <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
        </span>
        <span style="margin-left:0.5rem;font-size:0.93rem;color:#ffb700;">4.8</span>
      </div>
      <div class="product-price-row">
        <span class="product-price">${formattedPrice}</span>
        ${product.oldprice ? `<span class="product-oldprice">${formattedOldPrice}</span>` : ''}
      </div>
      <button onclick="addToCart('${product.name}', ${product.price}, '${product.img}')" 
              style="background: #ff8c00; color: #fff; border: none; padding: 0.6rem 0.9rem; border-radius: 50%; cursor: pointer; font-weight: 600; display:flex;align-items:center;justify-content:center; position:absolute; top:0.7rem; right:0.7rem; box-shadow:0 2px 8px rgba(255,140,0,0.10);">
        <i class='fa fa-shopping-cart' style='font-size:1.1rem;'></i>
      </button>
    `;
    productGrid.appendChild(productCard);
  });
}

// Add to cart function
function addToCart(name, price, img) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push({
    title: name,
    price: 'Rp ' + price.toLocaleString('id-ID'),
    img: img,
    qty: 1
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Product added to cart!');
}

// Pagination functions
function showNextProducts() {
  if (!window.currentProducts) return;
  const startIndex = (currentPage + 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const nextProducts = window.currentProducts.slice(startIndex, endIndex);
  if (nextProducts.length > 0) {
    displayProducts(nextProducts);
    currentPage++;
    document.getElementById('prev-products-btn').style.display = 'inline-block';
    if (endIndex >= window.currentProducts.length) {
      document.getElementById('next-products-btn').style.display = 'none';
    }
  }
}
function showPrevProducts() {
  if (!window.currentProducts) return;
  if (currentPage === 0) return;
  currentPage--;
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const prevProducts = window.currentProducts.slice(startIndex, endIndex);
  displayProducts(prevProducts);
  document.getElementById('next-products-btn').style.display = 'inline-block';
  if (currentPage === 0) {
    document.getElementById('prev-products-btn').style.display = 'none';
  }
}

// Tab event listeners
function setupTabEvents() {
  const tabLatest = document.getElementById('tab-latest');
  const tabTop = document.getElementById('tab-top');
  const tabBest = document.getElementById('tab-best');
  if (tabLatest) tabLatest.addEventListener('click', function() {
    setActiveTab('tab-latest');
    displayProductsByCategory('latest');
  });
  if (tabTop) tabTop.addEventListener('click', function() {
    setActiveTab('tab-top');
    displayProductsByCategory('top');
  });
  if (tabBest) tabBest.addEventListener('click', function() {
    setActiveTab('tab-best');
    displayProductsByCategory('best');
  });
}
function setActiveTab(tabId) {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));
  const activeTab = document.getElementById(tabId);
  if (activeTab) activeTab.classList.add('active');
}

// Inisialisasi saat DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  const productGrid = document.querySelector('.product-grid');
  if (productGrid) {
    displayProductsByCategory('latest');
    setupTabEvents();
    const nextBtn = document.getElementById('next-products-btn');
    const prevBtn = document.getElementById('prev-products-btn');
    if (nextBtn) nextBtn.addEventListener('click', showNextProducts);
    if (prevBtn) prevBtn.addEventListener('click', showPrevProducts);
  }
}); 