$(document).ready(function () {
  var funcion = "";
  var clientesList;
  var idCliente;
  var proyectosList;
  buscar_clientes();
  var dataTable = $("#usuariosList").DataTable({
    select: true,
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
      leftColumns: 3, //Le indico que deje fijas solo las 2 primeras columnas
      // rightColumns: 1,
    },
    // aoColumnDefs: [
    //   {
    //     bSortable: false,
    //     aTargets: ["nosort"],
    //   },
    // ],

    columns: [
      {
        data: null,

        render: function (data, type) {
          return `
          <input type="checkbox" class="cliente-checkbox" data-id="${data?.id}">
          `;
        },
      },
      // { data: "id" },
      { data: "nombres" },
      { data: "apellidos" },
      {
        data: "created_cliente",
      },
      { data: "correo" },
      { data: "celular" },
      { data: "telefono" },
      { data: "origen" },
      { data: "ciudad" },
      { data: "nombre_proyecto" },
      {
        data: null,
        render: function (data) {
          return data.asignado_usuario === "No asignado"
            ? `<span>No</span> `
            : `${data.asignado_usuario}`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template_status = imprimirStatus(data?.status);
          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button target="_blank" keyClient="${data?.id}" id="asignedClient" class="btnJsvm default"><ion-icon name="add-circle-sharp"></ion-icon></button>
          <button target="_blank" keyClient="${data?.id}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
          <button target="_blank" keyClient="${data?.id}" id="deleteClient" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
           
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

  var datatablesAsesores = $("#proyectsAsigned").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],
    columns: [
      { data: "id" },
      {
        data: null,
        render: function (data) {
          return `
        <p>${data.nombreAsesor + " " + data.apellidoAsesor}</p>
        `;
        },
      },
      { data: "asignado_usuario" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <div class="dropdown">
            <button class="btnJsvm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <ion-icon aria-label="Favorite" aria-hidden="true" name="ellipsis-vertical-outline"></ion-icon>
            </button>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" id="no-asigned_user" key_proyect=${data.id}>- Quitar usuario</button></li>
              </ul>
          </div>
          </div>

          `;
        },
      },
    ],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
  });

  // buscar asesores
  function buscar_asesores(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_asesor_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const asesores = JSON.parse(response);
            resolve(asesores);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }
  function compareDatesDesc(a, b) {
    return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  }
  // BUSCAR CLIENTES
  function imprimirStatus(status) {
    let template = "";
    switch (status) {
      case "NO CONTACTADO":
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

  function buscar_clientes() {
    funcion = "buscar_clientes";
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
          clientes.sort(compareDatesDesc);
          dataTable.clear().rows.add(clientes).draw();
        }
      }
    );
  }
  // agregar lead
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

  // Event listeners para los cambios en el select y el input
  $("#cliente-search, #filter-proyecto").on("change keyup", filtrarProyectos);
  function filtrarProyectos() {
    console.log(clientesList);
    const nombreProyecto = $("#filter-proyecto").val();
    const nombreCliente = $("#cliente-search").val().toLowerCase();
    console.log(nombreProyecto, nombreCliente);

    const clientes = clientesList.filter((cliente) => {
      if (
        nombreProyecto !== "Todos" &&
        cliente.proyecto_id !== nombreProyecto
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

    dataTable.clear().rows.add(clientes).draw();
  }
  // Función auxiliar para verificar si el nombre y apellido coinciden con el filtro
  function contienenombreCliente(cliente, nombreCliente) {
    const nombreCompleto =
      `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
    return nombreCompleto.includes(nombreCliente);
  }

  function llenarFiltros() {
    let template = "";
    template += `<option value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
    llenar_modal_lead();
  }
  function llenar_modal_lead() {
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#proyecto-lead").html(template);
  }
  // filter cliente
  $("#cliente-search").on("keyup", function () {
    var nombre = $(this).val();
    console.log(clientesList);
    console.log(nombre);
    if (nombre !== "") {
      const result = clientesList.filter(function (persona) {
        var nombreCompleto = (
          persona.nombres +
          " " +
          persona.apellidos
        ).toLowerCase();
        return nombreCompleto.includes(nombre);
      });

      dataTable.clear().rows.add(result).draw();
    } else {
      dataTable.clear().rows.add(clientesList).draw();
    }
  });

  $("#modal-lead").click(() => {
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 10);
  });
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
          }
        }
      );
    } else {
      alert("Debe seleccionar un proyecto");
    }
  });

  // asignar clientes
  $(document).on("change", ".cliente-checkbox", function () {
    var clientesSeleccionados = $(".cliente-checkbox:checked").length;
    console.log(clientesSeleccionados);
    // Utiliza la variable "clientesSeleccionados" para asignarlos a un asesor u otras acciones que desees realizar.
  });

  // SHOW MODAL asigned

  $(".main-datatable").on("click", "#asignedClient", async function () {
    let id_cliente = $(this).attr("keyClient");

    idCliente = id_cliente;
    try {
      const asesores = await buscar_asesores(id_cliente);
      console.log(asesores);
      // let template;
      let template = `<option value="" selected></option>`;
      let asesoresAsigned = [];
      asesores.forEach((asesor) => {
        let option = `<option value=${asesor.id}>${asesor.nombreAsesor}</option>`;
        if (asesor.asignado_usuario === "Asignado") {
          asesoresAsigned.push(asesor);
          option = `<option value=${asesor.id} disabled>${asesor.nombreAsesor}</option>`;
        }
        template += option;
      });
      datatablesAsesores.clear().rows.add(asesoresAsigned).draw();

      $(".users_proyect").html(template);
      $(".users_proyect").select2({
        allowClear: true,
        placeholder: "Selecciona un asesor",
        data: [],
      });

      const result = clientesList.find((elemento) => elemento.id === idCliente);

      $("#nombre_user").html(
        result.nombres +
          " " +
          (result.apellidos !== "" && result.apellidos !== null
            ? result.apellidos
            : "")
      );

      $("#asigned_asesores").removeClass("md-hidden");
      setTimeout(function () {
        $("#asigned_asesores .form-create").addClass("modal-show");
      }, 10);
    } catch (error) {
      alert("No hay asesores registrados");
      console.log(error);
    }
  });
  $("#update-asigned-form").click(() => {
    funcion = "add_user_cliente";
    let asesor = $("#asesor-user").val();
    const id = idCliente;

    console.log(asesor);
    console.log(idCliente);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, asesor, id },
      (response) => {
        console.log(response);
        if (response.trim() == "add-user-cliente") {
          alert("Se asigno cliente al asesor");
          $("#asigned_asesores").addClass("md-hidden");
          setTimeout(function () {
            $("#asigned_asesores .form-create").removeClass("modal-show");
          }, 10);
          buscar_clientes();
        } else {
          alert("No se asigno, contacta al administrador");
        }
      }
    );
  });

  // FIN DE MODAL ASIGNES
  $(".form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $(".modal-create").addClass("md-hidden");
  });

  $("#cancel-form").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $(".modal-create").addClass("md-hidden");
  });
  // fin de presentation modal
});
