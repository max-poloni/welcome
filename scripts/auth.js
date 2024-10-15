// Функция для проверки авторизованного пользователя
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Загрузка данных пользователя из базы
        return firebase.database().ref('users/' + currentUser).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                document.getElementById('username').innerText = `Username: ${userData.username}`;
                document.getElementById('balance').innerText = `Баланс: ${userData.balance} 🍺`;
                const avatar = userData.Avatar; // Предполагается, что Avatar хранит URL
                document.getElementById('userAvatar').src = avatar ? avatar : 'path/to/default_avatar.png'; // Путь к изображению по умолчанию, если аватар отсутствует
            } else {
                alert('Ошибка при загрузке данных пользователя.');
            }
        }).catch((error) => {
            console.error('Ошибка:', error);
        });
    } else {
        // Если пользователь не авторизован, показываем гостевой режим
        document.getElementById('username').innerText = 'Username: Гость';
        document.getElementById('balance').innerText = 'Баланс: 0 🍺';
    }
}
