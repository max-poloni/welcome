// /scripts/user.js

function loadUserData() {
    return new Promise((resolve, reject) => {
        const username = localStorage.getItem('currentUser');
        const cachedUserData = localStorage.getItem(`userData_${username}`);

        if (cachedUserData) {
            displayUserData(JSON.parse(cachedUserData));
            resolve();
        } else if (username) {
            const userRef = database.ref('users/' + username);
            userRef.once('value').then((snapshot) => {
                const userData = snapshot.val();
                if (userData) {
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
    const username = localStorage.getItem('currentUser');
    document.getElementById('username').innerText = `Username: ${username}`;
    document.getElementById('balance').innerText = `Баланс: ${userData.balance || 0} 🍺`;
}

function displayGuestData() {
    document.getElementById('username').innerText = 'Username: Гость';
    document.getElementById('balance').innerText = 'Баланс: 0 🍺';
}
