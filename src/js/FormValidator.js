export class FormValidator {

  constructor() { }

  checkInputValidity(elem) {

    let errorMessage = '';
    let formButton;
    let linkField;

    //определим что за форма и название кнопки 
    if (elem.form === document.forms.new) {
      formButton = elem.form.elements.addButton;
      linkField = elem.form.elements.link;
    } else if (elem.form === document.forms.editForm) {
      formButton = elem.form.elements.saveButton;
    };

    //проверим все поля на пустое значение
    const inputs = Array.from(elem.form.elements);
    let isValidForm = true;

    inputs.forEach((el) => {
      if (el !== formButton) {

        //проверим поле на валидность, скроем или покажем текст ошибки. Проверяем все поля формы, чтобы переключившись в другое поле нельзя было обмануть проверку.
        if (((el.value.length == 1) || (el.value.length >= 30)) && (el !== linkField)) {
          errorMessage = 'Должно быть от 2 до 30 символов';
          el.parentNode.lastElementChild.textContent = errorMessage;
          this.activateError(el);
          isValidForm = false;
        } else if (el.value.length == 0) {
          errorMessage = 'Это обязательное поле';
          el.parentNode.lastElementChild.textContent = errorMessage;
          this.activateError(el);
          isValidForm = false;
        }
        else if ((!el.checkValidity()) && (el === linkField)) {
          errorMessage = 'Здесь должна быть ссылка';
          el.parentNode.lastElementChild.textContent = errorMessage;
          this.activateError(el);
          isValidForm = false;
        };
      }
    });

    return isValidForm;

  }

  setSubmitButtonState(isValidForm, elem) {

    let classButton = 'popup__button_type_active';
    let formButton;
   
    if (elem.form === document.forms.new) {
      formButton = elem.form.elements.addButton;
    } else if (elem.form === document.forms.editForm) {
      formButton = elem.form.elements.saveButton;
    };

    if (!isValidForm) {
      formButton.disabled = true;
      if (formButton.classList.contains(`${classButton}`)) {
        formButton.classList.toggle(`${classButton}`);
      }
    } else {
      formButton.disabled = false;
      if (!formButton.classList.contains(`${classButton}`)) {
        formButton.classList.toggle(`${classButton}`);
      }
    };
  }

  setEventListeners(elem) {
    this.resetError(elem);
    let ok = this.checkInputValidity(elem);
    this.setSubmitButtonState(ok, elem);
  }

  activateError(el) {
    el.parentNode.lastElementChild.classList.add('error__active');
  }

  resetError(elem) {
    elem.parentNode.lastElementChild.classList.remove('error__active');
    elem.parentNode.lastElementChild.textContent = '';
  }
}