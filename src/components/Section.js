export default class Section {
  // Класс для вставки элементов в разметку.
  // data - массив с данными, "что вставлять".
  // renderer - функция, определяющая отрисовку, "как вставлять".
  // containerSelector - селектор контейнера, "куда вставлять".

  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
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

  renderItems(array = this._initialArray) {
    // публичный метод, отрисовывает весь массив данных, применив функцию renderer
    array.forEach(item => {
      this._renderer(item);
    });
  }
}