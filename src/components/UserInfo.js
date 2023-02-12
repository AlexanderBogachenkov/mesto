export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  setUserInfo(data) {
    // console.log('data -->', data)
    this._nameSelector.textContent = data.name;
    this._aboutSelector.textContent = data.about;
    this._avatarSelector.src = data.avatar;
    this._myId = data._id;
    // console.log(this._myId)
  }

  getMyId() {
    return this._myId;
  }
}
