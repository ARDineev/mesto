import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Класс-наследник Popup, применяется для управления попапа с формой внутри.
  // Дополнительно принимает параметр: колбэк-функцию с реакцией на submit. 

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // приватный метод, который собирает данные всех полей формы и возвращает в виде объекта
    const { elements } = this._popup.querySelector('.popup__form');
    const inputValues = {};

    Array.from(elements).forEach((element) => {
      const { name, value } = element;
      if (name != '') {inputValues[name] = value}; //у элемента кнопки нет name
    });
    return inputValues;
  }

  setEventListeners() {
    // в методе дополнительно подключается слушатель события submit
    this._popup.addEventListener('submit', this._handleFormSubmit.bind(this));
    super.setEventListeners();
  }

  close() {
    // в методе дополнительно сбрасывается форма при закрытии попапа
    const popupForm = this._popup.querySelector('.popup__form');
    popupForm.reset();
    super.close();
  }
}