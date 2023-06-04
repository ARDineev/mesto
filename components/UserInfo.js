export default class UserInfo {
  // класс, отвечающий за управление отображением информации о пользователе на странице.
  // Принимает в конструктор объект с селекторами двух элементов:
  // элемента имени пользователя и элемента информации о себе
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo() {
    // публичный метод, возвращающий объект с данными пользователя
    const userData = {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent
    };
    return userData
  }

  setUserInfo(nameFieldValue, descriptionFieldValue) {
    // публичный метод, который принимает новые данные пользователя и обновляет их на странице
    this._profileName.textContent = nameFieldValue;
    this._profileDescription.textContent = descriptionFieldValue;
  }
}