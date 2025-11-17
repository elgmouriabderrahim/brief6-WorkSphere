const menu = document.querySelector('.menu');
const aside = document.querySelector('aside');
const x = document.querySelector('.x');
menu.addEventListener("click", ()=>{
    aside.classList.remove("hidden");
    aside.classList.add("flex");
})
x.addEventListener("click", ()=>{
    aside.classList.add("hidden");
    aside.classList.remove("flex");
})