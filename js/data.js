// ===============================
// Данные магазина
// ===============================

// Объект товара из ПР №15. Теперь вместо него используется массив products.
// const product = {
//   id: 1,
//   title: 'Space-Y',
//   category: 'rockets',
//   price: 1957294,
//   discountPercent: 10,
//   rating: 4.7,
//   isAvailable: true
// };

// Категории: rockets - ракеты, planes - самолеты и крылья,
// balloons - аэростаты, magic - сказочный транспорт, aliens - инопланетное
const products = [
  {
    id: 1,
    title: 'Space-Y',
    category: 'rockets',
    price: 1957294,
    discountPercent: 10,
    rating: 4.7,
    isAvailable: true,
    image: 'images/Space-Y.jpg',
    description: 'Лучший среди худших - худший среди лучших.'
  },
  {
    id: 2,
    title: 'Бочка Яги',
    category: 'magic',
    price: 1234284,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    image: 'images/bochka.jpg',
    description: 'Летательный аппарат суборбитальных полетов для истинных ценителей.'
  },
  {
    id: 3,
    title: 'Инопланетное яйцо',
    category: 'aliens',
    price: 1485000,
    discountPercent: 15,
    rating: 4.2,
    isAvailable: false,
    image: 'images/Luntik.jpg',
    description: 'Летательный аппарат первой внеземной жизни.'
  },
  {
    id: 4,
    title: 'Носовик',
    category: 'planes',
    price: 1323434,
    discountPercent: 5,
    rating: 3.9,
    isAvailable: true,
    image: 'images/noise.jpg',
    description: 'Как чихнет, так грянет.'
  },
  {
    id: 5,
    title: 'Крылья',
    category: 'planes',
    price: 134000,
    discountPercent: 0,
    rating: 4.1,
    isAvailable: true,
    image: 'images/fly.jpg',
    description: 'Для тех, кто хочет приблизиться к звездам лично.'
  },
  {
    id: 6,
    title: 'Пухляш',
    category: 'balloons',
    price: 168000,
    discountPercent: 20,
    rating: 3.5,
    isAvailable: false,
    image: 'images/Airlander.jpg',
    description: 'Мягкий и очень небезопасный аэростат.'
  },
  {
    id: 7,
    title: 'Звездочка',
    category: 'aliens',
    price: 99990,
    discountPercent: 0,
    rating: 5,
    isAvailable: true,
    image: 'images/preview.jpg',
    description: 'Маленький пришелец-попутчик. Светится в темноте и не кусается.'
  },
  {
    id: 8,
    title: 'Space-Y Kids',
    category: 'rockets',
    price: 499990,
    discountPercent: 25,
    rating: 4.8,
    isAvailable: true,
    image: 'images/Space-Y.jpg',
    description: 'Детская модель ракеты. Детские модели только у нас!'
  }
];
