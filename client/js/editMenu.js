/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-message');
const closeBtn = document.getElementById('closebtn');
const errorMsgs = document.querySelectorAll('.error');
const fname = document.getElementById('name');
const fprice = document.getElementById('price');
const fimage = document.getElementById('image');
const fdesc = document.getElementById('description');
const { form } = document.forms;
const {
  name, price, image, desc
} = form.elements;

const close = () => {
  closeBtn.parentElement.style.display = 'none';
};


const redirect = () => {
  window.location.href = '/admin/admin-fast-food-items.html';
};


const editMenu = (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    price: price.value,
    image: image.value,
    description: desc.value
  };

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token
    }
  };

  const url = `/api/v1/menu/${id}`;

  fetch(url, options)
    .then((res) => {
      if (res.status === 409) {
        closeBtn.parentElement.style.display = 'block';
        errorMsg.innerText = res.message;
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        redirect();
      }

      if (res.status === 'fail') {
        closeBtn.parentElement.style.display = 'block';
        errorMsg.innerText = res.message;
      }
    })
    .catch(err => err.message);
};

const formItem = (row) => {
  fname.value = row.name;
  fprice.value = row.price;
  fimage.value = row.image;
  fdesc.value = row.description;

  btn.setAttribute('id', `${row.id}`);

  btn.addEventListener('click', editMenu);
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
        const data = res.data.item;
        formItem(data);
      }

      if (res.status === 'fail') {
        errorMsg.innerText = res.message;
      }
    })
    .catch(err => err.message);
};


form.addEventListener('submit', editMenu);
closeBtn.addEventListener('click', close);
