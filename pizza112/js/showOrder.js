const token = localStorage.getItem("userToken");
var urlParams = new URLSearchParams(window.location.search);
var orderId = urlParams.get('orderId');

async function showOrderDetails(id) {
  if (!token) return alert("Требуется авторизация");

  const url = 'https://pizza112.srvsrv.net/api/bucket/showOrder';

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ id: id })
  };

  const response = await fetch(url, options);
  const data = await response.json();

  let totalAmount = 0; 

  data.forEach(item => {
    try {
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

      const listItem = document.createElement('li');
      listItem.className = 'shop-item';

      listItem.innerHTML = `
        <img src="https://pizza112.srvsrv.net/static/images/Products/${item.image}" alt="${item.name}" class="shop-item__img">
        <div class="shop-element">
          <p class="shop-element__name">${item.name}</p>
          <p class="shop-element__info">${size}, ${duff}</p>
          <div class="shop-element__finaly">
            <p class="shop-element__price">${item.productVariantPrice} ₽</p>
          </div>
          <div class="shop-element__count">
          <p class="counter"> Количество: ${item.quantity}</p>
          </div>
        </div>
      `;

      document.querySelector('.shop-list').appendChild(listItem);

      totalAmount += item.productVariantPrice; 

      
      document.querySelector('.adressOrder-result').innerHTML = item.address ? item.address : "Самовывоз";
      document.querySelector('.paymentsOrder-result').innerHTML = item.payType === 'card' ? "Картой" : "Наличный расчет";
    } catch (error) {
      console.error('Error:', error);
    }
  });

  document.querySelector('.payments-result').innerHTML = new Intl.NumberFormat("ru-RU").format(totalAmount) + " ₽"; 
}

showOrderDetails(orderId);