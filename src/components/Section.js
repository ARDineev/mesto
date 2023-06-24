export default class Section {
  // Класс для вставки элементов в разметку.
  // renderer - функция, определяющая отрисовку, "как вставлять".
  // containerSelector - селектор контейнера, "куда вставлять".

  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    // публичный метод, принимает параметр element и вставляет в разметку способом append
    this._container.append(element);
  }

  prependItem(element) {
    // публичный метод, принимает параметр element и вставляет в разметку способом prepend
    this._container.prepend(element);
  }

  renderItems(array, id) {
    // публичный метод, отрисовывает массив данных для пользователя id, применив функцию renderer
    array.forEach(item => {
      this._renderer(item, id);
    });
  }
}