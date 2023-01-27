export default class UserInfo {

    constructor({nameSelector, aboutSelector}) {
        this._nameSelector = document.querySelector(nameSelector);
        this._aboutSelector = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        return {
          name: this._nameSelector.textContent,
          about: this._aboutSelector.textContent          
        };
      }

      setUserInfo(data) {   
        this._nameSelector.textContent = data.name;
        this._aboutSelector.textContent = data.about;
      }
}