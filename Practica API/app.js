//Campos del tiempo
const ActTemp = document.querySelector('#ActTemp');
const City = document.querySelector('#City');
const estado = document.querySelector('#estado');
const icono = document.querySelector('#icono');

//campos del formulario
let campoName = document.querySelector('#name');
let campoDNI = document.querySelector('#dni');
let campoPhone = document.querySelector('#phone');
let campoEmail = document.querySelector('#email');
let campoEdad = document.querySelector('#edad');
let btnSubmit = document.querySelector('#submit');
const formPrueba = document.querySelector('#formPrueba');

//Campos de informacion adicional y carrusel
const campoInfo = document.querySelector('#muestraInfo');
const campoPersona = document.querySelector('#persona');
let carrusel;
const campoErrores = document.querySelector('#errores');

let contacts = [{
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk",
    edad: 20,
    cat: "Adult"
}, {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com",
    edad: 15,
    cat: "Teenager"
}, {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu",
    edad: 19,
    cat: "Teenager"
}];

const api = {
    Key: '4110390cbc7db4626fe443c9d694bb80',
    url: 'https://api.openweathermap.org/data/2.5/weather'
};

const lat = 39.466307962945415;
const lon = -6.385880542352156;

//Funciones

//Obtiene la hora, minutos y segundos y lo va actualizando
function reloj() {
    let hoy = new Date();
    let h = hoy.getHours();
    let m = hoy.getMinutes();
    let s = hoy.getSeconds();

    m = actualizarHora(m);
    s = actualizarHora(s);

    document.querySelector('#reloj').innerHTML = h + ":" + m + ":" + s;
    let t = setTimeout(function () { reloj(), 500 });

}

//Añade un cero si el numero es menor de 10
const actualizarHora = (i) => {
    if (i < 10) {
        i = "0" + i;
    }

    return i;
}

//Obtiene el tiempo mediante el uso de la API openWeather
async function obtenerTiempo(lat, lon) {
    const url = `${api.url}?lat=${lat}&lon=${lon}&appid=${api.Key}&lang=es&units=metrics`;
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        console.log(data);
        mostrarTiempo(data);
    } catch (error) {
        console.error('Error al obtener el clima:', error);
        campoErrores.innerHTML = 'Ha ocurrido un error al obtener el clima.';
        campoErrores.style.display = 'block';
    }
}

//Convierte los kelvins en grados celsius
function toCelsius(Kelvin) {
    return Math.round(Kelvin - 273.15);
}

//Muestra los datos obtenidos de la API por pantalla
function mostrarTiempo(data) {
    City.innerHTML = data.name;
    ActTemp.innerHTML = `${toCelsius(data.main.temp)}ºC`;
    estado.innerHTML = data.weather[0].description;

    let iconCode = data.weather[0].icon;
    icono.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

//Obtiene los valores, valida la entrada de los mismos y los añade al array de personas
function addPerson() {
    try {
        let valorName = campoName.value;
        let valorDNI = campoDNI.value;
        let valorPhone = campoPhone.value;
        let valorEmail = campoEmail.value;
        let valorEdad = campoEdad.value;
        let valorCategoria;

        const pattern = /^[0-9]{8}[A-Za-z]{1}$/;

        if (valorName == "") {
            campoErrores.innerHTML = "El nombre esta vacio";
            campoErrores.style.display = 'block';
            return false;
        }

        if (valorEdad == "") {
            campoErrores.innerHTML = "La edad esta vacia";
            campoErrores.style.display = 'block';
            return false;
        }

        if (!pattern.test(valorDNI)) {
            campoErrores.innerHTML = "Por favor, introduzca un DNI válido (8 dígitos y 1 letra).";
            campoErrores.style.display = 'block';
            return false;
        }

        switch (true) {
            case valorEdad > 0 && valorEdad <= 12:
                valorCategoria = "Child";
                break;

            case valorEdad >= 13 && valorEdad <= 19:
                valorCategoria = "Teenager";
                break;

            case valorEdad >= 20 && valorEdad <= 64:
                valorCategoria = "Adult";
                break;

            case valorEdad >= 65:
                valorCategoria = "Senior";
                break;

            default: ""
                break;
        }

        contacts.push({
            name: valorName,
            DNI: valorDNI,
            phone: valorPhone,
            email: valorEmail,
            edad: valorEdad,
            categoria: valorCategoria,
        });

        let last = contacts.length - 1;
        console.log(contacts[last]);
        return true;

    } catch (error) {
        campoErrores.innerHTML = 'No se ha podido añadir a la persona';
        campoErrores.style.display = 'block';
    }
}

//Función recursiva que muestra las personas
function logPersonRecursive(index) {
    if (index < contacts.length) {
        console.log(contacts[index]);
        logPersonRecursive(index + 1);
    }
}

//Genera el JSON del array de personas
function enviar() {
    try {
        if (addPerson()) {
            try {
                let jsonString = JSON.stringify(contacts);
                localStorage.setItem('Agenda', JSON.stringify(contacts));
                formPrueba.reset();
            } catch (error) {
                campoErrores.innerHTML = 'No se ha podido pasar a JSON';
                campoErrores.style.display = 'block';
            }
        }
    } catch (error) {
        campoErrores.innerHTML = 'No se ha podido enviar los datos correctamente';
        campoErrores.style.display = 'block';
    }
}

//Genera una descargar del archivo JSON de las personas
function DownloadJson() {

    const jsonString = localStorage.getItem('Agenda');

    try {
        const blob = new Blob([jsonString], { type: "application/json" });
        //Link de descarga

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "data.json";

        link.click();

        URL.revokeObjectURL(link.href);
    } catch (error) {
        campoErrores.innerHTML = 'No hay datos almacenados que descargar';
        campoErrores.style.display = 'block';
    }
}

//Muestra las personas y genera un aviso si es menor de edad
function showPersons() {
    for (persona of contacts) {
        console.log(persona);
        if (persona.edad < 18) {
            campoErrores.innerHTML = persona.name + " es menor de edad";
            campoErrores.style.display = 'block';
        }
    }
}

//Realiza un carrusel en el que cada 5 segunos para el nombre de una persona
function carruselPersonas() {
    let i = 0;

    const muestra = function () {
        campoPersona.innerHTML = contacts[i].name;
        i++;
        if (i === contacts.length) {
            i = 0;
        }
        carrusel = setTimeout(muestra, 5000);
    };

    muestra();
}

//Para el carrusel anterior
function pararCarrusel() {
    clearTimeout(carrusel);
}

//Muestra las personas con su edad y avisa si es menor de edad
function muestraInfo() {
    campoInfo.style.display = 'block';
    campoInfo.innerHTML = "";
    for (persona of contacts) {
        campoInfo.innerHTML += `${persona.name} ${persona.edad}<br>`;
        if (persona.edad < 18) {
            campoErrores.innerHTML = persona.name + " es menor de edad";
            campoErrores.style.display = 'block';
        }
    }
}


//Llamadas
obtenerTiempo(lat, lon);
reloj();
carruselPersonas();
