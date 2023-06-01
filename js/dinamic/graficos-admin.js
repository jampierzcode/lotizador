$(document).ready(function () {
  var ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
      datasets: [
        {
          label: 'Ventas de la semana',
          data: "800, 400, 500",
          borderColor: "#000",
          backgroundColor: "#fff",
          borderWidth: 2,
          borderRadius: "20",
          borderSkipped: false,
        }
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
  });
});
