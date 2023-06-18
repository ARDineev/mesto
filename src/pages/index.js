import './index.css';

const openEditBtn = document.querySelector('.profile__edit-button');
const openAddBtn = document.querySelector('.profile__add-button');

const nameField = document.querySelector('.popup__input_field_name');
const descriptionField = document.querySelector('.popup__input_field_description');


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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'fabf3491-9d70-415a-b8dd-c9dde5f7947e',
    'Content-Type': 'application/json'
  }
}); 


const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileDescriptionSelector: '.profile__description' 
});


function handleCardDelete(card) {
  api.deleteCard(card.id)
    .then(() => {
      card.cardRemoveElement();
    })
    .catch((err) => {
      console.log('Не удалось удалить карточку', err);
    })
    .finally(() => {
      this.close();
    })
}


const popupConfirmDel = new PopupConfirmDel('.popup_type_confirm', handleCardDelete);
popupConfirmDel.setEventListeners();


function handleCardClick() {
  popupWithImage.open(this._elementImage, this._elementTitle);
};


function handleCardLike(id) {
  if (!this._isLike) { 
    api.likeCard(id)
      .then((data) => {
        console.log(data);
        this._elementLike.classList.toggle('element__like_active');
        this._likeCount = data.likes.length;
        this._setLikeCount();
      })
      .catch((err) => {
        console.log('Ошибка лайка карточки', err);
      })
  } else {
    api.dislikeCard(id)
      .then((data) => {
        this._elementLike.classList.toggle('element__like_active');
        this._likeCount = data.likes.length;
        this._setLikeCount();
      })
      .catch((err) => {
        console.log('Ошибка дизлайка карточки', err);
      })
  };
  this._isLike = !(this._isLike);
};


function handleDelClick(card) {
  popupConfirmDel.card = card;
  popupConfirmDel.open();
  console.log(popupConfirmDel.card);
};


function createCard(obj, isOwner, isLike, likeCount = 0) {
  //функция создания карточки без размещения в DOM
  const card = new Card(obj, '#place-template', { handleCardClick, handleCardLike, handleDelClick }, { isOwner, isLike, likeCount });
 // console.log(card._id);
  const cardElement = card.generateCard();
/*   if (!isOwner) cardElement.querySelector('.element__delete').remove(); //если карточку загрузил другой пользователь, удаляем "корзину"
  if (isLike) cardElement.querySelector('.element__like').classList.add('element__like_active'); */
  return cardElement;
};

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit', (evt, { name, description }) => {
  //колбэк-функция операций по нажатию на кнопку submit формы редактирования профиля
  evt.preventDefault();
  api.setUserInformation({ name, about: description })
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
    })
    .catch((err) => {
      console.log('Не удалось обновить данные пользователя');
      console.log(err);
    })
    .finally(() => {
      popupWithEditForm.close();
    })
});

popupWithEditForm.setEventListeners();


function cardsListRenderer(item) {
  //функция-рендерер карточек, которая применяется при создании списка карточек
  const cardElement = createCard(item, true, false);
  this.addItem(cardElement);
}

const cardsList = new Section({
  //объект, управляющий добавлением карточек в разметку,
  //в данном случае, в контейнер '.elements'
  data: {},
  renderer: cardsListRenderer},
  '.elements'
);

const popupWithAddForm = new PopupWithForm('.popup_type_add', (evt, { place, link }) => {
  //колбэк-функция операций по нажатию на кнопку submit формы добавления карточки
  evt.preventDefault();
  api.createNewCard({name: place, link: link})
    .then((data) => {
      const cardElement = createCard(data, true, false);
      cardsList.prependItem(cardElement);
    })
    .catch((err) => {
      console.log('Ошибка добавления новой карточки', err);
    })
    .finally(() => {
      popupWithAddForm.close();
    });
});

popupWithAddForm.setEventListeners();


function renderCards(id) {
  //функция рендера массива начальных карточек.
  //Функция принимает id - идентификатор пользователя, для которого
  //будут рендериться карточки
  api.getInitialCards()
  .then((data) => {
    console.log(data);
    const initialCardsList = new Section({
      //объект, цель которого взять с сервера начальные карточки и
      //добавить их в контейнер '.elements'
      data: data,
      renderer: (item) => {
        const isOwner = item.owner._id === id;
        const isLike = item.likes.some(user => user._id === id);
        const likeCount = item.likes.length;
        console.log(likeCount);
        const cardElement = createCard(item, isOwner, isLike, likeCount);
        initialCardsList.addItem(cardElement);
      }},
      '.elements'
    );
    initialCardsList.renderItems();
  })
  .catch((err) => {
    console.log('Ошибка рендера начальных карточек');
    console.log(err);
  });
}


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


function renderPage() {
  api.getUserInformation()
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about);
      return data._id;
    })
    .catch((err) => {
      console.log('Не удалось получить данные пользователя', err);
    })
    .then((id) => {
      renderCards(id)
  }) 
}

renderPage();