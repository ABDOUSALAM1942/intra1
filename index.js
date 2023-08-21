
const body = document.body;
const nav = document.getElementById('navibar');
hrElement = document.createElement('hr');
body.appendChild(hrElement);
nav.insertAdjacentElement('afterend', hrElement);

// Sélectionne l'élément HTML ayant la classe "chrono"
const chronoElement = document.querySelector('.chrono');

// Sélectionne l'élément HTML ayant l'ID "returnTimeText"
const returnTimeTextElement = document.getElementById('returnTimeText');

// Initialise la variable pour le temps restant à 20 secondes
let remainingTime = 20;

// Variable pour stocker l'ID de l'intervalle de compte à rebours
let countDown;

// Affiche le temps initial dans l'élément chrono
displayTime(remainingTime);

// Sélectionne tous les liens de la classe ".navbar a"
const navLinks = document.querySelectorAll('.navbar a');

// Ajoute un écouteur d'événements à chaque lien de navigation
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
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

        // Arrête le compte à rebours actuel
        clearInterval(countDown);

        // Démarre un nouveau compte à rebours
        startCountDown();

        // Calcule l'heure de retour
        const currentTime = new Date();
        const returnTime = new Date(currentTime.getTime() + remainingTime * 1000);

        // Obtient les heures et les minutes pour l'heure de retour
        const returnHours = returnTime.getHours();
        const returnMinutes = returnTime.getMinutes();

        // Construit le texte d'heure de retour
        const returnTimeText = `Be back at ${returnHours < 10 ? '0' : ''}${returnHours}:${returnMinutes < 10 ? '0' : ''}${returnMinutes}`;

        // Met à jour le texte d'heure de retour
        returnTimeTextElement.textContent = returnTimeText;

        // Affiche le compteur après le clic sur un lien
        chronoElement.style.display = 'block';
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

// Sélectionne l'élément HTML pour la saisie personnalisée du temps
const customTimeInput = document.getElementById('typeText');

// Ajoute un écouteur d'événements pour la touche "Enter" dans la saisie personnalisée
customTimeInput.addEventListener('keyup', function(event) {
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








