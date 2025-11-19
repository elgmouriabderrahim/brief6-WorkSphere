const menu = document.querySelector('.menu');
const aside = document.querySelector('aside');
const x = document.querySelector('.x');

const modal = document.querySelector(".modal");
const AddNewWorkerBtn = document.querySelector(".AddNewWorkerBtn");

const cancelBtn = document.querySelector(".cancelbtn");
const saveBtn = document.querySelector(".savebtn");

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

let workers = [];

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


cancelBtn.addEventListener("click", ()=>{
    modal.classList.remove("opacity-100","scale-100","pointer-events-auto");
})

saveBtn.addEventListener("click", ()=>{
    modal.classList.remove("opacity-100","scale-100","pointer-events-auto", "flex" ,"gap-2");
    const newWorker = {
        id: Date.now(),
        name: Name.value,
        role: Role.value,
        email: Email.value,
        phoneNumber: PhoneNumber.value,
        photo: Photo.value,
        localisation :Localisation.value,
        experiences :[]
    }
    Experiences.childNodes.forEach(expdiv =>{
        const expTitle = expdiv.querySelector("#expTitle");
        const expStart = expdiv.querySelector("#expStart");
        const expEnd = expdiv.querySelector("#expEnd");
        const expDesc = expdiv.querySelector("#expDesc");
        const exp = {
            expTitle: expTitle.value,
            expStart: expStart.value,
            expEnd: expEnd.value,
            expDesc: expDesc.value
        }
        newWorker.experiences.push(exp);
    })
    workers.push(newWorker);

    const newWorkerDiv = document.createElement("div");
    newWorkerDiv.classList.add("w-full","rounded-md","bg-neutral-200/75", "p-2", "grid", "grid-cols-[20%,40%,40%]");
    newWorkerDiv.innerHTML = `
    <img src="${newWorker.photo}" class="w-12 h-12 place-self-center rounded-full object-cover row-span-3">
    <span class="font-bold">${newWorker.name}</span>
    <span>${newWorker.role}</span>
    <span class="col-span-2">tel: ${newWorker.phoneNumber}</span>
    <span class="col-span-2">email: ${newWorker.email}</span>
    <button class="deleteWorkerBtn bg-red-500 rounded-full px-2">remove</button>
    `;
    USContainer.append(newWorkerDiv);
    const deleteWorkerBtn = newWorkerDiv.querySelector(".deleteWorkerBtn");
    deleteWorkerBtn.addEventListener("click", ()=>{
        workers = workers.filter(worker => {
            return worker.id != newWorker.id;
        })
        newWorkerDiv.remove();
    })
    Experiences.innerHTML = "";
})

AddExp.addEventListener("click", ()=>{
    const experience = document.createElement("div");
    experience.innerHTML = `
    <input type="text" id="expTitle" placeholder="post" class="w-full px-2 py-1 border rounded">
    <div class="flex gap-4 justify-between">
     <div>
        <label for="expStart">start date</label>
        <input type="date" id="expStart" class="w-full px-2 py-1 border rounded">
    </div>
    <div>
        <label for="expEnd">end date</label>
        <input type="date" id="expEnd" class="w-full px-2 py-1 border rounded">
    </div>
    </div>
    <textarea id="expDesc" placeholder="Description" class="w-full px-2 py-1 border rounded h-20 resize-none"></textarea>
    `;
    Experiences.append(experience);
})