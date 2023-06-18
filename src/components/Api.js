export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._options = options;
  }

  _request(url, options = this._options) {
    const { method, data, headers } = options;
    const fetchOptions = { headers: headers };

    if (method) {
      fetchOptions.method = method;
    }

    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    return fetch(`${this._baseUrl}${url}`, fetchOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch(() => Promise.reject('Запрос к серверу не выполнен'))
  }

  getInitialCards() {
    return this._request('/cards');
  }

  getUserInformation() {
    return this._request('/users/me');
  }

  setUserInformation(data) {
    return this._request('/users/me', { method: 'PATCH', data, headers: this._headers});
  }

  createNewCard(data) {
    return this._request('/cards', { method: 'POST', data, headers: this._headers});
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: 'PUT', headers: this._headers});
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, { method: 'DELETE', headers: this._headers});
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: 'DELETE', headers: this._headers});
  }

//DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/5d1f0611d321eb4bdcd707dd

 // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes

/*   POST https://mesto.nomoreparties.co/v1/cohortId/cards 

  

  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },  */

/*   fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
  });  */



/*   getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this.headers._authorization
      }
    })
      .then(res => res.json())
      .then(data => data)

  } */


  // другие методы работы с API
  }


