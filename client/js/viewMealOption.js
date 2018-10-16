/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const menuRow = document.getElementById('menu-row');

const saveId = (e) => {
  const { id } = e.target;

  localStorage.setItem('id', `${parseInt(id, 10)}`);
  window.location.href = '/order-checkout.html';
};

const menuItems = (row) => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  const priceTxt = document.createElement('h3');
  const name = document.createElement('p');
  const btn = document.createElement('button');

  div.classList.add('col-4', 'order-details');
  img.src = row.image;
  name.innerHTML = row.name;
  priceTxt.innerHTML = `NGN ${row.price}`;
  btn.innerHTML = 'Place order';

  btn.setAttribute('id', `${row.id}`);

  btn.addEventListener('click', saveId);

  div.appendChild(img);
  div.appendChild(priceTxt);
  div.appendChild(name);
  div.appendChild(btn);

  menuRow.appendChild(div);
};


window.onload = () => {
  const token = localStorage.getItem('token');

  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = '/api/v1/menu';

  fetch(url, options)
    .then((res) => {
      if (res.status === 409) {
        errorMsg.innerText = res.message;
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        res.data.items
          .forEach(row => menuItems(row));
      }

      if (res.status === 'fail') {
        errorMsg.innerText = res.message;
      }
    })
    .catch(err => err.message);
};
