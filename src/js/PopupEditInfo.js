export class PopupEditInfo {
  constructor(formValidator, userInfoContainer, userInfo, formEditInfo) {
    this.userInfoContainer = userInfoContainer;
    this.formEditInfo = formEditInfo;
    this.popupCloseButton = this.formEditInfo.querySelector('.popup__close_editForm');
    this.popupCloseButton.addEventListener('click', this.openClosePopup.bind(this));

    this.formValidator = formValidator;
    this.userInfo = userInfo;

    this.popupEditButton = this.userInfoContainer.querySelector('.user-info__edit-btn');
    this.popupEditButton.addEventListener('click', this.openClosePopup.bind(this));
    this.form = document.forms.editForm;
    this.form.addEventListener('submit', this.saveUserInfo.bind(this));
    this.nameResearcherField = this.form.elements.nameResearcher;
    this.nameResearcherField.addEventListener('input', this.volidation.bind(this, this.nameResearcherField));
    this.aboutResearcherField = this.form.elements.aboutResearcher;
    this.aboutResearcherField.addEventListener('input', this.volidation.bind(this, this.aboutResearcherField));
    
  }

  openClosePopup() {
    this.formEditInfo.classList.toggle('popup_is-opened');

    this.form.elements.nameResearcher.value = this.userInfo.nameResearcher;
    this.form.elements.aboutResearcher.value = this.userInfo.aboutResearcher;

  }

  saveUserInfo() {
    event.preventDefault();

    this.userInfo.setUserInfo(this.form.elements.nameResearcher.value, this.form.elements.aboutResearcher.value);
    this.userInfo.updateUserInfo();

    this.openClosePopup();
  }

  volidation(elem) {
    this.formValidator.setEventListeners(elem);
  }
}