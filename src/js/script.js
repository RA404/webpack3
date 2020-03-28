import '../pages/index.css';

import {FormValidator} from './FormValidator.js';
import {Api} from './Api.js';
import {UserInfo} from './UserInfo.js';
import {PopupImage} from './PopupImage.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {PopupNewPlace} from './PopupNewPlace.js';
import {PopupEditInfo} from './PopupEditInfo.js'

const token_key = 'ce2424bc-9470-4677-8189-94c722618035';
const cohortId = 'cohort7';
const ipUser = `http://95.216.175.5/${cohortId}/users/me`;
const ipCards = `http://95.216.175.5/${cohortId}/cards`;

const container = document.querySelector('.places-list');// место куда записывать карточки
const userInfoContainer = document.querySelector('.user-info'); //контейнер информации о пользователе
const userAvatar =  document.querySelector('.user-info__photo'); //контейнер для аватарки
const userNameContainer = userInfoContainer.querySelector('.user-info__name');//контейнер имени
const userDescriptionContainer = userInfoContainer.querySelector('.user-info__job'); //контейнер описание

//DOM формы попапов для передачи их в соответствующий класс
const popupFormNewPlace = document.querySelector('.popup');
const popupFormEditInfo = document.querySelector('.popup_editForm');
const popupImageForm =  document.querySelector('.popupFullSizeImage');


const validation = new FormValidator(); 

const api = new Api(token_key, cohortId); 
const userInfo = new UserInfo(userInfoContainer, userAvatar, api, ipUser);

//карточки
const cards = []; // массив с карточками 

const popupImage = new PopupImage(popupImageForm);
const card = new Card(container, popupImage);
const cardList = new CardList(card, cards, container); //передаем классы Card и PopupNewPlace, а также контейнер куда записывать карточки и список карточек

//попапы
const popupCard = new PopupNewPlace(validation, userInfoContainer, cardList, popupFormNewPlace);

const popupProfile = new PopupEditInfo(validation, userInfoContainer, userInfo, popupFormEditInfo); //добавляем токен и группу для отправки на сервер



//получим данные о пользователе с сервера
let promiseUserData = api.getUserInfo(ipUser, token_key);
   promiseUserData
   .then((result) => {
      userInfo.setUserInfo(result.name, result.about, result.avatar);
      userInfo.updateUserInfo();
   })
   .catch((err) => {
      console.log(err);
   });

//получим карточки с сервера
let promiseCards = api.getCards(ipCards,token_key);
   promiseCards
   .then((result) => {  
      cardList.renderCards(container, result, card);
   })
   .catch((err) => {
      console.log(err);
   });