let contentarea = document.getElementsByClassName('contentarea')[0];
let sidebar = document.getElementsByClassName('sidebar')[0];
let toggle = document.getElementsByClassName('menu-icon')[0];


window.onload=function(){

    toggle.onclick=function(){
        sidebar.classList.toggle('active');
        contentarea.classList.toggle('active');
    }

}
