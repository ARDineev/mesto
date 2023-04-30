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

initialCards.forEach((card) => {
  const place = createPlace(card.name, card.link);
  placeContainer.append(place);
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

function createPlace(placeValue, imgValue) {
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode(true);
  const elementTitle = placeElement.querySelector('.element__title');
  const elementImage = placeElement.querySelector('.element__image');
  const elementLike = placeElement.querySelector('.element__like');
  const deleteBtn = placeElement.querySelector('.element__delete');

  elementTitle.textContent = placeValue;
  elementImage.src = imgValue;
  elementImage.alt = placeValue;
  
  elementLike.addEventListener('click', () => {
    elementLike.classList.toggle('element__like_active');
  });

  elementImage.addEventListener('click', () => {
    imagePopup.src = elementImage.src;
    imagePopup.alt = elementTitle.textContent;
    imageCaptionPopup.textContent = elementTitle.textContent;
    openPopup(popupPicture);
  });
    
  deleteBtn.addEventListener('click', () => {
    placeElement.remove();
  });

  return placeElement;
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const place = createPlace(placeField.value, imgField.value);
  placeContainer.prepend(place);
  closePopup(popupAdd);
}

openEditBtn.addEventListener('click', () => {
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
  hideInputError(popupEditForm, nameField, config);
  hideInputError(popupEditForm, descriptionField, config);
  toggleButtonState([nameField, descriptionField], popupEditSubmitBtn, config);
  openPopup(popupEdit);
});

openAddBtn.addEventListener('click', () => {
  popupAddForm.reset();
  hideInputError(popupAddForm, placeField, config);
  hideInputError(popupAddForm, imgField, config);
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