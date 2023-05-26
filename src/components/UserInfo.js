export default class UserInfo {
  constructor({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userName = document.querySelector('.profile__name');
    this._userJob = document.querySelector('.profile__job');
    this._userAvatar = document.querySelector('.profile__avatar');

  }
  getUserInfo() {
    return {username: this._userName.textContent, job: this._userJob.textContent}
  }

  setUserInfo({username, job, avatar}) {
    this._userName.textContent = username;
    this._userJob.textContent = job;
    this._userAvatar.src = avatar;
  }
}
