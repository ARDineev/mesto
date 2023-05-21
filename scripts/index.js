const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const openEditBtn = profile.querySelector('.profile__edit-button');
const openAddBtn = profile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms['profile-info'];
const nameField = popupEdit.querySelector('.popup__input_field_name');
const descriptionField = popupEdit.querySelector('.popup__input_field_description');

const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.forms['place-info'];
const placeField = popupAdd.querySelector('.popup__input_field_place');
const imgField = popupAdd.querySelector('.popup__input_field_img-url');

const placeContainer = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup');

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, config } from './constants.js'; 


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
  const card = new Card({name: placeField.value, link: imgField.value}, '#place-template', openPopup);
  const cardElement = card.generateCard();
  placeContainer.prepend(cardElement);
  closePopup(popupAdd);
}

openEditBtn.addEventListener('click', () => {
  nameField.defaultValue = profileName.textContent;
  descriptionField.defaultValue = profileDescription.textContent;
  popupEditForm.reset();
  openPopup(popupEdit);
});

openAddBtn.addEventListener('click', () => {
  popupAddForm.reset();
  openPopup(popupAdd);
});

popupEdit.addEventListener('submit', handleEditFormSubmit);
popupAdd.addEventListener('submit', handleAddFormSubmit);

initialCards.forEach((item) => {
  const card = new Card(item, '#place-template', openPopup);
  const cardElement = card.generateCard();
  placeContainer.append(cardElement);
});

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

document.querySelectorAll('.popup__form').forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});