function fillFormWithData(data) {
  document.querySelector('.account-data__item:nth-child(1) .account-data__form').value = data.surname;
  document.querySelector('.account-data__item:nth-child(2) .account-data__form').value = data.email || '';
  document.querySelector('.account-data__item:nth-child(3) .account-data__form').value = data.name;
  document.querySelector('.account-data__item:nth-child(4) .account-data__form').value = data.phoneNumber;
  document.querySelector('.account-data__form.day').value = data.dateOfBirth.split('-')[2];
  document.querySelector('.account-data__form.mounth').value = data.dateOfBirth.split('-')[1];
}

function getAccountData() {
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
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

document.addEventListener('DOMContentLoaded', getAccountData);


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
      
      inputField.addEventListener('blur', function() {
        updateAccountData();
        
        inputField.disabled = true;
      });
    };
  })(inputField));
}


var dateSelects = document.querySelectorAll('.account-data__form.day, .account-data__form.mounth');

for (var i = 0; i < dateSelects.length; i++) {
  dateSelects[i].addEventListener('change', function(event) {
    updateAccountData();
  });
}
