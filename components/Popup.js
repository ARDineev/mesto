export default class Popup {
  // Класс, отвечающий за открытие и закрытие попапа.
  // При создании экземпляра класса указывается селектор попапа.

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // публичный метод, открывает попап и устанавливает ему слушатель клавиши ESC
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    // публичный метод, закрывает попап и удаляет слушатель клавиши ESC
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    // приватный метод-слушатель события нажатия на клавишу ESC
    if (evt.key === 'Escape') {
       this.close();
    };
  }

  _handleMouseClose(evt) {
    // приватный метод-слушатель события нажатия на левую кнопку мыши
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    };
    if (evt.target.classList.contains('popup__close-btn')) {
      this.close();
    };
  }

  setEventListeners() {
    // публичный метод, устанавливающий слушатель события нажатия на левую кнопку мыши
    this._popup.addEventListener('mousedown', this._handleMouseClose.bind(this));
  }
}