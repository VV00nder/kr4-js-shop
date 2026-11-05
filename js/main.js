// ===============================
// Общий файл проекта. Модальное окно перенесено в modal.js
// ===============================

// Код ПР №15 закомментирован: вместо объекта product теперь массив products (см. data.js)
/*
// ===============================
// Практическая работа №15: основы JavaScript
// ===============================

console.log('Файл main.js подключён');
console.log(product);
console.table(product);

// Форматирование цены: число -> строка с "руб."
function formatPrice(price) {
  return `${price} руб.`;
}

// Размер скидки в рублях
function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

// Итоговая цена с учетом скидки
function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);

  return price - discountValue;
}

// Статус товара по свойству isAvailable
function getProductStatus(product) {
  if (product.isAvailable) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

// Краткое описание товара одной строкой
function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const status = getProductStatus(product);

  return `${product.title}: ${formatPrice(finalPrice)}. Статус: ${status}.`;
}

console.log(formatPrice(product.price));
console.log(calculateDiscount(product.price, product.discountPercent));
console.log(calculateFinalPrice(product.price, product.discountPercent));
console.log(getProductStatus(product));

// Проверка операторов сравнения и логических операторов
const isExpensive = product.price > 1000000;
const isGoodChoice = product.isAvailable && product.rating >= 4.5;
console.log('Дорогой товар:', isExpensive);
console.log('Хороший выбор:', isGoodChoice);

const productSummary = createProductSummary(product);
console.log(productSummary);

// Вывод на страницу. Проверки нужны, т.к. main.js подключен на нескольких страницах
const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
  messageElement.textContent = 'JavaScript подключён корректно.';
}

if (productOutputElement) {
  productOutputElement.textContent = productSummary;
}

// Небезопасный вариант (только для демонстрации, не использовать):
// const unsafeExample = '<img src=x onerror=alert(1)>';
// productOutputElement.innerHTML = unsafeExample;
// Безопасно: productOutputElement.textContent = unsafeExample;
*/

// ===============================
// Практическая работа №16: массив товаров
// ===============================

console.log('Файл main.js подключён');
console.log(products);
console.table(products);

// Массив названий товаров
function getProductTitles(products) {
  return products.map((product) => product.title);
}

// Только товары в наличии
function getAvailableProducts(products) {
  return products.filter((product) => product.isAvailable);
}

// Поиск по названию (без учета регистра)
function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return products;
  }

  return products.filter((product) => {
    return product.title.toLowerCase().includes(normalizedQuery);
  });
}

// Фильтр по категории, all - все товары
function filterProductsByCategory(products, category) {
  if (category === 'all') {
    return products;
  }

  return products.filter((product) => {
    return product.category === category;
  });
}

// Сортировка по цене. Сортируем копию, исходный массив не меняется
function sortProductsByPrice(products, direction = 'asc') {
  const productsCopy = [...products];

  if (direction === 'desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }

  return productsCopy.sort((a, b) => a.price - b.price);
}

function findProductById(products, id) {
  return products.find((product) => product.id === id);
}

// Общая стоимость через reduce
function calculateTotalPrice(products) {
  return products.reduce((sum, product) => {
    return sum + product.price;
  }, 0);
}

function countAvailableProducts(products) {
  return products.filter((product) => product.isAvailable).length;
}

function calculateAveragePrice(products) {
  if (products.length === 0) {
    return 0;
  }

  const totalPrice = calculateTotalPrice(products);

  return Math.round(totalPrice / products.length);
}

// Поиск + фильтр + сортировка вместе
function getPreparedProducts(products, query, category, sortDirection) {
  let result = [...products];

  result = searchProducts(result, query);
  result = filterProductsByCategory(result, category);
  result = sortProductsByPrice(result, sortDirection);

  return result;
}

console.log(getProductTitles(products));
console.table(getAvailableProducts(products));
console.table(searchProducts(products, 'space'));
console.table(filterProductsByCategory(products, 'planes'));
console.table(sortProductsByPrice(products, 'asc'));
console.table(sortProductsByPrice(products, 'desc'));

const selectedProduct = findProductById(products, 3);

if (selectedProduct) {
  console.log(`Найден товар: ${selectedProduct.title}`);
} else {
  console.log('Товар не найден');
}

console.log(calculateTotalPrice(products));
console.log(countAvailableProducts(products));
console.log(calculateAveragePrice(products));
console.table(getPreparedProducts(products, 'space', 'rockets', 'asc'));

// Цикл for...of: считаем товары со скидкой
let discountCount = 0;
for (const item of products) {
  if (item.discountPercent > 0) {
    discountCount++;
  }
}
console.log('Товаров со скидкой:', discountCount);

const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
  messageElement.textContent = 'Массив товаров и функции обработки данных подключены.';
}

if (productOutputElement) {
  productOutputElement.textContent = [
    `Всего товаров: ${products.length}`,
    `Товаров в наличии: ${countAvailableProducts(products)}`,
    `Товаров со скидкой: ${discountCount}`,
    `Средняя цена: ${calculateAveragePrice(products)} руб.`,
    `Результатов поиска "space": ${searchProducts(products, 'space').length}`
  ].join('\n');
}
