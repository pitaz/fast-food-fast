const contentarea = document.getElementsByClassName('contentarea')[0];
const sidebar = document.getElementsByClassName('sidebar')[0];
const toggle = document.getElementsByClassName('menu-icon')[0];

const toggleSideNav = () => {
  sidebar.classList.toggle('active');
  contentarea.classList.toggle('active');
};

toggle.addEventListener('click', toggleSideNav);

