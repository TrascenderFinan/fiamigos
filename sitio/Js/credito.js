document.addEventListener('DOMContentLoaded', function () {
  var plazoControl = document.getElementById('plazo');
  var plazoInput = document.getElementById('plazoInput');
  var plazoSeleccionadoSpan = document.getElementById('plazoSeleccionado');

  var valorControl = document.getElementById('valor');
  var valorInput = document.getElementById('valorInput');
  var valorSeleccionadoSpan = document.getElementById('valorSeleccionado');

  var cuotaInput = document.getElementById('cuota');
  var calcularBtn = document.getElementById('calcularBtn');
  var mensajeAviso = document.getElementById('mensajeAviso'); // Elemento del mensaje de advertencia

  // Función para formatear números como moneda (COP)
  function formatoMoneda(numero) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(numero);
  }

  // Sincronizar el rango y el input numérico del plazo
  function actualizarPlazo(value) {
      plazoSeleccionadoSpan.textContent = value + ' meses';
      plazoControl.value = value;
      plazoInput.value = value;
  }

  // Sincronizar el rango y el input numérico del valor
  function actualizarValor(value) {
      valorSeleccionadoSpan.textContent = formatoMoneda(value);
      valorControl.value = value;
      valorInput.value = value;
  }

  // Eventos para actualizar el plazo
  plazoControl.addEventListener('input', function () { actualizarPlazo(this.value); });
  plazoInput.addEventListener('input', function () { actualizarPlazo(this.value); });

  // Eventos para actualizar el valor
  valorControl.addEventListener('input', function () { actualizarValor(this.value); });
  valorInput.addEventListener('input', function () { actualizarValor(this.value); });

  // Función para calcular la cuota del crédito
  function calcularCuota(plazo, valor) {
      if (isNaN(plazo) || isNaN(valor) || plazo <= 0 || valor <= 0) {
          return "Ingrese valores válidos";
      }

      var tasaInteres = 0.026; // Tasa de interés mensual 2.6%
      var cuota = (valor * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo));

      return isNaN(cuota) ? "Error en cálculo" : Math.round(cuota); // Redondea la cuota a un número entero
  }

  // Evento para calcular la cuota al hacer clic en el botón
  calcularBtn.addEventListener('click', function () {
      var plazo = parseInt(plazoControl.value);
      var valor = parseInt(valorControl.value);

      var cuota = calcularCuota(plazo, valor);
      cuotaInput.value = isNaN(cuota) ? "Error en cálculo" : formatoMoneda(cuota);

      // Mostrar el mensaje de advertencia después de calcular la cuota
      mensajeAviso.style.display = 'block';

      // Ocultar el mensaje después de 10 segundos (opcional)
      setTimeout(function () {
          mensajeAviso.style.display = 'none';
      }, 10000);
  });

  // Inicializar los valores de la interfaz
  actualizarPlazo(plazoControl.value);
  actualizarValor(valorControl.value);
});
