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
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
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

  // BUSCAR CLIENTES
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
          dataTable.clear().rows.add(clientes).draw();
        }
      }
    );
  }
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
