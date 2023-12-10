function getUserToken() {
  return localStorage.getItem('jwt-token');
}

window.onload = function() {
  var token = getUserToken();
  if (token) {
    var ul = document.querySelector('.header-list');
    
    var liCart = document.createElement('li');
    liCart.className = 'header-list__item';
    liCart.innerHTML = '<a href="shop.html">Корзина</a>';
    ul.appendChild(liCart);
    
    var liUser = document.createElement('li');
    liUser.className = 'header-list__item';
    liUser.innerHTML = '<a href="account.html">Иван Иванов</a>';
    ul.appendChild(liUser);
    
    var loginLink = document.querySelector('.header-list__item a[href="index.html"]');
    loginLink.textContent = 'Выйти';
  }
}