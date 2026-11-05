// ===============================
// Корзина. Хранится в localStorage
// ===============================

const CART_KEY = 'kosmo-cart';

// Промокоды: код -> процент скидки
const promoCodes = {
  KOSMOS: 10,
  BOCHKA: 15
};

// Элемент корзины: { id: 1, count: 2 }
let cartItems = loadCart();
let activePromo = '';

function loadCart() {
  const savedCart = localStorage.getItem(CART_KEY);

  if (!savedCart) {
    return [];
  }

  // Если в localStorage что-то сломалось, начинаем с пустой корзины
  try {
    return JSON.parse(savedCart);
  } catch (error) {
    console.warn('Не удалось прочитать корзину', error);
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

function getFinalPrice(product) {
  return Math.round(product.price - product.price * product.discountPercent / 100);
}

function addToCart(productId) {
  const item = cartItems.find((cartItem) => cartItem.id === productId);

  if (item) {
    item.count++;
  } else {
    cartItems.push({ id: productId, count: 1 });
  }

  saveCart();
  updateCartCounter();
}

// Уменьшить количество на 1, при 0 товар удаляется
function decreaseCartItem(productId) {
  const item = cartItems.find((cartItem) => cartItem.id === productId);

  if (!item) {
    return;
  }

  item.count--;

  if (item.count <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartCounter();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((cartItem) => cartItem.id !== productId);
  saveCart();
  updateCartCounter();
}

function clearCart() {
  cartItems = [];
  saveCart();
  updateCartCounter();
}

function getCartCount() {
  return cartItems.reduce((sum, item) => sum + item.count, 0);
}

// Сумма корзины через reduce
function getCartTotal() {
  return cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);

    if (!product) {
      return sum;
    }

    return sum + getFinalPrice(product) * item.count;
  }, 0);
}

function getTotalWithPromo() {
  const total = getCartTotal();

  if (activePromo === '') {
    return total;
  }

  return Math.round(total - total * promoCodes[activePromo] / 100);
}

function updateCartCounter() {
  const cartCounter = document.querySelector('.cart-counter');
  const cartLink = document.querySelector('[data-cart-link]');
  const count = getCartCount();

  if (cartCounter) {
    cartCounter.textContent = `В корзине: ${count}`;
  }

  if (cartLink) {
    cartLink.textContent = count > 0 ? `Корзина (${count})` : 'Корзина';
  }
}

// ===============================
// Страница cart.html
// ===============================

const cartList = document.querySelector('[data-cart-list]');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const cartSummary = document.querySelector('.cart-summary');
const clearCartButton = document.querySelector('#clear-cart');
const promoForm = document.querySelector('.promo-form');
const promoMessage = document.querySelector('.promo-message');

function createCartItem(item) {
  const product = products.find((p) => p.id === item.id);

  const li = document.createElement('li');
  li.classList.add('cart-item');

  const image = document.createElement('img');
  image.classList.add('cart-item__image');
  image.src = product.image;
  image.alt = product.title;

  const title = document.createElement('h3');
  title.classList.add('cart-item__title');
  title.textContent = product.title;

  const price = document.createElement('p');
  price.classList.add('cart-item__price');
  const finalPrice = getFinalPrice(product);
  price.textContent = `${finalPrice.toLocaleString('ru-RU')} руб. × ${item.count} = ${(finalPrice * item.count).toLocaleString('ru-RU')} руб.`;

  const actions = document.createElement('div');
  actions.classList.add('cart-item__actions');

  const minusButton = document.createElement('button');
  minusButton.classList.add('button', 'button--secondary');
  minusButton.type = 'button';
  minusButton.textContent = '−';
  minusButton.dataset.action = 'decrease';
  minusButton.dataset.productId = String(product.id);
  minusButton.setAttribute('aria-label', `Уменьшить количество: ${product.title}`);

  const plusButton = document.createElement('button');
  plusButton.classList.add('button', 'button--secondary');
  plusButton.type = 'button';
  plusButton.textContent = '+';
  plusButton.dataset.action = 'increase';
  plusButton.dataset.productId = String(product.id);
  plusButton.setAttribute('aria-label', `Увеличить количество: ${product.title}`);

  const removeButton = document.createElement('button');
  removeButton.classList.add('button', 'button--secondary');
  removeButton.type = 'button';
  removeButton.textContent = 'Удалить';
  removeButton.dataset.action = 'remove';
  removeButton.dataset.productId = String(product.id);

  actions.append(minusButton, plusButton, removeButton);
  li.append(image, title, price, actions);

  return li;
}

function renderCart() {
  cartList.textContent = '';

  // убираем товары, которых нет в data.js (на всякий случай)
  cartItems = cartItems.filter((item) => products.some((p) => p.id === item.id));

  cartItems.forEach((item) => {
    cartList.append(createCartItem(item));
  });

  const isEmpty = cartItems.length === 0;
  cartEmpty.hidden = !isEmpty;
  cartSummary.hidden = isEmpty;

  let totalText = `Итого: ${getCartTotal().toLocaleString('ru-RU')} руб.`;

  if (activePromo !== '') {
    totalText += ` | С промокодом ${activePromo}: ${getTotalWithPromo().toLocaleString('ru-RU')} руб.`;
  }

  cartTotal.textContent = totalText;
}

if (cartList) {
  cartList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');

    if (!button) {
      return;
    }

    const productId = Number(button.dataset.productId);

    if (button.dataset.action === 'increase') {
      addToCart(productId);
    }

    if (button.dataset.action === 'decrease') {
      decreaseCartItem(productId);
    }

    if (button.dataset.action === 'remove') {
      removeFromCart(productId);
    }

    renderCart();
  });

  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      clearCart();
      renderCart();
    });
  }

  if (promoForm) {
    promoForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const code = promoForm.querySelector('#promo-code').value.trim().toUpperCase();

      if (promoCodes[code]) {
        activePromo = code;
        promoMessage.textContent = `Промокод применён: скидка ${promoCodes[code]}%.`;
      } else {
        activePromo = '';
        promoMessage.textContent = 'Такого промокода нет.';
      }

      renderCart();
    });
  }

  renderCart();
}

updateCartCounter();
