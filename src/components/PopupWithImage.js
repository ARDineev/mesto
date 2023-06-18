import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // Класс-наследник Popup, применяется для открытия-закрытия попапа с картинкой.
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._imageCaptionPopup = this._popup.querySelector('.popup__image-caption');
  }

  open(elementImage, elementTitle) {
    // публичный метод, принимает параметры с данными картинки и подписи к ней; открывает попап
    this._imagePopup.src = elementImage.src;
    this._imagePopup.alt = elementTitle.textContent;
    this._imageCaptionPopup.textContent = elementTitle.textContent;
    super.open();
  }
}