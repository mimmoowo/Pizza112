// Функция для заполнения формы данными
function fillFormWithData(data) {
  document.querySelector('.account-data__item:nth-child(1) .account-data__form').value = data.surname;
  document.querySelector('.account-data__item:nth-child(2) .account-data__form').value = data.email || '';
  document.querySelector('.account-data__item:nth-child(3) .account-data__form').value = data.name;
  document.querySelector('.account-data__item:nth-child(4) .account-data__form').value = data.phoneNumber;
  document.querySelector('.account-data__form.day').value = data.dateOfBirth.split('-')[2];
  document.querySelector('.account-data__form.mounth').value = data.dateOfBirth.split('-')[1];
  document.getElementById('avatar').src = "https://pizza112.srvsrv.net/static/images/Avatars/" + data.imageName;
}

document.getElementById('bot-button').addEventListener('click', function(event) {
  event.preventDefault(); 
  getAccountData(connectToTelegramBot);
});

function getAccountData(callback) {
  var url = 'https://pizza112.srvsrv.net/api/client/getPP';

  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      },
  })
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      fillFormWithData(data);
      callback(data.tgToken); 
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}


function connectToTelegramBot(tgToken) {
  if (tgToken) {
      var telegramLink = 'https://t.me/Pizza112Bot?start=' + encodeURIComponent(tgToken);

      console.log('Connecting to Telegram Bot:', telegramLink);
      window.location.href = telegramLink;
  } else {
      console.error('Telegram Token not available.');
  }
}

document.getElementById('bot-button').addEventListener('click', function(event) {
  event.preventDefault();
  var data = getAccountData(); 
  window.location.href = 'https://t.me/Pizza112Bot?start=' + data.tgToken;
});

document.addEventListener('DOMContentLoaded', getAccountData);

// Функция для обновления данных аккаунта
function updateAccountData() {
  var url = 'https://pizza112.srvsrv.net/api/client/updatePP';
  
  var data = {
    surname: document.querySelector('.account-data__item:nth-child(1) .account-data__form').value,
    email: document.querySelector('.account-data__item:nth-child(2) .account-data__form').value,
    name: document.querySelector('.account-data__item:nth-child(3) .account-data__form').value,
    phoneNumber: document.querySelector('.account-data__item:nth-child(4) .account-data__form').value,
    dateOfBirth: '1971-' + 
                 document.querySelector('.account-data__form.mounth').value + '-' + 
                 document.querySelector('.account-data__form.day').value
  };
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.newToken) {
      localStorage.setItem('userToken', data.newToken);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


document.querySelector('.account-data__form').addEventListener('change', updateAccountData);

var renameLinks = document.querySelectorAll('.account-data__rename');

for (var i = 0; i < renameLinks.length; i++) {
  var inputField = renameLinks[i].previousElementSibling;
  
  inputField.disabled = true;
  
  renameLinks[i].addEventListener('click', (function(inputField) {
    return function(event) {
      event.preventDefault();
      
      inputField.disabled = false;
      
      inputField.focus();
      
      inputField.addEventListener('blur', function() {
        updateAccountData();
        
        inputField.disabled = true;
      });
    };
  })(inputField));
}

var inputFields = document.querySelectorAll('.account-data__form'); 

for (var i = 0; i < inputFields.length; i++) {
  var inputField = inputFields[i];

  inputField.addEventListener('focus', function() {
    this.style.outline = '2px solid #DCA15D'; 
  });

  inputField.addEventListener('blur', function() {
    this.style.outline = ''; 
  });
}


var dateSelects = document.querySelectorAll('.account-data__form.day, .account-data__form.mounth');

for (var i = 0; i < dateSelects.length; i++) {
  dateSelects[i].addEventListener('change', function(event) {
    updateAccountData();
  });
}

// Функция для загрузки аватара
document.getElementById('uploadLink').addEventListener('click', function() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png, image/jpeg, image/webp';
  input.onchange = function(event) {
      var file = event.target.files[0];
      if(file.size > 200 * 1024) {
          alert('Размер файла не должен превышать 200KB');
          return;
      }
      var formData = new FormData();
      formData.append('file', file);
      fetch('https://pizza112.srvsrv.net/api/client/updatePPAvatar', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
          },
      }).then(function(response) {
          if(response.ok) {
              return response.json();
          } else {
              throw new Error('Ошибка при обновлении аватара');
          }
      }).then(function(data) {
          document.getElementById('avatar').src = "https://pizza112.srvsrv.net/static/images/Avatars/" + data.imageName;
      }).catch(function(error) {
          console.error(error);
      });
  };
  input.click();
});




