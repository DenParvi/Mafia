const cards = ["Мирный житель", "Мирный житель", "Мирный житель", "Мирный житель", "Мирный житель", "Мирный житель", "Шериф", "Дон", "Мафия", "Мафия"];
const drawButton = document.getElementById('drawCard');
const cardResult = document.getElementById('cardResult');
const cardImage = document.getElementById('cardImage');

function getImageFilename(card) {
    switch (card) {
        case "Мирный житель":
            return "мирный.jpg";
        case "Шериф":
            return "шериф.jpg";
        case "Мафия":
            return "мафия.jpg";
        case "Дон":
            return "дон.jpg";
        default:
            return ""; // В случае, если картинки для карты нет
    }
}

drawButton.addEventListener('click', function() {
    if (cards.length > 0) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const card = cards.splice(randomIndex, 1)[0];
        cardResult.textContent = `Вы вытащили карту: ${card}`;
        cardImage.src = getImageFilename(card);
        cardImage.style.display = 'block';

        setTimeout(() => {
            cardResult.textContent = '';
            cardImage.style.display = 'none';
        }, 5000); // 5000 миллисекунд или 10 секунд

        if (cards.length === 0) {
            drawButton.disabled = true;
            cardResult.textContent += " (Это была последняя карта)";
            setTimeout(() => {
                cardImage.style.display = 'none';
            }, 10000);
        }
    } else {
        cardResult.textContent = "Все карты разданы!";
        drawButton.disabled = true;
    }
});
