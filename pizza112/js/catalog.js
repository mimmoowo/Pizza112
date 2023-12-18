document.addEventListener('DOMContentLoaded', (event) => {
  let currentPizzaCount = 3;

  const url = 'https://pizza112.srvsrv.net/api/show';

  function getPizzas(from, count) {
    const data = {
      from: from.toString(),
      count: count.toString()
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const list = document.querySelector('.catalog-pizza__list');
        // Удаление только элементов пиццы
        Array.from(list.children).forEach(child => {
          if (child.className === 'catalog-pizza__item' && child.querySelector('img[src^="https://pizza112.srvsrv.net/static/images/Products/"]')) {
            list.removeChild(child);
          }
        });

        const rightArrow = list.querySelector('img[src="/img/right.svg"]').parentNode.parentNode;

        data.forEach(item => {
          const li = document.createElement('li');
          li.className = 'catalog-pizza__item';

          li.innerHTML = `
          <img src="https://pizza112.srvsrv.net/static/images/Products/${item.imageName}" class="catalog-pizza__img">
            <h3 class="catalog-pizza__name">${item.productName}</h3>
            <p class="catalog-pizza__info">${item.productDescription}</p>
            <div class="catalog-pizza__bottom">
              <p class="catalog-pizza__price">от ${item.basePrice} ₽</p>
              <a href="#" class="catalog-pizza__chose" data-id="${item.id}">выбрать</a>
            </div>
          `;

          list.insertBefore(li, rightArrow);
        });
      })
      .catch(error => console.error('Ошибка:', error));
  }

  document.querySelector('img[src="/img/left.svg"]').addEventListener('click', () => {
    if (currentPizzaCount > 3) {
      currentPizzaCount -= 3;
      getPizzas(0, currentPizzaCount);
    }
  });

  document.querySelector('img[src="/img/right.svg"]').addEventListener('click', () => {
    currentPizzaCount += 3;
    getPizzas(0, currentPizzaCount);
  });

  getPizzas(0, currentPizzaCount);
});

document.querySelector('.catalog-pizza__list').addEventListener('click', function(event) {
  if (event.target.className === 'catalog-pizza__chose') {
    chosePizza.style.display = "block";
  }
});

function getPizzaVariants(pizzaId) {
  const url = 'https://pizza112.srvsrv.net/api/show/product';

  const data = {
    id: pizzaId.toString()
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Здесь вы можете обработать полученные данные
    })
    .catch(error => console.error('Ошибка:', error));
}

document.querySelector('.catalog-pizza__list').addEventListener('click', function(event) {
  if (event.target.className === 'catalog-pizza__chose') {
    const pizzaId = event.target.getAttribute('data-id'); // Получаем ID пиццы из атрибута data-id
    getPizzaVariants(pizzaId);
    chosePizza.style.display = "block";
  }
});
