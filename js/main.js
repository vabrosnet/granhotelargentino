let btnOpenMenu = document.querySelector("#open-menu");
let btnCloseMenu = document.querySelector("#close-menu");
let menuMobile = document.querySelector("#mobile-menu");
let links = document.querySelectorAll(".nav_link");

btnOpenMenu.addEventListener("click", () => {
    menuMobile.classList.remove("disabled")
})

btnCloseMenu.addEventListener("click", () => {
    menuMobile.classList.add("disabled")
})

links.forEach(link => link.addEventListener("click", () => {  
    menuMobile.classList.add("disabled")
}))