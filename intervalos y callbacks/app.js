const personas = [
    { nombre: "Ana", edad: 28 },
    { nombre: "Carlos", edad: 34 },
    { nombre: "Lucía", edad: 25 },
    { nombre: "Miguel", edad: 40 },
    { nombre: "Sara", edad: 31 }
  ];

function showPersonWithDelay(){
    for (let i = 0; i < personas.length; i++) {
        //console.log(personas[i]);
        const muestra = function(){
            console.log(personas[i]);
        }
        setTimeout(muestra,1000 * i);
    }
}

showPersonWithDelay();

//setTimeout(showPersonWithDelay,3000);

//setInterval(showPersonWithDelay,5000);