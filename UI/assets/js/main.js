const contentarea = document.getElementsByClassName('contentarea')[0];
const sidebar = document.getElementsByClassName('sidebar')[0];
const toggle = document.getElementsByClassName('menu-icon')[0];
const adminToggle = document.getElementsByClassName('menu-icon-admin')[0];

const toggleSideNav = () => {
  sidebar.classList.toggle('active');
  contentarea.classList.toggle('active');
};

const toggleAdminNav = () => {
  sidebar.classList.toggle('active');
  contentarea.classList.toggle('active');
};

if (toggle) {
  toggle.addEventListener('click', toggleSideNav);
} else {
  adminToggle.addEventListener('click', toggleAdminNav);
}
