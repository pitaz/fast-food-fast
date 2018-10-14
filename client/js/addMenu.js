/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-message');
const closeBtn = document.getElementById('closebtn');
const errorMsgs = document.querySelectorAll('.error');
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

const addMenu = (e) => {
  e.preventDefault();

  const data = {
    name: name.value,
    price: price.value,
    image: image.value,
    description: desc.value
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

  const url = '/api/v1/menu';

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

form.addEventListener('submit', addMenu);
closeBtn.addEventListener('click', close);
