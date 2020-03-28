export class PopupImage{
    constructor(popupImageForm){
      this.popupImageForm =  popupImageForm;
      this.popupCloseButton = this.popupImageForm.querySelector('.popupFullSizeImage__close');
      this.popupCloseButton.addEventListener('click', this.openClosePopup.bind(this));    
      this.popupImageDOM = this.popupImageForm.querySelector('.popupFullSizeImage__image');
    }
    
    setImage(imageLink){
      this.popupImageDOM.src = imageLink; 
    }
  
    openClosePopup(){
      this.popupImageForm.classList.toggle('popupFullSizeImage_is-opened');
    }
  }