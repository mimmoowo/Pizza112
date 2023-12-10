//Информация в текстовых полях и обновление
async function getClientData(token) {
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  try {
      const response = await axios.get('/api/client/getPP', config);
      return response.data;
  } catch (error) {
      console.error(`Error: ${error.response.status}`);
      console.error(`Message: ${error.response.data.message}`);
  }
}

async function updateClientData(token, data) {
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  try {
      const response = await axios.post('/api/client/updatePP', data, config);
      return response.data;
  } catch (error) {
      console.error(`Error: ${error.response.status}`);
      console.error(`Message: ${error.response.data.message}`);
  }
}

getClientData('your-jwt-token')
  .then(data => {
      document.querySelector('.account-avatar').src = `/img/${data.photoName}`;
      document.querySelector('.account-data__form[name="Фамилия"]').value = data.surname;
      document.querySelector('.account-data__form[name="Почта"]').value = data.email;
      document.querySelector('.account-data__form[name="Имя"]').value = data.name;
      document.querySelector('.account-data__form[name="Номер телефона"]').value = data.phoneNumber;
      document.querySelector('.account-data__form[name="Дата рождения"]').value = data.dateOfBirth;

      document.querySelector('.account-data__rename').addEventListener('click', function() {
          const updatedData = {
              "Фамилия": document.querySelector('.account-data__form[name="Фамилия"]').value,
              "Почта": document.querySelector('.account-data__form[name="Почта"]').value,
              "Имя": document.querySelector('.account-data__form[name="Имя"]').value,
              "Номер телефона": document.querySelector('.account-data__form[name="Номер телефона"]').value,
              "Дата рождения": document.querySelector('.account-data__form[name="Дата рождения"]').value
          };

          updateClientData('your-jwt-token', updatedData);
      });
  });

//Аватар 
document.getElementById('uploadLink').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('fileUpload').click();
});

document.getElementById('fileUpload').addEventListener('change', function() {
  const file = this.files[0];
  if (file && file.type.match('image.*')) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('/api/client/updatePPAvatar', formData, {
          headers: { 
              Authorization: `Bearer your-jwt-token`,
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          document.getElementById('avatar').src = URL.createObjectURL(file);
      })
      .catch(error => {
          console.error(`Error: ${error.response.status}`);
          console.error(`Message: ${error.response.data.message}`);
      });
  }
});