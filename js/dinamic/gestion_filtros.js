$(document).ready(function () {
  $("#search_date_visitas").click(function () {
    let fecha_inicio = dayjs(
      $("#fecha-inicio-search").val(),
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    let fecha_fin = dayjs($("#fecha-fin-search").val(), "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    console.log(fecha_inicio, fecha_fin);
    if (fecha_inicio && fecha_fin) {
      pintar_grafico(fecha_inicio, fecha_fin);
      resumen_vsv(fecha_inicio, fecha_fin);
    }
  });
  function pintar_grafico(fecha_inicio, fecha_fin) {
    let funcion = "buscar_visitas_date";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, fecha_inicio, fecha_fin },
      (response) => {
        console.log(response);
        // Configurar el gráfico
        var xAxisData = [];
        // Inicializar el gráfico
        var myChart = echarts.init(document.getElementById("visitas_graf"));

        var seriesAsistioData = []; // Datos para la barra de ASISTIO
        var seriesNoAsistioData = []; // Datos para la barra de NO ASISTIO

        if (response.trim() === "no-register") {
          xAxisData.push("no data", "no data");
          seriesAsistioData.push(0);
          seriesNoAsistioData.push(0);
        } else {
          var data = JSON.parse(response);
          console.log(data);

          // Obtener el rango de fechas de inicio y fin
          var fechaInicio = fecha_inicio;
          var fechaFin = fecha_fin;

          var dateDiff = dayjs(fechaFin).diff(dayjs(fechaInicio), "day") + 1;
          console.log(dateDiff);

          if (dateDiff <= 7) {
            // Si el rango es de 7 días o menos, mostrar día a día
            var currentGroupStartDate = fechaInicio;
            var currentGroupEndDate = fechaFin;
            while (currentGroupEndDate >= currentGroupStartDate) {
              var groupVisitsAsistio = 0;
              var groupVisitsNoAsistio = 0;
              data.forEach((item) => {
                var fechaVisita = item.fecha_visita;
                if (fechaVisita === currentGroupStartDate) {
                  if (item.status === "ASISTIO") {
                    groupVisitsAsistio += Number(item.cantidad_visitas);
                  } else {
                    groupVisitsNoAsistio += Number(item.cantidad_visitas);
                  }
                }
              });
              xAxisData.push(
                getTimeLabel(currentGroupStartDate, currentGroupStartDate)
              );
              seriesAsistioData.push(groupVisitsAsistio);
              seriesNoAsistioData.push(groupVisitsNoAsistio);
              currentGroupStartDate = dayjs(currentGroupStartDate)
                .add(1, "day")
                .format("YYYY-MM-DD");
            }
          } else if (dateDiff > 7 && dateDiff <= 30) {
            // Si el rango es mayor a 7 días y menor o igual a 30 días, mostrar por semana
            var currentGroupStartDate = fechaInicio;
            var currentGroupEndDate = dayjs(fechaInicio)
              .add(6, "day")
              .format("YYYY-MM-DD");
            while (currentGroupStartDate <= fechaFin) {
              var groupVisitsAsistio = 0;
              var groupVisitsNoAsistio = 0;
              data.forEach((item) => {
                var fechaVisita = item.fecha_visita;
                if (
                  fechaVisita >= currentGroupStartDate &&
                  fechaVisita <= currentGroupEndDate
                ) {
                  if (item.status === "ASISTIO") {
                    groupVisitsAsistio += Number(item.cantidad_visitas);
                  } else {
                    groupVisitsNoAsistio += Number(item.cantidad_visitas);
                  }
                }
              });
              xAxisData.push(
                getTimeLabel(currentGroupStartDate, currentGroupEndDate)
              );
              seriesAsistioData.push(groupVisitsAsistio);
              seriesNoAsistioData.push(groupVisitsNoAsistio);
              currentGroupStartDate = dayjs(currentGroupEndDate)
                .add(1, "day")
                .format("YYYY-MM-DD");
              currentGroupEndDate = dayjs(currentGroupStartDate)
                .add(6, "day")
                .format("YYYY-MM-DD");
            }
          } else {
            // Si el rango es mayor a 30 días, mostrar por mes
            var currentGroupStartDate = fechaInicio;
            var currentGroupEndDate = dayjs(fechaInicio)
              .add(30, "day")
              .format("YYYY-MM-DD");
            console.log(currentGroupStartDate, currentGroupEndDate);
            while (currentGroupStartDate <= fechaFin) {
              var groupVisitsAsistio = 0;
              var groupVisitsNoAsistio = 0;
              data.forEach((item) => {
                var fechaVisita = item.fecha_visita;
                if (
                  fechaVisita >= currentGroupStartDate &&
                  fechaVisita <= currentGroupEndDate
                ) {
                  if (item.status === "ASISTIO") {
                    groupVisitsAsistio += Number(item.cantidad_visitas);
                  } else {
                    groupVisitsNoAsistio += Number(item.cantidad_visitas);
                  }
                }
              });
              xAxisData.push(
                getTimeLabel(currentGroupStartDate, currentGroupEndDate)
              );
              seriesAsistioData.push(groupVisitsAsistio);
              seriesNoAsistioData.push(groupVisitsNoAsistio);
              currentGroupStartDate = dayjs(currentGroupEndDate)
                .add(1, "day")
                .format("YYYY-MM-DD");
              currentGroupEndDate = dayjs(currentGroupStartDate)
                .add(30, "day")
                .format("YYYY-MM-DD");
            }
          }
        }

        // Configurar opciones del gráfico
        var option = {
          // title: {
          //   text: "Visitas ASISTIO y NO ASISTIO",
          // },
          tooltip: {},
          xAxis: {
            type: "category",
            data: xAxisData,
          },
          yAxis: {
            type: "value",
          },
          legend: {
            data: ["ASISTIO", "NO ASISTIO"],
          },
          series: [
            {
              name: "ASISTIO",
              type: "bar",
              data: seriesAsistioData,
            },
            {
              name: "NO ASISTIO",
              type: "bar",
              data: seriesNoAsistioData,
            },
          ],
          color: ["#5208DD", "#0A9597", "#0A3397", "#4A40E2", "#5BB8E0"],
        };

        // Establecer las opciones y mostrar el gráfico
        myChart.setOption(option);
      }
    );
  }
  function getTimeLabel(startDate, endDate) {
    console.log(startDate, endDate);
    var dateDiff = dayjs(endDate).diff(dayjs(startDate), "day") + 1;
    console.log(dateDiff);

    if (dateDiff === 0) {
      return dayjs(startDate).format("D MMM");
    } else if (dateDiff < 7) {
      return dayjs(startDate).format("D MMM");
    } else if (dateDiff >= 7 && dateDiff <= 30) {
      return `Semana ${
        dayjs(startDate).format("D MMM") +
        " - " +
        dayjs(endDate).format("D MMM")
      }`;
    } else {
      return `Mes ${
        dayjs(startDate).format("D MMM") +
        " - " +
        dayjs(endDate).format("D MMM")
      }`;
    }
  }

  function getStartOfWeek(date) {
    console.log(dayjs(date).startOf("week"));
    return dayjs(date).startOf("week").add(1, "day").format("YYYY-MM-DD");
  }

  // Función para obtener la fecha de fin (domingo) de la semana actual
  function getEndOfWeek(date) {
    console.log(dayjs(date).endOf("week"));
    return dayjs(date).endOf("week").add(1, "day").format("YYYY-MM-DD");
  }
  semanaGrafico();
  function semanaGrafico() {
    var fechaActual = dayjs().format("YYYY-MM-DD");

    // Obtener la fecha de inicio (lunes) de la semana actual
    var fechaInicioSemana = getStartOfWeek(fechaActual);

    // Obtener la fecha de fin (domingo) de la semana actual
    var fechaFinSemana = getEndOfWeek(fechaInicioSemana);

    pintar_grafico(fechaInicioSemana, fechaFinSemana);
    resumen_vsv(fechaInicioSemana, fechaFinSemana);
    console.log(
      "Fecha de inicio de la semana actual (lunes):",
      fechaInicioSemana
    );
    console.log("Fecha de fin de la semana actual (domingo):", fechaFinSemana);
  }
  function resumen_vsv(fecha_inicio, fecha_fin) {
    var dom = document.getElementById("resumen-vsv");
    var rvsv = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    let funcion = "buscar_resumen_eficiencia";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, fecha_inicio, fecha_fin },
      (response) => {
        console.log(response);
        let resumen = JSON.parse(response);
        let visitas =
          resumen[0].visitas_concretadas === null
            ? 0
            : resumen[0].visitas_concretadas;
        let separaciones = resumen[0].separaciones;
        let ventas = resumen[0].ventas;
        console.log(resumen);
        $("#resumen-visitas").html(visitas);
        $("#resumen-separaciones").html(separaciones);
        $("#resumen-ventas").html(ventas);
        // var app = {};

        var option;

        option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "Eficiencia",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 14,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  value: visitas,
                  name: "VISITAS CONCRETADAS",
                },
                { value: separaciones, name: "SEPARACIONES" },
                { value: ventas, name: "VENTAS" },
              ],
              color: ["#5208DD", "#0A9597", "#0A3397", "#4A40E2", "#5BB8E0"],
            },
          ],
        };

        if (option && typeof option === "object") {
          rvsv.setOption(option);
        }

        window.addEventListener("resize", rvsv.resize);
      }
    );
  }
  // $("#asesor-search").click(function () {
  //   $("#listUsuarios").toggleClass("hidden");
  // });
});
