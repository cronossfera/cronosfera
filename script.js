 // Importaciones de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { capsulas } from './capsulas.js';// Configuración de Firebase (reemplaza con tus claves)
const firebaseConfig = {
    apiKey: "AIzaSyA0F6ZO87MWqbLNX1_cYu06PzQEkdBNIDc",
    authDomain: "cronosfera-844ec.firebaseapp.com",
    projectId: "cronosfera-844ec",
    storageBucket: "cronosfera-844ec.firebasestorage.app",
    messagingSenderId: "272938986424",
    appId: "1:272938986424:web:1e782b25d337347eadbd4d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);// Configuración inicial
let idiomaActual = localStorage.getItem("idioma") || "es";
let temaActual = localStorage.getItem("tema") || "default";
let fontActual = localStorage.getItem("font") || "Orbitron";
let isHighContrast = localStorage.getItem("highContrast") === "true";
let isAutoTheme = localStorage.getItem("autoTheme") === "true";
document.body.className = tema-${temaActual} custom-font-${fontActual}${isHighContrast ? " high-contrast" : ""};
if (isAutoTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("tema-dark-academia");
}// Contador de visitas
let visitCount = localStorage.getItem("visitCount") || 0;
visitCount++;
localStorage.setItem("visitCount", visitCount);
document.getElementById("visit-counter").textContent = Visitas: ${visitCount};// Sistema de logros
let achievements = JSON.parse(localStorage.getItem("achievements")) || {
    visits10: false,
    tasks5: false,
    capsules3: false
};
let tasksCompleted = localStorage.getItem("tasksCompleted") || 0;
let capsulesSent = localStorage.getItem("capsulesSent") || 0;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];function checkAchievements() {
    if (visitCount >= 10 && !achievements.visits10) {
        achievements.visits10 = true;
        localStorage.setItem("achievements", JSON.stringify(achievements));
        updateAchievementsDisplay();
    }
    if (tasksCompleted >= 5 && !achievements.tasks5) {
        achievements.tasks5 = true;
        localStorage.setItem("achievements", JSON.stringify(achievements));
        updateAchievementsDisplay();
    }
    if (capsulesSent >= 3 && !achievements.capsules3) {
        achievements.capsules3 = true;
        localStorage.setItem("achievements", JSON.stringify(achievements));
        updateAchievementsDisplay();
    }
}function updateAchievementsDisplay() {
    const achievementsDiv = document.getElementById("achievements");
    const achievementTexts = {
        es: { visits10: " Primeras 10 Visitas", tasks5: " 5 Tareas Completadas", capsules3: " 3 Cápsulas Enviadas" },
        en: { visits10: " First 10 Visits", tasks5: " 5 Tasks Completed", capsules3: " 3 Capsules Sent" },
        pt: { visits10: " Primeiras 10 Visitas", tasks5: " 5 Tarefas Completadas", capsules3: " 3 Cápsulas Enviadas" },
        jp: { visits10: " 最初の10訪問", tasks5: " 5タスク完了", capsules3: " 3カプセル送信" },
        ko: { visits10: " 첫 10 방문", tasks5: " 5개 작업 완료", capsules3: " 3개 캡슐 전송" },
        fr: { visits10: " Premières 10 Visites", tasks5: " 5 Tâches Complétées", capsules3: " 3 Capsules Envoyées" }
    };
    achievementsDiv.innerHTML = Object.keys(achievements)
        .filter(key => achievements[key])
        .map(key => <span class="achievement unlocked">${achievementTexts[idiomaActual][key]}</span>)
        .join("");
}// Tutorial
let tutorialStep = 0;
const tutorialSteps = [
    { text: "Bienvenido a Cronosfera. Haz clic en 'Cápsula Aleatoria' para comenzar.", target: ".button-group button:first-child" },
    { text: "Usa el Organizador Dinámico para gestionar tus tareas.", target: "a" },
    { text: "Personaliza tu experiencia en la configuración.", target: "#config-btn" },
    { text: "¡Listo! Explora y disfruta.", target: ".capsule" }
];function showTutorial() {
    const tutorial = document.getElementById("tutorial");
    tutorial.style.display = "block";
    updateTutorialStep();
}function updateTutorialStep() {
    const tutorial = document.getElementById("tutorial");
    const stepsDiv = document.getElementById("tutorial-steps");
    if (tutorialStep < tutorialSteps.length) {
        stepsDiv.innerHTML = <div class="step">${tutorialSteps[tutorialStep].text}<span class="arrow"></span></div>;
        const target = document.querySelector(tutorialSteps[tutorialStep].target);
        if (target) target.focus();
        document.getElementById("next-tutorial").style.display = tutorialStep < tutorialSteps.length - 1 ? "inline-block" : "none";
        document.getElementById("skip-tutorial").style.display = "inline-block";
    } else {
        tutorial.style.display = "none";
        localStorage.setItem("showTutorial", "false");
    }
}function nextTutorial() {
    tutorialStep++;
    updateTutorialStep();
}function skipTutorial() {
    tutorialStep = tutorialSteps.length;
    updateTutorialStep();
}// Animación de desvanecimiento
function applyFade(element, callback) {
    if (!element) return;
    element.classList.remove("fade-in");
    element.classList.add("fade");
    setTimeout(() => {
        callback();
        element.classList.remove("fade");
        element.classList.add("fade-in");
        element.style.opacity = "1";
    }, 500);
}// Modal para Zoom In
function showModal(text) {
    let modal = document.getElementById("modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal";
        modal.className = "modal";
        modal.innerHTML =             <div class="modal-content">                 <p id="modal-text"></p>                 <button aria-label="Cerrar modal">Cerrar</button>             </div>        ;
        document.body.appendChild(modal);
    }
    document.getElementById("modal-text").textContent = text;
    modal.style.display = "flex";
}function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
}// Mostrar cápsula por fecha
function showCapsulaByDate() {
    const today = new Date().toISOString().split("T")[0];
    const capsula = capsulas[idiomaActual].find(c => c.fecha === today) || capsulas[idiomaActual][0];
    const container = document.querySelector(".container");
    applyFade(container, () => {
        document.getElementById("dato").innerHTML = Dato: ${capsula.dato} <span onclick="showModal('${capsula.datoZoom.replace(/'/g, "\\'")}')">[Zoom In]</span>;
        document.getElementById("cita").innerHTML = Cita: ${capsula.cita} <span onclick="showModal('${capsula.citaZoom.replace(/'/g, "\\'")}')">[Zoom In]</span>;
        document.getElementById("recurso").innerHTML = Recurso: ${capsula.recurso};
        container.style.display = "block";
        container.style.opacity = "1";
        updateUserInfo();
        start2000sGraphics(temaActual);
        document.getElementById("favorite-btn").className = favorites.some(f => f.dato === capsula.dato) ? "favorited" : "";
    });
}// Cápsula aleatoria
function nuevaCapsula() {
    const random = Math.floor(Math.random() * capsulas[idiomaActual].length);
    const capsula = capsulas[idiomaActual][random];
    const container = document.querySelector(".container");
    applyFade(container, () => {
        document.getElementById("dato").innerHTML = Dato: ${capsula.dato} <span onclick="showModal('${capsula.datoZoom.replace(/'/g, "\\'")}')">[Zoom In]</span>;
        document.getElementById("cita").innerHTML = Cita: ${capsula.cita} <span onclick="showModal('${capsula.citaZoom.replace(/'/g, "\\'")}')">[Zoom In]</span>;
        document.getElementById("recurso").innerHTML = Recurso: ${capsula.recurso};
        container.style.display = "block";
        container.style.opacity = "1";
        updateUserInfo();
        start2000sGraphics(temaActual);
        document.getElementById("favorite-btn").className = favorites.some(f => f.dato === capsula.dato) ? "favorited" : "";
    });
}// Enviar por email
function enviar() {
    const capsulaText = ${document.getElementById("dato").textContent}\n${document.getElementById("cita").textContent}\n${document.getElementById("recurso").textContent};
    window.location.href = mailto:?subject=Cronosfera&body=${encodeURIComponent(capsulaText)};
    capsulesSent++;
    localStorage.setItem("capsulesSent", capsulesSent);
    checkAchievements();
}// Favoritos
function toggleFavorite() {
    const capsula = {
        dato: document.getElementById("dato").textContent.split(" [")[0].replace("Dato: ", ""),
        cita: document.getElementById("cita").textContent.split(" [")[0].replace("Cita: ", ""),
        recurso: document.getElementById("recurso").textContent.replace("Recurso: ", "")
    };
    const index = favorites.findIndex(f => f.dato === capsula.dato);
    if (index === -1) {
        favorites.push(capsula);
        document.getElementById("favorite-btn").className = "favorited";
    } else {
        favorites.splice(index, 1);
        document.getElementById("favorite-btn").className = "";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}function showFavorites() {
    const favoritesDiv = document.getElementById("favorites");
    applyFade(favoritesDiv, () => {
        document.querySelector(".container").style.display = "none";
        favoritesDiv.style.display = "block";
        favoritesDiv.innerHTML = <h2>Cápsulas Favoritas</h2><div id="favorites-list">${favorites.map(f => 
            <div class="capsule">
                <div>${f.dato}</div>
                <div>${f.cita}</div>
                <div>${f.recurso}</div>
            </div>
        ).join("")}</div><button class="back-btn" aria-label="Volver a la pantalla principal">Volver a Principal</button>;
    });
}// Cápsulas personalizadas
function showCustomCapsuleForm() {
    const form = document.getElementById("custom-capsule-form");
    applyFade(form, () => {
        document.querySelector(".container").style.display = "none";
        form.style.display = "block";
    });
}function hideCustomCapsuleForm() {
    const form = document.getElementById("custom-capsule-form");
    applyFade(form, () => {
        form.style.display = "none";
        document.querySelector(".container").style.display = "block";
    });
}function saveCustomCapsule() {
    const dato = document.getElementById("custom-dato").value;
    const cita = document.getElementById("custom-cita").value;
    const recurso = document.getElementById("custom-recurso").value;
    const fecha = document.getElementById("custom-date").value;
    if (dato && cita && recurso && fecha) {
        const customCapsule = { dato, cita, recurso, fecha, datoZoom: dato, citaZoom: cita };
        capsulas[idiomaActual].push(customCapsule);
        localStorage.setItem("capsulas", JSON.stringify(capsulas));
        hideCustomCapsuleForm();
        showCapsulaByDate();
    } else {
        alert("Completa todos los campos.");
    }
}// Mostrar organizador
function showOrganizador() {
    const container = document.querySelector(".container");
    const organizador = document.getElementById("organizador");
    applyFade(container, () => {
        container.style.display = "none";
        organizador.style.display = "block";
        organizador.classList.add("fade-in");
        organizador.style.opacity = "1";
        stop2000sGraphics();
        initializeCalendar();
        checkPendingNotifications();
    });
}// Volver a principal
function backToMain() {
    const organizador = document.getElementById("organizador");
    const config = document.getElementById("config");
    const test = document.getElementById("personality-test");
    const customForm = document.getElementById("custom-capsule-form");
    const favorites = document.getElementById("favorites");
    const stats = document.getElementById("stats");
    const elementToFade = organizador.style.display === "block" ? organizador : config.style.display === "block" ? config : test.style.display === "block" ? test : customForm.style.display === "block" ? customForm : favorites.style.display === "block" ? favorites : stats.style.display === "block" ? stats : null;
    if (elementToFade) {
        applyFade(elementToFade, () => {
            organizador.style.display = "none";
            config.style.display = "none";
            test.style.display = "none";
            customForm.style.display = "none";
            favorites.style.display = "none";
            stats.style.display = "none";
            document.querySelector(".container").style.display = "block";
            document.querySelector(".container").classList.add("fade-in");
            document.querySelector(".container").style.opacity = "1";
            start2000sGraphics(temaActual);
            checkPendingNotifications();
        });
    }
}// Organizador dinámico
let items = JSON.parse(localStorage.getItem("items")) || [];
const today = new Date().toISOString().split("T")[0];
let sentNotifications = JSON.parse(localStorage.getItem("sentNotifications")) || [];function addItem() {
    const categoria = document.getElementById("categoria").value;
    const texto = document.getElementById("entrada").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value || "00:00";
    const priority = document.getElementById("priority").value;
    const tags = document.getElementById("tags").value.split(",").map(t => t.trim());
    if (texto && fecha) {
        items.push({ categoria, texto, fecha, hora, priority, tags, completed: false });
        updateLista();
        document.getElementById("entrada").value = "";
        document.getElementById("hora").value = "";
        document.getElementById("tags").value = "";
        localStorage.setItem("items", JSON.stringify(items));
        checkPendingNotifications();
    }
}function updateLista() {
    const listaDiv = document.getElementById("lista");
    listaDiv.innerHTML = items.map((item, index) =>         <div class="item ${item.priority.toLowerCase()}">             <span>[${item.categoria}]</span> ${item.texto} - ${item.fecha} ${item.hora ?a las ${item.hora}: ''}              <span>${item.tags.map(t =>#${t}).join(" ")}</span>             <button onclick="toggleComplete(${index})" aria-label="Marcar como completada">${item.completed ? "✓" : "○"}</button>             <button onclick="deleteItem(${index})" style="background:#ff6666;" aria-label="Eliminar tarea">X</button>         </div>     ).join("");
    updateAgenda();
}function toggleComplete(index) {
    items[index].completed = !items[index].completed;
    if (items[index].completed) tasksCompleted++;
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("tasksCompleted", tasksCompleted);
    updateLista();
    checkAchievements();
}function deleteItem(index) {
    if (items[index].completed) tasksCompleted--;
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("tasksCompleted", tasksCompleted);
    updateLista();
    checkPendingNotifications();
    checkAchievements();
}function initializeCalendar() {
    const calendarEl = document.getElementById("calendar-container");
    calendarEl.innerHTML = '<div id="calendar"></div>';
    const calendar = new FullCalendar.Calendar(calendarEl.querySelector("#calendar"), {
        initialView: 'dayGridMonth',
        events: items.map(item => ({
            title: [${item.categoria}] ${item.texto},
            start: ${item.fecha}T${item.hora || "00:00"},
            color: item.priority === "Alta" ? "#ff6666" : item.priority === "Media" ? "#ffcc00" : "#66cc66"
        })),
        dateClick: function(info) {
            document.getElementById("fecha").value = info.dateStr.split("T")[0];
            document.getElementById("hora").focus();
        }
    });
    calendar.render();
}function updateAgenda() {
    const recordatoriosDiv = document.getElementById("recordatorios");
    const hoyItems = items.filter(item => item.fecha <= today && !item.completed);
    const noRecTexts = {
        es: "No hay recordatorios para hoy.",
        en: "No reminders for today.",
        pt: "Nenhum lembrete para hoje.",
        jp: "今日のリマインダーはありません。",
        ko: "오늘 리마인더가 없습니다。",
        fr: "Aucun rappel pour aujourd'hui."
    };
    recordatoriosDiv.innerHTML = hoyItems.length > 0 
        ? hoyItems.map(item =>             <div class="recordatorio ${item.fecha === today ? 'pendiente' : ''}">                 [${item.categoria}] ${item.texto} - ${item.fecha} ${item.hora ?a las ${item.hora}: ''} ${item.fecha === today ? '¡Hoy!' : ''}             </div>        ).join("")
        : <p>${noRecTexts[idiomaActual]}</p>;
}function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker registrado con éxito:', registration);
            return navigator.serviceWorker.ready;
        }).then(registration => {
            console.log('Service Worker está listo.');
            requestNotificationPermission(registration);
            setupPushNotifications(registration);
        }).catch(err => {
            console.error('Error al registrar el Service Worker:', err);
        });
    }
}function requestNotificationPermission(registration) {
    if ("Notification" in window) {
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted" && registration) {
                    setupPushNotifications(registration);
                }
            });
        } else if (Notification.permission === "granted" && registration) {
            setupPushNotifications(registration);
        }
    }
}function setupPushNotifications(registration) {
    if ('PushManager' in window) {
        registration.pushManager.getSubscription().then(subscription => {
            if (!subscription) {
                const vapidPublicKey = "BJDruDHll_VwFoDXZP5U1I3FiM5BanFBd_z7Z8eHsG6B_4WUqmyKjCYJ4f5ElzyItNKzWYT1qML5bXucZiR3GDM"; // Reemplaza con tu clave VAPID
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                }).then(subscription => {
                    console.log('Suscripción a push exitosa:', subscription);
                });
            }
        });
    }
}function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}function scheduleNotification(item, registration) {
    const notificationId = ${item.categoria}-${item.texto}-${item.fecha}-${item.hora || ''};
    if (!sentNotifications.includes(notificationId)) {
        const notificationTime = new Date(${item.fecha} ${item.hora}).getTime();
        if (notificationTime > Date.now()) {
            setTimeout(() => {
                registration.showNotification("Cronosfera: Recordatorio", {
                    body: [${item.categoria}] ${item.texto} ${item.hora ? a las ${item.hora} : ''},
                    data: { url: "/" }
                });
                sentNotifications.push(notificationId);
                localStorage.setItem("sentNotifications", JSON.stringify(sentNotifications));
            }, notificationTime - Date.now());
        }
    }
}function checkPendingNotifications() {
    const hoyItems = items.filter(item => item.fecha === today && !item.completed);
    if (Notification.permission === "granted" && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            hoyItems.forEach(item => scheduleNotification(item, registration));
        });
    }
}// Configuración
function toggleConfig() {
    const config = document.getElementById("config");
    const container = document.querySelector(".container");
    applyFade(config, () => {
        if (config.style.display === "none" || config.style.display === "") {
            container.style.display = "none";
            config.style.display = "block";
            config.classList.add("fade-in");
            config.style.opacity = "1";
        }
    });
}function applyConfig() {
    const tema = document.getElementById("tema").value;
    const idioma = document.getElementById("idioma").value;
    const font = document.getElementById("font").value;
    const autoTheme = document.getElementById("autoTheme").checked;
    const highContrast = document.getElementById("highContrast").checked;
    const container = document.querySelector(".container");
    applyFade(container, () => {
        document.body.className = tema-${tema} custom-font-${font}${highContrast ? " high-contrast" : ""};
        idiomaActual = idioma;
        temaActual = tema;
        fontActual = font;
        isHighContrast = highContrast;
        isAutoTheme = autoTheme;
        localStorage.setItem("tema", tema);
        localStorage.setItem("idioma", idioma);
        localStorage.setItem("font", font);
        localStorage.setItem("highContrast", highContrast);
        localStorage.setItem("autoTheme", autoTheme);
        if (autoTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.className += " tema-dark-academia";
        }
        nuevaCapsula();
        updateText();
        start2000sGraphics(tema);
    });
}// Actualizar textos según idioma
function updateText() {
    const texts = {
        es: { h2: "Organizador Dinámico", h3: "Agenda", btn1: "Cápsula Aleatoria", btn2: "Enviar a mi futuro yo", link: "Organizador Dinámico", config: "Configuración", back: "Volver a Principal", backConfig: "Atrás", tutorial: "Tutorial" },
        en: { h2: "Dynamic Organizer", h3: "Agenda", btn1: "Random Capsule", btn2: "Send to My Future Self", link: "Dynamic Organizer", config: "Settings", back: "Back to Main", backConfig: "Back", tutorial: "Tutorial" },
        pt: { h2: "Organizador Dinâmico", h3: "Agenda", btn1: "Cápsula Aleatória", btn2: "Enviar para Meu Futuro Eu", link: "Organizador Dinâmico", config: "Configurações", back: "Voltar ao Principal", backConfig: "Voltar", tutorial: "Tutorial" },
        jp: { h2: "ダイナミックオーガナイザー", h3: "アジェンダ", btn1: "ランダムカプセル", btn2: "未来の自分に送信", link: "ダイナミックオーガナイザー", config: "設定", back: "メインに戻る", backConfig: "戻る", tutorial: "チュートリアル" },
        ko: { h2: "다이나믹 오거나이저", h3: "아젠다", btn1: "랜덤 캡슐", btn2: "미래의 나에게 보내기", link: "다이나믹 오거나이저", config: "설정", back: "메인으로 돌아가기", backConfig: "뒤로", tutorial: "튜토리얼" },
        fr: { h2: "Organisateur Dynamique", h3: "Agenda", btn1: "Capsule Aléatoire", btn2: "Envoyer à Mon Futur Moi", link: "Organisateur Dynamique", config: "Paramètres", back: "Retour au Principal", backConfig: "Retour", tutorial: "Tutoriel" }
    };
    document.querySelector("#organizador h2").textContent = texts[idiomaActual].h2;
    document.querySelector("#agenda h3").textContent = texts[idiomaActual].h3;
    document.querySelector("button[aria-label='Generar cápsula aleatoria']").textContent = texts[idiomaActual].btn1;
    document.querySelector("button[aria-label='Enviar cápsula por email']").textContent = texts[idiomaActual].btn2;
    document.querySelector("a").textContent = texts[idiomaActual].link;
    document.querySelector("#config h2").textContent = texts[idiomaActual].config;
    document.querySelectorAll(".back-btn").forEach(btn => {
        if (btn.closest("#config")) {
            btn.textContent = texts[idiomaActual].backConfig;
        } else {
            btn.textContent = texts[idiomaActual].back;
        }
    });
    updateAgenda();
}// Test de personalidad
const personalityQuestions = [
    { question: "¿Qué prefieres leer?", options: ["Ciencia ficción", "Fantasía", "Historia", "Poesía", "Manuales técnicos", "Revistas de aventura", "Redes sociales", "Nada"] },
    { question: "¿Cuál es tu pasatiempo favorito?", options: ["Videojuegos", "Leer", "Dibujar", "Experimentos", "Deporte", "Socializar", "Meditar", "Reparar cosas"] },
    { question: "¿Qué tipo de películas te gustan?", options: ["Acción", "Drama", "Comedia", "Documentales", "Terror", "Romance", "Animación", "Independientes"] },
    { question: "¿Cómo te describirías?", options: ["Creativo", "Analítico", "Social", "Aventurero", "Relajado", "Práctico", "Artístico", "Científico"] },
    { question: "¿Qué te gusta hacer en tu tiempo libre?", options: ["Jugar", "Estudiar", "Crear arte", "Explorar", "Hacer ejercicio", "Socializar", "Relajarme", "Arreglar cosas"] },
    { question: "¿Qué tipo de música prefieres?", options: ["Electrónica", "Clásica", "Rock", "Pop", "Jazz", "Hip-hop", "Indie", "Ninguna"] },
    { question: "¿Cuál es tu lugar ideal para vacaciones?", options: ["Playa", "Montaña", "Ciudad", "Bosque", "Desierto", "Espacio", "Casa", "Otro"] },
    { question: "¿Qué te motiva más?", options: ["Logros", "Conocimiento", "Creatividad", "Aventura", "Relaciones", "Bienestar", "Practicidad", "Arte"] },
    { question: "¿Cómo prefieres trabajar?", options: ["En equipo", "Solo", "Con un líder", "De manera creativa", "Con un plan", "Espontáneamente", "Con tecnología", "Con las manos"] }
];let personalityScore = { friki: 0, culto: 0, artista: 0, cientifico: 0, aventurero: 0, social: 0, relajado: 0, practico: 0, creativo: 0 };
let currentQuestion = 0;
let answers = {};function showPersonalityTest() {
    currentQuestion = 0;
    answers = {};
    showQuestion();
    const test = document.getElementById("personality-test");
    const container = document.querySelector(".container");
    applyFade(container, () => {
        container.style.display = "none";
        test.style.display = "block";
        test.classList.add("fade-in");
        test.style.opacity = "1";
    });
}function showQuestion() {
    const testContent = document.getElementById("test-content");
    const question = personalityQuestions[currentQuestion];
    testContent.innerHTML =         <p>${question.question}</p>         ${question.options.map(o =><label><input type="radio" name="q${currentQuestion}" value="${o}"> ${o}</label>).join("<br>")}     ;
    document.getElementById("current-question").textContent = currentQuestion + 1;
    document.getElementById("progress-bar").value = currentQuestion + 1;
    document.getElementById("prev-btn").style.display = currentQuestion === 0 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display = currentQuestion < personalityQuestions.length - 1 ? "inline-block" : "none";
    document.getElementById("submit-btn").style.display = currentQuestion === personalityQuestions.length - 1 ? "inline-block" : "none";
}function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}function nextQuestion() {
    const selected = document.querySelector(input[name="q${currentQuestion}"]:checked);
    if (selected) {
        answers[currentQuestion] = selected.value;
        currentQuestion++;
        showQuestion();
    } else {
        alert("Selecciona una opción.");
    }
}function submitTest() {
    const selected = document.querySelector(input[name="q${currentQuestion}"]:checked);
    if (selected) {
        answers[currentQuestion] = selected.value;
        personalityScore = { friki: 0, culto: 0, artista: 0, cientifico: 0, aventurero: 0, social: 0, relajado: 0, practico: 0, creativo: 0 };
        Object.values(answers).forEach(value => {
            if (value === "Ciencia ficción" || value === "Videojuegos") personalityScore.friki += 2;
            if (value === "Fantasía" || value === "Historia" || value === "Leer" || value === "Estudiar") personalityScore.culto += 2;
            if (value === "Poesía" || value === "Dibujar" || value === "Crear arte") personalityScore.artista += 2;
            if (value === "Manuales técnicos" || value === "Experimentos" || value === "Científico") personalityScore.cientifico += 2;
            if (value === "Revistas de aventura" || value === "Deporte" || value === "Explorar" || value === "Aventurero") personalityScore.aventurero += 2;
            if (value === "Redes sociales" || value === "Socializar" || value === "Social") personalityScore.social += 2;
            if (value === "Meditar" || value === "Relajarme" || value === "Relajado") personalityScore.relajado += 2;
            if (value === "Reparar cosas" || value === "Arreglar cosas" || value === "Práctico") personalityScore.practico += 2;
            if (value === "Creativo" || value === "De manera creativa") personalityScore.creativo += 2;
            if (value === "Acción" || value === "Terror") personalityScore.aventurero += 1;
            if (value === "Drama" || value === "Documentales") personalityScore.culto += 1;
            if (value === "Comedia" || value === "Romance") personalityScore.social += 1;
            if (value === "Animación" || value === "Independientes") personalityScore.artista += 1;
            if (value === "Analítico") personalityScore.cientifico += 2;
            if (value === "Artístico") personalityScore.artista += 2;
            if (value === "Hacer ejercicio") personalityScore.aventurero += 1;
            if (value === "Estudiar") personalityScore.culto += 1;
            if (value === "Electrónica") personalityScore.friki += 1;
            if (value === "Clásica" || value === "Jazz") personalityScore.culto += 1;
            if (value === "Rock" || value === "Indie") personalityScore.artista += 1;
            if (value === "Pop" || value === "Hip-hop") personalityScore.social += 1;
            if (value === "Playa" || value === "Casa") personalityScore.relajado += 1;
            if (value === "Montaña" || value === "Bosque" || value === "Desierto") personalityScore.aventurero += 1;
            if (value === "Ciudad") personalityScore.social += 1;
            if (value === "Espacio") personalityScore.friki += 1;
            if (value === "Logros") personalityScore.practico += 1;
            if (value === "Conocimiento") personalityScore.culto += 1;
            if (value === "Creatividad" || value === "Arte") personalityScore.creativo += 1;
            if (value === "Aventura") personalityScore.aventurero += 1;
            if (value === "Relaciones") personalityScore.social += 1;
            if (value === "Bienestar") personalityScore.relajado += 1;
            if (value === "Practicidad") personalityScore.practico += 1;
            if (value === "En equipo" || value === "Con un líder") personalityScore.social += 1;
            if (value === "Solo") personalityScore.relajado += 1;
            if (value === "Con un plan") personalityScore.practico += 1;
            if (value === "Espontáneamente") personalityScore.aventurero += 1;
            if (value === "Con tecnología") personalityScore.friki += 1;
            if (value === "Con las manos") personalityScore.practico += 1;
        });
        const maxScore = Math.max(...Object.values(personalityScore));
        let userType = "Casual", icon = "";
        if (maxScore === personalityScore.friki) { userType = "Frikki"; icon = ""; }
        else if (maxScore === personalityScore.culto) { userType = "Culta"; icon = ""; }
        else if (maxScore === personalityScore.artista) { userType = "Artista"; icon = ""; }
        else if (maxScore === personalityScore.cientifico) { userType = "Científico"; icon = ""; }
        else if (maxScore === personalityScore.aventurero) { userType = "Aventurero"; icon = ""; }
        else if (maxScore === personalityScore.social) { userType = "Social"; icon = ""; }
        else if (maxScore === personalityScore.relajado) { userType = "Relajado"; icon = ""; }
        else if (maxScore === personalityScore.practico) { userType = "Práctico"; icon = ""; }
        else if (maxScore === personalityScore.creativo) { userType = "Creativo"; icon = ""; }
        localStorage.setItem("userType", userType);
        localStorage.setItem("userIcon", icon);
        localStorage.setItem("startDate", localStorage.getItem("startDate") || new Date().toISOString().split("T")[0]);
        updateUserInfo();
        const test = document.getElementById("personality-test");
        const container = document.querySelector(".container");
        applyFade(test, () => {
            test.style.display = "none";
            container.style.display = "block";
            container.classList.add("fade-in");
            container.style.opacity = "1";
            showCapsulaByDate();
        });
    } else {
        alert("Selecciona una opción.");
    }
}// Info del usuario
function updateUserInfo() {
    const userType = localStorage.getItem("userType") || "Casual";
    const icon = localStorage.getItem("userIcon") || "";
    const startDate = localStorage.getItem("startDate");
    let score = startDate ? Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24)) * 10 : 0;
    document.getElementById("user-stats").innerHTML = Usuario: ${icon} ${userType} | Puntaje: ${score} pts;
    updateAchievementsDisplay();
    checkAchievements();
}// Estadísticas
function showStats() {
    const statsDiv = document.getElementById("stats");
    applyFade(statsDiv, () => {
        document.querySelector(".container").style.display = "none";
        statsDiv.style.display = "block";
        const ctx = document.getElementById("stats-chart").getContext("2d");
        const stats = {
            tasksByCategory: items.reduce((acc, item) => {
                acc[item.categoria] = (acc[item.categoria] || 0) + 1;
                return acc;
            }, {}),
            productiveDays: [...new Set(items.map(item => item.fecha))].length
        };
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(stats.tasksByCategory),
                datasets: [{
                    label: 'Tareas por Categoría',
                    data: Object.values(stats.tasksByCategory),
                    backgroundColor: '#00ffcc'
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
        document.getElementById("stats-details").innerHTML =             <p>Días productivos: ${stats.productiveDays}</p>             <p>Tareas completadas: ${tasksCompleted}</p>        ;
    });
}// Gráficos interactivos
let animationFrameId;
function start2000sGraphics(tema) {
    const canvas = document.getElementById("interactive-2000s");
    if (canvas.style.display === "none") return;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const elements = tema === "default" ? [
    { x: 50, y: 50, dx: 2, dy: 1, text: "🔳", size: 30, color: "#00ffcc" },
    { x: 200, y: 100, dx: -1, dy: 2, text: "🔵", size: 40, color: "#00ffcc" }
] : tema === "frutiger-metro" ? [
    { x: 100, y: 100, dx: 1.5, dy: 1.5, text: "🔳", size: 25, color: "#333" },
    { x: 300, y: 200, dx: -1, dy: 2, text: "🔵", size: 35, color: "#666" }
] : tema === "pastel" ? [
    { x: 150, y: 150, dx: 2, dy: 1, text: "🌸", size: 30, color: "#FFB6C1" },
    { x: 250, y: 250, dx: -1.5, dy: 2.5, text: "🌼", size: 40, color: "#87CEEB" }
] : tema === "vaporwave" ? [
    { x: 100, y: 100, dx: 1.5, dy: 1.5, text: "🔳", size: 25, color: "#FF6EC7" },
    { x: 300, y: 200, dx: -1, dy: 2, text: "🔵", size: 35, color: "#7859A9" }
] : tema === "dark-academia" ? [
    { x: 100, y: 100, dx: 1.5, dy: 1.5, text: "🔳", size: 25, color: "#3E2723" },
    { x: 300, y: 200, dx: -1, dy: 2, text: "🔵", size: 35, color: "#795548" }
] : tema === "cyberpunk" ? [
    { x: 150, y: 150, dx: 2, dy: 1, text: "💧", size: 30, color: "#00aaff" },
    { x: 250, y: 250, dx: -1.5, dy: 2.5, text: "🌊", size: 40, color: "#00ccff" }
] : tema === "frutiger-aero" ? [
    { x: 150, y: 150, dx: 2, dy: 1, text: "💧", size: 30, color: "#00aaff" },
    { x: 250, y: 250, dx: -1.5, dy: 2.5, text: "🌊", size: 40, color: "#00ccff" }
] : tema === "galaxy" ? [
    { x: 100, y: 100, dx: 1.5, dy: 1.5, text: "🔳", size: 25, color: "#191970" },
    { x: 300, y: 200, dx: -1, dy: 2, text: "🔵", size: 35, color: "#483D8B" }
] : tema === "custom" ? [
    { x: 150, y: 150, dx: 2, dy: 1, text: "★", size: 30, color: "#ff00ff" },
    { x: 250, y: 250, dx: -1.5, dy: 2.5, text: "☆", size: 40, color: "#00ffff" }
] : [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(el => {
        ctx.fillStyle = el.color;
        ctx.font = `${el.size}px 'Arial'`;
        ctx.fillText(el.text, el.x, el.y);
        el.x += el.dx;
        el.y += el.dy;
        if (el.x < 0 || el.x > canvas.width - el.size) el.dx *= -1;
        if (el.y < el.size || el.y > canvas.height) el.dy *= -1;
    });
    animationFrameId = requestAnimationFrame(animate);
}
animate();

}function stop2000sGraphics() {
    const canvas = document.getElementById("interactive-2000s");
    canvas.style.display = "none";
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
}// Integración con IA (Simulada)
async function generateAICapsule(userType) {
    const prompts = {
        Aventurero: "Dato curioso sobre una aventura histórica y una cita inspiradora sobre explorar.",
        Artista: "Dato sobre un artista famoso y una cita sobre creatividad.",
        Científico: "Dato científico interesante y una cita sobre innovación."
    };
    const response = await fetch('https://api.quotable.io/random');
    const quoteData = await response.json();
    return {
        dato: Dato generado por IA para ${userType}: [Simulado],
        cita: quoteData.content,
        recurso: "Generado por IA",
        fecha: new Date().toISOString().split("T")[0],
        datoZoom: Dato generado por IA para ${userType}: [Simulado],
        citaZoom: Autor: ${quoteData.author}
    };
}// Reconocimiento de Voz
function setupVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = idiomaActual;
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("entrada").value = transcript;
        addItem();
    };
    recognition.onerror = (event) => console.error("Error en reconocimiento de voz:", event.error);
    document.getElementById("entrada").addEventListener("contextmenu", (e) => {
        e.preventDefault();
        recognition.start();
    });
}// Exportar/Importar Datos
function exportData() {
    const data = {
        items,
        favorites,
        capsulas,
        achievements,
        tasksCompleted,
        capsulesSent
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cronosfera-data.json";
    a.click();
    URL.revokeObjectURL(url);
}function importData(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        items = data.items || [];
        favorites = data.favorites || [];
        capsulas = data.capsulas || capsulas;
        achievements = data.achievements || achievements;
        tasksCompleted = data.tasksCompleted || 0;
        capsulesSent = data.capsulesSent || 0;
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("capsulas", JSON.stringify(capsulas));
        localStorage.setItem("achievements", JSON.stringify(achievements));
        localStorage.setItem("tasksCompleted", tasksCompleted);
        localStorage.setItem("capsulesSent", capsulesSent);
        updateLista();
        updateAchievementsDisplay();
        showCapsulaByDate();
    };
    reader.readAsText(file);
}// Integración con Google Calendar
function exportToGoogleCalendar(item) {
    const startDateTime = ${item.fecha}T${item.hora || "00:00"}:00;
    const endDateTime = new Date(new Date(startDateTime).getTime() + 60 * 60 * 1000).toISOString().replace(/[:-]/g, "").split(".")[0];
    const start = startDateTime.replace(/[:-]/g, "").split(".")[0];
    const url = https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent([${item.categoria}] ${item.texto})}&dates=${start}/${endDateTime};
    window.open(url, "_blank");
}// Atajos de Teclado
function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "n") {
            e.preventDefault();
            nuevaCapsula();
        }
        if (e.ctrlKey && e.key === "o") {
            e.preventDefault();
            showOrganizador();
        }
        if (e.key === "Escape") {
            backToMain();
        }
    });
}// Inicio
document.addEventListener("DOMContentLoaded", () => {
    // Botones de la página principal
    document.querySelector("button[aria-label='Generar cápsula aleatoria']").addEventListener("click", nuevaCapsula);
    document.querySelector("button[aria-label='Enviar cápsula por email']").addEventListener("click", enviar);
    document.querySelector("button[aria-label='Crear cápsula personalizada']").addEventListener("click", showCustomCapsuleForm);
    document.querySelector("a[aria-label='Abrir organizador dinámico']").addEventListener("click", showOrganizador);
    document.querySelector("button[aria-label='Ver cápsulas favoritas']").addEventListener("click", showFavorites);
    document.querySelector("button[aria-label='Ver estadísticas']").addEventListener("click", showStats);
    document.querySelector("#config-btn").addEventListener("click", toggleConfig);
    document.querySelector("#favorite-btn").addEventListener("click", toggleFavorite);
    document.querySelector(".logo").addEventListener("click", backToMain);

// Botones de configuración
document.querySelector("#config button[aria-label='Aplicar configuración']").addEventListener("click", applyConfig);
document.querySelector("#config button[aria-label='Volver a la pantalla principal']").addEventListener("click", backToMain);

// Botones de cápsula personalizada
document.querySelector("#custom-capsule-form button[aria-label='Guardar cápsula']").addEventListener("click", saveCustomCapsule);
document.querySelector("#custom-capsule-form button[aria-label='Cerrar formulario']").addEventListener("click", hideCustomCapsuleForm);

// Botones del organizador
document.querySelector("#organizador button[aria-label='Agregar tarea']").addEventListener("click", addItem);
document.querySelector("#organizador button[aria-label='Volver a la pantalla principal']").addEventListener("click", backToMain);

// Botones de favoritos y estadísticas
document
    // Botones de favoritos y estadísticas
document.querySelector("#favorites button[aria-label='Volver a la pantalla principal']").addEventListener("click", backToMain);
document.querySelector("#stats button[aria-label='Volver a la pantalla principal']").addEventListener("click", backToMain);

// Botones del test de personalidad
document.getElementById("prev-btn").addEventListener("click", prevQuestion);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("submit-btn").addEventListener("click", submitTest);

// Botones del tutorial
document.getElementById("next-tutorial").addEventListener("click", nextTutorial);
document.getElementById("skip-tutorial").addEventListener("click", skipTutorial);

// Añadir export/import
const exportBtn = document.createElement("button");
exportBtn.textContent = "Exportar Datos";
exportBtn.setAttribute("aria-label", "Exportar datos del usuario");
exportBtn.onclick = exportData;
document.getElementById("config").appendChild(exportBtn);

const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json";
importInput.setAttribute("aria-label", "Importar datos del usuario");
importInput.onchange = importData;
document.getElementById("config").appendChild(importInput);

// Inicialización
const container = document.querySelector(".container");
container.style.opacity = "1";
registerServiceWorker();
setupVoiceRecognition();
setupKeyboardShortcuts();
if (!localStorage.getItem("userType")) {
    showPersonalityTest();
} else {
    showCapsulaByDate();
    start2000sGraphics(temaActual);
    checkPendingNotifications();
    if (localStorage.getItem("showTutorial") !== "false") {
        showTutorial();
    }
}
updateText();
setInterval(checkPendingNotifications, 60000);

// Asegurarse de que el evento de cerrar modal funcione
document.querySelector("#modal button[aria-label='Cerrar modal']").addEventListener("click", closeModal);

// Evento para cerrar modal al hacer clic fuera
document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) {
        closeModal();
    }
});

});
