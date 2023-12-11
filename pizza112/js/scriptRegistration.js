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
  var data = { phone_number: phoneNumber };

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
  var data = { phone_number: phoneNumber };

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
var inputs = document.querySelectorAll(".code-input input");

inputs.forEach(function(input, index) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  input.addEventListener("keyup", function(e) {
    if (this.value.length >= this.maxLength && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
    
    if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
      inputs[index - 1].focus();
    }
  });
});