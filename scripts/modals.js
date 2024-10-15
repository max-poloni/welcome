// /scripts/modals.js

function openModal(gameName) {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'block';
    if (gameName === 'Beer Collect') {
        loadGame1();
    } else {
        document.getElementById('modalContent').innerText = `Информация о ${gameName}`;
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
}

function loadGame1() {
    const modalContent = document.getElementById('modalContent');
    fetch('game1.html')
        .then(response => response.text())
        .then(data => {
            modalContent.innerHTML = data;
            const script = modalContent.querySelector('script');
            if (script) {
                eval(script.textContent);
            }
        })
        .catch(error => console.error('Ошибка при загрузке game1.html:', error));
}

// Функции для открытия/закрытия модального окна пополнения
function openDepositModal() {
    const depositModal = document.getElementById('depositModal');
    depositModal.style.display = 'block';
}

function closeDepositModal() {
    const depositModal = document.getElementById('depositModal');
    depositModal.style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        closeModal();
    }
};
