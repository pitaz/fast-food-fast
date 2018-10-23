/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const content = document.getElementById('content');


const successItem = (row) => {
  const img = document.createElement('img');
  const priceTxt = document.createElement('h3');
  const name = document.createElement('p');
  const btn = document.createElement('a');

  img.src = row.image;
  name.innerHTML = row.name;
  priceTxt.innerHTML = row.price;
  btn.innerText = 'Continue shopping';

  btn.classList.add('tb-btn');

  btn.href = '/food-menu.html';

  content.appendChild(img);
  content.appendChild(name);
  content.appendChild(priceTxt);
  content.appendChild(btn);
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
        errorMsg.classList.add('menu-text');
        errorMsg.innerText = res.message;
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        const menu = res.data.item;
        successItem(menu);
      }
    })
    .catch(err => err.message);
};
