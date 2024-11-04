//Variables
const ActTemp = document.querySelector('#ActTemp');
const City = document.querySelector('#City');
const estado = document.querySelector('#estado');
const icono = document.querySelector('#icono');


const api = {
    Key:'4110390cbc7db4626fe443c9d694bb80',
    url:'https://api.openweathermap.org/data/2.5/weather'
};

const lat = 39.466307962945415;
const lon = -6.385880542352156;

//Eventos



//Funciones

function reloj(){
    let hoy = new Date();
    let h = hoy.getHours();
    let m = hoy.getMinutes();
    let s = hoy.getSeconds();

    m = actualizarHora(m);
    s = actualizarHora(s);

    document.querySelector('#reloj').innerHTML= h+":"+m+":"+s;
    let t = setTimeout(function(){reloj(),500});

}

function actualizarHora(i){
    if (i<10){
        i = "0" + i;
    }

    return i;
}

async function obtenerTiempo(lat,lon){
    const url = `${api.url}?lat=${lat}&lon=${lon}&appid=${api.Key}&lang=es&units=metrics`;
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        console.log(data);
        mostrarTiempo(data);
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        alert('Ha ocurrido un error al obtener el clima.');
    }
}

function toCelsius(Kelvin){
    return Math.round(Kelvin - 273.15);
}

function mostrarTiempo(data){
    City.innerHTML = data.name;
    ActTemp.innerHTML = `${toCelsius(data.main.temp)}ºC`;
    estado.innerHTML = data.weather[0].description;

    let iconCode = data.weather[0].icon;
    icono.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}


obtenerTiempo(lat,lon);
reloj();

//Funciones Formulario
let campoName = document.querySelector('#name');
let campoDNI = document.querySelector('#dni');
let campoPhone = document.querySelector('#phone');
let campoEmail = document.querySelector('#email');
let campoEdad = document.querySelector('#edad');
let btnSubmit = document.querySelector('#submit');
const formPrueba = document.querySelector('#formPrueba');

const campoInfo = document.querySelector('#muestraInfo');

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

function addPerson(){
    try {
        let valorName = campoName.value;
        let valorDNI = campoDNI.value;
        let valorPhone = campoPhone.value;
        let valorEmail = campoEmail.value;
        let valorEdad = campoEdad.value;
        let valorCategoria;
        
        const pattern = /^[0-9]{8}[A-Za-z]{1}$/;
        
        if(valorName==""){
            alert("El nombre esta vacio");
            return false;
        }
    
        if(!pattern.test(valorDNI)){
            alert("Por favor, introduzca un DNI válido (8 dígitos y 1 letra).");
            return false;
        }
    
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
            return true;
           /* formPrueba.reset();*/
        //}
    } catch (error) {
        alert('No se ha podido añadir a la persona');
    }
}

function logPersonRecursive(index){
    if(index<contacts.length){
        console.log(contacts[index]);
        logPersonRecursive(index+1);
    }
}

function enviar(){
    try {
        if (addPerson()){
            //generar cadena json
            //pasar datos json a fichero
            try {
                let jsonString = JSON.stringify(contacts);
                localStorage.setItem('Agenda', JSON.stringify(contacts));
                console.log(jsonString);
                //writeFile
                formPrueba.reset();   
            } catch (error) {
                console.log("No se ha podido pasar a JSON");
            }
        }   
    } catch (error) {
        console.log("No se ha podido enviar los datos correctamente")
    }
}

function DownloadJson(){
    
    const jsonString = localStorage.getItem('Agenda');
    
    try {
        const blob = new Blob([jsonString],{type: "application/json"});
        //Link de descarga
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "data.json";
        
        link.click();
        
        URL.revokeObjectURL(link.href);
    } catch (error) {
        alert('No hay datos almacenados que descargar');
    }    
}

function showPersons(){
    for (persona of contacts) {
        console.log(persona);
        if(persona.edad<18){
            alert(persona.name+" es menor de edad");
        }
    }
}

function muestraInfo() {
    for(persona of contacts){
        campoInfo.innerHTML = "";
        campoInfo.innerHTML +=`${persona.name} ${persona.edad}<br>`;
        if(persona.edad<18){
            alert(persona.name+" es menor de edad");
        }
    }
}