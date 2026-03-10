/**
 * Script principal que inicializa la animación
 */

// Arreglo para almacenar los controladores de cada pétalo
const petals = [];

/**
 * Crea y coloca todos los pétalos en sus posiciones iniciales
 */
function createPetals() {

    for (let i = PETAL_DATA.length - 1; i >= 0; i--) {

        const petalData = PETAL_DATA[i];

        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.id = `petal-${i+1}`;
        
        const topPos = `calc(50vh + ${petalData.y_relative + POSITION_BASE.y}px)`;
        const leftPos = `calc(50vw + ${petalData.x_relative + POSITION_BASE.x}px)`;
        
        petal.setAttribute("style", `
            top: ${topPos}; 
            left: ${leftPos}; 
            width: ${petalData.width}px; 
            height: ${petalData.height}px;
        `);

        const img = document.createElement("img");

        img.src = petalData.path;
        img.alt = `Pétalo ${i+1}`;

        img.style.filter = `
            brightness(1.4)
            contrast(1.3)
            saturate(1.2)
        `;
        
        petal.appendChild(img);
        document.body.appendChild(petal);

        const rect = petal.getBoundingClientRect();
        
        petals.push({
            element: petal,
            physics: new PetalPhysics(petal, rect.left, rect.top, i),
            index: i+1
        });

    }

}


/**
 * Inicia la secuencia de caída de los pétalos
 */
function startFallingSequence() {

    let currentIndex = 0;

    function triggerNextPetal() {

        if (currentIndex < petals.length) {

            const petalToFall = petals.find(p => p.index === currentIndex + 1);

            if (petalToFall) {

                petalToFall.physics.start();

                mostrarFrase();

            }

            currentIndex++;

            if (currentIndex < petals.length) {

                setTimeout(triggerNextPetal, TIEMPO_ENTRE_PETALOS);

            }

        }

    }

    triggerNextPetal();

}


/**
 * Inicializa la aplicación
 */
function init(){

    createPetals();

    enhanceGlass();

    setTimeout(startFallingSequence, 1000);

}

document.addEventListener("DOMContentLoaded", init);



/* =========================
   FRASES DE LOS PÉTALOS
========================= */

const frases = [

"Me gustas más que esta rosa 🌹",
"Pensé en ti cuando hice esto",
"Eres más bonita que cualquier flor",
"Si ves esto... es para ti",
"Cada pétalo es un pensamiento en ti",
"Solo quería hacerte sonreír",
"Esta rosa no se compara contigo",
"Ojalá te guste este pequeño detalle"

];

let frasesDisponibles = [...frases];


function mostrarFrase(){

    if(frasesDisponibles.length === 0){

        frasesDisponibles = [...frases];

    }

    const index = Math.floor(Math.random() * frasesDisponibles.length);

    const frase = frasesDisponibles.splice(index,1)[0];

    const contenedor = document.getElementById("frasePetalo");

    if(!contenedor) return;

    contenedor.textContent = frase;

    contenedor.style.opacity = 1;

    setTimeout(()=>{

        contenedor.style.opacity = 0;

    },3000);

}
