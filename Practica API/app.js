//Variables
const ActTemp = document.querySelector('#ActTemp');
const City = document.querySelector('#City');
const estado = document.querySelector('#estado');


const api = {
    Key:'4110390cbc7db4626fe443c9d694bb80',
    url:'https://api.openweathermap.org/data/2.5/weather'
};

const lat = 39.466307962945415;
const lon = -6.385880542352156;

//Eventos



//Funciones
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
}


obtenerTiempo(lat,lon);