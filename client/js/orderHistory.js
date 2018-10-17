/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const tableRow = document.getElementById('tb');


const tableItems = (row) => {
  const tr = document.createElement('tr');
  const sn = document.createElement('td');
  const name = document.createElement('td');
  const orderId = document.createElement('td');
  const amount = document.createElement('td');
  const qty = document.createElement('td');
  const status = document.createElement('td');

  tr.classList.add('table-row');
  sn.classList.add('table-cell');
  name.classList.add('table-cell');
  orderId.classList.add('table-cell');
  amount.classList.add('table-cell');
  qty.classList.add('table-cell');
  status.classList.add('table-cell');


  sn.innerHTML = row.id;
  name.innerHTML = row.meal;
  orderId.innerHTML = row.id;
  amount.innerHTML = row.price;
  qty.innerHTML = row.quantity;
  status.innerHTML = row.status;


  tr.appendChild(sn);
  tr.appendChild(name);
  tr.appendChild(orderId);
  tr.appendChild(amount);
  tr.appendChild(qty);
  tr.appendChild(status);

  tableRow.appendChild(tr);
};


window.onload = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = `/api/v1/users/${userId}/orders`;

  fetch(url, options)
    .then((res) => {
      if (res.status === 404) {
        errorMsg.innerText = res.message;
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        res.data.items
          .forEach(row => tableItems(row));
      }

      if (res.status === 'fail') {
        errorMsg.innerText = res.message;
      }
    })
    .catch(err => err.message);
};
