// Инициализация массива ролей
const roles = [
  { name: "Мирный житель", image: "images/мирный.jpg", class: "mirnyj" },
  { name: "Мирный житель", image: "images/мирный.jpg", class: "mirnyj" },
  { name: "Мирный житель", image: "images/мирный.jpg", class: "mirnyj" },
  { name: "Мирный житель", image: "images/мирный.jpg", class: "mirnyj" },
  { name: "Мирный житель", image: "images/мирный.jpg", class: "mirnyj" },
  { name: "Мирный житель", image: "images/мирный.jpg", class: "mirnyj" },
  { name: "Мафия", image: "images/мафия.jpg", class: "mafia" },
  { name: "Мафия", image: "images/мафия.jpg", class: "mafia" },
  { name: "Дон", image: "images/дон.jpg", class: "don" },
  { name: "Шериф", image: "images/шериф.jpg", class: "sherif" }
];

// Копируем роли для отображения в конце игры в том порядке, в каком они были выданы
const allRoles = [];

// Функция для перемешивания массива
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(roles); // Перемешиваем роли перед стартом

const roleButton = document.getElementById('roleButton');
roleButton.addEventListener('click', handleRole);

function handleRole() {
  if (roles.length > 0) {
    const role = roles.pop();
    allRoles.push(role); // Сохраняем выданные роли в массив
    const roleDisplay = document.getElementById('roleDisplay');
    const roleImage = document.getElementById('roleImage');

    roleDisplay.textContent = role.name;
    roleDisplay.className = 'role-name ' + role.class;
    roleDisplay.style.display = 'block';

    roleImage.src = role.image;
    roleImage.style.display = 'block';

    // Скрываем кнопку на 5 секунд
    roleButton.style.display = 'none';
    setTimeout(() => {
      roleButton.style.display = 'block';
      roleDisplay.style.display = 'none';
      roleImage.style.display = 'none';
    }, 2000);

    if (roles.length === 0) {
      roleButton.textContent = 'Кнопка ведущего';
      roleButton.removeEventListener('click', handleRole);
      roleButton.addEventListener('click', displayRoles);
    }
  }
}

function displayRoles() {
  let output = '<table><tr><th>№</th><th>Роль</th></tr>';
  allRoles.forEach((role, index) => {
    output += `<tr><td style="text-align: left;">${index + 1}</td><td>${role.name}</td></tr>`;
  });
  output += '</table>';
  document.getElementById('roleDisplay').innerHTML = output;
  document.getElementById('roleDisplay').style.display = 'block';
}
