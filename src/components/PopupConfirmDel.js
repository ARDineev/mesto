import Popup from './Popup.js';

export default class PopupConfirmDel extends Popup {
  // Класс-наследник Popup, применяется для управления попапа с подтверждением удаления.
  // Дополнительно принимает параметр: колбэк-функцию с реакцией на click кнопки подтверждения. 

  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this._card = {}; //объект карточки является свойством данного попапа
  }

  setCard(card) {
    //публичный метод, перезаписывает свойство _card
    this._card = card;
  }

  _handleConfirm = () => {
    this._handleCardDelete(this._card);
  }
  
  setEventListeners() {
    // публичный метод, устанавливающий слушатели событий
    this._popup.querySelector('.popup__submit-btn').addEventListener('click', this._handleConfirm);
    super.setEventListeners();
  }
}