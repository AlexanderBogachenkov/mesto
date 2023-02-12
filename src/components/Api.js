export default class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}, что-то не так...`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}${"cards"}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleError);
  }

  // другие методы работы с API

  getUserData() {
    return fetch(`${this._baseUrl}${"users/me"}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleError);
  }

  changeUserData(data) {    
    return fetch(`${this._baseUrl}${"users/me"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.profileName,
        about: data.popup__profileDescription_form
      }),
    }).then(this._handleError);
  }

  addCard(data) {    
    return fetch(`${this._baseUrl}${"cards"}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.placeName,
        link: data.placeUrl
      }),
    }).then(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}${"cards/"}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleError);
  }

  
  addLikeToCard(cardId) {
    return fetch(`${this._baseUrl}${"cards/likes/"}${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleError);
  }

  deleteLikeFromCard(cardId) {
    return fetch(`${this._baseUrl}${"cards/likes/"}${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleError);
  }
  

  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}${"users/me/avatar"}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleError);
  }

}
