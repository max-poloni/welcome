
function loadGames() {
    const gamesContainer = document.getElementById('gamesContainer');
    const gameModal = document.getElementById('gameModal');
    const modalContent = document.getElementById('modalContent');

 
    firebase.database().ref('games').once('value', (snapshot) => {
        const games = snapshot.val();
        if (games) {
            Object.keys(games).forEach((gameId) => {
                const game = games[gameId];

                // Создаем карточку игры
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');

                // Создаем изображение игры
                const gameImg = document.createElement('img');
                gameImg.src = game.imageUrl || 'https://craftubrewery.com/upload/resize_cache/iblock/d0b/494_721_1d7a58ff99b324185ccb5ad5dfbdb5e85/d0b36dfe120bc4d29dafb2057d9e09f2.png'; // Подгружаем изображение игры или дефолтное
                gameCard.appendChild(gameImg);

                // Создаем заголовок игры
                const gameTitle = document.createElement('h3');
                gameTitle.textContent = game.name || 'Без названия'; 
                gameCard.appendChild(gameTitle);

                // Информация о количестве активных игроков
                const activePlayers = document.createElement('p');
                activePlayers.textContent = `Игроков: ${game.activePlayers || 0}`;
                gameCard.appendChild(activePlayers);

                // Добавляем обработчик клика для открытия игры в модальном окне
                gameCard.addEventListener('click', () => {
                    if (game.url) {
                        // Очищаем предыдущее содержимое модалки
                        modalContent.innerHTML = '';

                        // Создаем iframe для отображения игры
                        const iframe = document.createElement('iframe');
                        iframe.src = game.url;
                        iframe.style.width = '100%';
                        iframe.style.height = '500px'; 
                        iframe.style.border = 'none'; // Убираем границу у iframe

                        // Добавляем iframe в модальное окно
                        modalContent.appendChild(iframe);

                        // Показываем модалку
                        gameModal.style.display = 'block';
                    } else {
                        alert('URL игры не найден');
                    }
                });

                // Добавляем карточку игры в контейнер
                gamesContainer.appendChild(gameCard);
            });
        } else {
            console.log('Игры не найдены');
        }
    });
}


function closeGameModal() {
    const gameModal = document.getElementById('gameModal');
    gameModal.style.display = 'none';
}
