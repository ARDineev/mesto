const openEditBtn = document.querySelector('.profile__edit-button');
const openAddBtn = document.querySelector('.profile__add-button');

const nameField = document.querySelector('.popup__input_field_name');
const descriptionField = document.querySelector('.popup__input_field_description');

const placeField = document.querySelector('.popup__input_field_place');
const imgField = document.querySelector('.popup__input_field_img-url');


import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, config } from '../utils/constants.js'; 


const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description' 
});

function createCard(obj) {
  //функция создания карточки без размещения в DOM
  const card = new Card(obj, '#place-template', () => {
    popupWithImage.open(card._elementImage, card._elementTitle);
  });
  return card.generateCard();
};

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit', (evt) => {
  //колбэк-функция операций по нажатию на кнопку submit формы редактирования профиля
  evt.preventDefault();
  userInfo.setUserInfo(nameField.value, descriptionField.value);
  popupWithEditForm.close();
});

popupWithEditForm.setEventListeners();

const popupWithAddForm = new PopupWithForm('.popup_type_add', (evt) => {
  //колбэк-функция операций по нажатию на кнопку submit формы добавления карточки
  evt.preventDefault();
  const cardElement = createCard({name: placeField.value, link: imgField.value});
  cardsList.prependItem(cardElement);
  popupWithAddForm.close();
});

popupWithAddForm.setEventListeners();


const cardsList = new Section({
  //объект, управляющий добавлением карточек в разметку,
  //в данном случае, в контейнер '.elements'
  data: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }},
  '.elements'
);

cardsList.renderItems(); //отрисовка начального массива карточек


openEditBtn.addEventListener('click', () => {
  const { profileName, profileDescription } = userInfo.getUserInfo();
  nameField.value = profileName;
  descriptionField.value = profileDescription;
  popupWithEditForm.open();
});

openAddBtn.addEventListener('click', () => {
  popupWithAddForm.open();
});


document.querySelectorAll('.popup__form').forEach((form) => {
  //к каждой форме подключаем валидацию
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});