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

    // Реализация алгоритма Фишера-Йетса для перемешивания массива
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    (function(){
        emailjs.init("N0mvHgTWyKwSUUTLn");
    })();
    
    function sendEmail() {
        emailjs.send("service_fof413d", "template_qdgzwyd", {
            to_name: "Имя получателя",
            message: "Пользователь выбрал все 10 карт."
        })
        .then(function(response) {
            console.log('Письмо отправлено!', response.status, response.text);
        }, function(error) {
            console.log('Ошибка при отправке письма:', error);
        });
    }
    

    const shuffledRoles = shuffle(roles);
    const cards = document.querySelectorAll('.card');
    const grid = document.querySelector('.grid');
    const leaderButton = document.getElementById('leader-button');
    const statusText = document.getElementById('status-text');
    let clickCount = 0;
    let roleOrder = [];

    cards.forEach((card, index) => {
        if (shuffledRoles[index].role === 'Шериф') {
            card.style.backgroundImage = `url('images/cover2met.jpg')`;
        } else if (shuffledRoles[index].role === 'Дон') {
            card.style.backgroundImage = `url('images/cover3met.jpg')`;
        } else if (shuffledRoles[index].role === 'Мафия') {
            card.style.backgroundImage = `url('images/cover4met.jpg')`;
        } else {
            card.style.backgroundImage = `url('images/cover.jpg')`;
        }
    
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
    
                    // Проверка: если выбраны все карты, вызываем sendEmail()
                    if (clickCount === cards.length) {
                        leaderButton.style.display = 'block';
                        statusText.style.display = 'none';
                        sendEmail();  // Отправляем письмо после выбора всех карт
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
