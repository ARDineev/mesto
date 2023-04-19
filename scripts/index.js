const openEditBtn = document.querySelector('.profile__edit-button');
const openAddBtn = document.querySelector('.profile__add-button');

const closeEditBtn = document.querySelector('.popup__close-btn_type_edit');
const closeAddBtn = document.querySelector('.popup__close-btn_type_add');
const closePictureBtn = document.querySelector('.popup__close-btn_type_picture');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const nameField = document.querySelector('.popup__input_field_name');
const descriptionField = document.querySelector('.popup__input_field_description');

const placeField = document.querySelector('.popup__input_field_place');
const imgField = document.querySelector('.popup__input_field_img-url');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const deleteButtons = document.querySelectorAll('.element__delete');

const placeContainer = document.querySelector('.elements');

//const imageElement = document.querySelector('.element__image'); //

//const titleElement = document.querySelector('.element__title'); //

const popupPicture = document.querySelector('.popup_type_picture'); //

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



//function openPopupEdit() {
//  popupEdit.classList.add('popup_opened');
//  nameField.value = profileName.textContent;
//  descriptionField.value = profileDescription.textContent;
//}

//function closeEditPopup() {
//  popup.classList.remove('popup_opened');
//}

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileDescription.textContent = descriptionField.value;
  popupEdit.classList.remove('popup_opened');  //DRY
}

function addPlace(placeValue, imgValue) {
  const placeTemplate = document.querySelector('#place-template').content;
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode(true);
  const elementTitle = placeElement.querySelector('.element__title');
  const elementImage = placeElement.querySelector('.element__image');

  const elementLike = placeElement.querySelector('.element__like');

  elementTitle.textContent = placeValue;
  elementImage.src = imgValue;
  elementImage.alt = placeValue;

  elementLike.addEventListener('click', () => {
    elementLike.classList.toggle('element__like_active');
  })

  elementImage.addEventListener('click', () => {
    //  const listItem = button.closest('.elements__item');
    imagePopup.src = elementImage.src;
    imageCaptionPopup.textContent = elementTitle.textContent;
    popupPicture.classList.add('popup_opened');
    });

  placeContainer.prepend(placeElement);
  const deleteBtn = placeElement.querySelector('.element__delete');
  deleteBtn.addEventListener('click', () => {
  //  const listItem = button.closest('.elements__item');
    placeElement.remove();
  });
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const place = document.querySelector('.popup__input_field_place');
  const imgUrl = document.querySelector('.popup__input_field_img-url');

  addPlace(place.value, imgUrl.value);
  popupAdd.classList.remove('popup_opened');  //DRY
}

openEditBtn.addEventListener('click', () => {
  popupEdit.classList.add('popup_opened');
  nameField.value = profileName.textContent;
  descriptionField.value = profileDescription.textContent;
});

closeEditBtn.addEventListener('click', () => {
  popupEdit.classList.remove('popup_opened');  //DRY
});

popupEdit.addEventListener('submit', handleEditFormSubmit);

popupAdd.addEventListener('submit', handleAddFormSubmit);

openAddBtn.addEventListener('click', () => {

  popupAdd.classList.add('popup_opened');
  placeField.value = '';
  imgField.value = '';
});

closeAddBtn.addEventListener('click', () => {
  popupAdd.classList.remove('popup_opened');  //DRY
});

closePictureBtn.addEventListener('click', () => {
  popupPicture.classList.remove('popup_opened');  //DRY
});


deleteButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const listItem = button.closest('.elements__item');
    listItem.remove();
  })
});
