export default class Card {
  //Класс карточки с фотографией местности и подписью.
  //Экземпляры класса могут быть "лайкнуты" и удалены нажатием
  //на соответствующие кнопки. Для создания карточки передаются
  //аргументы: объект со ссылкой на фотографию и текстом подписи,
  //а также css-селектор с шаблоном карточки.
  //Третьим аргументом передается объект с функциями, реализованными извне:
  //зумирования фотографии, лайка карточки, удаления карточки.
  //Четвертый аргумент - объект с информацией о владельце карточки,
  //лайкнута ли карточка пользователем, число лайков карточки вообще

  constructor(data, templateSelector, handlers, params) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleCardLike = handlers.handleCardLike;
    this._handleDelClick = handlers.handleDelClick;
    this.id = data._id; //уникальный номер карточки по данным с сервера
    this._isOwner = params.isOwner;
    this._isLike = params.isLike;
    this._likeCount = params.likeCount;
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

  _setLikeCount() {
    //приватная функция, устанавливает число лайков на карточке согласно свойству объекта _likeCount
    this._elementCount = this._element.querySelector('.element__like-count');
    this._elementCount.textContent = this._likeCount;
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
    this._setLikeCount(this._element);
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._setEventListeners();
    if (!this._isOwner) this._elementDelBtn.remove(); //если не владелец карточки - убрать корзину
    if (this._isLike) this._elementLike.classList.add('element__like_active'); //если карточка лайкнута
    return this._element;
  }

  cardRemoveElement() {
    //метод, удаляющий карточку
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
      this._handleCardClick();
    });
    this._elementLike.addEventListener('click', () => {
      this._handleCardLike(this.id);
    });
    if (this._isOwner) {
      this._elementDelBtn.addEventListener('click', () => {
        this._handleDelClick(this);
      });
    }
  }
}