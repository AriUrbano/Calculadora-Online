document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const errorDiv = document.getElementById('error');
    const buttons = document.querySelectorAll('.btn');
    const clearBtn = document.getElementById('clear');
    const equalsBtn = document.getElementById('equals');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;
    buttons.forEach(button => {
        if (button.id !== 'clear' && button.id !== 'equals') {
            button.addEventListener('click', () => {
                if (button.classList.contains('number')) {
                    appendNumber(button.value);
                } else if (button.classList.contains('operator')) {
                    setOperation(button.value);
                }
            });
        }
    });
    
    clearBtn.addEventListener('click', clear);
    equalsBtn.addEventListener('click', calculate);
    function appendNumber(number) {
        if (display.value === '0' || resetScreen) {
            display.value = '';
            resetScreen = false;
        }
        if (number === '.' && display.value.includes('.')) {
            showError('No puede haber más de un punto decimal');
            return;
        }
        
        display.value += number;
        currentInput = display.value;
        clearError();
    }
    
    function setOperation(op) {
        if (display.value === '' && op !== '-') {
            showError('Primero ingrese un número');
            return;
        }
        if (display.value === '' && op === '-') {
            display.value = '-';
            return;
        }
        
        if (operation !== null) calculate();
        
        previousInput = display.value;
        operation = op;
        resetScreen = true;
        clearError();
    }
    function calculate() {
        if (operation === null || resetScreen) return;
        
        if (display.value === '') {
            showError('Ingrese el segundo número');
            return;
        }
        
        currentInput = display.value;
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    showError('No se puede dividir por cero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        display.value = result;
        display.className = result >= 0 ? 'positive' : 'negative';
        operation = null;
        resetScreen = true;
        clearError();
    }
    function clear() {
        display.value = '0';
        currentInput = '';
        previousInput = '';
        operation = null;
        display.className = '';
        clearError();
    }
    function showError(message) {
        errorDiv.textContent = message;
    }
    function clearError() {
        errorDiv.textContent = '';
    }
});