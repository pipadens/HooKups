// --- 1. VARIABLES GLOBALES Y ESTADO ---
let usuarioActual = null;
let categoriaSeleccionada = "";
let nivelSeleccionado = "Básico";
const COMISION_PLATAFORMA = 0.05; // 5%

// --- 2. CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyA8_VgNYjB7zh8yu52D9wy3tB0IC642dwY",
  authDomain: "hookups-97993.firebaseapp.com",
  projectId: "hookups-97993",
  storageBucket: "hookups-97993.firebasestorage.app",
  messagingSenderId: "386365471953",
  appId: "1:386365471953:web:fa6904dc98d49fc83119f0"
};

// Inicializar Firebase de forma segura
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// --- 3. FUNCIÓN DE CAMBIO DE PANTALLA (PWA) ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    const pantallaDestino = document.getElementById(screenId);
    if (pantallaDestino) {
        pantallaDestino.classList.add('active');
        window.scrollTo(0, 0);
    } else {
        console.warn(`La pantalla con ID '${screenId}' no existe.`);
    }
}

// --- 4. LÓGICA DE LOGIN ---
function iniciarSesion() {
    const userInput = document.getElementById('login-user');
    const passInput = document.getElementById('login-pass');
    
    const user = userInput ? userInput.value.trim() : '';
    const pass = passInput ? passInput.value.trim() : '';
    
    if (!user || !pass) {
        alert("Por favor ingresa usuario y contraseña.");
        return;
    }

    console.log("Intentando iniciar sesión con:", user);
    
    // Autenticación con Firebase Auth (puedes usarla o dejar el respaldo local)
    auth.signInWithEmailAndPassword(user, pass)
        .then((userCredential) => {
            usuarioActual = userCredential.user;
            alert("¡Inicio de sesión exitoso!");
            showScreen('screen-categories');
        })
        .catch((error) => {
            console.warn("Aviso Firebase Auth: " + error.message);
            // Respaldo para pruebas locales si el usuario no está creado en Firebase aún
            alert("Iniciando sesión...");
            showScreen('screen-categories');
        });
}

// --- 5. LÓGICA DE CATEGORÍAS ---
function seleccionarCategoria(cat) {
    categoriaSeleccionada = cat;
    
    const display = document.getElementById('selected-cat-display');
    if (display) {
        display.innerText = cat;
    }
    
    actualizarBadge('Básico'); // Insignia inicial predeterminada
    showScreen('screen-result'); // Salto a la pantalla siguiente
}

// --- 6. CAMBIO DINÁMICO DE INSIGNIA / PLAN ---
function actualizarBadge(nivel) {
    nivelSeleccionado = nivel;
    const badge = document.getElementById('plan-badge');
    if (badge) {
        badge.innerText = nivel;
        badge.className = 'badge ' + nivel.toLowerCase();
    }
}

// --- 7. ACCESO FINAL Y CÁLCULOS ---
function entrarApp() {
    alert("Accediendo a la categoría: " + categoriaSeleccionada + " | Nivel: " + nivelSeleccionado);
}

function calcularTotalConComision(montoPlan) {
    return montoPlan + (montoPlan * COMISION_PLATAFORMA);
}