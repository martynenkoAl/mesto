export default class UserInfo {
  constructor({userNameSelector, userJobSelector}) {
    this._userName = document.querySelector('.profile__name');
    this._userJob = document.querySelector('.profile__job');

  }
  getUserInfo() {
    return {username: this._userName.textContent, job: this._userJob.textContent}
  }

  setUserInfo(data) {
    this._userName.textContent = data.username;
    this._userJob.textContent = data.job;
  }
}
