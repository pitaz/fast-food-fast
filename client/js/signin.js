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

const errorsList = (error) => {
  if (error.email) {
    errorMsgs[0].innerHTML = 'Email is required';
  }
  if (error.password) {
    errorMsgs[1].innerHTML = 'Password is required';
  }
};

const removeErrorMessages = (e) => {
  e.target.nextElementSibling.innerHTML = '';
};
const redirectUser = (role) => {
  if (role === 'admin') {
    window.location.href = '/admin/admin-fast-food-items.html';
  } else {
    window.location.href = '/food-menu.html';
  }
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
        closeBtn.parentElement.classList.add('fail');
        errorMsg.innerText = 'User does not exist!';
        removeMessages();
      }
      return res.json();
    })
    .then((res) => {
      if (res.status === 'success') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.name);
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('role', res.data.role);
        redirectUser(res.data.role);
      }
      if (res.status === 'fail') {
        errorsList(res.error);
      }
    })
    .catch(err => err.message);
};

form.addEventListener('submit', loginUser);
email.addEventListener('focus', removeErrorMessages);
password.addEventListener('focus', removeErrorMessages);
closeBtn.addEventListener('click', close);
