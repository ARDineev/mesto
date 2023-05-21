export default class Card {
  //Класс карточки с фотографией местности и подписью.
  //Экземпляры класса могут быть "лайкнуты" и удалены нажатием
  //на соответствующие кнопки. Для создания карточки передаются
  //аргументы: объект со ссылкой на фотографию и текстом подписи,
  //а также css-селектор с шаблоном карточки.
  //Третьим аргументом передается функция открытия popup, реализованная извне.
  //Четвертым аргументом передается функция зумирования фотографии, также реализованная извне.
  constructor(data, templateSelector, openPopup, handleImageClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    //приватная функция, "клонирующая" шаблон будущей карточки
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    //публичный метод, создающий карточку с переданными параметрами и добавляющий интерактивным
    //элементам карточки слушателей событий. Метод возвращает объект карточки (который затем помещается в
    //DOM с помощью других функций)
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelBtn = this._element.querySelector('.element__delete');
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;;
    this._setEventListeners();
    return this._element;
  }

  _handleLikeClick() {
    //приватный метод "лайка" карточки
    this._elementLike.classList.toggle('element__like_active');
  }

  _handleDelBtnClick() {
    //приватный метод удаления карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    //приватный метод, который назначает слушателей события "click" на следующие
    //интерактивные элементы:
    // - картинка карточки, при клике фотография передается в соответствующий popup, фотография "зумируется";
    // - кнопка "лайк", при клике на которую меняется состояние данного элемента;
    // - кнопка удаления, при клике на которую вся карточка удаляется

    this._elementImage.addEventListener('click', () => {
      this._handleImageClick();
    });
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._elementDelBtn.addEventListener('click', () => {
      this._handleDelBtnClick();
    });
  }
}