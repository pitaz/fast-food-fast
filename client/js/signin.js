/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-message');
const closeBtn = document.getElementById('closebtn');
const errorMsgs = document.querySelectorAll('.error');
const { form } = document.forms;
const {
  email, password
} = form.elements;

const close = () => {
  closeBtn.parentElement.style.display = 'none';
};


const redirectUser = () => {
  window.location.href = '/food-menu.html';
};

const loginUser = (e) => {
  e.preventDefault();

  const data = {
    email: email.value,
    password: password.value
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  };

  const url = '/api/v1/auth/login';

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
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.name);
        localStorage.setItem('userId', res.data.id);
        redirectUser();
      }

      if (res.status === 'fail') {
        closeBtn.parentElement.style.display = 'block';
        errorMsg.innerText = res.message;
      }
    })
    .catch(err => err.message);
};

form.addEventListener('submit', loginUser);
closeBtn.addEventListener('click', close);
