const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const openEditBtn = profile.querySelector('.profile__edit-button');
const openAddBtn = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms['profile-info'];
const popupEditSubmitBtn = popupEdit.querySelector('.popup__submit-btn');
const nameField = popupEdit.querySelector('.popup__input_field_name');
const descriptionField = popupEdit.querySelector('.popup__input_field_description');

const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.forms['place-info'];
const popupAddSubmitBtn = popupAdd.querySelector('.popup__submit-btn');
const placeField = popupAdd.querySelector('.popup__input_field_place');
const imgField = popupAdd.querySelector('.popup__input_field_img-url');

const popupPicture = document.querySelector('.popup_type_picture');
const imagePopup = popupPicture.querySelector('.popup__image');
const imageCaptionPopup = popupPicture.querySelector('.popup__image-caption');

const placeContainer = document.querySelector('.elements');
const placeTemplate = document.querySelector('#place-template').content;
const popups = document.querySelectorAll('.popup');


class Card {
  //Класс карточки с фотографией местности и подписью.
  //Экземпляры класса могут быть "лайкнуты" и удалены нажатием
  //на соответствующие кнопки. Для создания карточки передаются
  //аргументы: объект со ссылкой на фотографию и текстом подписи,
  //а также css-селектор с шаблоном карточки
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector; 
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
  
  _setEventListeners() {
    //приватный метод, который назначает слушателей события "click" на следующие
    //интерактивные элементы:
    // - картинка карточки, при клике фотография передается в соответствующий popup;
    // - кнопка "лайк", при клике на которую меняется состояние данного элемента;
    // - кнопка удаления, при клике на которую вся карточка удаляется 
    this._elementImage.addEventListener('click', () => {
      imagePopup.src = this._elementImage.src;
      imagePopup.alt = this._elementTitle.textContent;
      imageCaptionPopup.textContent = this._elementTitle.textContent;
      openPopup(popupPicture);
    });
    this._elementLike.addEventListener('click', () => {
      this._elementLike.classList.toggle('element__like_active');
    });
    this._elementDelBtn.addEventListener('click', () => {
      this._element.remove();
    });
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, '#place-template');
  const cardElement = card.generateCard();
  placeContainer.append(cardElement);
});


function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};


function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();

 // const card = new Card(item, '#place-template');
//  const cardElement = card.generateCard();
 // placeContainer.append(cardElement);
  const card = new Card({name: placeField.value, link: imgField.value}, '#place-template');
  const cardElement = card.generateCard();
 // const place = createPlace(placeField.value, imgField.value);
  placeContainer.prepend(cardElement);
  closePopup(popupAdd);
}

openEditBtn.addEventListener('click', () => {
  nameField.defaultValue = profileName.textContent;
  descriptionField.defaultValue = profileDescription.textContent;
  popupEditForm.reset();
  console.log(nameField.value);

  
 // hideInputError(popupEditForm, nameField, config);
 // hideInputError(popupEditForm, descriptionField, config);
 // toggleButtonState([nameField, descriptionField], popupEditSubmitBtn, config);
  openPopup(popupEdit);
});

openAddBtn.addEventListener('click', () => {
  popupAddForm.reset();
 // hideInputError(popupAddForm, placeField, config);
 // hideInputError(popupAddForm, imgField, config);
  openPopup(popupAdd);
});

popupEdit.addEventListener('submit', handleEditFormSubmit);
popupAdd.addEventListener('submit', handleAddFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      };
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
      };
  });
});