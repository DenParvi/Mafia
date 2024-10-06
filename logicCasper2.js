document.addEventListener('DOMContentLoaded', () => {
    let selectedRole = '';
    let donFirstChoice = '';  // Переменная для первой цифры Дона (Шериф)
    let donTarget = '';  // Переменная для второй цифры Дона (цель для "стрельбы")
    let clickCount = 0;  // Счётчик нажатий
    const maxClicks = 10;  // Ограничение на 10 нажатий
    let waitingForNumber = false;  // Флаг для ожидания нажатия кнопки с цифрой
    const roleOrder = JSON.parse(localStorage.getItem('roleOrder')); // Загружаем таблицу ролей из localStorage
    const infoField = document.getElementById('info-field');
    const leaderButton = document.createElement('button');  // Создаём кнопку ведущего
    leaderButton.textContent = 'Кнопка ведущего';
    leaderButton.style.display = 'none';
    document.body.appendChild(leaderButton);

    const buttons = document.querySelectorAll('.casper-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (waitingForNumber) {
                // Если ожидается нажатие цифры, кнопки Мир, Маф, Шер, Дон не должны работать
                if (button.id.startsWith('num')) {
                    handleNumberClick(button);
                }
                return;
            }

            // Проверяем, нажаты ли кнопки "Мир", "Маф", "Шер" или "Дон"
            if (button.id === 'mir' || button.id === 'maf' || button.id === 'sher' || button.id === 'don') {
                if (clickCount >= maxClicks) return; // Блокируем действия после 10 нажатий

                // Если нажата кнопка "Мир" или "Маф"
                if (button.id === 'mir' || button.id === 'maf') {
                    infoField.value = button.textContent;
                    setTimeout(() => { infoField.value = ''; }, 2000);
                    clickCount++;  // Увеличиваем счётчик сразу
                }

                // Если нажата кнопка "Шер"
                if (button.id === 'sher') {
                    selectedRole = 'Шер';
                    infoField.value = 'Кто мафия?';  // Выводим сообщение "Кто мафия?"
                    waitingForNumber = true;  // Ожидаем нажатие кнопки с цифрой
                }

                // Если нажата кнопка "Дон"
                if (button.id === 'don') {
                    selectedRole = 'Дон';
                    infoField.value = 'Кто шериф?';
                    waitingForNumber = true;  // Ожидаем нажатие кнопки с цифрой
                }

                // Если сделано 10 нажатий
                if (clickCount === maxClicks) {
                    setTimeout(() => {
                        showDonChoice();  // Вызываем функцию показа результата
                    }, 1000);
                }
            }

            // Обработка нажатия кнопок с цифрами (только если ожидается нажатие)
            if (button.id.startsWith('num') && waitingForNumber) {
                handleNumberClick(button);  // Вынесем логику обработки цифр в отдельную функцию
            }
        });
    });

    // Функция обработки нажатия кнопки с цифрой
    function handleNumberClick(button) {
        const number = parseInt(button.id.replace('num', ''));
        const playerRole = roleOrder.find(player => player.order === number).role; // Получаем роль по номеру

        if (selectedRole === 'Шер') {
            infoField.value = playerRole === 'Мир' ? 'Мирный' : 'Мафия';
            setTimeout(() => { infoField.value = ''; }, 2000);
            waitingForNumber = false;  // Сбрасываем ожидание
            clickCount++;  // Увеличиваем счётчик только после завершения действия Шерифа
        } else if (selectedRole === 'Дон') {
            if (!donFirstChoice) {
                // Первая цифра Дона (поиск шерифа)
                infoField.value = playerRole === 'Шериф' ? 'Шериф' : 'Не шериф';
                donFirstChoice = number;  // Сохраняем первый выбор Дона (шериф)
                setTimeout(() => { infoField.value = 'Кого стреляем?'; }, 2000);
            } else {
                // Вторая цифра Дона (цель для стрельбы)
                infoField.value = 'Убит';
                donTarget = number;  // Сохраняем второй выбор Дона (цель)
                setTimeout(() => { infoField.value = ''; }, 2000);
                waitingForNumber = false;  // Сбрасываем ожидание после второго выбора Дона
                clickCount++;  // Увеличиваем счётчик только после завершения действия Дона
            }
        }

        // Если сделано 10 нажатий
        if (clickCount === maxClicks) {
            setTimeout(() => {
                showDonChoice();  // Вызываем функцию показа результата
            }, 1000);
        }
    }

    // Функция, которая вызывается после 10 нажатий
    function showDonChoice() {
        // Скрываем все кнопки и поле с информацией
        document.querySelector('.grid').style.display = 'none';
        infoField.style.display = 'none';
    
        // Показ выбранного Доном второго номера (цель для стрельбы)
        const donChoiceText = document.createElement('h1');
        donChoiceText.textContent = `Убит: ${donTarget}`;
        document.body.appendChild(donChoiceText);
    
        // Скрываем контейнер
        document.querySelector('.container').style.display = 'none';
    
        // Показываем кнопку ведущего
        leaderButton.style.display = 'block';
    }

    // Обработка нажатия на кнопку ведущего
    leaderButton.addEventListener('click', () => {
        // Убираем текст выбора Дона и кнопку ведущего
        document.querySelector('h1').remove();
        leaderButton.style.display = 'none';

        // Показываем таблицу ролей
        const rolesTable = document.createElement('table');
        rolesTable.style.width = '100%';
        roleOrder.forEach((entry, index) => {
            const row = rolesTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = `Игрок ${entry.order}`;
            cell2.textContent = entry.role;
        });
        document.body.appendChild(rolesTable);
    });
});
