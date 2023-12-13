self.onmessage = function (event) {
    // Получаем данные для вычислений
    const number1 = event.data.number1;
    const number2 = event.data.number2;
    const operation = event.data.operation;

    // Выполняем вычисления в зависимости от операции
    let result;
    switch (operation) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
        default:
            result = 'Некорректная операция';
    }

    // Отправляем результат обратно в основной поток.
    self.postMessage(result);
};