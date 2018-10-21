/* eslint-disable no-undef */
const errorMsg = document.getElementById('error-message');
const closeBtn = document.getElementById('closebtn');
const errorMsgs = document.querySelectorAll('.error');
const { form } = document.forms;
const {
  name, email, password, cpassword
} = form.elements;

const close = () => {
  closeBtn.parentElement.style.display = 'none';
};

const confirmPasswordError = () => {
  errorMsgs[2].classList.add('display-error');
  errorMsgs[2].innerHTML = 'password does not match';
};


const redirectUser = (role) => {
  if (role === 'admin') {
    window.location.href = '/admin/admin-fast-food-items.html';
  } else {
    window.location.href = '/food-menu.html';
  }
};

const registerUser = (e) => {
  e.preventDefault();

  if (password.value === cpassword.value) {
    const data = {
      name: name.value,
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

    const url = '/api/v1/auth/signup';

    fetch(url, options)
      .then((res) => {
        if (res.status === 409) {
          closeBtn.parentElement.style.display = 'block';
          errorMsg.innerText = 'Email already exist!';
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
          closeBtn.parentElement.style.display = 'block';
          errorMsg.innerText = res.message;
        }
      })
      .catch(err => err.message);
  } else {
    confirmPasswordError();
  }
};

form.addEventListener('submit', registerUser);
closeBtn.addEventListener('click', close);
