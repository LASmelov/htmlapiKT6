// функция для перехода между стр.

let backButton = document.getElementById('backBtn');
let forwardButton = document.getElementById('forwardBtn');




function goBack() {
    window.history.back();
}

function goForward() {
    window.history.forward();
}


// функция для работы с canvas

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const restart = document.getElementById('restart');
    const colorSelector = document.getElementById('colorSelector');
    const ctx = canvas.getContext('2d');

    function drawFrame() {
        // Очистить холст
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Вызываем метод beginPath(), чтобы убедиться,
        // что мы не рисуем часть уже нарисованного содержимого холста
        ctx.beginPath();

        // Рисуем квадрат размером 10x10 пикселов в текущей позиции
        ctx.rect(squarePosition_x, squarePosition_y, 40, 40);
        ctx.strokeStyle = squareColor;
        ctx.lineWidth = 10;
        ctx.stroke();

        // Перемещаем квадрат вниз на 1 пиксел (где он будет 
        // прорисован в следующем кадре)
        squarePosition_y += 1;
        squarePosition_x += 2;

        // Рисуем следующий кадр через 20 миллисекунд
        requestAnimationFrame(drawFrame);
    }

    let squarePosition_x = 10;
    let squarePosition_y = 0;
    let squareColor = "#109bfc";

    function restartbtn() {
        squarePosition_x = 10;
        squarePosition_y = 0;
    }

    function changeColorSelector() {
        // Получаем выбранный цвет из селектора
        squareColor = colorSelector.value;
    }

    restart.addEventListener('click', restartbtn);
    colorSelector.addEventListener('change', changeColorSelector);

    drawFrame();
});






document.addEventListener('DOMContentLoaded', function () {
    // Создаем веб-воркер
    const worker = new Worker('worker.js');

    // Получаем элементы DOM
    const resultElement = document.getElementById('result');
    const changeButton = document.getElementById('changeButton');

    // Отправляем сообщение в веб-воркер с данными для вычислений
    worker.postMessage({ number1: 5, number2: 10, operation: '+' })

    // Слушаем сообщения от веб-воркера
    worker.onmessage = function (event) {
        // Получаем результат вычислений и выводим на страницу
        resultElement.textContent = 'Результат: ' + event.data;

        // Выводим измененное число в консоль
        console.log('Измененное число: ' + event.data);

        // Отправляем новое сообщение в веб-воркер с данными для вычислений
        worker.postMessage({ number1: event.data, number2: 10, operation: '+' });
    };

    // Слушаем ошибки от веб-воркера
    worker.onerror = function (error) {
        console.error('Ошибка в веб-воркере: ' + error.message);
    };

    // Слушаем ошибки при получении данных от веб-воркера
    worker.onmessageerror = function (error) {
        console.error('Ошибка при получении данных от веб-воркера: ' + error.message);
    };

    // Обработчик нажатия кнопки изменения операции
    changeButton.addEventListener('click', function () {
        const operation = prompt('Введите новую операцию (+, -, *, /)');
        worker.postMessage({ number1: 5, number2: 10, operation: operation });
    });

});