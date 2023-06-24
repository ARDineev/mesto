export default class Card {
  //Класс карточки с фотографией местности и подписью.
  //Экземпляры класса могут быть "лайкнуты" и удалены нажатием
  //на соответствующие кнопки. Для создания карточки передаются
  //аргументы: объект со ссылкой на фотографию и текстом подписи,
  //а также css-селектор с шаблоном карточки.
  //Третьим аргументом передается объект с функциями, реализованными извне:
  //зумирования фотографии, лайка карточки, удаления карточки.
  //Четвертый аргумент - объект с информацией о текущем пользователе

  constructor(data, templateSelector, handlers, settings) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlers.handleCardClick;
    this._handleCardLike = handlers.handleCardLike;
    this._handleDelClick = handlers.handleDelClick;
    this._id = data._id; //уникальный номер карточки по данным с сервера
    this._likeCount = data.likes.length;
    this._likes = data.likes; //массив лайков
    this._userId = settings.currentUserId; //id текущего пользователя
    this._ownerId = data.owner._id; //id "хозяина" карточки
  }

  getId() {
    //публичный метод, возвращающий id карточки
    return this._id
  }

  isLiked() {
    //публичный метод, проверяющий, лайкнул ли данный пользователь карточку
    return this._likes.some((like) => like._id === this._userId)
  }

  isOwner() {
    //публичный метод, проверяющий, является ли текущий пользователь хозяином карточки
    return this._ownerId === this._userId;
  }

  _updateLikesView() {
    //приватный метод для обновления всей информации о лайках
    this._elementCount.textContent = this._likes.length;
    this._elementLike.classList.toggle('element__like_active', this.isLiked());
  }

  updateLikes(likes) {
    //публичный метод, принимает массив лайков и обновляет информацию о лайках карточки
    this._likes = likes;
    this._updateLikesView()
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
    this._elementCount = this._element.querySelector('.element__like-count');
    this._elementCount.textContent = this._likeCount;
    this._elementImage.src = this._image;
    this._elementImage.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._setEventListeners();
    if (!this.isOwner()) this._elementDelBtn.remove(); //если не владелец карточки - убрать корзину
    if (this.isLiked()) this._elementLike.classList.add('element__like_active'); //если карточка лайкнута
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
      this._handleCardClick(this._elementImage, this._elementTitle);
    });
    this._elementLike.addEventListener('click', () => {
      this._handleCardLike(this);
    });
    if (this.isOwner()) {
      this._elementDelBtn.addEventListener('click', () => {
        this._handleDelClick(this);
      });
    }
  }
}