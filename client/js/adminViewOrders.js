/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const tableRow = document.getElementById('tb');

const acceptOrder = (e) => {
  const token = localStorage.getItem('token');
  const { id } = e.target;

  const data = {
    status: 'processing'
  };

  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = `/api/v1/orders/${id}`;

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
        window.location.href = '/admin/admin-all-orders.html';
      }
    })
    .catch(err => err.message);
};

const declineOrder = (e) => {
  const token = localStorage.getItem('token');
  const { id } = e.target;

  const data = {
    status: 'cancelled'
  };

  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = `/api/v1/orders/${id}`;

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
        window.location.href = '/admin/admin-all-orders.html';
      }
    })
    .catch(err => err.message);
};

const completeOrder = (e) => {
  const token = localStorage.getItem('token');
  const { id } = e.target;

  const data = {
    status: 'completed'
  };

  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = `/api/v1/orders/${id}`;

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
        window.location.href = '/admin/admin-all-orders.html';
      }
    })
    .catch(err => err.message);
};

const tableItems = (row) => {
  const tr = document.createElement('tr');
  const sn = document.createElement('td');
  const name = document.createElement('td');
  const price = document.createElement('td');
  const qty = document.createElement('td');
  const status = document.createElement('td');
  const action = document.createElement('td');
  const accept = document.createElement('a');
  const decline = document.createElement('a');
  const complete = document.createElement('a');

  tr.classList.add('table-row');
  sn.classList.add('table-cell');
  name.classList.add('table-cell');
  price.classList.add('table-cell');
  qty.classList.add('table-cell');
  status.classList.add('table-cell');
  action.classList.add('table-cell');
  accept.classList.add('tb-btn', 'success');
  decline.classList.add('tb-btn', 'danger');
  complete.classList.add('tb-btn');


  sn.innerHTML = row.id;
  name.innerHTML = row.meal;
  price.innerHTML = row.price;
  qty.innerHTML = row.quantity;
  status.innerHTML = row.status;
  accept.innerHTML = 'Accept';
  decline.innerHTML = 'Decline';
  complete.innerHTML = 'Complete';

  accept.setAttribute('id', `${row.id}`);
  decline.setAttribute('id', `${row.id}`);
  complete.setAttribute('id', `${row.id}`);

  accept.addEventListener('click', acceptOrder);
  decline.addEventListener('click', declineOrder);
  complete.addEventListener('click', completeOrder);

  action.appendChild(accept);
  action.appendChild(decline);
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
