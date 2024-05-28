 let username = document.querySelector("#username")
 let password = document.querySelector("#password");
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        errorMessage.textContent = ''; 
        if (checkCredentials()) {
           
            window.location.href = './app.html'
           
        } else {
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
    
    function checkCredentials(){
       let data = JSON.parse(localStorage.getItem("form-data"));
       let password = document.querySelector("#password");
        let username = document.querySelector("#username")
       for(let i = 0; i < data.length; i++) {
        if(data[i].emailInput == username.value && data[i].passwordInput == password.value){
            return true;
        }
       }
       return data.emailInput == username.value && data.passwordInput == password.value;
    }
checkCredentials()
