document.addEventListener('DOMContentLoaded', (event) => {
  let currentPizzaIndex = 0; 

  const url = 'https://pizza112.srvsrv.net/api/show';

  function getPizzas(from, count) {
    const data = {
      from: from.toString(),
      count: count.toString()
    };

    // Опции запроса
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
        Array.from(list.children).forEach(child => {
          if (child.className === 'catalog-pizza__item' && child.querySelector('img[src^="/img/"]') === null) {
            list.removeChild(child);
          }
        });

        data.forEach(item => {
          const li = document.createElement('li');
          li.className = 'catalog-pizza__item';

          li.innerHTML = `
            <img src="${item.imageName}" alt="${item.productName}" class="catalog-pizza__img">
            <h3 class="catalog-pizza__name">${item.productName}</h3>
            <p class="catalog-pizza__info">${item.productDescription}</p>
            <div class="catalog-pizza__bottom">
              <p class="catalog-pizza__price">от ${item.basePrice} ₽</p>
              <a href="#" class="catalog-pizza__chose">выбрать</a>
            </div>
          `;

          list.insertBefore(li, list.querySelector('img[src="/img/right.svg"]').parentNode.parentNode);
        });
      })
      .catch(error => console.error('Ошибка:', error));
  }

  document.querySelector('img[src="/img/left.svg"]').addEventListener('click', () => {
    if (currentPizzaIndex > 0) {
      currentPizzaIndex -= 3;
      getPizzas(currentPizzaIndex, 3);
    }
  });

  document.querySelector('img[src="/img/right.svg"]').addEventListener('click', () => {
    currentPizzaIndex += 3;
    getPizzas(currentPizzaIndex, 3);
  });

  getPizzas(currentPizzaIndex, 3);
});
