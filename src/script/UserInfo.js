export class UserInfo {
    constructor(profileName, profileInfo) {
        this._profileName = document.querySelector(profileName);
        this._profileInfo = document.querySelector(profileInfo); 
    }

    getUserInfo() {
        this.profileInfoObj = {};
        this.profileInfoObj.name = this._profileName.textContent;
        this.profileInfoObj.info = this._profileInfo.textContent;
        return this.profileInfoObj;
    }

    setUserInfo(obj) {
        this._profileName.textContent = obj.name;
        this._profileInfo.textContent = obj.about;
    }       
}