$(document).ready(function () {
  var funcion = "";
  var clientesList;
  var idCliente;
  var proyectosList = [];
  buscar_clientes();

  var dataTable = $("#usuariosList").DataTable({
    // scrollY: "160px",
    pageLength: 5,
    scrollX: true,
    // scrollCollapse: true,
    // paging: false,
    fixedColumns: {
      leftColumns: 2, //Le indico que deje fijas solo las 2 primeras columnas
      // rightColumns: 1,
    },
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],

    columns: [
      // { data: "id" },
      { data: "nombres" },
      { data: "apellidos" },
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
          let template_status = imprimirStatus(data?.status); // Cambiar de const a let

          template_status += `
              <div class="flex-actions">
              <button target="_blank" statusClient="${data.status}" keyClient="${data?.id}" id="registerSeguimiento" class="btnJsvm info mt-2">Registrar Evento</button>
            </div>
              `;
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
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
  });
  // Activar columnas fijas
  // new $.fn.dataTable.FixedColumns(dataTable, {
  //   leftColumns: 2, // Número de columnas fijas a la izquierda
  //   rightColumns: 1, // Número de columnas fijas a la derecha
  // });
  // función de animación
  function animarProgress() {
    let count = 3;
    let total = 10;
    var progressBar = document.querySelector(".progreessbar .barSize");
    $("#numberVisit").html(count);
    progressBar.style.width = `${(count / total) * 100}%`;
  }

  // Llamar a la función de animación
  animarProgress();

  // BUSCAR CLIENTES
  function buscar_clientes() {
    funcion = "buscar_clientes_by_asesor";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        $("#spin-load").html("");
        if (response.trim() == "no-register-clientes") {
          dataTable.clear().draw();
        } else {
          const clientes = JSON.parse(response);
          clientesList = clientes;
          dataTable.clear().rows.add(clientes).draw();
        }
      }
    );
  }

  // funcion de comparar data
  const compareDates = (a, b) => {
    const dateA = new Date(`${a.fecha} ${a.hora}`);
    const dateB = new Date(`${b.fecha} ${b.hora}`);

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
                              history.observacion
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

  // SHOW MODAL registrar seguimiento
  $(document).on("click", "#changeSeguimiento", function () {
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

      case "CONTACTADO":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "NO RESPONDIO":
        template += `<span class="target_tab warning">${status}</span>`;

        break;
      case "VISITA":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "AUSENCIA VISITA":
        template += `<span class="target_tab danger">${status}</span>`;

        break;
      case "REPROGRAMACION":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "RESERVA":
        template += `<span class="target_tab success">${status}</span>`;

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
    template += `<option value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
  }
  function filtrarProyectos() {
    const nombreProyecto = $("#filter-proyecto").val();
    const nombreApellido = $("#cliente-search").val().toLowerCase();
    console.log(nombreProyecto, nombreApellido);

    const clientes = clientesList.filter((proyecto) => {
      if (nombreProyecto && proyecto.nombreProyecto === "Todos") {
        return false;
      }
      if (nombreApellido && !contieneNombreApellido(proyecto, nombreApellido)) {
        return false;
      }
      return true;
    });

    dataTable.clear().rows.add(clientes).draw();
  }

  // Función auxiliar para verificar si el nombre y apellido coinciden con el filtro
  function contieneNombreApellido(proyecto, nombreApellido) {
    const nombreCompleto =
      `${proyecto.nombres} ${proyecto.apellidos}`.toLowerCase();
    return nombreCompleto.includes(nombreApellido);
  }

  // Event listeners para los cambios en el select y el input
  $("#cliente-search, #filter-proyecto").on("change keyup", filtrarProyectos);

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
          } else {
            alert("Ocurrio un error, contacta al administrador");
          }
        }
      );
    }

    // seguimiento_cliente(observacion, id_cliente, status);
  });

  $("#registerFormEvento").submit((e) => {
    e.preventDefault();
    let status = $("#status-evento").val();
    let observaciones = $("#observaciones-evento").val();
    console.log(status, observaciones);
    if (status !== "0") {
      seguimiento_cliente(observaciones, idCliente, status);

      let funcion = "buscar_historial_seguimiento";
      buscarHistorial(funcion, idCliente);
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
    filtrarProyectos();
  }
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
          alert("Se registro correctamente");
          buscar_clientes();
        } else {
          alert("Hubo un error contacta con el administrador");
        }
        console.log(response);
      }
    );
  }

  // filter cliente
  // $("#cliente-search").on("keyup", function () {
  //   var nombre = $(this).val();
  //   console.log(clientesList);
  //   console.log(nombre);
  //   if (nombre !== "") {
  //     const result = clientesList.filter(function (persona) {
  //       var nombreCompleto = (
  //         persona.nombres +
  //         " " +
  //         persona.apellidos
  //       ).toLowerCase();
  //       return nombreCompleto.includes(nombre);
  //     });

  //     dataTable.clear().rows.add(result).draw();
  //   } else {
  //     dataTable.clear().rows.add(clientesList).draw();
  //   }
  // });

  // FIN DE MODAL ASIGNES
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
