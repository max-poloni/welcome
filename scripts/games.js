// /scripts/games.js

function loadGames() {
    return new Promise((resolve, reject) => {
        const gamesRef = database.ref('games');
        gamesRef.once('value').then((snapshot) => {
            const gamesContainer = document.querySelector('.slider');
            gamesContainer.innerHTML = '';
            snapshot.forEach((childSnapshot) => {
                const gameData = childSnapshot.val();
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.onclick = () => openModal(gameData.name);

                const avatarUrl = gameData.avatar || 'default_avatar.jpg';
                const img = document.createElement('img');
                img.setAttribute('data-src', avatarUrl);
                img.className = 'lazy-load';

                gameCard.appendChild(img);
                gameCard.innerHTML += `<h3>${gameData.name}</h3><p>Активные игроки: ${gameData.activePlayers || 0}</p>`;
                gamesContainer.appendChild(gameCard);
            });

            if (snapshot.numChildren() === 0) {
                console.log("Игры не найдены в базе данных.");
            }

            initLazyLoad();
            resolve();
        }).catch((error) => {
            console.error('Ошибка при загрузке игр:', error);
            reject(error);
        });
    });
}

function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}
