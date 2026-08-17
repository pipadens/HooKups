// Variable para guardar el estado
let usuarioActual = null;
let categoriaSeleccionada = "";
const COMISION_PLATAFORMA = 0.05; // 5%

// Función para cambiar de pantalla
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Lógica de Login
function iniciarSesion() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    
    // --- PEGA AQUÍ TU CÓDIGO DE FIREBASE AUTH ---
    console.log("Intentando iniciar con:", user, pass);
    // firebase.auth().signInWithEmailAndPassword(user, pass)...
    
    alert("Iniciando sesión...");
    showScreen('screen-categories'); // Saltamos a categorías tras login
}

// Lógica de Categorías
function seleccionarCategoria(cat) {
    categoriaSeleccionada = cat;
    document.getElementById('selected-cat-display').innerText = cat;
    
    // Aquí definimos qué plan mostrar según la lógica que necesites
    // Puedes conectar esto con tu base de datos para saber si es Básico, Estándar o Premium
    actualizarBadge('Básico'); // Ejemplo inicial
    showScreen('screen-result');
}
// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyA8_VgNYjB7zh8yu52D9wy3tB0IC642dwY",
  authDomain: "hookups-97993.firebaseapp.com",
  projectId: "hookups-97993",
  storageBucket: "hookups-97993.firebasestorage.app",
  messagingSenderId: "386365471953",
  appId: "1:386365471953:web:fa6904dc98d49fc83119f0"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let categoriaSeleccionada = "Mujeres Jóvenes";
let nivelSeleccionado = "Básico";

// Navegación fluida entre pantallas
function cambiarPantalla(actualId, siguienteId) {
    const actual = document.getElementById(actualId);
    const siguiente = document.getElementById(siguienteId);
    
    if (actual) actual.classList.remove('active');
    if (siguiente) siguiente.classList.add('active');
}

// Selección de categorías
function seleccionarCategoria(cat) {
    categoriaSeleccionada = cat;
    const display = document.getElementById('selected-cat-display');
    if (display) {
        display.innerText = categoriaSeleccionada;
    }
    cambiarPantalla('screen-categories', 'screen-result');
}

// Cambio dinámico de insignia (Básico, Estándar, Premium)
function actualizarBadge(nivel) {
    nivelSeleccionado = nivel;
    const badge = document.getElementById('plan-badge');
    if (badge) {
        badge.innerText = nivel;
        badge.className = 'badge ' + nivel.toLowerCase();
    }
}

function iniciarSesion() {
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;
    if (!user || !pass) {
        alert("Por favor ingresa usuario y contraseña.");
        return;
    }
    alert("Iniciando sesión en HooKups...");
    cambiarPantalla('screen-1', 'screen-categories');
}

function entrarApp() {
    alert("Accediendo a: " + categoriaSeleccionada + " | Nivel: " + nivelSeleccionado);
}