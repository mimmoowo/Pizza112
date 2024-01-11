const closeButton = document.querySelector('.closePayment');
const resultSubmit = document.querySelector('.result-submit');
const modal = document.querySelector('#paymentOrder-modal');

  resultSubmit.addEventListener('click', function() {
    showModalWindow();
  });

  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  const deliveryType = document.getElementsByName('deliveryType');
  const addressDiv = document.getElementById('address');

  for(let i = 0; i < deliveryType.length; i++) {
    deliveryType[i].addEventListener('change', function() {
        if(this.value === 'delivery') {
            addressDiv.style.display = 'block';
        } else {
            addressDiv.style.display = 'none';
        }
    });
  }

  async function showModalWindow() {
    if (!token) return alert("Требуется авторизация");
  
    const url = "https://pizza112.srvsrv.net/api/bucket/showBucket";
  
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
  
    const response = await fetch(url, options);
    const data = await response.json();
  
    const orderDetailsList = document.querySelector(".order-details .order-detalis__list");

    orderDetailsList.innerHTML = '';
  
    totalCount = 0;
    totalAmount = 0;
  
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.className = "order-detalis__item";

      let duff,size;
      if(item.productId == 8){
        if(item.productVariant == "SMV"){
          size = "250 мл, ванильный";
           duff ="маленький";
        }else if(item.productVariant == "SMS"){
          size = "250 мл, клубничный";
           duff ="маленький";
        }else if(item.productVariant == "SMC"){
          size = "250 мл, шоколадный";
           duff ="маленький";
        }else if(item.productVariant == "MMV"){
          size = "350 мл, ванильный";
          duff ="средний";
        }else if(item.productVariant == "MMC"){
          size = "350 мл, шоколадный";
          duff ="средний";
        }
        else if(item.productVariant == "MMS"){
          size = "350 мл, клубничный";
           duff ="средний";
        }
      }else if(item.productId == 9){
        if(item.productVariant == "SJC"){
          size = "500 мл, вишневый";
           duff ="маленький";
        }else if(item.productVariant == "SJO"){
          size = "500 мл, апельсиновый";
           duff ="маленький";
        }else if(item.productVariant == "SJA"){
          size = "250 мл, яблочный";
           duff ="маленький";
        }else if(item.productVariant == "MJC"){
          size = "1000 мл, вишневый";
          duff ="средний";
        }else if(item.productVariant == "MJO"){
          size = "1000 мл, апельсиновый";
          duff ="средний";
        }
        else if(item.productVariant == "MJA"){
          size = "1000 мл, яблочный";
           duff ="средний";
        }
      }else if(item.productId == 10){
        if(item.productVariant == "MD"){
          size = "400 мл";
           duff ="средний";
        }else if(item.productVariant == "SD"){
          size = "200 мл";
           duff ="маленький";
        }
      }else if(item.productId == 11){
        if(item.productVariant == "LD"){
          size = "400 мл";
           duff ="большой";
        }else if(item.productVariant == "MD"){
          size = "300 мл";
           duff ="средний";
        }
      }else if(item.productId == 12){
        if(item.productVariant == "SD"){
          size = "200 мл";
           duff ="маленький";
        }else if(item.productVariant == "MD"){
          size = "300 мл";
           duff ="средний";
        }
      }else if(item.productId == 13){
        if(item.productVariant == "SD"){
          size = "150 мл";
           duff ="маленький";
        }else if(item.productVariant == "MD"){
          size = "300 мл";
           duff ="средний";
        }
      }else{

        size =
      item.productVariant[0] === "S"
        ? "25см"
        : item.productVariant[0] === "M"
          ? "30см"
          : "35см";
     duff =
      item.productVariant[1] === "P" ? "традиционное тесто" : "тонкое тесто";



      }
  
      listItem.innerHTML = `
        <div>
          <p class="order-detalis__item-name">${item.name}</p>
          <p class="order-detalis__item-parametr">${size}, ${duff}</p>
        </div>
        <div class="order-detalis__item-block">
          <p class="order-detalis__item-quantity">${item.quantity}</p>
          <p class="order-detalis__item-price">${item.productVariantPrice} ₽</p>
        </div>
      `;
  
      orderDetailsList.appendChild(listItem);
  
      updateTotalCountAndAmount(item.quantity, item.productVariantPrice);
    });
  
    document.querySelector('.order-total__quantity .order-total_count').innerHTML = `${totalCount} ${formatWord(
      totalCount,
      "товар",
      "товара",
      "товаров"
    )  + " шт"}`;
    document.querySelector('.order-total__price .order-total_price').innerHTML = new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
    document.querySelector('.order-total__quantity .order-total_price').innerHTML = new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽";
  
    modal.style.display = 'block';
  }


  document.getElementById('street').addEventListener('input', function (e) {
    var value = e.target.value;
    var digits = value.replace(/[^0-9]/g, '');
    var nonRussianLetters = value.replace(/[а-яА-ЯёЁ0-9\s]/g, '');
    if (digits.length > 3 || nonRussianLetters.length > 0) {
      e.target.value = value.substring(0, value.length-1);
    }
  });
  