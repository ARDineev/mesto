import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  // Класс-наследник Popup, применяется для управления попапа с формой внутри.
  // Дополнительно принимает параметр: колбэк-функцию с реакцией на submit. 

  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    // приватный метод, который собирает данные всех полей формы и возвращает в виде объекта
    const { elements } = this._popupForm;
    const inputValues = {};

    Array.from(elements).forEach((element) => {
      const { name, value } = element;
      if (name != '') {inputValues[name] = value}; //у элемента кнопки нет name
    });
    return inputValues;
  }

  setEventListeners() {
    // в методе дополнительно подключается слушатель события submit, дополненный данными полей values
    this._popup.addEventListener('submit', (evt) => {
      const values = this._getInputValues();
      this._handleFormSubmit(evt, values)
    });
    super.setEventListeners();
  }

  close() {
    // в методе дополнительно сбрасывается форма при закрытии попапа
    this._popupForm.reset();
    super.close();
  }
}