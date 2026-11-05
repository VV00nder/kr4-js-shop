// ===============================
// Модальное окно и форма заявки
// ===============================

// Элементы страницы. Поиск по id и по БЭМ-классу кнопок заказа.
const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const successMessage = document.getElementById('success-message');
const orderButtons = document.querySelectorAll('.product-card__button[data-product]');

// Убираем признаки ошибок со всех полей формы.
function clearValidationState() {
  Array.from(orderForm.elements).forEach((element) => {
    element.removeAttribute('aria-invalid');
  });
}

// Помечаем некорректные поля атрибутом aria-invalid.
// Внешний вид ошибки задаётся в CSS: .order-form__input[aria-invalid="true"].
function markInvalidFields() {
  Array.from(orderForm.elements).forEach((element) => {
    if (element.willValidate && !element.checkValidity()) {
      element.setAttribute('aria-invalid', 'true');
    }
  });
}

// Открываем окно и записываем выбранный товар в скрытое поле.
function openOrderDialog(productName) {
  selectedProductInput.value = productName;
  orderDialog.showModal();
}

// Отправка формы: проверка, сообщение об успехе, закрытие окна.
function handleOrderSubmit(event) {
  // backend пока не подключён, поэтому стандартную отправку отменяем.
  event.preventDefault();

  clearValidationState();

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    markInvalidFields();
    orderForm.reportValidity();
    return;
  }

  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();
}

// Подключаем обработчики, только если окно есть на странице.
if (orderDialog && orderForm) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => openOrderDialog(button.dataset.product));
  });

  closeDialogButton.addEventListener('click', () => orderDialog.close());
  orderForm.addEventListener('submit', handleOrderSubmit);
}

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
