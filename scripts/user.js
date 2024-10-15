// /scripts/user.js

function loadUserData() {
    return new Promise((resolve, reject) => {
        const username = localStorage.getItem('currentUser');

        if (username) {
            const userRef = database.ref('users/' + username);
            userRef.once('value').then((snapshot) => {
                const userData = snapshot.val();
                console.log('Данные пользователя из Firebase:', userData); // Для отладки
                if (userData) {
                    // Сохранение данных пользователя в localStorage
                    localStorage.setItem(`userData_${username}`, JSON.stringify(userData));
                    displayUserData(userData);
                } else {
                    displayGuestData();
                }
                resolve();
            }).catch((error) => {
                console.error('Ошибка при загрузке данных пользователя:', error);
                reject(error);
            });
        } else {
            displayGuestData();
            resolve();
        }
    });
}

function displayUserData(userData) {
    const usernameElement = document.getElementById('username');
    const balanceElement = document.getElementById('balance');

    // Обновление имени пользователя
    usernameElement.innerText = 'Username: ' + userData.username;

    // Обновление баланса
    balanceElement.innerText = 'Баланс: ' + (userData.balance || 0) + ' 🍺'; // Если balance не установлен, показываем 0
}

function displayGuestData() {
    document.getElementById('username').innerText = 'Username: Гость';
    document.getElementById('balance').innerText = 'Баланс: 0 🍺';
}
