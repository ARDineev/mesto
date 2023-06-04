export default class FormValidator {
  //Класс, отвечающий за валидацию полей форм.
  //Чтобы добавить форме валидацию, необходимо создать экземпляр данного класса
  //с нужной формой, переданной вторым аргументом. Первым аргументом является
  //объект с селекторами. После создания экземпляра класса валидация активируется
  //методом enableValidation()
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  _disableButton() {
    //приватная функция, делающая кнопку submit данной формы неактивной
    this._submitButton.classList.add(`${this._inactiveButtonClass}`);
    this._submitButton.setAttribute('disabled', true);
  };

  _enableButton() {
    //приватная функция, делающая кнопку submit данной формы активной
    this._submitButton.classList.remove(`${this._inactiveButtonClass}`);
    this._submitButton.removeAttribute('disabled');
  };

  _showInputError(inputElement, errorMessage) {
    //приватная функция, показывающая текст ошибки (второй аргумент) у input-элемента (первый аргумент),
    //а также добавляет css-класс ошибки input-элементу
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}`);
  };

  _hideInputError(inputElement) {
    //приватная функция, скрывающая текст ошибки у input-элемента, а также удаляющая у него соответствующий css-класс
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = '';
  };

  _hasInvalidInput() {
    //приватная функция, которая ищет в списке всех полей формы хотя бы один невалидный input,
    //и, если такой находится, то функция возвращает true
    return this._inputFields.some((inputElement) => {
      return inputElement.validity.valid === false;
    });
  };

  _toggleButtonState() {
    //приватная функция, которая меняет состояние кнопки submit на противоположное
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    };
  };

  _checkInputValidity(inputElement) {
    //приватная функция, которая проверяет валиден ли конкретный input-элемент, и, соответственно
    //вызывает функции демонстрации/скрытия сообщений об ошибках (используются стандартные сообщения браузера)
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };

  _setEventListeners() {
    //приватная функция, назначающая слушателей:
    // - на событие "reset" (это событие принудительно вызывается при открытии формы), при этом кнопка submit
    //деактивируется, а все ошибки скрываются;
    // - на событие "input", при этом инициируется проверка валидности полей формы при любом изменении
    //в каждом из полей, и, при необходимости, кнопка submit становится активной/неактивной
    this._disableButton(); // при первом открытии попапа кнопка должна быть неактивной
    this._formElement.addEventListener('reset', () => {
      this._disableButton();
      this._inputFields.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    });
    this._inputFields.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    //публичный метод, при вызове которого у формы инициируется постоянный процесс проверки полей на валидность 
    this._inputFields = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
    this._submitButton = this._formElement.querySelector(`${this._submitButtonSelector}`);
    this._setEventListeners();
  }
}