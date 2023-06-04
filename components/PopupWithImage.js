import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  // Класс-наследник Popup, применяется для открытия-закрытия попапа с картинкой

  open(elementImage, elementTitle) {
    // публичный метод, принимает параметры с данными картинки и подписи к ней; открывает попап
    const imagePopup = this._popup.querySelector('.popup__image');
    const imageCaptionPopup = this._popup.querySelector('.popup__image-caption');
    imagePopup.src = elementImage.src;
    imagePopup.alt = elementTitle.textContent;
    imageCaptionPopup.textContent = elementTitle.textContent;
    super.open();
  }
}