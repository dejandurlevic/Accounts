window.addEventListener('beforeunload', save);


let accountstable = document.querySelector('#table-body');
let allLinks = document.querySelectorAll('.nav-link');
let accounts = document.querySelector('#accounts');
let addAccounts = document.querySelector('#add-accounts');
let views = document.querySelectorAll('.view');
let idInput = document.querySelector('[placeholder="ID"]');
let nameInput = document.querySelector('[placeholder="Name"]');
let lastNameInput = document.querySelector('[placeholder="Lastname"]');
let emailInput = document.querySelector('[placeholder="Email"]');
let phoneInput = document.querySelector('[placeholder="Phone"]');
let saveBtn = document.querySelector('#save');
let eId = document.querySelector('.eId');
let eName = document.querySelector('.eName');
let eLastName = document.querySelector('.eLastName');
let eEmail = document.querySelector('.eEmail');
let ePhone = document.querySelector('.ePhone');
let editBtn = document.querySelector('#edit');
let id;

editBtn.addEventListener('click', saveEditetAccounts)

function saveEditetAccounts() {
    const editetAccounts = {
        id: eId.value,
        name: eName.value,
        lastname: eLastName.value,
        email: eEmail.value,
        phone: ePhone.value

    }


    db[id] = editetAccounts;
    createAccountsTable();
    showView('#accounts');
}

saveBtn.addEventListener('click', addAcount);

function addAcount() {
    const newAccount = {
        id: idInput.value,
        name: nameInput.value,
        lastname: lastNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value

    }
    db.push(newAccount);
    idInput.value = "";
    nameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    createAccountsTable();
    showView('#accounts');
}


for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click', showView);
}

function showView(e) {

    for (let i = 0; i < views.length; i++) {
        views[i].style.display = "none";
    }

    if (e instanceof Event) {
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
        document.querySelector(id).style.display = "block";
    } else {
        document.querySelector(e).style.display = "block";
    }





}

createAccountsTable();


function createAccountsTable() {
    let htmlAccounts = '';
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        htmlAccounts += `
        <tr>
        <td>${account.id}</td>
        <td>${account.name}</td>
        <td>${account.lastname}</td>
        <td>${account.email}</td>
        <td>${account.phone}</td>
        <td><button data-id="${i}" class='edit-btn btn btn-warning form-control'>Edit</button></td>
        <td><button data-id="${i}" class='delete-btn btn btn-danger form-control'>Delete</button></td>
        </tr>   
        `
    }

    accountstable.innerHTML = htmlAccounts;

    let deleteBtn = document.querySelectorAll('.delete-btn');
    let editBtn = document.querySelectorAll('.edit-btn');

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', deleteAccounts);
        editBtn[i].addEventListener('click', editAccounts);


    }


    function deleteAccounts() {

        let id = this.getAttribute('data-id');
        db.splice(id, 1);
        createAccountsTable();
        showView('#accounts');
    }
    function editAccounts() {
        id = this.getAttribute('data-id');
        let selectedAcc = db[id];
        eId.value = selectedAcc.id;
        eName.value = selectedAcc.name;
        eLastName.value = selectedAcc.lastname;
        eEmail.value = selectedAcc.email;
        ePhone.value = selectedAcc.phone;
        showView('#edit-accounts');

    }
}

function save(){
    localStorage.db = JSON.stringify(db);
}