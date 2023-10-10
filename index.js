
const body = document.body;
const nav = document.getElementById('navibar');
hrElement = document.createElement('hr');
body.appendChild(hrElement);
nav.insertAdjacentElement('afterend', hrElement);

const chronoElement = document.querySelector('.chrono');
const returnTimeTextElement = document.getElementById('returnTimeText');
// Initialise la variable pour le temps restant à 20 secondes
let remainingTime = 20;
let countDown;// Variable pour stocker l'ID de l'intervalle de compte à rebours
displayTime(remainingTime);// Affiche le temps initial dans l'élément chrono
const navLinks = document.querySelectorAll('.navbar a');
// Ajoute un écouteur d'événements à chaque lien de navigation
navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        // Map associant les ID de liens à des temps en secondes
        const timeMap = {
            nl2: 300,
            nl3: 900,
            nl4: 1200,
            nl5: 1800
        };

        // Obtient le temps à partir de la map ou utilise 20 secondes par défaut
        remainingTime = timeMap[link.id] || 20;
        clearInterval(countDown);        // Arrête le compte à rebours actuel
        startCountDown();        // Démarre un nouveau compte à rebours
        // Calcule l'heure de retour
        const currentTime = new Date();
        const returnTime = new Date(currentTime.getTime() + remainingTime * 1000);
        // Obtient les heures et les minutes pour l'heure de retour
        const returnHours = returnTime.getHours();
        const returnMinutes = returnTime.getMinutes();
        const returnTimeText = `Be back at ${returnHours < 10 ? '0' : ''}${returnHours}:${returnMinutes < 10 ? '0' : ''}${returnMinutes}`;
        // Met à jour le texte d'heure de retour
        returnTimeTextElement.textContent = returnTimeText;
        chronoElement.style.display = 'block';        // Affiche le compteur après le clic sur un lien
    });
});

// Fonction pour démarrer le compte à rebours
function startCountDown() {
    // Met à jour le temps restant toutes les secondes
    countDown = setInterval(() => {
        remainingTime--;
        displayTime(remainingTime);

        // Si le temps restant atteint zéro, appelle la fonction de fin
        if (remainingTime <= 0) {
            endTime();
            clearInterval(countDown);
        }
    }, 1000);
}

// Fonction pour afficher le temps au format HH:MM:SS
function displayTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    // Affiche le temps formaté dans l'élément chrono
    chronoElement.innerHTML = `${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Fonction pour gérer la fin du compte à rebours
function endTime() {
    const currentTime = new Date();
    const returnTime = new Date(currentTime.getTime() + remainingTime * 1000);
    const returnHours = returnTime.getHours();
    const returnMinutes = returnTime.getMinutes();
    const returnTimeText = `Be back at ${returnHours < 10 ? '0' : ''}${returnHours}:${returnMinutes < 10 ? '0' : ''}${returnMinutes}`;

    // Met à jour le texte d'heure de retour
    returnTimeTextElement.textContent = returnTimeText;
}

const customTimeInput = document.getElementById('typeText');

// Ajoute un écouteur d'événements pour la touche "Enter" dans la saisie personnalisée
customTimeInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        // Convertit l'entrée en minutes personnalisées en secondes
        const customMinutes = parseInt(customTimeInput.value);
        if (!isNaN(customMinutes) && customMinutes > 0) {
            const customTimeInSeconds = customMinutes * 60;
            remainingTime = customTimeInSeconds;

            // Arrête le compte à rebours actuel et en démarre un nouveau
            clearInterval(countDown);
            startCountDown();
        }
    }
});








// const birthday = new Date(1994, 9, 29);
// const copy = new Date();
// copy.getTime(birthday.getTime());