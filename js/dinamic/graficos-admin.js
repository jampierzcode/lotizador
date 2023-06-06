$(document).ready(function () {
  var datos = {
    labels: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datosVisitas: [15, 12, 8, 10, 5, 7, 9],
  };

  // Configuración del gráfico
  var config = {
    type: "line",
    data: {
      labels: datos.labels,
      datasets: [
        {
          label: "Visitas por Día de la Semana",
          data: datos.datosVisitas,
          borderColor: "rgb(75, 192, 192)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Día de la Semana",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Número de Visitas",
          },
        },
      },
    },
  };

  // Crear el gráfico
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, config);
});
