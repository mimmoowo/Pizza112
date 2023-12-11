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
var spanConfirm = document.getElementsByClassName("closeConfirm")[0];
var modalConfirm = document.getElementById("confirmAccount-modal");
var btnConfirm = document.getElementById("openConfirmAccount");

var phoneInput = document.getElementById("phoneInput");
var phoneSpan = document.querySelector(".confirm-container__info span");

btnConfirm.onclick = function() {
  var phoneValue = phoneInput.value;
     
  if(phoneValue && phoneValue.match(/^\+7\d{10}$/)) {
    // Отправьте запрос на сервер с номером телефона
    fetch('https://pizza112.srvsrv.net/api/auth/sms_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: phoneValue, password: '111111' }) // добавьте пароль в тело запроса
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Обработайте ответ сервера
      if (data['jwt-token']) {
        localStorage.setItem('jwt-token', data['jwt-token']);
        phoneSpan.textContent = phoneValue;
        modalEntrance.style.display = "none";
        modalConfirm.style.display = "block";
      } else if (data.message) {
        alert('Ошибка: ' + data.message);
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  } else {
    //Небходимо придумать визуализацию
    alert("Ошибка, введите правильный номер");
  }
}


spanConfirm.onclick = function() {
  modalConfirm.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalConfirm) {
    modalConfirm.style.display = "none";
  } else if (event.target == modalEntrance) {
    modalEntrance.style.display = "none";
  }
}

//Нажатие кнопки изменить введеннный номер. Вход в аккаунт
var changeButton = document.querySelector(".entrance-telephone_btn");

changeButton.onclick = async function() {
  const phoneValue = phoneInput.value;

  if (/^\+7\d{10}$/.test(phoneValue)) {
    try {
      const phoneNumber = phoneValue.replace('+', '');

      const response = await fetch('https://pizza112.srvsrv.net/api/auth/sms_authentications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber: phoneNumber })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.message === 'Message send') {
        alert('Сообщение отправлено');
      } else {
        alert('Ошибка: ' + data.message);
      }
    } catch (error) {
      if (error.message === 'Network response was not ok') {
        alert('Слишком много запросов, пожалуйста, подождите минуту');
      } else {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
  } else {
    alert('Ошибка, введите правильный номер');
  }
};

//Копирование введеного номера с проверкой на верность ввода
var phoneInput = document.getElementById("phoneInput");
var phoneSpan = document.querySelector(".confirm-container__info span");

btnConfirm.onclick = function() {
  var phoneValue = phoneInput.value;
     
  if(phoneValue && phoneValue.match(/^\+7\d{10}$/)) {
    phoneSpan.textContent = phoneValue;
    modalEntrance.style.display = "none";
    modalConfirm.style.display = "block";
  } else {
    //Небходимо придумать визуализацию
    alert("Ошибка, введите правильный номер");
  }
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

