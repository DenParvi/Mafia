document.addEventListener('DOMContentLoaded', () => {
    const roles = [
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мирный.jpg', role: 'Мир' },
        { file: 'images/мафия.jpg', role: 'Мафия' },
        { file: 'images/мафия.jpg', role: 'Мафия' },
        { file: 'images/дон.jpg', role: 'Дон' },
        { file: 'images/шериф.jpg', role: 'Шериф' }
    ];
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);
    const cards = document.querySelectorAll('.card');
    const grid = document.querySelector('.grid');
    const leaderButton = document.getElementById('leader-button');
    const statusText = document.getElementById('status-text');
    let clickCount = 0;
    let roleOrder = [];

    cards.forEach((card, index) => {
        card.style.backgroundImage = `url('images/cover.jpg')`;
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped')) {
                card.classList.add('flipped');
                card.style.backgroundImage = `url('${shuffledRoles[index].file}')`;
                statusText.textContent = shuffledRoles[index].role;
                setTimeout(() => {
                    card.style.opacity = 0;
                    roleOrder.push({ role: shuffledRoles[index].role, order: clickCount + 1 });
                    clickCount++;
                    statusText.textContent = "Выберите карту";
                    if (clickCount === cards.length) {
                        leaderButton.style.display = 'block';
                    }
                }, 3000);
            }
        });
    });

    leaderButton.addEventListener('click', () => {
        grid.style.display = 'none';
        leaderButton.style.display = 'none';
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

    document.getElementById('home-button').addEventListener('click', () => {
        location.href = 'index.html';
    });
});
