$(document).ready(function () {
  buscar_visitas();
  function buscar_visitas() {
    let funcion = "buscar_visitas_usuarios";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() === "no-users-asesor") {
          template += `No tienes asesores registrados`;
          $("#mychart").html(template);
        } else {
          const usuarios = JSON.parse(response);
          let labels = [];
          let datosValid = [];
          usuarios.forEach((user) => {
            labels.push(user.nombres);
            datosValid.push(user.numero_visitas);
          });
          var datos = {
            labels,
            datosVisitas: datosValid,
          };

          // Configuración del gráfico
          var config = {
            type: "bar",
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
        }
      }
    );
  }
});
