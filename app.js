//Variables
let campoName = document.querySelector('#name');
let campoDNI = document.querySelector('#dni');
let campoPhone = document.querySelector('#phone');
let campoEmail = document.querySelector('#email');
let campoEdad = document.querySelector('#edad');
let btnSubmit = document.querySelector('#submit');
const formPrueba = document.querySelector('#formPrueba');

const zonaSaludo = document.querySelector('#saludo');

let contacts = [{
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk",
    edad: 20,
    cat:"Adult"
    }, {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com",
    edad: 15,
    cat:"Teenager"
    }, {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu",
    edad:19,
    cat:"Teenager"
    }];

/*let last = contacts.length - 1;

btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault();
    let valorName = campoName.value;
    let valorPhone = campoPhone.value;
    let valorEmail = campoEmail.value;
    contacts.push({
        name:valorName,
        phone:valorPhone,
        email:valorEmail,
        });

    
    console.log(contacts);
    zonaSaludo.innerHTML = "Hola, bienvenido "+campoName.value;
});

/*console.log(`${contacts[0].name} / ${contacts[0].phone} / ${contacts[0].email}`);
console.log(`${contacts[last].name} / ${contacts[last].phone} / ${contacts[last].email}`);*/

/*newName = window.prompt('Dime tu nombre:');
newPhone = window.prompt('Dime tu teléfono:');
newEmail = window.prompt('Dime tu email:')*/

function addPerson(){
    //formPrueba.preventDefault();
    let valorName = campoName.value;
    let valorDNI = campoDNI.value;
    let valorPhone = campoPhone.value;
    let valorEmail = campoEmail.value;
    let valorEdad = campoEdad.value;
    let valorCategoria;
    
    switch (true) {
        case valorEdad>0&&valorEdad<=12:
                valorCategoria="Child";
            break;

        case valorEdad>=13&&valorEdad<=19:
                valorCategoria="Teenager";
            break;

        case valorEdad>=20&&valorEdad<=64:
                valorCategoria="Adult";
            break;
        
        case valorEdad>=65:
                valorCategoria="Senior";
            break;
    
        default:""
            break;
    }

        contacts.push({
            name:valorName,
            DNI:valorDNI,
            phone:valorPhone,
            email:valorEmail,
            edad:valorEdad,
            categoria:valorCategoria,
        });
        
        let last = contacts.length - 1; 
        console.log(contacts[last]);
        formPrueba.reset();
    //}

    
}

function showPersons(){
    for (persona of contacts) {
        console.log(persona);
        if(persona.edad<18){
            alert(persona.name+" es menor de edad");
        }
    }
}

function logPersonRecursive(){
    let index = 0;
    while(index<contacts.length){
       if(index<contacts.length){
        console.log(contacts[index]);
    } 
        index ++;
    }
}