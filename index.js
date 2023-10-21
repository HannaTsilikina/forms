let errors = [];
const REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

function pasteError(input) {
   let errorMessage = document.createElement('span');
   errorMessage.textContent = 'Неправильные данные';
   errorMessage.classList.add('errorMessage');
   input.append(errorMessage);

}

function check(array) {

   for (let i = 0; i < array.length; i++) {
      let errorMessage = array[i].querySelector('.errorMessage');
      let field = array[i].querySelectorAll('input');

      if (field.length === 0) {
         field = array[i].querySelectorAll('select')
         if (field[0].value == 'Профессия') {
            if (!errorMessage) { pasteError(array[i]); }
            if (errorMessage) { errorMessage.remove() }
         }
         else {
            if (errorMessage) {
               errorMessage.remove()
            }
         }

      }
      if (field.length === 1) {

         if (field[0].validity.valid) {
            if (errorMessage) {
               errorMessage.remove()
            }
            continue
         }
         else {
            if (!errorMessage) { pasteError(array[i]) }

         }
      }
      else {

         if (!field[0].checked && !field[1].checked) {
            if (!errorMessage) {
               pasteError(array[i])
            }

         }
         else {
            if (errorMessage) {
               errorMessage.remove()
            }
            continue
         }
      }

   }
}
function checkValidity(input) {
   let validity = input.validity;

   if (validity.patternMismatch) {
      errors.push('Неверный формат заполнения');
   }

   if (validity.rangeOverflow) {
      errors.push('Значение превосходит максимально допустимое');
   }

   if (validity.rangeUnderflow) {
      errors.push('Значение меньше минимально допустимого');
   }

   if (validity.stepMismatch) {
      errors.push('Недопустимое значение в соответствии с шагом');
   }

   if (validity.tooLong) {
      errors.push('Значение слишком длинное');
   }

   if (validity.tooShort) {
      errors.push('Значение слишком короткое');
   }

   if (validity.valueMissing) {
      errors.push('Необходимо заполнить поле');
   }
}

function checkAll() {
   let inputs = document.querySelectorAll("input");

   for (let input of inputs) {
      checkValidity(input);
   }

   let errorDiv = document.querySelector('.errorsInfo');
   errorDiv.textContent = errors.join('. \n');
}

function validateErr() {
   errors = [];
   checkAll();
}
let form = document.querySelector('form')
form.addEventListener('submit', function validate() {
   event.preventDefault();
   let formFields = form.querySelectorAll('form>div');
   check(formFields);
   validateErr()


   if (errors.length === 0) {
    for (let i = 0; i < formFields.length; i++) {
     let field = formFields[i].querySelector('input') || formFields[i].querySelector('select');
         if (field.value == 'on' && field.classList.contains('radio'))  {
            let checked =  formFields[i].querySelector('[name="sex"]:checked');
            console.log(checked.id);
            continue
         }
         if (field.value == 'on' && field.hasAttribute('required'))  { 
            console.log(field.name)
         }
        else  {console.log(field.value)}
                  // form.reset()
      }
   }
}
   )