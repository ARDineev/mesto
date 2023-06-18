import Popup from './Popup.js';

export default class PopupConfirmDel extends Popup {
  // Класс-наследник Popup, применяется для управления попапа с формой внутри.
  // Дополнительно принимает параметр: колбэк-функцию с реакцией на submit. 

  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);
    this._handleCardDelete = handleCardDelete;
    this.card = {};
  }

  _handleConfirm = () => {
    this._handleCardDelete(this.card);
  }

/*   setConfirmBtnListener() {
    this._popup.querySelector('.popup__submit-btn').addEventListener('click', this._handle);
  } */
  
  open() {
    this._popup.querySelector('.popup__submit-btn').addEventListener('click', this._handleConfirm);
    super.open();
  }

  close() {
    // публичный метод, закрывает попап и удаляет слушатель клавиши ESC
    this._popup.querySelector('.popup__submit-btn').removeEventListener('click', this._handleConfirm);
    super.close();
  }
}