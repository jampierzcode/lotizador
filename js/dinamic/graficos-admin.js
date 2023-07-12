$(document).ready(function () {
  buscar_visitas();
  var rangoMaximo = "#03a9f3";
  var rangoMinimo = "#310ecd";
  function generarColorHexadecimal() {
    // Convertir los colores de rangoMinimo y rangoMaximo a valores decimales
    const minColor = parseInt(rangoMinimo.slice(1), 16);
    const maxColor = parseInt(rangoMaximo.slice(1), 16);

    // Generar un color aleatorio en el rango especificado
    const colorDecimal =
      Math.floor(Math.random() * (maxColor - minColor + 1)) + minColor;

    // Convertir el color decimal generado a formato hexadecimal
    const colorHexadecimal = "#" + colorDecimal.toString(16).padStart(6, "0");

    return colorHexadecimal;
  }
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
          console.log(usuarios);
          let labels = [];
          let datosValid = [];
          let suma = 0;
          usuarios.forEach((user) => {
            labels.push(user.nombres);
            datosValid.push(user.numero_visitas);
            suma = suma + Number(user.numero_visitas);
          });
          var datos = {
            labels,
            datosVisitas: datosValid,
          };

          // Configuración del gráfico
          let datasetsNew = [];
          let index = 0;
          for (const agente of datos.labels) {
            let newData = {
              label: agente,
              data: datos.datosVisitas[index],
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: [generarColorHexadecimal()],
              fill: true,
              tension: 0.4,
            };
            datasetsNew.push(newData);
            index++;
          }
          var config = {
            type: "bar",
            data: {
              labels: ["visitas totales"],
              datasets: datasetsNew,
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Visitas por asesores",
                },
              },
            },
          };
          console.log(suma);

          // Crear el gráfico
          var ctx = document.getElementById("visitas").getContext("2d");
          var myChart = new Chart(ctx, config);
          let arrayColores = [];
          for (let i = 0; i < datos.labels.length; i++) {
            const color = generarColorHexadecimal();
            arrayColores.push(color);
            console.log(arrayColores);
          }
          var config2 = {
            type: "doughnut",
            data: {
              labels: datos.labels,
              datasets: [
                {
                  label: "Visitas por Día de la Semana",
                  data: datos.datosVisitas,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: arrayColores,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "% visitas por asesores",
                },
              },
            },
          };
          var ctx2 = document.getElementById("circleVisitas").getContext("2d");
          var myChart2 = new Chart(ctx2, config2);
        }
      }
    );
  }
});