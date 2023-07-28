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
          return `
          <div class="flex-actions">
          <button target="_blank" keyClient="${data?.id}" id="asignedClient" class="btnJsvm default"><ion-icon name="add-circle-sharp"></ion-icon></button>
          <button target="_blank" keyClient="${data?.id}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
          <button target="_blank" keyClient="${data?.id}" id="deleteClient" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
          
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
  function buscar_clientes() {
    funcion = "buscar_clientes";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
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
