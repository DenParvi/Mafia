let places = Array.from({ length: 11 }, (_, i) => i + 1); // Создание массива мест
let placesLeft = places.length;
let placesWithTexts = []; // Массив для сохранения мест с текстами

document.getElementById('textInput').addEventListener('input', function() {
  let inputText = document.getElementById('textInput').value;
  document.getElementById('placeButton').disabled = inputText.length === 0;
});

document.getElementById('placeButton').addEventListener('click', function() {
  if (places.length > 0) {
    let index = Math.floor(Math.random() * places.length);
    let place = places.splice(index, 1)[0];
    placesLeft--;
    document.getElementById('placesLeft').textContent = 'Осталось: ' + placesLeft;
    const placeDisplay = document.getElementById('placeDisplay');
    if (place === 11) {
      placeDisplay.textContent = 'Ведущий';
    } else {
      placeDisplay.textContent = 'Место №' + place;
    }
    
    placeDisplay.classList.add('place-number'); // Добавляем класс для стиля
    const inputText = document.getElementById('textInput').value;
    placesWithTexts.push({place: place, text: inputText}); // Сохраняем место и текст
    document.getElementById('textInput').value = ''; // Очистка поля ввода после добавления текста

    if (places.length === 0) {
      this.disabled = true;
      document.getElementById('allPlacesButton').style.display = 'block'; // Показываем кнопку "Все места"
    }
  }
});

document.getElementById('allPlacesButton').addEventListener('click', function() {
  placesWithTexts.sort((a, b) => a.place - b.place); // Сортировка мест перед выводом
  let output = '<table><tr><th>Место</th><th>Текст</th></tr>';
  placesWithTexts.forEach((item) => {
   // Заменяем "Место №11" на "Ведущий"
   if (item.place === 11) {
    output += `<tr><td>Ведущий</td><td>${item.text}</td></tr>`;
  } else {
    output += `<tr><td>Место №${item.place}</td><td>${item.text}</td></tr>`;
  }
  });
  output += '</table>';

  // Очистка страницы и вывод только таблицы с местами и кнопки "На главную"
  document.body.innerHTML = '<button id="backButton" onclick="window.location.href=\'index.html\'">На главную</button>' + output;
});

