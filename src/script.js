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
const AddExp = document.getElementById("addExp");
const Experiences = document.getElementById("experiences");

const previmage = document.querySelector(".previmage");

let datecheck;
let experiencestemp = [];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+\d]?(?:[\d\s-]{10,})$/;
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{3,}$/;


const SalleConference = document.querySelector(".SalleConference");
const Reception = document.querySelector(".Reception");
const SalleServeurs = document.querySelector(".SalleServeurs");
const SalleSecurite = document.querySelector(".SalleSecurite");
const SallePersonnel = document.querySelector(".SallePersonnel");
const SalleArchives = document.querySelector(".SalleArchives");

const plusBtns = document.querySelectorAll(".plusBtn");

let workerToEditId;

const roleLimits = {
    Receptionniste: ['SalleConference', 'Reception', 'SallePersonnel', 'SalleArchives'],
    Technicien: ['SalleConference', 'SalleServeurs', 'SallePersonnel', 'SalleArchives'],
    Scurite: ['SalleConference', 'SalleSecurite', 'SallePersonnel', 'SalleArchives'],
    Manager: ['SalleConference', 'Reception', 'SalleServeurs', 'SalleSecurite', 'SallePersonnel', 'SalleArchives'],
    Nettoyage: ['SalleConference','Reception','SalleServeurs','SalleSecurite','SallePersonnel'],
    Autres: ['SalleConference', 'SallePersonnel', 'SalleArchives']
};


const limitation = {
    SalleConference:{
        nbr: 0,
        limit: 10
    },
    Reception:{
        nbr: 0,
        limit: 5
    },
    SallePersonnel:{
        nbr: 0,
        limit: 5
    },
    SalleArchives:{
        nbr: 0,
        limit: 3
    },
    SalleServeurs:{
        nbr: 0,
        limit: 3
    },
    SalleSecurite:{
        nbr: 0,
        limit: 3
    }
};

let workers = JSON.parse(localStorage.getItem("workers")||"[]");
workers.forEach(worker => appendworkerAsUS(worker));

menu.addEventListener("click", () => {
    aside.classList.remove("translate-x-full");
})
x.addEventListener("click", () => {
    aside.classList.add("translate-x-full");
})

AddNewWorkerBtn.addEventListener("click", () => {
    modal.classList.add("flex");
    modal.classList.remove("hidden")
})

document.querySelector("form").addEventListener("submit", f => {
    f.preventDefault();
})

cancelBtn.addEventListener("click", () => {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    if(saveBtn.dataset.save === "edit"){
        Name.readOnly = false;
        saveBtn.dataset.save = "new";

        Experiences.innerHTML = "";
        Name.value = "";
        Email.value = "";
        PhoneNumber.value = "";
        Role.value = "";
        Photo.value = "";
        previmage.src = "./src/images/profile.png";
    }
})

saveBtn.addEventListener("click", () => {
    experiencestemp = [];

    if (!nameRegex.test(Name.value))
        if (Name.value == "")
            NameError.innerText = "Please enter your name";
        else
            NameError.innerText = "Invalide name";
    else
        NameError.innerText = "";

    if (!emailRegex.test(Email.value))
        if (Email.value == "")
            EmailError.innerText = "Please enter your email";
        else
            EmailError.innerText = "Invalide email";
    else
        EmailError.innerText = "";

    if (!phoneRegex.test(PhoneNumber.value))
        if (PhoneNumber.value == "")
            TelError.innerText = "Pleae enter your phone number";
        else
            TelError.innerText = "Invalide phone number";
    else
        TelError.innerText = "";

    if (Role.value == "")
        RoleError.innerText = "Please select your role";
    else
        RoleError.innerText = "";

    datecheck = true;

    if (Experiences.children.length == 0)
        datecheck = true;

    [...Experiences.children].forEach(expdiv => {
        const expTitle = expdiv.querySelector(".expTitle");
        const expStart = expdiv.querySelector(".expStart");
        const expEnd = expdiv.querySelector(".expEnd");
        const expDesc = expdiv.querySelector(".expDesc");
        const experienceErr = expdiv.querySelector(".experienceErr");

        if (expTitle.value == "" || expStart.value == "" || expEnd.value == "") {
            experienceErr.innerText = "fill the experience informations";
            datecheck = false;
        } else {

            const startDate = new Date(expStart.value);
            const endDate = new Date(expEnd.value);
            if (startDate > endDate) {
                datecheck = false;
                experienceErr.innerText = "experience start date must be greater than end date";
            } else {
                experienceErr.innerText = "";
                const exp = {
                    expTitle: expTitle.value,
                    expStart: expStart.value,
                    expEnd: expEnd.value,
                    expDesc: expDesc.value
                }
                experiencestemp.push(exp);
            }
        }

    })

    if (emailRegex.test(Email.value) &&
        phoneRegex.test(PhoneNumber.value) &&
        nameRegex.test(Name.value) &&
        Role.value != "" &&
        datecheck
    ) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        const newWorker = {
            id: Date.now(),
            name: Name.value,
            role: Role.value,
            email: Email.value,
            phoneNumber: PhoneNumber.value,
            photo: Photo.value,
            experiences: [],
        }
        newWorker.experiences = experiencestemp;
        
        if(saveBtn.dataset.save === "new"){
            workers.push(newWorker);
            appendworkerAsUS(newWorker);
            localStorage.setItem("workers", JSON.stringify(workers));
        }else{
            console.log(workers)
            workers = workers.map(worker =>{
                if(worker.id == workerToEditId)
                    return newWorker;
                else
                    return worker;
            })
            localStorage.setItem("workers", JSON.stringify(workers));
            Name.readOnly = false;
            saveBtn.dataset.save = "new";
            location.reload();
        }

        Experiences.innerHTML = "";
        Name.value = "";
        Email.value = "";
        PhoneNumber.value = "";
        Role.value = "";
        Photo.value = "";
        previmage.src = "./src/images/profile.png";
    }
})

function appendworkerAsUS(newWorker){
    const newWorkerDiv = document.createElement("div");
    newWorkerDiv.classList.add("w-full", "rounded-md", "bg-neutral-200/75", "p-2", "text-sm", "grid", "grid-cols-[15%,1fr]");
    newWorkerDiv.setAttribute("id", newWorker.id);
    newWorkerDiv.innerHTML = `
    <img src="${newWorker.photo}" onerror="this.src='./src/images/profile.png'" class="profilephoto w-8 h-8 place-self-center rounded-full object-cover row-span-2">
    <span class="font-bold col-start-2 row-start-1">${newWorker.name}</span>
    <span class="col-start-2 row-start-2">${newWorker.role}</span>
    <i class="fa-solid fa-trash deleteWorkerBtn cursor-pointer hover:text-red-600 text-red-500 w-full text-end col-start-3 justify-self-end"></i>
    <i class="fa-solid fa-pen-to-square editWorkerBtn cursor-pointer text-neutral-600 hover:text-black w-full text-end col-start-3 justify-self-end z-50"></i>
    `;
    newWorker.location = "USstaffzone";
    newWorkerDiv.classList.add("transform", "hover:scale-[1.01]", "transition-transform", "duration-50", "ease-in-out", "hover:shadow-lg");
    USContainer.append(newWorkerDiv);

    listen(newWorkerDiv);

    const deleteWorkerBtn = newWorkerDiv.querySelector(".deleteWorkerBtn");
    deleteWorkerBtn.addEventListener("click", () => {
        workers = workers.filter(worker => worker.id != newWorker.id);
        localStorage.setItem("workers", JSON.stringify(workers));
        newWorkerDiv.remove();
    })
    
    const editWorkerBtn = newWorkerDiv.querySelector(".editWorkerBtn");
    editWorkerBtn.addEventListener("click", (e)=>{
        e.stopPropagation();
        editWorker(newWorker);
    });
}


AddExp.addEventListener("click", () => {
    const experience = document.createElement("div");
    experience.classList.add("relative", "py-4", "bg-neutral-100")
    experience.innerHTML = `
    <i class="x-exp fa-solid fa-x cursor-pointer bg-red-600 absolute top-0 right-0"></i>
    <input type="text" placeholder="post *" class="expTitle w-full px-2 py-1 border rounded">
    <div class="flex gap-4 justify-between mt-2">
        <div>
            <label>start date *</label>
            <input type="date" class="expStart w-full px-2 py-1 border rounded">
        </div>
        <div>
            <label>end date *</label>
            <input type="date" class="expEnd w-full px-2 py-1 border rounded">
        </div>
    </div>
    <textarea placeholder="Description (Optional)" class="expDesc w-full px-2 py-1 mt-2 border rounded h-20 resize-none"></textarea>
    <p class="experienceErr text-red-600 text-sm mt-1"></p>
    `;
    const xExp = experience.querySelector(".x-exp");
    xExp.addEventListener("click", () => {
        experience.remove();
    })
    Experiences.append(experience);
})

Photo.addEventListener("change", () => {
    previmage.onerror = function() {
        previmage.src = "./src/images/profile.png";
    };
    previmage.src = Photo.value;
});

function checkWorkerRole(workerRole, selectedspace){
    let isvalid = false;
    roleLimits[workerRole].forEach(space =>{
        if(space == selectedspace){
            isvalid = true;
        }
    })
    return isvalid;
}

[...plusBtns].forEach(plusBtn => {
    plusBtn.addEventListener("click", ()=>{
        const pop = document.createElement("div");
        pop.className = "pop inset-0 bg-black/50 backdrop-blur-md absolute grid place-items-center z-50";
        pop.innerHTML = `
            <div class="filteredlist relative flex flex-col gap-2 w-[90%] md:w-[400px] p-2 h-[70vh] overflow-y-auto bg-white rounded-md">
                <div class="x-filteredlist cursor-pointer text-red-600 absolute top-0 right-0 w-8 h-8">
                    <i class="fa-solid fa-x "></i>
                </div>
                <p class="font-bold text-black text-center">choose a worker</p>
            </div>
        `;
        document.body.append(pop)


        
        const filteredlist = document.querySelector(".filteredlist");
        const xFilteredList = document.querySelector(".x-filteredlist");
        xFilteredList.addEventListener("click", ()=>{
            filteredlist.parentElement.remove();
        })
        workers.forEach(worker =>{
            if(checkWorkerRole(worker.role, plusBtn.getAttribute("id")) && worker.location == "USstaffzone"){
                const workerDiv = document.createElement("div");
                workerDiv.classList.add("selectedWorker", "w-full", "rounded-md", "bg-neutral-200/75", "p-2", "text-sm", "grid", "grid-cols-[15%,1fr]");
                workerDiv.setAttribute("id", worker.id);
                workerDiv.innerHTML = `
                <img src="${worker.photo}" onerror="this.src='./src/images/profile.png'" class="profilephoto cursor-pointer w-8 h-8 place-self-center rounded-full object-cover row-span-2">
                <span class="font-bold col-start-2 row-start-1">${worker.name}</span>
                <span class="col-start-2 row-start-2">${worker.role}</span>
                `;
                workerDiv.classList.add("transform", "hover:scale-[1.01]", "transition-transform", "duration-50", "ease-in-out", "hover:shadow-lg");
                filteredlist.append(workerDiv);
            }
        })
        const selectedWorkers = document.querySelectorAll(".selectedWorker");
        [...selectedWorkers].forEach(worker=>{
            worker.addEventListener("click", ()=>{
                if(limitation[plusBtn.id].nbr == limitation[plusBtn.id].limit){
                    alert("the space is full");
                }else{
                    limitation[plusBtn.id].nbr++;

                    plusBtn.parentElement.classList.add("bg-teal-300/50");
                    [...USContainer.children].forEach(USworker => {
                        if(worker.id == USworker.id){
                            USworker.remove();
                            workers.forEach(WORKER =>{
                                if(WORKER.id == worker.id){
                                    WORKER.location = plusBtn.id;
                                    const clicked = document.createElement("div");
                                    clicked.className = "w-[30px] h-[30px] relative bg-neutral-500 rounded rounded-md";
                                    clicked.setAttribute("id", WORKER.id);
                                    clicked.innerHTML = `
                                    <i class="x-profile fa-solid fa-right-to-bracket cursor-pointer text-xs bg-white rounded text-red-600 absolute top-0 right-0 transform -translate-y-full"></i>
                                    <img src="${WORKER.photo}" onerror="this.onerror=null; this.src='./src/images/profile.png';" class="profilephoto w-[30px] h-[30px] rounded-full object-cover">
                                    `;
                                    plusBtn.parentElement.append(clicked);
    
                                    listen(clicked);
    
                                    const xProfile = clicked.querySelector(".x-profile");
                                    xProfile.addEventListener("click", (e)=>{
                                        e.stopPropagation();
                                        limitation[plusBtn.id].nbr--;
                                        if(workers.every(w =>  w.location != plusBtn.id))
                                            plusBtn.parentElement.classList.remove("bg-teal-300/50");
                                        clicked.remove();
                                        appendworkerAsUS(WORKER);
                                    })
                                    filteredlist.parentElement.remove();
                                }
                            })
                        }
                    })
                }
            })
        })


    })
})

function listen(element){
    element.addEventListener("click", ()=>{ 
        workers.forEach(worker => {
            if(element.id == worker.id)
                descriptionPopUp(worker);
        })
    
    })
}


function descriptionPopUp(worker) {
    const pop = document.createElement("div");
    pop.className = "inset-0 bg-black/50 backdrop-blur-md fixed grid place-items-center z-50 p-4";
    const container =  document.createElement("div");
    container.className = "bg-neutral-200 rounded-lg shadow-lg p-4 w-full h-[90vh] md:w-1/3 bg-neutral-200 relative overflow-y-auto";

    const content = document.createElement("div");
    content.className = "grid grid-cols-1 justify-items-center gap-y-2";

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;
    closeBtn.className = "absolute top-4 right-4 font-bold text-red-500 hover:text-red-600";
    closeBtn.addEventListener("click", () => pop.remove());

    const img = document.createElement("img");
    img.src = worker.photo;
    img.onerror = () => img.src = "./src/images/profile.png";
    img.className = "profilephoto w-1/4 aspect-square object-cover border border-black border-2 rounded-full justify-self-center";

    const name = document.createElement("p");
    name.classList = "font-bold";
    name.textContent = worker.name;
    
    const role = document.createElement("p");
    role.textContent = worker.role;
    
    const phone = document.createElement("p");
    phone.textContent = worker.phoneNumber;
    
    const email = document.createElement("p");
    email.textContent = worker.email;
    
    const localisation = document.createElement("p");
    localisation.textContent = worker.location;

    const expContainer = document.createElement("div");
    if(worker.experiences.length > 0){
        expContainer.className = "w-full";
        expContainer.innerHTML = `<p class="font-bold underline text-center">Les Experiences</p>`;
    
        worker.experiences.forEach(exp =>{
            const expDiv = document.createElement("div");
            expDiv.className = "border p-2 rounded-md bg-gray-50";
    
            const post = document.createElement("p");
            post.className = "font-semibold text-gray-800";
            post.textContent = `Post: ${exp.expTitle}`;
    
            const dates = document.createElement("p");
            dates.className = "text-gray-600 text-sm";
            dates.textContent = `From ${exp.expStart} to ${exp.expEnd}`;
    
            const expDesc = document.createElement("p");
            expDesc.className = "text-gray-700 text-sm";
            if(exp.expDesc == "")
                expDesc.innerHTML = `Description :<br/>No description available`;
            else
                expDesc.innerHTML = `Description :<br/>${exp.expDesc}`;

            expDiv.append(post, dates, expDesc);
            expContainer.appendChild(expDiv);
        })
    }
    const editbtn = document.createElement("button");
    editbtn.className = "bg-green-500 border border-black rounded-md px-8";
    editbtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>Edit Info`;
    editbtn.addEventListener("click", ()=>{
        editWorker(worker);
        pop.remove();
    });

    content.append(closeBtn, img, name, role, phone,  email, localisation, expContainer, editbtn);
    container.appendChild(content);
    pop.appendChild(container);

    pop.addEventListener("click", (e) => {
        if (e.target === pop) pop.remove();
    });

    document.body.appendChild(pop);
}

function editWorker(worker){
    workerToEditId = worker.id;
    modal.classList.add("flex");
    modal.classList.remove("hidden");
    Name.readOnly = true;
    Name.value = worker.name;
    Role.value = worker.role;
    Email.value = worker.email;
    PhoneNumber.value = worker.phoneNumber;
    Photo.value = worker.photo;
    if(worker.photo != "")
        previmage.src = worker.photo;
    saveBtn.dataset.save = "edit";
}
plusBtns.forEach(btn =>{
    btn.classList.add("transform", "hover:scale-110", "transition-transform", "duration-50", "ease-in-out")
})