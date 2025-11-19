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


const previmage = document.querySelector(".previmage")

let workers = [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d]?(?:[\d\s-]{10,})$/;
const nameRegex  = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{3,}$/;

menu.addEventListener("click", ()=>{
    aside.classList.remove("translate-x-full");
})
x.addEventListener("click", ()=>{
    aside.classList.add("translate-x-full");
})

AddNewWorkerBtn.addEventListener("click", () =>{
    modal.classList.add("flex");
    modal.classList.remove("hidden")
})

document.querySelector("form").addEventListener("submit", f =>{
    f.preventDefault();
})
cancelBtn.addEventListener("click", ()=>{
    modal.classList.remove("flex");
    modal.classList.add("hidden") 
})

saveBtn.addEventListener("click", ()=>{
    if(!nameRegex.test(Name.value))
        if(Name.value == "")
            NameError.innerText = "Please enter your name";
        else
            NameError.innerText = "Invalide name";
    else
        NameError.innerText = "";


    if(!emailRegex.test(Email.value))
        if(Email.value == "")
            EmailError.innerText = "Please enter your email";
        else
            EmailError.innerText = "Invalide email";
    else
        EmailError.innerText = "";

    if(!phoneRegex.test(PhoneNumber.value))
        if(PhoneNumber.value == "")
            TelError.innerText = "Pleae enter your phone number";
        else
            TelError.innerText = "Invalide phone number";
    else
        TelError.innerText = "";

    if(Role.value == "")
        RoleError.innerText = "Please select your role";
    else
        RoleError.innerText = "";

    if(Localisation.value == "")
        LocalisationError.innerText = "Please enter your location";
    else
        LocalisationError.innerText = "";

    if(emailRegex.test(Email.value) && phoneRegex.test(PhoneNumber.value) && nameRegex.test(Name.value) && Role.value != "" && Localisation.value != ""){
        modal.classList.add("hidden"); 
        modal.classList.remove("flex"); 
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
        newWorkerDiv.classList.add("w-full","rounded-md","bg-neutral-200/75", "p-2", "grid", "grid-cols-[15%,45%,40%]");
        newWorkerDiv.innerHTML = `
        <img src="${newWorker.photo}" onerror="this.src='./src/images/profile.png'" class="profilephoto w-12 h-12 place-self-center rounded-full object-cover row-span-3">
        <span class="font-bold">${newWorker.name}</span>
        <span>${newWorker.role}</span>
        <span class="col-span-2">tel: ${newWorker.phoneNumber}</span>
        <span class="col-span-2">email: ${newWorker.email}</span>
        <i class="fa-solid fa-trash deleteWorkerBtn text-red-500 w-full text-end col-start-3 justify-self-end"></i>
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
    }
})

AddExp.addEventListener("click", ()=>{
    const experience = document.createElement("div");
    experience.classList.add("relative", "py-4", "bg-neutral-100")
    experience.innerHTML = `
    <i class="x-exp fa-solid fa-x bg-red-600 absolute top-0 right-0"></i>
    <input type="text" id="expTitle" placeholder="post" class="w-full px-2 py-1 border rounded">
    <div class="flex gap-4 justify-between mt-2">
        <div>
            <label for="expStart">start date</label>
            <input type="date" id="expStart" class="w-full px-2 py-1 border rounded">
        </div>
        <div>
            <label for="expEnd">end date</label>
            <input type="date" id="expEnd" class="w-full px-2 py-1 border rounded">
        </div>
    </div>
    <textarea id="expDesc" placeholder="Description" class="w-full px-2 py-1 mt-2 border rounded h-20 resize-none"></textarea>
    `;
    const xExp = experience.querySelector(".x-exp");
    xExp.addEventListener("click", () =>{
        experience.remove();
    })
    Experiences.append(experience);
})
Photo.addEventListener("change", ()=>{
    previmage.classList.remove("hidden");
    previmage.src = Photo.value;
    previmage.onerror = function(){
        previmage.onerror = null;
        previmage.src = "./src/images/profile.png";
    }
})