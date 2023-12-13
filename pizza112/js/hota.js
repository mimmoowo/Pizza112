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
    liCart.innerHTML = '<a href="shop.html">Корзина</a>';
    ul.insertBefore(liCart, liCatalog.nextSibling);
    
    fetch('https://pizza112.srvsrv.net/api/client/getPP', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token, 
      },
    })
    .then((response) => response.json())
    .then((userData) => {
      var liUser = document.createElement('li');
      liUser.className = 'header-list__item';
      liUser.innerHTML = '<a href="account.html">' + userData.name + ' ' + userData.surname + '</a>';
      
      ul.insertBefore(liUser, liCart.nextSibling);
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