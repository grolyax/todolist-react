export function getLastOrder(array) {
  // получаем массив со всеми идентификаторами тасков
  const orders = array.map((item) => item.order);

  // если у нас пустой массив, мы начинаем нумерацию с единицы
  if (!orders.length) {
    return 1;
  }

  // находим максимальный id
  const maxOrder = Math.max(...orders);

  // возвращаем больший, который больше максимального на 1
  return maxOrder + 1;
}
