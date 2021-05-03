export function generateId(array) {
  // получаем массив со всеми идентификаторами тасков
  const ids = array.map((item) => item.id);

  // если у нас пустой массив, мы начинаем нумерацию с единицы
  if (!ids.length) {
    return 1;
  }

  // находим максимальный id
  const maxId = Math.max(...ids);

  // возвращаем больший, который больше максимального на 1
  return maxId + 1;
}
