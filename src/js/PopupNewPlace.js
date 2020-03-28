export class PopupNewPlace {
  constructor(formValidator, userInfoContainer, cards, popupFormNewPlace) {
    this.userInfoContainer = userInfoContainer;
    this.popupFormNewPlace = popupFormNewPlace;
    this.popupCloseButton = this.popupFormNewPlace.querySelector('.popup__close');
    this.popupCloseButton.addEventListener('click', this.openClosePopup.bind(this));

    this.cards = cards;
    this.formValidator = formValidator;

    this.popupAddButton = this.userInfoContainer.querySelector('.user-info__button');
    this.popupAddButton.addEventListener('click', this.openClosePopup.bind(this));
    this.form = document.forms.new;
    this.form.addEventListener('submit', this.saveNewPlace.bind(this));
    this.nameField = this.form.elements.name;
    this.nameField.addEventListener('input', this.volidation.bind(this, this.nameField));  
    this.linkField = this.form.elements.link;
    this.linkField.addEventListener('input', this.volidation.bind(this, this.linkField)); 
  }

  openClosePopup() {
    this.popupFormNewPlace.classList.toggle('popup_is-opened');
    //deactivate the add button before validation
    this.form.elements.addButton.disabled = true;
    if (this.form.elements.addButton.classList.contains('popup__button_type_active')) {
      this.form.elements.addButton.classList.toggle('popup__button_type_active');
    }
  }

  saveNewPlace() {
    this.cards.addCard(this.form);
    this.openClosePopup();
  }

  volidation(elem) {
    this.formValidator.setEventListeners(elem);
  }
}