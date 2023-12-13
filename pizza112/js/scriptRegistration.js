//Открытие окна входа в аккаунт
var spanEntrance = document.getElementsByClassName("closeEntrance")[0];
var modalEntrance = document.getElementById("entranceAccount-modal")
var bthEntrance = document.getElementById("openEntranceAccount")

bthEntrance.onclick = function() {
  modalEntrance.style.display = 'block'
}

spanEntrance.onclick = function() {
  modalEntrance.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalEntrance) {
    modalEntrance.style.display = "none";
  }
}

//Ввод номера и ограничение в нем. Вход в аккаунт
var phoneInput = document.getElementById('phoneInput');

phoneInput.addEventListener('input', function(event) {
  var currentValue = event.target.value;
  var cleanedValue = currentValue.replace(/\D/g, '');

  if (cleanedValue.startsWith('7')) {
    cleanedValue = '+7' + cleanedValue.slice(1);
  } else {
    cleanedValue = '+7' + cleanedValue;
  }

  cleanedValue = cleanedValue.slice(0, 12);
  event.target.value = cleanedValue;
});

//Открытие окна подтверждения аккаунта
var phoneInput = document.getElementById('phoneInput');
var btnConfirm = document.getElementById("openConfirmAccount");
var modalConfirm = document.getElementById("confirmAccount-modal");
var modalEntrance = document.getElementById("entranceAccount-modal");
var spanConfirm = document.getElementsByClassName("closeConfirm")[0];
var phoneNumberDisplay = document.querySelector(".confirm-container__info span");
var changeButton = document.querySelector(".confirm-container__info a");
var resendButton = document.querySelector(".confirm-telephone_btn");

phoneInput.addEventListener('input', function(event) {
  var currentValue = event.target.value;
  var cleanedValue = currentValue.replace(/\D/g, '');

  if (cleanedValue.startsWith('7')) {
    cleanedValue = '+7' + cleanedValue.slice(1);
  } else {
    cleanedValue = '+7' + cleanedValue;
  }

  cleanedValue = cleanedValue.slice(0, 12);
  event.target.value = cleanedValue;
}); 

btnConfirm.addEventListener('click', function() {
  var phoneNumber = phoneInput.value.replace('+', '');
  sendSMSCode(phoneNumber);
  phoneNumberDisplay.textContent = phoneNumber;
  modalEntrance.style.display = "none";
  modalConfirm.style.display = "block";
});

resendButton.addEventListener('click', function() {
  var phoneNumber = phoneInput.value.replace('+', '');
  resendSMSCode(phoneNumber);
});

spanConfirm.onclick = function() {
  modalConfirm.style.display = "none";
}

changeButton.addEventListener('click', function() {
  modalConfirm.style.display = "none";
  modalEntrance.style.display = "block";
});

window.onclick = function(event) {
  if (event.target == modalConfirm) {
    modalConfirm.style.display = "none";
  } else if (event.target == modalEntrance) {
    modalEntrance.style.display = "none";
  }
}

function sendSMSCode(phoneNumber) {
  var url = 'https://pizza112.srvsrv.net/api/auth/sms_authentications';
  var data = { phoneNumber: phoneNumber };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    alert('Сообщение отправлено');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function resendSMSCode(phoneNumber) {
  var url = 'https://pizza112.srvsrv.net/api/auth/sms_check/resend';
  var data = { phoneNumber: phoneNumber };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    alert('Код успешно отправлен повторно');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

//Ввод кода и ограничение. Вход в аккаунт

var codeInputElements = document.querySelectorAll(".code-input input");
var incorrectAttempts = 0;

codeInputElements.forEach(function(inputElement, index) {
  inputElement.addEventListener('input', function() {
    if (this.value.length > 0 && index < codeInputElements.length - 1) {
      codeInputElements[index + 1].focus();
    }

    if (index === codeInputElements.length - 1 && this.value.length > 0) {
      var code = Array.from(codeInputElements).map(input => input.value).join('');
      checkSMSCode(code);
    }
  });

  inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' && this.value.length === 0 && index > 0) {
      codeInputElements[index - 1].focus();
    }
  });
});

function checkSMSCode(code) {
  var url = 'https://pizza112.srvsrv.net/api/auth/sms_check';
  var phoneNumber = phoneInput.value.replace('+', '');
  var data = { phoneNumber: phoneNumber, password: code };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  .then((response) => response.json())
  .then((data) => {
    if (data['jwt-token']) {
      alert('Код успешно проверен');
      setUserToken(data['jwt-token']); 
      modalConfirm.style.display = "none"; 
      window.location.reload();
    } else if (data.message === 'Неверный код или логин') {
      incorrectAttempts++;
      if (incorrectAttempts >= 3) {
        var phoneNumber = phoneInput.value.replace('+', '');
        resendSMSCode(phoneNumber);
        alert('Вы исчерпали все возможные попытки, отправьте сообщение повторно');
        incorrectAttempts = 0;
      } else {
        alert('Некорректно введен номер или код');
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function setUserToken(token) {
  localStorage.setItem('userToken', token);
}

function getUserToken() {
  return localStorage.getItem('userToken');
}

window.onload = function() {
  var token = getUserToken();
  if (token) {
    var ul = document.querySelector('.header-list');
    
    var liCatalog = document.querySelector('.header-list__item a[href="catalog.html"]').parentNode;
    
    var liCart = document.createElement('li');
    liCart.className = 'header-list__item';
    liCart.style.display = 'none'; 
    liCart.innerHTML = '<a href="shop.html">Корзина</a>';
    ul.insertBefore(liCart, liCatalog.nextSibling);
    
    var liUser = document.createElement('li');
    liUser.className = 'header-list__item';
    liUser.style.display = 'none'; 
    ul.insertBefore(liUser, liCart.nextSibling);
    
    fetch('https://pizza112.srvsrv.net/api/client/getPP', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token, 
      },
    })
    .then((response) => response.json())
    .then((userData) => {
      liUser.innerHTML = '<a href="account.html">' + userData.name + ' ' + userData.surname + '</a>';
      liCart.style.display = 'block'; 
      liUser.style.display = 'block'; 
    });
    
    var loginLink = document.querySelector('#openEntranceAccount');
    loginLink.textContent = 'Выйти';
    loginLink.href = 'index.html'; 
    loginLink.addEventListener('click', function(e) {
      e.preventDefault(); 
      localStorage.removeItem('userToken'); 
      window.location.href = this.href; 
    });
  }
}



