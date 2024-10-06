document.addEventListener('DOMContentLoaded', () => {
    const roles = [
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мафия.jpg', role: 'Мафия' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/дон.jpg', role: 'Дон' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/шериф.jpg', role: 'Шериф' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мафия.jpg', role: 'Мафия' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мирный.jpg', role: 'Мир' }
    ];
    // Переменная для контроля блокировки открытия карты
    let isCardFlipping = false;
    // Перемешивание ролей
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledRoles = shuffle(roles);
    const cards = document.querySelectorAll('.card');
    const grid = document.querySelector('.grid');
    const leaderButton = document.getElementById('leader-button');
    const casperButton = document.getElementById('casper-button');
    const statusText = document.getElementById('status-text');
    let clickCount = 0;
    let roleOrder = [];

    cards.forEach((card, index) => {
        card.style.backgroundImage = `url('images/cover.jpg')`;

        card.addEventListener('click', () => {
            // Проверяем, заблокировано ли открытие новой карты
            if (!card.classList.contains('flipped') && !isCardFlipping) {
                // Блокируем возможность открывать карты
                isCardFlipping = true;
                card.classList.add('flipped');
                card.style.backgroundImage = `url('${shuffledRoles[index].file}')`;
                statusText.textContent = shuffledRoles[index].role;
                setTimeout(() => {
                    card.style.opacity = 0;
                    roleOrder.push({ role: shuffledRoles[index].role, order: clickCount + 1 });
                    clickCount++;
                    statusText.textContent = "Выберите карту";
                    isCardFlipping = false; // Разблокируем открытие новой карты
                    if (clickCount === cards.length) {
                        leaderButton.style.display = 'block';
                        casperButton.style.display = 'block'; // Показываем кнопку "Каспер"
                        statusText.style.display = 'none';

                        // Сохраняем таблицу ролей в localStorage
                        localStorage.setItem('roleOrder', JSON.stringify(roleOrder));
                    }
                }, 2000);
            }
        });
    });

    leaderButton.addEventListener('click', () => {
        grid.style.display = 'none';
        leaderButton.style.display = 'none';
        casperButton.style.display = 'none';
        statusText.style.display = 'none';

        roleOrder.forEach((entry) => {
            const row = document.getElementById('roles-table').insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.innerHTML = entry.order;
            cell2.innerHTML = entry.role;
        });
        document.getElementById('roles-table').style.display = 'table';
        document.getElementById('home-button').style.display = 'block';
    });

    casperButton.addEventListener('click', () => {
        window.location.href = 'gameCasper2.html'; // Переход на страницу с новым функционалом
    });

    document.getElementById('home-button').addEventListener('click', () => {
        location.href = 'index.html';
    });
});
