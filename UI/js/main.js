/* eslint-disable no-undef */
const sidebar = document.getElementsByClassName('sidebar')[0];
const toggle = document.getElementsByClassName('menu-icon')[0];

const toggleSideNav = () => {
  sidebar.classList.toggle('active');
};

toggle.addEventListener('click', toggleSideNav);
