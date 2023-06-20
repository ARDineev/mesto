import Popup from './Popup.js';

export default class PopupConfirmDel extends Popup {
  // Класс-наследник Popup, применяется для управления попапа с подтверждением удаления.
  // Дополнительно принимает параметр: колбэк-функцию с реакцией на click кнопки подтверждения. 

  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this.card = {}; //объект карточки является свойством данного попапа. Перезаписывается извне
  }

  _handleConfirm = () => {
    this._handleCardDelete(this.card);
  }
  
  open() {
    // публичный метод, открывает попап и устанавливает слушатель клика
    this._popup.querySelector('.popup__submit-btn').addEventListener('click', this._handleConfirm);
    super.open();
  }

  close() {
    // публичный метод, закрывает попап и удаляет слушатель клика
    this._popup.querySelector('.popup__submit-btn').removeEventListener('click', this._handleConfirm);
    super.close();
  }
}