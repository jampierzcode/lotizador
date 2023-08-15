$(document).ready(function () {
  var funcion = "";
  var clientesList;
  var idCliente;
  var proyectosList = [];
  var dataTable = $("#usuariosList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    // ordering: false,
    stateSave: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,
    // scrollCollapse: true,
    // paging: false,
    fixedColumns: {
      leftColumns: 2, //Le indico que deje fijas solo las 2 primeras columnas
      // rightColumns: 1,
    },
    // aoColumnDefs: [
    //   {
    //     bSortable: false,
    //     aTargets: ["nosort"],
    //   },
    // ],

    columns: [
      // { data: "id" },
      { data: "nombres" },
      { data: "apellidos" },
      {
        data: null,
        render: function (data) {
          let template = "";
          template += `<div class="flex flex-col gap-2 ">`;
          if (data.etiquetas === null) {
            template += `<p>Sin etiquetas</p>`;
          } else {
            // Convertir la cadena a un array
            const etiquetas = JSON.parse(data.etiquetas);
            console.log(etiquetas);
            const etiquetasArray = etiquetas[0].nombre.split(",");
            etiquetasArray.forEach((e) => {
              template += `<div class="p-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <span class="font-medium whitespace-nowrap">${e}</span> </div>`;
            });
          }
          template += `</div>`;
          template += `
          <button id="verEtiquetasCliente" keyCliente=${data.id} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><ion-icon name="eye"></ion-icon></button>
          `;
          return template;
        },
      },
      { data: "created_cliente" },
      // { data: "correo" },
      { data: "celular" },
      { data: "telefono" },
      { data: "origen" },
      { data: "ciudad" },
      { data: "nombre_proyecto" },
      {
        data: null,
        render: function (data, type, row) {
          console.log(data.status);
          let template_status = imprimirStatus(data?.status); // Cambiar de const a let

          if (data.task_status === "PENDIENTE") {
            template_status += `<span>${
              data.fecha_visita + " Hora: " + data.hora_visita
            }</span>`;

            if (
              data.status == "VISITA" ||
              data.status == "REPROGRAMACION VISITA"
            ) {
              template_status += `
                <div class="flex-actions">
                <button target="_blank" keyTask="${data.id_task}" statusClient="ASISTIO" keyClient="${data?.id}" id="asistenciaYes" class="btnJsvm success mt-2">ASISTIO</button>
                <button target="_blank" keyTask="${data.id_task}" statusClient="NO ASISTIO" keyClient="${data?.id}" id="asistenciaNot" class="btnJsvm danger mt-2">NO ASISTIO</button>
              </div>
                `;
            } else {
              template_status += `
                <div class="flex-actions">
                <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id}" id="completarTask" class="btnJsvm default mt-2">Completar Actividad</button>
                </div>
                `;
            }
          } else {
            switch (data.status) {
              case "NO CONTACTADO":
                template_status += `
            <div class="flex-actions">
            <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id}" id="contactarSeguimiento" class="btnJsvm default mt-2">Contactar</button>
          </div>
            `;
                break;
              case "REPROGRAMACION CONTACTO":
                template_status += `COMPLETADO`;
                template_status += `
                <div class="flex-actions">
                <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
              </div>
                `;
                break;
              case "REPROGRAMACION VISITA":
                template_status += `COMPLETADO`;
                template_status += `
                <div class="flex-actions">
                <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
              </div>
                `;
                break;
              case "VISITA":
                template_status += `COMPLETADO`;
                template_status += `
                <div class="flex-actions">
                <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
              </div>
                `;
                break;

              default:
                template_status += `
                <div class="flex-actions">
                <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
              </div>
                `;
                break;
            }

            //   if (data.status == "NO CONTACTADO") {
            //     template_status += `
            //   <div class="flex-actions">
            //   <button target="_blank" keyTask="${data.id_task}" statusClient="${data.status}" keyClient="${data?.id}" id="contactarSeguimiento" class="btnJsvm default mt-2">Contactar</button>
            // </div>
            //   `;
            //   } else {
            //     template_status += `COMPLETADO`;

            //     template_status += `
            //       <div class="flex-actions">
            //       <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
            //     </div>
            //       `;
            //   }
          }

          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
              <div class="flex-actions">
              <button target="_blank" keyClient="${data?.id}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
              <button target="_blank" keyClient="${data?.id}" id="removeClient" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
              <button target="_blank" keyClient="${data?.id}" id="historialCliente" class="btnJsvm normal">Historial</button>
              
              
              </div>
    
              `;
        },
      },
    ],
    // columnDefs: [{ type: "date-dd-mm-yyyy", aTargets: [5] }],
    // order: false,
    // bLengthChange: false,
    // dom: '<"top">ct<"top"p><"clear">',
  });
  var dataTableEtiquetas = $("#etiquetasList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    stateSave: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,

    columns: [
      // { data: "id" },
      { data: "nombre" },
      {
        data: null,
        render: function (data, type, row) {
          return `
              <div class="flex-actions">
              
              <button target="_blank" keyClient="${data?.id}" id="removeEtiquetaUser" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
              </div>
    
              `;
          // <button target="_blank" keyClient="${data?.id}" id="editEtiquetaUser" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
        },
      },
    ],
  });
  var etiquetasClienteList = $("#etiquetasClienteList").DataTable({
    // scrollY: "160px",
    // scrollY: "500px",
    stateSave: true,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando página _PAGE_ de _PAGES_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Buscar:",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    pageLength: 5,
    scrollX: true,

    columns: [
      // { data: "id" },
      { data: "nombre" },
      { data: "asignado_cliente" },
      {
        data: null,
        render: function (data, type, row) {
          return `
              <div class="flex-actions">
              <button target="_blank" keyEtiqueta="${data?.id}" id="removeEtiqueta" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
              </div>
    
              `;
        },
      },
    ],
  });

  // -------register asistencia
  function register_visita_agenda(task, cliente, status) {
    let funcion = "register_visita_agenda";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, task, cliente, status },
      (response) => {
        if (response.trim() === "register") {
          alert("Se paso asistencia al cliente");
        } else {
          console.log(response);
        }
      }
    );
  }

  $(document).on("click", "#asistenciaNot, #asistenciaYes", function () {
    let observacion = "";
    let cliente = $(this).attr("keyClient");
    let task = $(this).attr("keyTask");
    let status = $(this).attr("statusClient");
    // console.log(status, task, cliente);
    let confirmado = confirm("Esta seguro de esta eleccion");
    if (confirmado) {
      // console.log("yes");
      seguimiento_cliente(observacion, cliente, status);
      completarTask(task, cliente, status);
      encontrar_ventas();
      register_visita_agenda(task, cliente, status);
    } else {
      console.log("rechazo");
    }
  });
  function completarTask(id_task) {
    if (id_task) {
      let funcion = "completar_tarea";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_task },
        (response) => {
          console.log(response);
          if (response.trim() == "COMPLETADO") {
            alert("Tarea completada satisfactoriamente");
            buscar_clientes();
            animarProgress();
          } else {
            console.log(response);
          }
        }
      );
    } else {
      alert(
        "No es un estado pendiente, al parecer ocurrio un error, contacta al administrado"
      );
    }
  }

  $(document).on("click", "#completarTask", function () {
    let id_task = $(this).attr("keyTask");
    let confirmado = confirm("Esta seguro de completar actividad");
    if (confirmado) {
      completarTask(id_task);
    }
  });
  encontrar_ventas();
  function encontrar_ventas() {
    const startOfMonth = dayjs().startOf("month");
    const endOfMonth = dayjs().endOf("month");
    dayjs().locale("es");
    const mesActual = dayjs().format("MMMM");
    console.log(mesActual);
    $("#mesNow").html(mesActual);
    const fecha_inicio = startOfMonth.format("YYYY-MM-DD"); // Primer día del mes en formato YYYY-MM-DD
    const fecha_fin = endOfMonth.format("YYYY-MM-DD");
    console.log(fecha_inicio, fecha_fin);
    let funcion = "buscar_resumen_eficiencia_usuario";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, fecha_inicio, fecha_fin },
      (response) => {
        console.log(response);
        let visitas;
        let separaciones;
        let ventas;
        if (response.trim() === "no-register") {
          visitas = 0;
          separaciones = 0;
          ventas = 0;
        } else {
          let resumen = JSON.parse(response);
          console.log(resumen);
          visitas_concretadas = resumen[0].visitas_concretadas;
          separaciones = resumen[0].separaciones;
          ventas = resumen[0].ventas;
        }
        $("#ventas_count").html(ventas);
        $("#separaciones_count").html(separaciones);
        $("#visits_concretadas").html(visitas_concretadas);
      }
    );
  }
  function animarProgress() {
    let funcion = "buscar_visitas_programadas";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let count;
        let pendientes;
        let separaciones;
        let ventas;
        if (response === "") {
          count = 0;
          pendientes = 0;
        } else {
          const interaccion = JSON.parse(response);
          console.log(interaccion);
          const pendientesList = interaccion.filter(
            (data) => data.status === "PENDIENTE"
          );
          pendientes = pendientesList.length;
        }
        let total = 10;
        // var progressBar = document.querySelector(".progreessbar .barSize");

        // progressBar.style.width = `${(count / total) * 100}%`;
        $("#menu-pendientes").html("Pendientes: " + pendientes);
      }
    );
  }
  // registrar lead indiidual
  buscar_proyectos();
  async function buscar_proyectos() {
    funcion = "buscar_proyectos_agentes";
    const response = await $.post("../../controlador/UsuarioController.php", {
      funcion,
    });
    const proyectos = JSON.parse(response);
    proyectosList = proyectos;

    llenarFiltros();
  }

  // Llamar a la función de animación
  animarProgress();
  function compareDatesDesc(a, b) {
    return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  }

  buscar_clientes();
  // BUSCAR CLIENTES
  function buscar_clientes() {
    funcion = "buscar_clientes_by_asesor";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        $("#spin-load").html("");
        if (response.trim() === "no-register-clientes") {
          dataTable.clear().draw();
        } else {
          const clientes = JSON.parse(response);
          // console.log(clientes);
          clientesList = clientes;
          clientesList.sort(compareDatesDesc);

          filtrarProyectos();
        }
      }
    );
  }

  const compareDates = (a, b) => {
    // Parsear las fechas con el formato "dd/mm/yyyy"
    const [dayA, monthA, yearA] = a.fecha.split("/");
    const [dayB, monthB, yearB] = b.fecha.split("/");

    // Crear las instancias de Date con el formato "YYYY-MM-DD"
    const dateA = new Date(`${yearA}-${monthA}-${dayA} ${a.hora}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB} ${b.hora}`);

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  };
  // show modal de historial de cliente
  $(document).on("click", "#historialCliente", function () {
    let cliente = $(this).attr("keyClient");
    idCliente = cliente;
    let funcion = "buscar_historial_seguimiento";
    buscarHistorial(funcion, cliente);
  });
  function buscarHistorial(funcion, cliente) {
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente },
      (response) => {
        console.log(response);
        if (response.trim() === "no-data") {
          alert("no hay registro alguno, porfavor cree uno");
        } else {
          const historial = JSON.parse(response);
          console.log(historial);
          const sortedData = historial.sort(compareDates);
          console.log(historial);
          console.log(sortedData);
          let template = "";
          sortedData.forEach((history) => {
            template += `
            <li class="mb-10 ml-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">${
              history.fecha + " " + history.hora
            }</time>
                            <h3 class="flex items-center gap-4 text-lg font-semibold text-gray-900 dark:text-white">Estado Registrado: ${imprimirStatus(
                              history.status
                            )}</h3>
                            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">${
                              history.observacion !== null
                                ? history.observacion
                                : "Sin observaciones"
                            }</p>
                            </li>
                            `;
          });
          $("#list-historial").html(template);
          $("#historial-event").removeClass("md-hidden");
          setTimeout(function () {
            $("#historial-event .form-create").addClass("modal-show");
          }, 10);
        }
      }
    );
  }
  // INTERACCION CON CLIENTES
  $("#menu-pendientes").click();

  // SHOW MODAL registrar seguimiento
  $(document).on("click", "#contactarSeguimiento", function () {
    let id_cliente = $(this).attr("keyClient");
    console.log(id_cliente);

    let observacion = "Cliente contactado";
    let status = "CONTACTADO";
    seguimiento_cliente(observacion, id_cliente, status);
  });
  function imprimirStatus(status) {
    let template = "";
    switch (status) {
      case "NO CONTACTADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;
      case "NO INTERESADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;

      case "CONTACTADO":
        template += `<span class="target_tab info flex items-center gap-2">CONTACTANDO <div role="status">
        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div></span>`;

        break;
      case "NO RESPONDIO":
        template += `<span class="target_tab warning">${status}</span>`;

        break;
      case "VISITA":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "ASISTIO":
        template += `<span class="target_tab success">${status} a la visita</span>`;

        break;
      case "NO ASISTIO":
        template += `<span class="target_tab danger">${status}</span>`;

        break;
      case "REPROGRAMACION CONTACTO":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "REPROGRAMACION VISITA":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "SEPARACION":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "VENTA":
        template += `<span style="display: flex; gap: 10px; align-items: center" class="target_tab success"> 
        <img style="width: 20px;" src="../../img/corona.png" alt=""> ${status}</span>`;

        break;

      default:
        break;
    }
    return template;
  }

  $("#modal-lead").click(() => {
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 10);
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#crear-lead #proyecto-lead").html(template);
  });
  $(document).on("click", "#editClient", function () {
    // console.log(e);
    // console.log("hola");
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#editar-lead #proyecto-lead").html(template);
    $("#editar-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#editar-lead .form-create").addClass("modal-show");
    }, 10);
    const id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    const clienteResult = clientesList.filter(
      (elemento) => elemento.id === id_cliente
    );
    console.log(id_cliente, clienteResult);

    $("#editar-lead #nombre-lead").val(clienteResult[0].nombres);
    $("#editar-lead #apellido-lead").val(clienteResult[0].apellidos);
    $("#editar-lead #documento-lead").val(clienteResult[0].documento);
    $("#editar-lead #celular-lead").val(clienteResult[0].celular);
    $("#editar-lead #telefono-lead").val(clienteResult[0].telefono);
    $("#editar-lead #origen-lead").val(clienteResult[0].origen);
    $("#editar-lead #ciudad-lead").val(clienteResult[0].ciudad);
    $("#editar-lead #pais-lead").val(clienteResult[0].Pais);
    $("#editar-lead #campania-lead").val(clienteResult[0].campania);
    $("#editar-lead #email-lead").val(clienteResult[0].correo);

    $("#editar-lead #proyecto-lead").val(clienteResult[0].proyecto_id);
  });

  function llenarFiltros() {
    let template = "";
    template += `<option selected value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.nombreProyecto}">${proyecto.nombreProyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
  }
  function filtrarProyectos() {
    const nombreProyecto = $("#filter-proyecto").val();
    const nombreCliente = $("#cliente-search").val().toLowerCase();
    const nombreEtiqueta = $("#filter-etiqueta").val();
    console.log(nombreProyecto, nombreCliente, nombreEtiqueta);

    const clientes = clientesList.filter((cliente) => {
      let etiquetasList;
      console.log(cliente.etiquetas);
      let etiquetas = JSON.parse(cliente.etiquetas);
      if (etiquetas === null) {
        etiquetasList = [];
      } else {
        etiquetasList = etiquetas[0].nombre.split(",");
      }
      console.log(etiquetasList);
      let count = 0;
      etiquetasList.forEach((etiqueta) => {
        if (etiqueta === nombreEtiqueta) {
          count = count + 1;
        }
      });
      console.log(count);
      console.log(nombreEtiqueta);
      if (count === 0 && nombreEtiqueta !== "Todos") {
        return false;
      }
      if (
        nombreProyecto !== "Todos" &&
        cliente.nombre_proyecto !== nombreProyecto
      ) {
        console.log(cliente.nombre_proyecto);
        return false;
      }
      if (
        nombreCliente !== "" &&
        !contienenombreCliente(cliente, nombreCliente)
      ) {
        console.log(nombreCliente);
        return false;
      }
      return true;
    });
    console.log(clientes);
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(clientes).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    console.log(totalPaginas);
    if (estadoActual.page < totalPaginas) {
      console.log(estadoActual.page);
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();

      // Agregar las nuevas filas
      dataTable.rows.add(clientes).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }

    // Restaurar la posición de scroll horizontal
    $("#usuariosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  function filtrarPendientes() {
    let fecha_inicio = dayjs(
      $("#fecha-inicio-status").val(),
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");
    let fecha_fin = dayjs($("#fecha-fin-status").val(), "DD/MM/YYYY").format(
      "YYYY-MM-DD"
    );
    let status = $("#filter-status").val();
    console.log(fecha_inicio, fecha_fin, status);
    // if (fecha_inicio !== "Invalid Date" && fecha_fin !== "Invalid Date") {
    const clientes = clientesList.filter((cliente) => {
      // console.log(cliente);
      // if (
      //   nombreProyecto !== "Todos" &&
      //   cliente.nombre_proyecto !== nombreProyecto
      // ) {
      //   console.log(cliente.nombre_proyecto);
      //   return false;
      // }
      if (status !== "Todas" && status !== cliente.status) {
        return false;
      }
      if (fecha_inicio !== "Invalid Date" && fecha_fin !== "Invalid Date") {
        if (
          dayjs(cliente.fecha_visita).isAfter(fecha_fin) ||
          dayjs(cliente.fecha_visita).isBefore(fecha_inicio)
        ) {
          console.log("entro");
          return false;
        }
      }

      return true;
    });
    console.log(clientes);

    dataTable.clear().rows.add(clientes).draw();
    // }
  }

  // Función auxiliar para verificar si el nombre y apellido coinciden con el filtro
  function contienenombreCliente(cliente, nombreCliente) {
    const nombreCompleto =
      `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
    return nombreCompleto.includes(nombreCliente);
  }

  // Event listeners para los cambios en el select y el input
  $("#cliente-search, #filter-proyecto").on("change keyup", filtrarProyectos);
  $("#filter-etiqueta").on("change", filtrarProyectos);

  // filtro de pendientes
  $("#menu-pendientes").click(function () {
    const clientes = clientesList.filter((e) => e.task_status === "PENDIENTE");
    dataTable.clear().rows.add(clientes).draw();
  });

  // --------reset filters
  $("#reset_filtros").click(function () {
    $("#cliente-search").val("");
    $("#filter-proyecto").val("Todos");
    $("#filter-etiqueta").val("Todos");
    $("#fecha-inicio-pendients").val(null);
    $("#fecha-fin-pendients").val(null);
    dataTable.clear().rows.add(clientesList).draw();
  });

  $("#fecha-inicio-status").on("change", function () {
    const fechaInicio = dayjs($(this).val());

    // Habilitar "fechaFin"
    $("#fecha-fin-status").prop("disabled", false);

    // Establecer el valor mínimo para "fechaFin" como un día después de "fechaInicio"
    $("#fecha-fin-status").attr("min", fechaInicio.format("YYYY-MM-DD"));
  });
  $("#fecha-inicio-status, #fecha-fin-status, #filter-status").on(
    "change",
    filtrarPendientes
  );

  // filtro de etiquetas

  // Llama a la función inicialmente para mostrar todos los proyectos

  // filtrarProyectos();

  $("#editar-lead #editLead").submit((e) => {
    e.preventDefault();
    let nombre = $("#editar-lead #nombre-lead").val();
    let apellido = $("#editar-lead #apellido-lead").val();
    let documento = $("#editar-lead #documento-lead").val();
    let celular = $("#editar-lead #celular-lead").val();
    let telefono = $("#editar-lead #telefono-lead").val();
    let origen = $("#editar-lead #origen-lead").val();
    let ciudad = $("#editar-lead #ciudad-lead").val();
    let pais = $("#editar-lead #pais-lead").val();
    let campania = $("#editar-lead #campania-lead").val();
    let correo = $("#editar-lead #email-lead").val();
    let proyecto_id = $("#editar-lead #proyecto-lead").val();
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
    };
    console.log(result);
    if (proyecto_id !== "0") {
      let funcion = "edit_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, cliente: idCliente },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          console.log(data);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            alert(data.error);
          } else {
            alert("Se edito correctamente al cliente");
            setTimeout(function () {
              $("#editar-lead .form-create").removeClass("modal-show");
            }, 1000);
            $("#editar-lead").addClass("md-hidden");
            buscar_clientes();

            $("#editar-lead #nombre-lead").val("");
            $("#editar-lead #apellido-lead").val("");
            $("#editar-lead #documento-lead").val("");
            $("#editar-lead #celular-lead").val("");
            $("#editar-lead #telefono-lead").val("");
            $("#editar-lead #origen-lead").val("");
            $("#editar-lead #ciudad-lead").val("");
            $("#editar-lead #pais-lead").val("");
            $("#editar-lead #campania-lead").val("");
            $("#editar-lead #email-lead").val("");
          }
        }
      );
    }
  });

  $(document).on("click", "#registerSeguimiento", function () {
    let id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    let status = $(this).attr("statusClient");
    console.log(status);
    let template_status = imprimirStatus(status);
    const result = clientesList.filter(
      (elemento) => elemento.id === id_cliente
    );
    console.log(result);
    $("#img-now-status").attr("src", "../../img/avatar_default.jpg");
    $("#name-now-status").html(result[0].nombres + " " + result[0].apellidos);
    $("#contact-now-status").html(result[0].celular);
    $("#status-now").html(template_status);
    $("#crear-event").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-event .form-create").addClass("modal-show");
    }, 10);

    // seguimiento_cliente(observacion, id_cliente, status);
  });
  $(document).on("click", "#removeClient", function () {
    let id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    let funcion = "delete_cliente_asesor";
    const confirmed = confirm("Estas seguro de archivar al cliente?");
    if (confirmed) {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          console.log(response);
          if (response.trim() === "delete-user-cliente") {
            alert("Se archivo correctamente");
            buscar_clientes();
            animarProgress();
          } else {
            alert("Ocurrio un error, contacta al administrador");
          }
        }
      );
    }

    // seguimiento_cliente(observacion, id_cliente, status);
  });
  $("#status-evento").on("change", function (e) {
    console.log(e);
    let tipo = e.target.value;
    console.log(tipo);
    if (
      tipo === "VISITA" ||
      tipo === "REPROGRAMACION CONTACTO" ||
      tipo === "REPROGRAMACION VISITA" ||
      tipo === "SEPARACION"
    ) {
      $("#fecha_visita").removeClass("hidden");
    } else {
      $("#fecha_visita").addClass("hidden");
    }
  });
  function registerVisita(fecha, hora, cliente, tipo, pendiente) {
    let funcion = "add_visita_cliente";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, fecha, hora, cliente, tipo, pendiente },
      (response) => {
        console.log(response);
        if (response.trim() === "add-register-visita") {
          alert("Se registro" + tipo + " correctamente");
          animarProgress();
        } else {
          alert("No se registro, contacta al administrador");
        }
      }
    );
  }
  function register_venta(fecha, cliente) {
    let funcion = "register_venta";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, fecha, cliente },
      (response) => {
        if (response.trim() === "add-register-venta") {
          alert("Se registro correctamente la venta");
        } else {
          alert("Hubo un error Contacta al administrador");
        }
        console.log(response);
      }
    );
  }
  $("#registerFormEvento").submit((e) => {
    e.preventDefault();
    let status = $("#status-evento").val();
    let observaciones = $("#observaciones-evento").val();
    console.log(status, observaciones);
    if (status !== "0") {
      if (
        status === "VISITA" ||
        status === "REPROGRAMACION CONTACTO" ||
        status === "REPROGRAMACION VISITA" ||
        status === "SEPARACION"
      ) {
        let pendiente = "PENDIENTE";
        let fecha = $("#date-visita").val();
        let hora = $("#time-visita").val() + ":00";
        if (fecha && hora) {
          registerVisita(fecha, hora, idCliente, status, pendiente);
          $("#date-visita").val(null);
          $("#time-visita").val(null);
        } else {
          return;
        }
      } else if (status === "VENTA") {
        console.log("VENTA");
        let fecha = dayjs().format("YYYY-MM-DD");
        register_venta(fecha, idCliente);
      }
      seguimiento_cliente(observaciones, idCliente, status);

      let funcion = "buscar_historial_seguimiento";
      buscar_clientes();
      buscarHistorial(funcion, idCliente);
      encontrar_ventas();
      $("#status-evento").val("0");
      $("#observaciones-evento").val("");
      setTimeout(function () {
        $("#crear-event .form-create").removeClass("modal-show");
      }, 1000);
      $("#crear-event").addClass("md-hidden");
    } else {
      showToast();
    }
  });

  // registrar lead
  $("#registerLead").submit((e) => {
    e.preventDefault();
    let nombre = $("#nombre-lead").val();
    let apellido = $("#apellido-lead").val();
    let documento = $("#documento-lead").val();
    let celular = $("#celular-lead").val();
    let telefono = $("#telefono-lead").val();
    let origen = $("#origen-lead").val();
    let ciudad = $("#ciudad-lead").val();
    let pais = $("#pais-lead").val();
    let campania = $("#campania-lead").val();
    let correo = $("#email-lead").val();
    let proyecto_id = $("#proyecto-lead").val();
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
    };
    console.log(result);
    if (proyecto_id !== "0") {
      let funcion = "add_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          console.log(data);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            alert(data.error);
          } else {
            funcion = "add_user_cliente_asesor";
            alert("se subio correctamente el cliente");
            let id = data.id;
            $.post(
              "../../controlador/UsuarioController.php",
              { funcion, id },
              (response) => {
                console.log(response);
                if (response.trim() == "add-user-cliente") {
                  alert("Se asigno cliente al asesor");
                  setTimeout(function () {
                    $("#crear-lead .form-create").removeClass("modal-show");
                  }, 1000);
                  $("#crear-lead").addClass("md-hidden");
                  buscar_clientes();
                  $("#nombre-lead").val("");
                  $("#apellido-lead").val("");
                  $("#documento-lead").val("");
                  $("#celular-lead").val("");
                  $("#telefono-lead").val("");
                  $("#origen-lead").val("");
                  $("#ciudad-lead").val("");
                  $("#pais-lead").val("");
                  $("#campania-lead").val("");
                  $("#email-lead").val("");
                  $("#proyecto-lead").val("");
                } else {
                  alert("No se asigno, contacta al administrador");
                }
              }
            );
          }
        }
      );
    } else {
      alert("Debe seleccionar un proyecto");
    }
  });
  const showToast = () => {
    // Muestra el toast agregando la clase "flex" y eliminando la clase "hidden-toast"
    const toast = document.getElementById("toast-warning");
    toast.classList.add("toast-app");
    setTimeout(() => {
      toast.classList.remove("toast-app");
    }, 3000);
  };

  // Función para ocultar el toast al hacer clic en el botón de cerrar
  const hideToast = () => {
    // Oculta el toast agregando la clase "hidden-toast" y eliminando la clase "flex"
    const toast = document.getElementById("toast-warning");
    // toast.classList.add("hidden-toast");
    toast.classList.remove("toast-app");
  };

  // Agrega el evento onclick al botón de cerrar para ocultar el toast
  const closeButton = document.querySelector(
    '#toast-warning [data-dismiss-target="#toast-warning"]'
  );
  closeButton.addEventListener("click", hideToast);

  function seguimiento_cliente(observacion, cliente, status) {
    let funcion = "seguimiento_cliente";
    var fecha = dayjs().format("DD/MM/YYYY");
    var hora = dayjs().format("HH:mm:ss");

    // Imprimir las variables en la consola
    console.log("Fecha actual:", fecha);
    console.log("Hora actual:", hora);
    console.log(cliente);
    // let hora =
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente, observacion, status, fecha, hora },
      (response) => {
        if (response.trim() == "add-register-contact") {
          buscar_clientes();
        } else {
          alert("Hubo un error contacta con el administrador");
        }
        console.log(response);
      }
    );
  }

  // remover etiqueta de lead
  $(document).on("click", "#removeEtiqueta", function () {
    let id_etiqueta = $(this).attr("keyEtiqueta");
    console.log(id_etiqueta);
    let funcion = "remove_etiqueta_lead";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_etiqueta, cliente: idCliente },
      async (response) => {
        if (response.trim() === "remove-asigned") {
          buscar_clientes();
          const etiquetas = await buscar_etiquetas_cliente(idCliente);
          console.log(etiquetas);
          let template;
          // let template = `<option value="" selected></option>`;
          let etiquetasAsigned = [];
          etiquetas.forEach((etiqueta) => {
            let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
            if (etiqueta.asignado_cliente === "asignado") {
              etiquetasAsigned.push(etiqueta);
              option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
            }
            template += option;
          });
          etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

          $("#etiquetas-user").html(template);
          $("#etiquetas-user").select2({
            allowClear: true,
            placeholder: "Selecciona una etiqueta",
          });
        } else {
          alert("Ocurrio un error, contacta al administrador");
        }
        console.log(response);
      }
    );
  });

  // modal crear etiqueta
  $("#modal-etiqueta").click(() => {
    $("#crear-etiqueta").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-etiqueta .form-create").addClass("modal-show");
    }, 10);
  });
  $("#crear-etiqueta .close-modal").click(() => {
    $("#crear-etiqueta .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#crear-etiqueta").addClass("md-hidden");
    }, 500);
  });
  $("#registerEtiqueta").submit(function (e) {
    e.preventDefault();
    let nombre = $("#nombre-etiqueta").val();
    if (nombre !== "") {
      console.log(nombre);
      let funcion = "add_etiqueta";
      let fecha = dayjs().format("YYYY-MM-DD");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, nombre, fecha },
        (response) => {
          console.log(response);
          if (response.trim() === "add-etiqueta") {
            $("#nombre-etiqueta").val("");
            buscar_etiquetas();
            alert("La etiqueta se creo correctamente");
          } else {
            alert("Hubo un error contacta con el administrador");
          }
        }
      );
    } else {
      alert("El nombre de la etiqueta no puede estar vacio");
    }
  });
  buscar_etiquetas();
  function buscar_etiquetas() {
    let funcion = "buscar_etiquetas";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        if (response !== "") {
          const etiquetas = JSON.parse(response);
          let template = `<option value="Todos">Todos</option>`;
          etiquetas.forEach((e) => {
            template += `<option value="${e.nombre}">${e.nombre}</option>`;
          });
          $("#filter-etiqueta").html(template);

          dataTableEtiquetas.clear().rows.add(etiquetas).draw();
        }
      }
    );
  }
  function buscar_etiquetas_cliente(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_etiquetas_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          console.log(response);
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const etiquetas = JSON.parse(response);
            resolve(etiquetas);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }
  $(document).on("click", "#verEtiquetasCliente", async function () {
    let id_cliente = $(this).attr("keyCliente");
    console.log(id_cliente);
    idCliente = id_cliente;
    try {
      const etiquetas = await buscar_etiquetas_cliente(id_cliente);
      console.log(etiquetas);
      let template;
      // let template = `<option value="" selected></option>`;
      let etiquetasAsigned = [];
      etiquetas.forEach((etiqueta) => {
        let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
        if (etiqueta.asignado_cliente === "asignado") {
          etiquetasAsigned.push(etiqueta);
          option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
        }
        template += option;
      });
      etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

      $("#etiquetas-user").html(template);
      $("#etiquetas-user").select2({
        allowClear: true,
        placeholder: "Selecciona una etiqueta",
      });
    } catch (error) {
      console.log(error);
    }
    $("#ver-etiquetas-clientes").removeClass("md-hidden");
    setTimeout(function () {
      $("#ver-etiquetas-clientes .form-create").addClass("modal-show");
    }, 10);
  });
  $("#ver-etiquetas-clientes .close-modal").click(() => {
    $("#ver-etiquetas-clientes .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#ver-etiquetas-clientes").addClass("md-hidden");
    }, 500);
  });
  $("#update-asigned-etiqueta").click(function () {
    let funcion = "update_asigned_etiqueta";
    let etiquetas = $("#etiquetas-user").val();
    let fecha = dayjs().format("YYYY-MM-DD");
    console.log(etiquetas);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, etiquetas, cliente: idCliente, fecha },
      async (response) => {
        if (response.trim() === "add-etiquetas-lead") {
          alert("Se asigno correctamente");
          buscar_clientes();
          const etiquetas = await buscar_etiquetas_cliente(idCliente);
          console.log(etiquetas);
          let template;
          // let template = `<option value="" selected></option>`;
          let etiquetasAsigned = [];
          etiquetas.forEach((etiqueta) => {
            let option = `<option value=${etiqueta.id}>${etiqueta.nombre}</option>`;
            if (etiqueta.asignado_cliente === "asignado") {
              etiquetasAsigned.push(etiqueta);
              option = `<option value=${etiqueta.id} disabled>${etiqueta.nombre}</option>`;
            }
            template += option;
          });
          etiquetasClienteList.clear().rows.add(etiquetasAsigned).draw();

          $("#etiquetas-user").html(template);
          $("#etiquetas-user").select2({
            allowClear: true,
            placeholder: "Selecciona una etiqueta",
          });
        } else {
          alert("Hubo un error contacta con el administrador");
          console.log(response);
        }
      }
    );
  });
  // -----------------------------------------------

  $("#crear-event .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#crear-event").addClass("md-hidden");
    $("#crear-event .form-create").removeClass("modal-show");
  });
  $("#historial-event .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $("#historial-event").addClass("md-hidden");
    $("#historial-event .form-create").removeClass("modal-show");
  });
  $("#crear-lead .form-create .close-modal").click(() => {
    $("#crear-lead").addClass("md-hidden");
    $("#crear-lead .form-create").removeClass("modal-show");
  });
  $("#editar-lead .form-create .close-modal").click(() => {
    $("#editar-lead").addClass("md-hidden");
    $("#editar-lead .form-create").removeClass("modal-show");
  });
  // fin de presentation modal
});
