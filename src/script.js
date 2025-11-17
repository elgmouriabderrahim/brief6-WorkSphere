const menu = document.querySelector('.menu');
const aside = document.querySelector('aside');
const x = document.querySelector('.x');
menu.addEventListener("click", ()=>{
    aside.classList.remove("translate-x-full");
})
x.addEventListener("click", ()=>{
    aside.classList.add("translate-x-full");
})