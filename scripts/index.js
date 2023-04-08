const openEditBtn = document.querySelector('.profile__edit-button');
const formCloseBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const nameField = document.querySelector('.popup__input_field_name');
const descriptionField = document.querySelector('.popup__input_field_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


function openPopup() {
  popup.classList.add('popup_opened');
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  closePopup();
}

openEditBtn.addEventListener('click', openPopup);
formCloseBtn.addEventListener('click', closePopup);
popup.addEventListener('submit', handleFormSubmit);