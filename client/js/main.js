/* eslint-disable no-undef */
const errorCont = document.getElementById('error');
const sidebar = document.getElementsByClassName('sidebar')[0];
const toggle = document.getElementsByClassName('menu-icon')[0];
const navItems = document.getElementById('items-right');
const loggedusername = localStorage.getItem('username');

const removeMessages = () => {
  window.setTimeout(() => {
    errorCont.style.display = 'none';
    errorCont.classList.remove('fail');
  }, 3000);
};

const toggleSideNav = () => {
  sidebar.classList.toggle('active');
};

const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('id');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('role');

  window.location.href = '/signin.html';
};

const user = () => {
  const loggedUser = document.createElement('a');
  const userIcon = document.createElement('i');
  const caretIcon = document.createElement('i');
  const dropContent = document.createElement('div');
  const orderHistory = document.createElement('a');
  const logoutBtn = document.createElement('a');
  const username = localStorage.getItem('username');

  loggedUser.innerHTML = `  ${username}  `;
  orderHistory.innerHTML = 'Order history';
  logoutBtn.innerHTML = 'Logout';
  orderHistory.href = '/ordered-food-user.html';

  logoutBtn.addEventListener('click', logout);
  loggedUser.classList.add('dropdown-btn');
  logoutBtn.classList.add('cursor');
  userIcon.classList.add('fa', 'fa-user');
  caretIcon.classList.add('fa', 'fa-caret-down');
  dropContent.classList.add('dropdown-content');

  dropContent.appendChild(orderHistory);
  dropContent.appendChild(logoutBtn);


  loggedUser.append(caretIcon);
  loggedUser.prepend(userIcon);

  navItems.classList.add('dropdown');
  navItems.appendChild(loggedUser);
  navItems.appendChild(dropContent);
};

const sidebarUser = () => {
  const orderHistory = document.createElement('a');
  const menuOption = document.createElement('a');
  const logoutBtn = document.createElement('a');

  orderHistory.innerHTML = 'Order History';
  menuOption.innerHTML = 'Menu';
  logoutBtn.innerHTML = 'Logout';

  logoutBtn.classList.add('cursor');

  orderHistory.href = '/ordered-food-user.html';
  menuOption.href = '/food-menu.html';

  logoutBtn.addEventListener('click', logout);

  sidebar.appendChild(menuOption);
  sidebar.appendChild(orderHistory);
  sidebar.appendChild(logoutBtn);
};

const admin = () => {
  const loggedUser = document.createElement('a');
  const userIcon = document.createElement('i');
  const caretIcon = document.createElement('i');
  const dropContent = document.createElement('div');
  const orders = document.createElement('a');
  const foodItems = document.createElement('a');
  const addFood = document.createElement('a');
  const logoutBtn = document.createElement('a');
  const username = localStorage.getItem('username');

  loggedUser.innerHTML = `  ${username}  `;
  orders.innerHTML = 'Orders';
  foodItems.innerHTML = 'Food Items';
  addFood.innerHTML = 'Add food';
  logoutBtn.innerHTML = 'Logout';

  orders.href = '/admin/admin-all-orders.html';
  foodItems.href = '/admin/admin-fast-food-items.html';
  addFood.href = '/admin/admin-add-food.html';

  logoutBtn.addEventListener('click', logout);
  loggedUser.classList.add('dropdown-btn');
  logoutBtn.classList.add('cursor');
  userIcon.classList.add('fa', 'fa-user');
  caretIcon.classList.add('fa', 'fa-caret-down');
  dropContent.classList.add('dropdown-content');

  dropContent.appendChild(orders);
  dropContent.appendChild(foodItems);
  dropContent.appendChild(addFood);
  dropContent.appendChild(logoutBtn);


  loggedUser.append(caretIcon);
  loggedUser.prepend(userIcon);

  navItems.classList.add('dropdown');
  navItems.appendChild(loggedUser);
  navItems.appendChild(dropContent);
};

const sidebarAdmin = () => {
  const orders = document.createElement('a');
  const foodItems = document.createElement('a');
  const addFood = document.createElement('a');
  const logoutBtn = document.createElement('a');

  orders.innerHTML = 'Orders';
  foodItems.innerHTML = 'Food Items';
  addFood.innerHTML = 'Add food';
  logoutBtn.innerHTML = 'Logout';

  logoutBtn.classList.add('cursor');

  orders.href = '/admin/admin-all-orders.html';
  foodItems.href = '/admin/admin-fast-food-items.html';
  addFood.href = '/admin/admin-add-food.html';

  logoutBtn.addEventListener('click', logout);

  sidebar.appendChild(orders);
  sidebar.appendChild(foodItems);
  sidebar.appendChild(addFood);
  sidebar.appendChild(logoutBtn);
};

if (loggedusername !== null) {
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    admin();
    sidebarAdmin();
  } else {
    user();
    sidebarUser();
  }
} else {
  const signin = document.createElement('a');
  const signup = document.createElement('a');

  signin.innerHTML = 'Signin';
  signup.innerText = 'Signup';

  signin.href = '/signin.html';
  signup.href = '/signup.html';

  navItems.appendChild(signin);
  navItems.appendChild(signup);
}


toggle.addEventListener('click', toggleSideNav);
