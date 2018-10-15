/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-text');
const tableRow = document.getElementById('tb');

const saveId = (e) => {
  const { id } = e.target;

  localStorage.setItem('id', `${parseInt(id, 10)}`);
  window.location.href = '/admin/admin-edit-food.html';
};

const delt = (e) => {
  const { id } = e.target;
  confirm('Want to delete food menu option?');
};

const tableItems = (row) => {
  const tr = document.createElement('tr');
  const sn = document.createElement('td');
  const name = document.createElement('td');
  const description = document.createElement('td');
  const price = document.createElement('td');
  const action = document.createElement('td');
  const edit = document.createElement('a');
  const del = document.createElement('a');

  tr.classList.add('table-row');
  sn.classList.add('table-cell');
  name.classList.add('table-cell');
  description.classList.add('table-cell');
  price.classList.add('table-cell');
  action.classList.add('table-cell');
  edit.classList.add('tb-btn', 'success');
  del.classList.add('tb-btn', 'danger');

  sn.innerHTML = row.id;
  name.innerHTML = row.name;
  description.innerHTML = row.description;
  price.innerHTML = row.price;
  edit.innerHTML = 'Edit';
  del.innerHTML = 'Delete';

  edit.setAttribute('id', `${row.id}`);
  del.setAttribute('id', `${row.id}`);

  edit.addEventListener('click', saveId);
  del.addEventListener('click', delt);
  action.appendChild(edit);
  action.appendChild(del);

  tr.appendChild(sn);
  tr.appendChild(name);
  tr.appendChild(description);
  tr.appendChild(price);
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
          .forEach(row => tableItems(row));
      }

      if (res.status === 'fail') {
        errorMsg.innerText = res.message;
      }
    })
    .catch(err => err.message);
};
