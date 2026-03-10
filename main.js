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
/* =========================
   FUEGOS ARTIFICIALES
========================= */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.particles = [];

        for(let i=0;i<40;i++){
            this.particles.push({
                x:this.x,
                y:this.y,
                angle:Math.random()*Math.PI*2,
                speed:Math.random()*4+1,
                life:100
            });
        }
    }

    update(){
        this.particles.forEach(p=>{
            p.x += Math.cos(p.angle)*p.speed;
            p.y += Math.sin(p.angle)*p.speed;
            p.life--;
        });
    }

    draw(){
        this.particles.forEach(p=>{
            ctx.fillStyle = "rgba(255,120,160,"+(p.life/100)+")";
            ctx.beginPath();
            ctx.arc(p.x,p.y,2,0,Math.PI*2);
            ctx.fill();
        });
    }
}

function animateFireworks(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(Math.random()<0.03){
        fireworks.push(new Firework());
    }

    fireworks.forEach((f,index)=>{
        f.update();
        f.draw();

        if(f.particles[0].life <= 0){
            fireworks.splice(index,1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();
