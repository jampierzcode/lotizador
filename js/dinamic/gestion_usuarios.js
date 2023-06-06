$(document).ready(function () {
  var funcion = "";
  var usuariosArray = [];
  var selectedValues = [];
  var idCliente = "";
  var dataTable = $("#usuariosList").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
    columns: [
      { data: "id_usuario" },
      {
        data: null,
        render: function (data, type, row) {
          return data.nombre + " " + data.apellido;
        },
      },
      { data: "user" },
      { data: "dni" },
      { data: "correo" },
      { data: "creator" },
      // { data: 'office' }
      {
        data: null,
        render: function (data, type, row) {
          return `
        <div class="flex-actions">
        <button  key_user="${data.id_usuario}" class="btnLotes default" id="edit_usuario">
        <ion-icon name="create-outline"></ion-icon>
        </button>
        <div class="dropdown">
        <button class="btnJsvm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <ion-icon aria-label="Favorite" aria-hidden="true" name="ellipsis-vertical-outline"></ion-icon>
        </button>
        <ul class="dropdown-menu">
          <li><button class="dropdown-item" href="#" key_proyect=${data.id_usuario}>+ Asigar agentes</button></li>
          <li><button class="dropdown-item" href="#"><ion-icon key_hab=${data.id_usuario} id="remove-hab" name="trash-outline"></ion-icon> Eliminar Usuario</button></li>
        </ul>
      </div>
        </div>`;
        },
      },
    ],
  });

  buscar_usuarios();

  // BUSCAR CLIENTES
  function buscar_usuarios() {
    funcion = "buscar_usuarios_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() == "no-users-admin") {
          template += "No hay registros de clientes";
        } else {
          const result = JSON.parse(response);
          const usuarios = result.reverse();
          usuariosArray = usuarios;
          dataTable.clear().rows.add(usuarios).draw();
        }
      }
    );
  }
  function buscar_servicios() {
    let funcion = "buscar_servicios";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() === "no-services") {
          template += "No hay registros";
        } else {
          const permisos = JSON.parse(response);
          permisos.forEach((permiso) => {
            template += `
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${permiso.id}" id="check-${permiso.nombre}">
            <label class="form-check-label" for="check-${permiso.nombre}">
                ${permiso.nombre}
            </label>
        </div>
            `;
          });
          $("#listPermisos").html(template);
        }
      }
    );
  }
  //   CREATE usuarios
  $("#tipo-documento-modal").change(() => {
    if ($("#tipo-documento-modal").val() > 0) {
      $("#documento-modal").attr("disabled", false);
    } else {
      $("#documento-modal").attr("disabled", "true");
    }
    $("#documento-modal").val("");
  });

  $("#search-client").click(() => {
    let cen = 0;
    let tipo_documento = $("#tipo-documento-modal").val();
    let documento = $("#documento-modal").val();
    if (tipo_documento == 1) {
      var funcion = "dni";
      if (documento.length != 8) {
        alert(
          "La cantidad de digitos para el DNI son incorrectos, DNI de 8 digitos"
        );
      } else {
        cen = 1;
      }
    } else {
      var funcion = "ruc";
      if (documento.length != 11) {
        alert(
          "La cantidad de digitos para el RUC son incorrectos, RUC de 11 digitos"
        );
      } else {
        cen = 1;
      }
    }
    if (cen == 1) {
      $.post(
        "../../components/consultas_api.php",
        { funcion, documento },
        (response) => {
          console.log(response);
          const clientes = JSON.parse(response);
          console.log(clientes);
          if (tipo_documento == 1) {
            $("#nombres-modal").val(`${clientes.nombres}`);
            $("#apellidos-modal").val(
              `${clientes.apellidoPaterno} ${clientes.apellidoMaterno}`
            );
          } else {
            $("#nombres-modal").val(`${clientes.razonSocial}`);
          }
        }
      );
    }
  });
  // Detectar cambio en las etiquetas checkbox
  $(document).on("change", 'input[type="checkbox"]', function () {
    var value = $(this).val(); // Obtener el valor de la casilla seleccionada

    if ($(this).is(":checked")) {
      // Agregar el valor al array si la casilla se selecciona
      selectedValues.push(value);
    } else {
      // Remover el valor del array si la casilla se deselecciona
      var index = selectedValues.indexOf(value);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }
  });

  $("#add-user-form").click(() => {
    funcion = "add_user";
    let documento = $("#documento-modal").val();
    let nombres = $("#nombres-modal").val();
    let apellidos = $("#apellidos-modal").val();
    let correo = $("#correo-modal").val();
    let username = $("#username-modal").val();
    let password = $("#password-modal").val();
    let permisos = selectedValues;
    if (nombres !== "undefined" && nombres && username && password) {
      let cen = 1;
      if (cen == 1) {
        $.post(
          "../../controlador/UsuarioController.php",
          {
            funcion,
            documento,
            nombres,
            apellidos,
            correo,
            username,
            password,
          },
          (response) => {
            console.log(response);
            if (response.trim() !== "") {
              // alert("Cliente agregado correctamente");
              if (permisos.length > 0) {
                let funcion = "registar_servicios";
                $.post(
                  "../../controlador/UsuarioController.php",
                  { funcion, permisos, id: response },
                  (response) => {
                    console.log(response);
                  }
                );
              }

              buscar_usuarios();
              $("#documento-modal").val("");
              $("#nombres-modal").val("");
              $("#apellidos-modal").val("");
              $("#correo-modal").val("");
              $("#username-modal").val("");
              $("#password-modal").val("");
              $(".modal-create").addClass("md-hidden");

              //   $("#documento-modal").val("");
              //   $("#nombres-modal").val("");
            } else {
              if (response.trim() == "Existe el usuario") {
                alert(
                  "El usuario ya esta registrado en la base de datos, puede eliminarlo o editarlo para luego agregarlo"
                );
              } else {
                alert(
                  "No se pudo agregar el usuario, revise conexion o consulte a tecnico encargado"
                );
                console.log(response);
              }
            }
          }
        );
      }
    } else {
      let template = "";
      if (nombres == "") {
        template += `Falta llenar el nombre \n`;
      }
      if (username == "") {
        template += `Falta llenar el userame para Login \n`;
      }
      if (password == "") {
        template += `Falta llenar el password para Login \n`;
      }
      alert(template);
    }
  });

  // REMOVE PRODUCTOS
  $(document).on("click", "#remove_usuario", function () {
    let id_cliente = $(this).attr("key_user");
    idCliente = id_cliente;
    console.log(id_cliente);
    $(".confirm-popup").removeClass("md-hidden");
    setTimeout(function () {
      $(".confirm-popup .formConfirm").addClass("modal-show");
    }, 10);
  });

  $("#cancelConfirm").click(() => {
    setTimeout(function () {
      $(".confirm-popup .formConfirm").removeClass("modal-show");
    }, 10);
    $(".confirm-popup").addClass("md-hidden");
  });
  $("#okConfirm").click(() => {
    let funcion = "delete_user";
    $.post(
      "../../controlador/UsuarioController.php",
      {
        funcion,
        id: Number(idCliente),
      },
      (response) => {
        console.log(response);
        if (response.trim() === "delete-usuario") {
          setTimeout(function () {
            $(".confirm-popup .formConfirm").removeClass("modal-show");
          }, 10);
          $(".confirm-popup").addClass("md-hidden");
          buscar_usuarios();
        } else {
          console.log("error");
        }
      }
    );
  });

  //   //  EDIT CLIENTES
  $(document).on("click", "#edit_usuario", function () {
    let id_cliente = $(this).attr("key_user");
    idCliente = id_cliente;
    console.log(id_cliente);
    const result = usuariosArray.find(
      (elemento) => elemento.id_usuario === id_cliente
    );
    console.log(result);
    $("#documento-modal-edit").val(result.dni == 0 ? "" : result.dni);
    $("#nombres-modal-edit").val(result.nombre);
    $("#apellidos-modal-edit").val(result.apellido);
    $("#correo-modal-edit").val(result.correo);
    $("#modal-edit-user").removeClass("md-hidden");
    setTimeout(function () {
      $("#modal-edit-user .form-create").addClass("modal-show");
    }, 10);
  });
  $("#user-form-edit").click(() => {
    let funcion = "update_user";
    const user_documento = $("#documento-modal-edit").val();
    const user_nombres = $("#nombres-modal-edit").val();
    const user_apellidos = $("#apellidos-modal-edit").val();
    const user_correo = $("#correo-modal-edit").val();
    const data_user = {
      user_documento: Number(user_documento),
      user_nombres,
      user_apellidos,
      user_correo,
      id: Number(idCliente),
    };
    if (user_nombres !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          data_user,
        },
        (response) => {
          console.log(response);
          if (response.trim() === "update-usuario") {
            setTimeout(function () {
              $("#modal-edit-user .form-create").removeClass("modal-show");
            }, 10);
            $("#modal-edit-user").addClass("md-hidden");
            buscar_usuarios();
          } else {
            console.log("error");
          }
        }
      );
    } else {
      alert("Por lo menos deberia escribir un nombre para el usuario");
    }
  });

  // SHOW MODAL CREATE
  $("#create-clients").click(() => {
    buscar_servicios();
    $(".modal-create").removeClass("md-hidden");
    setTimeout(function () {
      $(".modal-create .form-create").addClass("modal-show");
    }, 10);
  });
  $(".form-create .close-modal").click(() => {
    $("#documento-modal").attr("disabled", "true");
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    setTimeout(function () {
      $(".modal-create .form-create").removeClass("modal-show");
    }, 10);
    $(".modal-create").addClass("md-hidden");
  });

  $("#cancel-form").click(() => {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    setTimeout(function () {
      $(".modal-create .form-create").removeClass("modal-show");
    }, 10);
    $(".modal-create").addClass("md-hidden");
  });

  // modal edit

  $("#modal-edit-user .close-modal").click(() => {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    setTimeout(function () {
      $("#modal-edit-user .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-edit-user").addClass("md-hidden");
  });

  $("#cancel-form-edit").click(() => {
    $("#documento-modal").val("");
    $("#nombres-modal").val("");
    $("#apellidos-modal").val("");
    $("#correo-modal").val("");
    $("#username-modal").val("");
    $("#password-modal").val("");
    setTimeout(function () {
      $("#modal-edit-user .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-edit-user").addClass("md-hidden");
  });

  // fin de presentation modal
});
