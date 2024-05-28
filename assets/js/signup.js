let form = document.querySelector('form');
let firstName = document.getElementById('first_name');
let lastName = document.getElementById('last_name');
let username = document.getElementById('username');
let email = document.getElementById('email');
let genderSelect = document.getElementById('gender');
let dobInput = document.getElementById('dob');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');


let data = JSON.parse(localStorage.getItem('form-data')) || [];

form.addEventListener('submit', function (event) {
    let formdata = {
        fname: firstName.value,
        lname: lastName.value,
        usernameInput: username.value,
        emailInput: email.value,
        genderSelect: genderSelect.value,
        dobInput: dobInput.value,
        passwordInput: password.value
    };
    event.preventDefault();
    data.push(formdata)
    localStorage.setItem("form-data", JSON.stringify(data));
    if (validateForm()) {
        event.stopPropagation();
        window.location.href = './index.html';
    }
  
    
});

function validateForm() {
    let isValid = true;

    if (password.value !== confirmPassword.value ) {
        showPasswordMismatchError();
        isValid = false;
    }

    if (!form.checkValidity()) {
        scrollToFirstInvalidField();
        isValid = false;
    }

    form.classList.add('was-validated');
    return isValid;
}

function scrollToFirstInvalidField() {
    let invalidFields = form.querySelectorAll(':invalid');
    if (invalidFields.length > 0) {
        invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalidFields[0].focus();
    }
}

function showPasswordMismatchError() {
    confirmPassword.classList.add('is-invalid');
    confirmPassword.nextElementSibling.textContent = "Passwords do not match";
}
