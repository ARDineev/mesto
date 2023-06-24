export default class UserInfo {
  // класс, отвечающий за управление отображением информации о пользователе на странице.
  // Принимает в конструктор объект с селекторами трех элементов:
  // элемента имени пользователя, элемента информации о себе, элемента изображения аватарки
  constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    // публичный метод, возвращающий объект с данными пользователя
    const userData = {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent,
      profileAvatar: this._profileAvatar.src
    };
    return userData
  }

  setUserInfo(nameFieldValue, descriptionFieldValue) {
    // публичный метод, который принимает новые данные пользователя и обновляет их на странице
    this._profileName.textContent = nameFieldValue;
    this._profileDescription.textContent = descriptionFieldValue;
  }

  setAvatar(avatarUrl) {
    //публичный метод, меняющий аватар по ссылке в аргументе функции
    this._profileAvatar.src = avatarUrl;
  }
}