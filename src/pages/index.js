import './index.css';

const openEditBtn = document.querySelector('.profile__edit-button');
const openAddBtn = document.querySelector('.profile__add-button');
const updateAvatarBtn = document.querySelector('.profile__avatar-update-button');

const nameField = document.querySelector('.popup__input_field_name');
const descriptionField = document.querySelector('.popup__input_field_description');

const WAITING_CAPTION = 'Сохранение...';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmDel from '../components/PopupConfirmDel';
import UserInfo from '../components/UserInfo.js';
import { config } from '../utils/constants.js'; 

import Api from '../components/Api.js';

const api = new Api({
  //объект для взаимодействия с сервером
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'fabf3491-9d70-415a-b8dd-c9dde5f7947e',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({
  //объект, управляющий данными пользователя
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description',
  profileAvatarSelector: '.profile__avatar'
})

function handleCardDelete(card) {
  //колбэк удаления карточки для попапа подтверждения
  api.deleteCard(card.getId())
    .then(() => {
      card.cardRemoveElement();
    })
    .catch((err) => {
      console.log('Не удалось удалить карточку', err);
    })
    .then(() => {
      popupConfirmDel.close();
    })
}

const popupConfirmDel = new PopupConfirmDel('.popup_type_confirm', handleCardDelete);
popupConfirmDel.setEventListeners();


function handleCardClick(elementImage, elementTitle) {
  //колбэк клика на картинку карточки. Передается в конструктор класса Card
  popupWithImage.open(elementImage, elementTitle);
}

function handleCardLike(card) {
  //колбэк клика на иконку лайка. Передается в конструктор класса Card
  if (!card.isLiked()) {
    api.likeCard(card.getId())
    .then((res) =>{
        card.updateLikes(res.likes)
    })
    .catch((err) =>{
      console.log('Ошибка лайка карточки', err);
    });
  } else {
    api.dislikeCard(card.getId())
    .then((res) =>{
        card.updateLikes(res.likes)
    })
    .catch((err) =>{
      console.log('Ошибка дизлайка карточки', err);
    });
  }
} 

function handleDelClick(card) {
  //колбэк клика на иконку удаления. Передается в конструктор класса Card
  //аргумент функции - весь объект карточки
  popupConfirmDel.setCard(card);
  popupConfirmDel.open();
}

function createCard(obj, currentUserId) {
  //функция создания карточки без размещения в DOM. Помимо данных о названии карточки и ссылки на картинку (аргумент obj),
  //принимает данные о владельце карточки isOwner, лайкнута ли карточка isLike, числе лайков likeCount
  const card = new Card(obj, '#place-template', { handleCardClick, handleCardLike, handleDelClick }, { currentUserId });
  const cardElement = card.generateCard();
  return cardElement;
}

function changeBtnCaption(popup, caption) {
  //функция меняет надпись у кнопки submit попапа
  const btn = popup._popup.querySelector('.popup__submit-btn');
  btn.textContent = caption;
}

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit', (evt, { name, description }) => {
  //колбэк-функция операций по нажатию на кнопку submit формы редактирования профиля
  evt.preventDefault();
  changeBtnCaption(popupWithEditForm, WAITING_CAPTION);
  api.setUserInformation({ name, about: description })
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
    })
    .catch((err) => {
      console.log('Не удалось обновить данные пользователя', err);
    })
    .then(() => {
      popupWithEditForm.close();
    })
    .finally(() => {
      changeBtnCaption(popupWithEditForm, 'Сохранить');
    })
})

popupWithEditForm.setEventListeners();

function cardsListRenderer(item, id) {
  //функция-рендерер карточек, которая применяется при создании списка карточек
  const cardElement = createCard(item, id);
  cardsList.addItem(cardElement);
}

const cardsList = new Section({
  //объект, управляющий добавлением карточек в разметку,
  //в данном случае, в контейнер '.elements'
  renderer: cardsListRenderer},
  '.elements'
)

const popupWithAddForm = new PopupWithForm('.popup_type_add', (evt, { place, link }) => {
  //колбэк-функция операций по нажатию на кнопку submit формы добавления карточки
  evt.preventDefault();
  changeBtnCaption(popupWithAddForm, WAITING_CAPTION);
  api.createNewCard({name: place, link: link})
    .then((data) => {
      const cardElement = createCard(data, data.owner._id);
      cardsList.prependItem(cardElement);
    })
    .catch((err) => {
      console.log('Ошибка добавления новой карточки', err);
    })
    .then(() => {
      popupWithAddForm.close();
    })
    .finally(() => {
      changeBtnCaption(popupWithAddForm, 'Создать');
    });
})

popupWithAddForm.setEventListeners();

const popupUpdateAvatar = new PopupWithForm('.popup_type_update-avatar', (evt, { avatar }) => {
  //колбэк-функция операций по нажатию на кнопку submit
  evt.preventDefault();
  changeBtnCaption(popupUpdateAvatar, WAITING_CAPTION);
  api.updateAvatar({ avatar })
    .then((data) => {
      userInfo.setAvatar(data.avatar);
    })
    .catch((err) => {
      console.log('Ошибка обновления аватарки', err);
    })
    .then(() => {
      popupUpdateAvatar.close();
      changeBtnCaption(popupUpdateAvatar, 'Сохранить');
    });
})

popupUpdateAvatar.setEventListeners();

openEditBtn.addEventListener('click', () => {
  const { profileName, profileDescription } = userInfo.getUserInfo();
  nameField.value = profileName;
  descriptionField.value = profileDescription;
  popupWithEditForm.open();
})

openAddBtn.addEventListener('click', () => {
  popupWithAddForm.open();
})

updateAvatarBtn.addEventListener('click', () => {
  popupUpdateAvatar.open();
})

document.querySelectorAll('.popup__form').forEach((form) => {
  //к каждой форме подключаем валидацию
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
})

function renderPage() {
  //функция рендера страницы сайта
  Promise.all([
    api.getUserInformation(), 
    api.getInitialCards() ]) 
      .then(([info, initialCards]) => {
        userInfo.setUserInfo(info.name, info.about);
        userInfo.setAvatar(info.avatar);
        cardsList.renderItems(initialCards, info._id);

      }) 
      .catch((err)=>{
        console.log('Ошибка при загрузке страницы', err);
      })
}

renderPage();