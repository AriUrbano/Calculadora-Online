document.addEventListener('DOMContentLoaded', function() {
    const pantalla = document.getElementById('display');
    const mensajeError = document.getElementById('error');
    const botones = document.querySelectorAll('.btn');
    const botonLimpiar = document.getElementById('clear');
    const botonIgual = document.getElementById('equals');
    
    let entradaActual = '';
    let entradaAnterior = '';
    let operacion = null;
    let reiniciarPantalla = false;
    
    botones.forEach(boton => {
        if (boton.id !== 'clear' && boton.id !== 'equals') {
            boton.addEventListener('click', () => {
                if (boton.classList.contains('number')) {
                    agregarNumero(boton.value);
                } else if (boton.classList.contains('operator')) {
                    establecerOperacion(boton.value);
                }
            });
        }
    });
    
    botonLimpiar.addEventListener('click', limpiar);
    botonIgual.addEventListener('click', calcular);

    function agregarNumero(numero) {
        if (pantalla.value === '0' || reiniciarPantalla) {
            pantalla.value = '';
            reiniciarPantalla = false;
        }
        
        pantalla.value += numero;
        entradaActual = pantalla.value;
        limpiarError();
    }
    
    function establecerOperacion(op) {
        if (pantalla.value === '' && op !== '-') {
            mostrarError('Primero ingrese un número');
            return;
        }
        
        if (pantalla.value === '-' && op !== '-') {
            mostrarError('Complete el número primero');
            return;
        }
        
        if (operacion !== null) calcular();
        
        entradaAnterior = pantalla.value;
        operacion = op;
        reiniciarPantalla = true;
        limpiarError();
    }

    function calcular() {
        if (operacion === null) {
            mostrarError('No hay operación pendiente');
            return;
        }
        
        if (reiniciarPantalla || pantalla.value === '' || pantalla.value === '-') {
            mostrarError('Falta ingresar el segundo número');
            return;
        }
        
        entradaActual = pantalla.value;
        let resultado;
        const anterior = parseInt(entradaAnterior);
        const actual = parseInt(entradaActual);
        
        switch (operacion) {
            case '+':
                resultado = anterior + actual;
                break;
            case '-':
                resultado = anterior - actual;
                break;
            case '*':
                resultado = anterior * actual;
                break;
            case '/':
                if (actual === 0) {
                    mostrarError('No se puede dividir por cero');
                    return;
                }
                resultado = Math.floor(anterior / actual);
                break;
            default:
                return;
        }
        pantalla.value = resultado;
        pantalla.className = resultado >= 0 ? 'positive' : 'negative';
        operacion = null;
        reiniciarPantalla = true;
        limpiarError();
    }

    function limpiar() {
        pantalla.value = '0';
        entradaActual = '';
        entradaAnterior = '';
        operacion = null;
        pantalla.className = '';
        limpiarError();
    }

    function mostrarError(mensaje) {
        mensajeError.textContent = mensaje;
    }

    function limpiarError() {
        mensajeError.textContent = '';
    }
});