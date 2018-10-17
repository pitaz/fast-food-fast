/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const tableRow = document.getElementById('tb');


const tableItems = (row) => {
  const tr = document.createElement('tr');
  const sn = document.createElement('td');
  const name = document.createElement('td');
  const price = document.createElement('td');
  const qty = document.createElement('td');
  const status = document.createElement('td');
  const action = document.createElement('td');
  const accept = document.createElement('a');
  const reject = document.createElement('a');
  const complete = document.createElement('a');

  tr.classList.add('table-row');
  sn.classList.add('table-cell');
  name.classList.add('table-cell');
  price.classList.add('table-cell');
  qty.classList.add('table-cell');
  status.classList.add('table-cell');
  action.classList.add('table-cell');
  accept.classList.add('tb-btn', 'success');
  reject.classList.add('tb-btn', 'danger');
  complete.classList.add('tb-btn');


  sn.innerHTML = row.id;
  name.innerHTML = row.meal;
  price.innerHTML = row.price;
  qty.innerHTML = row.quantity;
  status.innerHTML = row.status;
  accept.innerHTML = 'Accept';
  reject.innerHTML = 'Decline';
  complete.innerHTML = 'Complete';

  accept.setAttribute('id', `${row.id}`);
  reject.setAttribute('id', `${row.id}`);
  action.appendChild(accept);
  action.appendChild(reject);
  action.appendChild(complete);

  tr.appendChild(sn);
  tr.appendChild(name);
  tr.appendChild(price);
  tr.appendChild(qty);
  tr.appendChild(status);
  tr.appendChild(action);

  tableRow.appendChild(tr);
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

  const url = '/api/v1/orders';

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
