const menu = document.querySelector('.menu');
const aside = document.querySelector('aside');
const x = document.querySelector('.x');

const modal = document.querySelector(".modal");
const AddNewWorkerBtn = document.querySelector(".AddNewWorkerBtn");

const cancel = document.querySelector(".cancel");
const valider = document.querySelector(".valider");

const USContainer = document.querySelector(".US-Container");

const Name = document.getElementById("name");
const NameError = document.getElementById("name-error");
const Role = document.getElementById("role");
const RoleError = document.getElementById("role-error");
const Email = document.getElementById("email");
const EmailError = document.getElementById("email-error");
const PhoneNumber = document.getElementById("phoneNumber");
const TelError = document.getElementById("tel-error");
const Photo = document.getElementById("photo");
const photoError = document.getElementById("photo-error");
const AddExp = document.getElementById("addExp");
const Experiences = document.getElementById("experiences");
const Localisation = document.getElementById("localisation");
const LocalisationError = document.getElementById("localisation-error");

const workers = [];

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

valider.addEventListener("click", ()=>{
    modal.classList.remove("opacity-100","scale-100","pointer-events-auto", "flex" ,"gap-2");
    const newWorker = {
        name: Name.value,
        role: Role.value,
        email: Email.value,
        phoneNumber: PhoneNumber.value,
        photo: Photo.value,
        experiences :Experiences.value,
        localisation :Localisation.value
    }
    console.log(Photo)
    const newWorkerDiv = document.createElement("div");
    newWorkerDiv.classList.add("w-full","rounded-md","bg-neutral-300", "p-2", "flex", "justify-between", "items-center");
    newWorkerDiv.innerHTML = `
    <img src="${newWorker.photo}" class="w-10 h-10 rounded-full object-cover">
    <span>name: ${newWorker.name}</span>
    <span>role: ${newWorker.role}</span>
    `;
    USContainer.append(newWorkerDiv);
})
