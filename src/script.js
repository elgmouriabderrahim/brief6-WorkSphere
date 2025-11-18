const menu = document.querySelector('.menu');
const aside = document.querySelector('aside');
const x = document.querySelector('.x');

const modal = document.querySelector(".modal");
const AddNewWorkerBtn = document.querySelector(".AddNewWorkerBtn");

const cancel = document.querySelector(".cancel");
const valider = document.querySelector(".valider");

menu.addEventListener("click", ()=>{
    aside.classList.remove("translate-x-full");
})
x.addEventListener("click", ()=>{
    aside.classList.add("translate-x-full");
})

AddNewWorkerBtn.addEventListener("click", () =>{
    modal.classList.remove("scale-90");
    modal.classList.add("opacity-100","scale-100","pointer-events-auto");
})


cancel.addEventListener("click", ()=>{
    modal.classList.remove("opacity-100","scale-100","pointer-events-auto");
})