// Основной код
function loadGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    const gameModal = document.getElementById('gameModal');
    const modalContent = document.getElementById('modalContent');

    console.log('Загрузка игр...');
    firebase.database().ref('games').once('value', (snapshot) => {
        const games = snapshot.val();
        console.log('Данные получены:', games);
        if (games) {
            Object.keys(games).forEach((gameId) => {
                const game = games[gameId];

                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');

                const gameImg = document.createElement('img');
                gameImg.src = game.imageUrl || 'https://craftubrewery.com/upload/resize_cache/iblock/d0b/494_721_1d7a58ff99b324185ccb5ad5dfbdb5e85/d0b36dfe120bc4d29dafb2057d9e09f2.png';
                gameCard.appendChild(gameImg);

                const gameTitle = document.createElement('h3');
                gameTitle.textContent = game.name || 'Без названия';
                gameCard.appendChild(gameTitle);

                const activePlayers = document.createElement('p');
                activePlayers.textContent = `Игроков: ${game.activePlayers || 0}`;
                gameCard.appendChild(activePlayers);

                gameCard.addEventListener('click', () => {
                    if (game.url) {
                        modalContent.innerHTML = '';

                        const iframe = document.createElement('iframe');
                        iframe.src = game.url;
                        iframe.style.width = '100%';
                        iframe.style.height = '500px';
                        iframe.style.border = 'none';

                        modalContent.appendChild(iframe);
                        gameModal.style.display = 'block';
                    } else {
                        alert('URL игры не найден');
                    }
                });

                gamesContainer.appendChild(gameCard);
            });
            // Обновляем счетчик игр
            document.getElementById('gamesCount').textContent = Object.keys(games).length;
        } else {
            console.log('Игры не найдены');
        }
    });
}

function closeGameModal() {
    const gameModal = document.getElementById('gameModal');
    gameModal.style.display = 'none';
}

// Запускаем функцию загрузки игр после загрузки страницы
window.onload = function () {
    checkAuth()
        .then(() => {
            return loadUserData(); // Загружаем данные пользователя
        })
        .then(() => {
            return loadGames(); // Загружаем игры
        })
        .catch((error) => {
            console.error('Ошибка при загрузке:', error);
        });
};