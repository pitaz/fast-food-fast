/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const img = document.getElementById('image');
const priceTxt = document.getElementById('price');
const name = document.getElementById('meal');
const qty = document.getElementById('qty');
const btn = document.getElementById('btn');

const placeOrder = (e) => {
  const { id } = e.target;
  const userid = localStorage.getItem('userId');

  const data = {
    meal: name.innerHTML,
    quantity: qty.value,
    userId: userid,
    price: priceTxt.innerHTML
  };
  const token = localStorage.getItem('token');

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = '/api/v1/orders';

  fetch(url, options)
    .then((res) => {
      if (res.status === 404) {
        closeBtn.parentElement.style.display = 'block';
        errorMsg.innerText = res.message;
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        window.location.href = '/success-page.html';
      }
    })
    .catch(err => err.message);
  localStorage.setItem('id', `${parseInt(id, 10)}`);
};

const checkoutItem = (row) => {
  img.src = row.image;
  name.innerHTML = row.name;
  priceTxt.innerHTML = row.price;

  qty.type = 'number';
  qty.value = '1';
  qty.min = '1';

  btn.setAttribute('id', `${row.id}`);

  btn.addEventListener('click', placeOrder);
};


window.onload = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = `/api/v1/menu/${id}`;

  fetch(url, options)
    .then((res) => {
      if (res.status === 409) {
        errorMsg.innerText = res.message;
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        const menu = res.data.item;
        checkoutItem(menu);
      }
    })
    .catch(err => err.message);
};
