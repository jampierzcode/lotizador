$(document).ready(function () {
  proyectosArray = [];
  var lotesArray;
  var id_proyecto = "";
  var dataTableInstance; // Variable para almacenar la instancia de DataTables
  var dataTable = $("#proyectosList").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],

    columns: [
      { data: "id" },
      { data: "nombreProyecto" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <a target="_blank" href="../../${data.imgUrl}">
          <ion-icon name="cloud-done-outline"></ion-icon> Ver
          archivo
          </a>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          if (data.users !== null) {
            let template = "";
            for (const user of data.users) {
              let split_name = user.clienteNombre.split(" ");
              let split_lastname = user.clienteApellido
                ? user.clienteApellido.split(" ")
                : "  ";
              let splitA = split_name[0][0];
              let splitB = split_lastname[0][0];
              if (user.asignado_proyecto == "Asignado") {
                template += `<span class="mode mode_done">${splitA}${splitB}</span>`;
              }
            }
            if (template === "") {
              template += `<span class="mode mode_process">no asigned</span>`;
            }
            return template;
          } else {
            return `<span class="mode mode_off">sin asignar</span>`;
          }
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<span class="mode mode_on">${data.status}</span>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return data.creadorNombre + " " + data.creadorApellido;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
            <a target="_blank" href="lotizador?id=${data.id}" class="btnLotes"> Ver lotes </a>
            <button class="btnLotes default"><ion-icon id=${data.id} name="create-outline"></ion-icon></button>
            <a target="_blank" class="btnJsvm default" key="${data.id}" href="./schemalotizador.php?proyect=${data.id}">PDF <ion-icon name="document-text-outline"></ion-icon></a>
            <div class="dropdown">
            <button class="btnJsvm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <ion-icon aria-label="Favorite" aria-hidden="true" name="ellipsis-vertical-outline"></ion-icon>
            </button>
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" href="#" id="asigned_user" key_proyect=${data.id}>+ Asignar usuario</button></li>
              <li><button class="dropdown-item" href="#" id="manager_lotes" key_proyect=${data.id} name="${data.nombreProyecto}">Administrar Lotes</button></li>
              <li><button class="dropdown-item" href="#" key_proyect=${data.id} id="remove-proyect"><ion-icon name="trash-outline"></ion-icon> Eliminar Proyecto</button></li>
            </ul>
          </div>
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
  var dataTableUsers = $("#usersASigneds").DataTable({
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
        <p>${data.clienteNombre} ${data.clienteApellido}</p>
        `;
        },
      },
      { data: "asignado_proyecto" },
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
              <li><button class="dropdown-item" id="no-asigned_user" key_user=${data.id}>- Quitar usuario</button></li>
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
  var dataTableLotes = $("#managerLotesList").DataTable({
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
      { data: "numero" },
      { data: "mz_zona" },
      { data: "ancho" },
      { data: "largo" },
      { data: "area" },
      { data: "precio" },
      { data: "estado" },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button key_lote="${data.id}" id="editLote" type="button" class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-2 dark:focus:ring-yellow-900"><ion-icon name="create"></ion-icon></button>
          
          <button id="saveLote" keyLote=${data.id} type="button" style="display: none;" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
          
          <button id="cancelLote" type="button" style="display: none;" class="p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>

          <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><ion-icon name="trash"></ion-icon></button>

          </div>

          `;
        },
      },
    ],
  });
  $(document).on("click", "#editLote", function () {
    var row = $(this).closest("tr");
    console.log(row);
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"
    var originalValues = [];
    cells.each(function (index) {
      if (index === 6) {
        // Índice 4 corresponde al campo "estado"
        var currentValue = $(this).text().trim();
        var selectOptions = [
          "DISPONIBLE",
          "SEPARADO",
          "OCUPADO",
          "SIN PUBLICAR",
        ];
        var selectHTML = `<select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        `;
        for (var i = 0; i < selectOptions.length; i++) {
          var option = selectOptions[i];
          var selected = option === currentValue ? "selected" : "";
          selectHTML += "<option " + selected + ">" + option + "</option>";
        }
        selectHTML += "</select>";
        originalValues.push(currentValue);
        $(this).html(selectHTML);
      } else {
        var text = $(this).text();
        $(this).html(`
        <input value="${text}" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  
        `);
        originalValues.push(text);
      }
    });

    // Alternar la visibilidad de los botones "Editar" y "Guardar"
    row.find("#editLote").hide();
    row.find("#saveLote").show();
    row.find("#cancelLote").show();

    // Guardar los valores originales para el botón "Cancelar"
    row.data("originalValues", originalValues);

    let id_lote = $(this).attr("key_lote");
    console.log(id_lote);
    const result = lotesArray.find((e) => e.id === id_lote);
    console.log(result);
  });
  // Cuando se hace clic en el botón "Cancelar"
  $(document).on("click", "#cancelLote", function () {
    var row = $(this).closest("tr");
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"
    var originalValues = row.data("originalValues");
    console.log(originalValues);

    cells.each(function (index) {
      var originalValue = originalValues[index];
      $(this).text(originalValue);
    });

    // Alternar la visibilidad de los botones "Editar", "Guardar" y "Cancelar"
    row.find("#editLote").show();
    row.find("#saveLote").hide();
    row.find("#cancelLote").hide();
  });

  // Cuando se hace clic en el botón "Guardar"
  $(document).on("click", "#saveLote", function () {
    var idLote = $(this).attr("keyLote");
    var row = $(this).closest("tr");
    var cells = row.find("td:not(:last-child)"); // Excluir la última celda de "Acciones"

    var data = {};
    cells.each(function (index) {
      if (index === 6) {
        // Índice 4 corresponde al campo "estado"
        var selectedValue = $(this).find("select").val();
        data["estado"] = selectedValue;
        // $(this).text(selectedValue);
      } else {
        var fieldName = [
          "numero",
          "mz_zona",
          "ancho",
          "largo",
          "area",
          "precio",
        ][index];
        var inputValue = $(this).find("input").val();
        data[fieldName] = inputValue;
        // $(this).text(inputValue);
      }
    });
    data.id = idLote;
    console.log(data);

    // Realizar la petición POST para guardar los cambios en la base de datos
    let funcion = "editar_lote_info";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, data: JSON.stringify(data) },
      (response) => {
        console.log(response);
        if (response.trim() === "edit-sucess") {
          cells.each(function (index) {
            if (index === 6) {
              // Índice 4 corresponde al campo "estado"
              var selectedValue = $(this).find("select").val();
              $(this).text(selectedValue);
            } else {
              var inputValue = $(this).find("input").val();
              $(this).text(inputValue);
            }
          });
          row.find("#editLote").show();
          row.find("#saveLote").hide();
          row.find("#cancelLote").hide();
        } else {
          alert("No se pudo actualizar, contacta al administrador");
        }
      }
    );

    // Alternar la visibilidad de los botones "Editar", "Guardar" y "Cancelar"
    // row.find("#editLote").show();
    // row.find("#saveLote").hide();
    // row.find("#cancelLote").hide();
  });

  function buscar_lotes(id_proyecto) {
    let funcion = "buscar_lotes_by_proyecto";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]); // Resolvemos la promesa con un array vacío
          } else {
            const proyectos = JSON.parse(response);
            resolve(proyectos); // Resolvemos la promesa con los datos obtenidos
          }
        }
      ).fail((error) => {
        reject(error); // En caso de error, rechazamos la promesa con el error
      });
    });
  }

  $(document).on("click", "#manager_lotes", async function () {
    id_proyecto = $(this).attr("key_proyect");
    let nombre = $(this).attr("name");
    $("#nombre_proyecto_lotes").html(nombre);
    // console.log(id_proyecto);
    try {
      const lotes = await buscar_lotes(id_proyecto);
      lotesArray = lotes;
      if (lotes.length > 0) {
        $("#modal-manager-lotes").removeClass("md-hidden");
        setTimeout(function () {
          $("#modal-manager-lotes .form-create").addClass("modal-show");
        }, 10);
        dataTableLotes.clear().rows.add(lotes).draw();
      } else {
        alert("Aun no hay lotes registrados");
      }
    } catch (error) {
      console.error("Error al buscar lotes:", error);
      // Manejo de errores aquí
    }
  });
  function buscar_user_proyect(id_proyecto) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_user_proyect";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyecto },
        (response) => {
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const users = JSON.parse(response);
            resolve(users);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }

  buscar_proyectos();
  function buscar_proyectos() {
    let funcion = "buscar_proyectos";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      async (response) => {
        let template = "";
        if (response.trim() == "no-register") {
          template += "<td>No hay registros</td>";
        } else {
          const proyectos = JSON.parse(response);
          const promesas = proyectos.map((pro) => {
            return buscar_user_proyect(pro.id).then((result) => {
              pro.users = result;
              return pro;
            });
          });
          const proyectosActualizados = await Promise.all(promesas);
          proyectosArray = proyectosActualizados;
          dataTable.clear().rows.add(proyectosArray).draw();
        }
      }
    );
  }
  // fin de funcion de editar campos de modal
  function buscar_admin() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_usuarios_admin";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() == "no-users-admin") {
            alert("No hay usuarios admin para asignar");
            resolve(null);
          } else {
            const users = JSON.parse(response);
            resolve(users);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
  }

  //  asigned proyectos
  $(document).on("click", "#asigned_user", async function () {
    let id_proyect = $(this).attr("key_proyect");
    id_proyecto = id_proyect;
    console.log(id_proyect);
    const result = proyectosArray.find(
      (elemento) => elemento.id === id_proyect
    );
    try {
      const usuarios = await buscar_user_proyect(id_proyect);
      console.log(usuarios);
      let template = `<option value="" selected></option>`;
      let usuariosAsigned = [];
      usuarios.forEach((user) => {
        let option = `<option value=${user.id}>${user.clienteNombre} ${user.clienteApellido}</option>`;
        if (user.asignado_proyecto === "Asignado") {
          usuariosAsigned.push(user);
          option = `<option value=${user.id} disabled>${user.clienteNombre} ${user.clienteApellido}</option>`;
        }
        template += option;
      });
      dataTableUsers.clear().rows.add(usuariosAsigned).draw();

      $(".users_proyect").html(template);
      $(".users_proyect").select2({
        allowClear: true,
        placeholder: "Selecciona un usuario",
      });

      $("#nombre_proyecto").html(result.nombreProyecto);
      $("#modal-asigned").removeClass("md-hidden");
      setTimeout(function () {
        $("#modal-asigned .form-create").addClass("modal-show");
      }, 10);
    } catch (error) {
      console.log(error);
    }
  });
  $(document).on("click", "#no-asigned_user", function () {
    if (confirm("¿Estás seguro de quitar usuario de proyecto?")) {
      let funcion = "removed_asigned_user";
      let id_usuario = $(this).attr("key_user");
      console.log(id_proyecto, id_usuario);
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_usuario, id_proyecto },
        async (response) => {
          if (response.trim() == "remove-asigned") {
            alert("Se removio correctamente la asignacion del usuario");
            buscar_proyectos();

            const usuarios = await buscar_user_proyect(id_proyecto);
            console.log(usuarios);
            let template = `<option value="" selected></option>`;
            let usuariosAsigned = [];
            usuarios.forEach((user) => {
              let option = `<option value=${user.id}>${user.clienteNombre} ${user.clienteApellido}</option>`;
              if (user.asignado_proyecto === "Asignado") {
                usuariosAsigned.push(user);
                option = `<option value=${user.id} disabled>${user.clienteNombre} ${user.clienteApellido}</option>`;
              }
              template += option;
            });
            dataTableUsers.clear().rows.add(usuariosAsigned).draw();

            $(".users_proyect").html(template);
            $(".users_proyect").select2({
              allowClear: true,
              placeholder: "Selecciona un usuario",
            });
          } else {
            alert("Hubo un error inesperado" + response);
          }
        }
      );
    } else {
      // Aquí puedes realizar la acción correspondiente si el usuario cancela
      alert("Acción cancelada");
    }
  });
  $(document).on("click", "#remove-proyect", function () {
    if (confirm("¿Estás seguro de eliminar este proyecto?")) {
      let funcion = "removed_proyecto";
      let id_proyect = $(this).attr("key_proyect");
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_proyect },
        async (response) => {
          if (response.trim() == "delete-proyect") {
            alert(
              "Se removio correctamente el proyecto, lotes y usuarios asignados"
            );
            buscar_proyectos();
          } else {
            alert("Hubo un error inesperado" + response);
          }
        }
      );
      // Aquí puedes realizar la acción correspondiente si el usuario confirma
      alert("Acción confirmada");
    } else {
      // Aquí puedes realizar la acción correspondiente si el usuario cancela
      alert("Acción cancelada");
    }
  });

  $("#update-asigned-form").click(() => {
    let funcion = "asigned_user_proyecto";
    const user = $("#user-proyect").val();
    console.log(user);
    if (user !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          user: Number(user),
          id_proyecto: Number(id_proyecto),
        },
        (response) => {
          console.log(response);
          if (response.trim() === "user-asigned") {
            setTimeout(function () {
              $("#modal-asigned .form-create").removeClass("modal-show");
            }, 10);
            $("#modal-asigned").addClass("md-hidden");
            buscar_proyectos();
          } else {
            console.log("error");
          }
        }
      );
    } else {
      alert("Por lo menos deberia escribir un nombre para el usuario");
    }
  });
  $("#modal-asigned .close-modal").click(() => {
    setTimeout(function () {
      $("#user-form-edit .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-asigned").addClass("md-hidden");
  });
  // EDIT LOTES MODAL
  $("#modal-manager-lotes .close-modal").click(() => {
    setTimeout(function () {
      $("#modal-manager-lotes .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-manager-lotes").addClass("md-hidden");
  });
  // -------

  $("#cancel-form-asigned").click(() => {
    setTimeout(function () {
      $("#modal-asigned .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-asigned").addClass("md-hidden");
  });
});
