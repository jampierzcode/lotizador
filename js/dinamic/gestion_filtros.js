$(document).ready(function () {
  var asesoresArray;
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
  $("#refresh_date_visitas").click(function () {
    semanaGrafico();
    $("#asesor-search").removeAttr("keyAsesor");
    $("#asesor-search span").html("Seleccione un asesor");
  });
  function pintar_grafico(fecha_inicio, fecha_fin) {
    let usuario = $("#asesor-search").attr("keyAsesor");
    console.log(usuario);
    if (usuario === undefined || usuario === "") {
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
    } else {
      let funcion = "buscar_visitas_date_asesor";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin, usuario },
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
    $("#fecha-inicio-search").val(fechaInicioSemana);
    $("#fecha-fin-search").val(fechaFinSemana);

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
    let usuario = $("#asesor-search").attr("keyAsesor");
    console.log(usuario);
    if (usuario === undefined || usuario === "") {
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
    } else {
      let funcion = "buscar_resumen_eficiencia_asesor";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, fecha_inicio, fecha_fin, usuario },
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
  }
  $("#asesor-search").click(function () {
    $("#listUsuarios").toggleClass("hidden");
    if ($("#listUsuarios").hasClass("hidden")) {
      console.log("entro");
      $("#icon-drop-asesor").attr("name", "chevron-down");
    } else {
      $("#icon-drop-asesor").attr("name", "chevron-up");
    }
  });
  buscar_asesores();
  function buscar_asesores() {
    let funcion = "buscar_usuarios_asesores";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() === "no-users-asesor") {
          template += "No data";
        } else {
          const asesores = JSON.parse(response);
          asesoresArray = asesores;
          asesores.forEach((asesor) => {
            template += `
            <li id="selectAsesor" keyAsesor= "${asesor.id_usuario}" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        ${asesor.nombre}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        ${asesor.apellido}
                    </p>
                </div>
            </div>
        </li>
            `;
          });
          $("#listAsesores").html(template);
        }
      }
    );
  }
  $(document).on("click", "#selectAsesor", function () {
    let id_usuario = $(this).attr("keyASesor");
    console.log(id_usuario);
    let asesor = asesoresArray.filter((e) => e.id_usuario === id_usuario);
    $("#listUsuarios").addClass("hidden");
    if ($("#listUsuarios").hasClass("hidden")) {
      console.log("entro");
      $("#icon-drop-asesor").attr("name", "chevron-down");
    } else {
      $("#icon-drop-asesor").attr("name", "chevron-up");
    }
    $("#asesor-search").attr("keyAsesor", id_usuario);
    $("#asesor-search span").html(asesor[0].nombre + " " + asesor[0].apellido);
  });
  $("#search-asesor-input").on("keyup search", function () {
    let name = $(this).val().toLowerCase();
    let template = "";
    console.log(name);
    if (name === "") {
      asesoresArray.forEach((asesor) => {
        template += `
              <li id="selectAsesor" keyAsesor= "${asesor.id_usuario}" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
              <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                      <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                  </div>
                  <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          ${asesor.nombre}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          ${asesor.apellido}
                      </p>
                  </div>
              </div>
          </li>`;
      });

      $("#listAsesores").html(template);
    } else {
      let asesores = asesoresArray.filter((persona) => {
        // console.log(persona);
        const nombreCompleto = `${persona.nombre} ${persona.apellido}`;
        // console.log(nombreCompleto.toLowerCase().includes(name));
        return nombreCompleto.toLowerCase().includes(name);
      });
      console.log(asesores);
      if (asesores.length > 0) {
        asesores.forEach((asesor) => {
          template += `
                <li id="selectAsesor" keyAsesor= "${asesor.id_usuario}" class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
                <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            ${asesor.nombre}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            ${asesor.apellido}
                        </p>
                    </div>
                </div>
            </li>`;
        });
      } else {
        template += `
        <p class="py-3 px-4 text-sm font-medium text-gray-900 truncate dark:text-white">
        No hay registros
        </p>
        `;
      }
      $("#listAsesores").html(template);
    }
  });
});
