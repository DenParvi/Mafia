document.addEventListener('DOMContentLoaded', () => {
    let selectedRole = '';
    let donFirstChoice = '';  
    let donTarget = '';  
    let clickCount = 0;  
    const maxClicks = 10;  
    let waitingForNumber = false;
    const roleOrder = JSON.parse(localStorage.getItem('roleOrder'));
    const infoField = document.getElementById('info-field');
    const leaderButton = document.createElement('button');
    leaderButton.textContent = 'Кнопка ведущего';
    leaderButton.style.display = 'none';
    document.body.appendChild(leaderButton);

    // Ограничения по нажатию кнопок
    const clickLimits = {
        mir: 6,
        maf: 2,
        sher: 1,
        don: 1
    };
    const buttonClicks = {
        mir: 0,
        maf: 0,
        sher: 0,
        don: 0
    };

    let isButtonDisabled = false;  // Флаг для блокировки кнопок на 5 секунд после нажатия

    const buttons = document.querySelectorAll('.casper-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (waitingForNumber) {
                if (button.id.startsWith('num')) {
                    handleNumberClick(button);
                }
                return;
            }

            if (isButtonDisabled) return;  // Блокируем повторное нажатие кнопки

            if (button.id === 'mir' || button.id === 'maf' || button.id === 'sher' || button.id === 'don') {
                if (clickCount >= maxClicks) return;

                if (buttonClicks[button.id] >= clickLimits[button.id]) {
                    return;  // Блокируем кнопку, если лимит нажатий превышен
                }

                buttonClicks[button.id]++;  // Увеличиваем счётчик нажатий конкретной кнопки

                if (button.id === 'mir' || button.id === 'maf') {
                    infoField.value = button.textContent;
                    setTimeout(() => { infoField.value = ''; }, 2000);
                    clickCount++;
                }

                if (button.id === 'sher') {
                    selectedRole = 'Шер';
                    infoField.value = 'Кто мафия?';
                    waitingForNumber = true;
                }

                if (button.id === 'don') {
                    selectedRole = 'Дон';
                    infoField.value = 'Кого убиваем?';
                    waitingForNumber = true;
                }

                // После нажатия блокируем все роли на 3 секунды
                isButtonDisabled = true;
                setTimeout(() => {
                    isButtonDisabled = false;
                }, 3000);

                // Если сделано 10 нажатий
                if (clickCount === maxClicks) {
                    setTimeout(() => {
                        showDonChoice();
                    }, 1000);
                }
            }

            if (button.id.startsWith('num') && waitingForNumber) {
                handleNumberClick(button);
            }
        });
    });

    function handleNumberClick(button) {
        const number = parseInt(button.id.replace('num', ''));
        const playerRole = roleOrder.find(player => player.order === number).role;

        if (selectedRole === 'Шер') {
            infoField.value = playerRole === 'Мир' ? 'Мирный' : 'Мафия';
            setTimeout(() => { infoField.value = ''; }, 2000);
            waitingForNumber = false;
            clickCount++;
        } else if (selectedRole === 'Дон') {
            if (!donFirstChoice) {
                infoField.value = 'Убит';
                donTarget = number;
                setTimeout(() => { infoField.value = 'Кто шериф?'; }, 2000);
                donFirstChoice = number;
            } else {
                infoField.value = playerRole === 'Шериф' ? 'Шериф' : 'Не шериф';
                setTimeout(() => { infoField.value = ''; }, 1000);
                waitingForNumber = false;
                clickCount++;
            }
        }

        if (clickCount === maxClicks) {
            setTimeout(() => {
                showDonChoice();
            }, 1000);
        }
    }

    function showDonChoice() {
        document.querySelector('.grid').style.display = 'none';
        infoField.style.display = 'none';

        const donChoiceText = document.createElement('h1');
        donChoiceText.textContent = `Убит: ${donTarget}`;
        document.body.appendChild(donChoiceText);

        document.querySelector('.container').style.display = 'none';
        leaderButton.style.display = 'block';
    }

    leaderButton.addEventListener('click', () => {
        document.querySelector('h1').remove();
        leaderButton.style.display = 'none';

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
