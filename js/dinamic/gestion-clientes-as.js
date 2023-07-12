$(document).ready(function () {
  var funcion = "";
  var clientesList;
  var idCliente;
  buscar_clientes();

  var dataTable = $("#usuariosList").DataTable({
    pageLength: 5,
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
          console.log(data?.status);
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
  // función de animación
  function animarProgress() {
    let count = 3;
    let total = 10;
    var progressBar = document.querySelector(".progreessbar .barSize");
    $("#numberVisit").html(count);
    console.log(progressBar);
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
        let template = "";
        if (response.trim() == "no-register-clientes") {
          template += "<td>No hay registros</td>";
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
    $("#historial-event").removeClass("md-hidden");
    setTimeout(function () {
      $("#historial-event .form-create").addClass("modal-show");
    }, 10);
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
      }, 10);
      $("#crear-event").addClass("md-hidden");
    } else {
      showToast();
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
  // fin de presentation modal
});
