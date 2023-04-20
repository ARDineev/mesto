const openEditBtn = document.querySelector('.profile__edit-button');
const openAddBtn = document.querySelector('.profile__add-button');

const closeBtns = document.querySelectorAll('.popup__close-btn');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPicture = document.querySelector('.popup_type_picture');

const nameField = document.querySelector('.popup__input_field_name');
const descriptionField = document.querySelector('.popup__input_field_description');

const placeField = document.querySelector('.popup__input_field_place');
const imgField = document.querySelector('.popup__input_field_img-url');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const placeContainer = document.querySelector('.elements');

const imagePopup = document.querySelector('.popup__image');
const imageCaptionPopup = document.querySelector('.popup__image-caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

initialCards.forEach((card) => {
  addPlace(card.name, card.link);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function addPlace(placeValue, imgValue) {
  const placeTemplate = document.querySelector('#place-template').content;
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
    imageCaptionPopup.textContent = elementTitle.textContent;
    openPopup(popupPicture);
  });
    
  deleteBtn.addEventListener('click', () => {
    placeElement.remove();
  });

  placeContainer.prepend(placeElement);
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const place = document.querySelector('.popup__input_field_place');
  const imgUrl = document.querySelector('.popup__input_field_img-url');
  addPlace(place.value, imgUrl.value);
  closePopup(popupAdd);
}

openEditBtn.addEventListener('click', () => {
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
  openPopup(popupEdit);
});

openAddBtn.addEventListener('click', () => {
  placeField.value = '';
  imgField.value = '';
  openPopup(popupAdd);
});

popupEdit.addEventListener('submit', handleEditFormSubmit);
popupAdd.addEventListener('submit', handleAddFormSubmit);

closeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const popup = btn.closest('.popup');
    closePopup(popup);
  });
});