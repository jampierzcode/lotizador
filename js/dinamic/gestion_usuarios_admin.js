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
      { data: "phone_number" },
      {
        data: null,
        render: function (data, type, row) {
          if (data.status == "1") {
            let template = "";
            template = `<span class="mode mode_done">activo</span>`;
            return template;
          } else {
            return `<span class="mode mode_off">sin asignar</span>`;
          }
        },
      },
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
            <li><button id="asigned_proyect" class="dropdown-item" href="#" key_asesor=${data.id_usuario}>+ Asigar a proyectos</button></li>
             <li><button class="dropdown-item" keyUsuario=${data.id_usuario} id="remove-usuario"><ion-icon name="trash-outline"></ion-icon> Eliminar Usuario</button></li>
            </ul>
        </div>
          </div>`;
        },
      },
    ],
  });

  // ELIMINAR USUARIO
  $(document).on("click", "#remove-usuario", function () {
    let id_usuario = $(this).attr("keyUsuario");
    console.log(id_usuario);
    idCliente = id_usuario;
    $("#confirm-delete-usuario").removeClass("hidden");
  });
  $("#cancel-modal-confirm").click(() => {
    $("#confirm-delete-usuario").addClass("hidden");
  });
  $("#cancel-delete-response").click(() => {
    $("#confirm-delete-usuario").addClass("hidden");
  });

  $("#confirm-delete-response").click(() => {
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
          $("#confirm-delete-usuario").addClass("hidden");
          buscar_usuarios();
        } else {
          console.log("error");
        }
      }
    );
  });
  // ---------

  buscar_usuarios();

  // BUSCAR CLIENTES
  function buscar_usuarios() {
    funcion = "buscar_usuarios_asesores";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() == "no-users-asesor") {
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
  // buscar proeyectos
  function buscar_proyectos(id_cliente) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_user";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id_cliente },
        (response) => {
          console.log(response);
          if (response.trim() == "no-register") {
            resolve(null);
          } else {
            const proyects = JSON.parse(response);
            resolve(proyects);
          }
        }
      ).fail((error) => {
        reject(error);
      });
    });
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
    funcion = "add_user_asesor";
    let documento = $("#documento-modal").val();
    let nombres = $("#nombres-modal").val();
    let apellidos = $("#apellidos-modal").val();
    let correo = $("#correo-modal").val();
    let phone = $("#phone-modal").val();
    let username = $("#username-modal").val();
    let password = $("#password-modal").val();
    if (nombres !== "undefined" && nombres && phone && username && password) {
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
            phone,
            username,
            password,
          },
          (response) => {
            console.log(response);
            if (response.trim() !== "") {
              buscar_usuarios();
              $("#documento-modal").val("");
              $("#nombres-modal").val("");
              $("#apellidos-modal").val("");
              $("#correo-modal").val("");
              $("#username-modal").val("");
              $("#password-modal").val("");
              $(".modal-create").addClass("md-hidden");
              alert("Se creo el usuario asesor");

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
      if (phone == "") {
        template += `Falta llenar el numero de telefono para link \n`;
      }
      alert(template);
    }
  });
  var datatablesProyects = $("#proyectsAsigned").DataTable({
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
        <p>${data.nombreProyecto}</p>
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
  $(document).on("click", "#no-asigned_user", function () {
    let proyecto = $(this).attr("key_proyect");
    let funcion = "removed_asigned_user";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_usuario: idCliente, id_proyecto: proyecto },
      async (response) => {
        if (response.trim() === "remove-asigned") {
          alert("se quito la asignacion a este proyecto");
          const proyectos = await buscar_proyectos(idCliente);
          console.log(proyectos);
          let template;
          // let template = `<option value="" selected></option>`;
          let proyectsAsigned = [];
          proyectos.forEach((proyect) => {
            let option = `<option value=${proyect.id}>${proyect.nombreProyecto}</option>`;
            if (proyect.asignado_usuario === "Asignado") {
              proyectsAsigned.push(proyect);
              option = `<option value=${proyect.id} disabled>${proyect.nombreProyecto}</option>`;
            }
            template += option;
          });
          datatablesProyects.clear().rows.add(proyectsAsigned).draw();

          $(".users_proyect").html(template);
        } else {
          alert("Ocurrioi un error contacta al administrador");
          console.log(response);
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
    $("#phone-modal-edit").val(result.phone_number);
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
    const user_phone = $("#phone-modal-edit").val();
    const data_user = {
      user_documento: Number(user_documento),
      user_nombres,
      user_apellidos,
      user_correo,
      user_phone,
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

  // ASIGNAR PROYECTOS
  $(document).on("click", "#asigned_proyect", async function () {
    let id_cliente = $(this).attr("key_asesor");
    idCliente = id_cliente;
    console.log(id_cliente);
    const result = usuariosArray.find(
      (elemento) => elemento.id_usuario === id_cliente
    );
    console.log(result);
    //
    try {
      const proyectos = await buscar_proyectos(id_cliente);
      console.log(proyectos);
      let template;
      // let template = `<option value="" selected></option>`;
      let proyectsAsigned = [];
      proyectos.forEach((proyect) => {
        let option = `<option value=${proyect.id}>${proyect.nombreProyecto}</option>`;
        if (proyect.asignado_usuario === "Asignado") {
          proyectsAsigned.push(proyect);
          option = `<option value=${proyect.id} disabled>${proyect.nombreProyecto}</option>`;
        }
        template += option;
      });
      datatablesProyects.clear().rows.add(proyectsAsigned).draw();

      $(".users_proyect").html(template);
      $(".users_proyect").select2({
        allowClear: true,
        placeholder: "Selecciona un Proyecto",
      });

      $("#nombre_user").html(
        result.nombre +
          " " +
          (result.apellido !== "" && result.apellido !== null
            ? result.apellido
            : "")
      );
      $("#modal-asigned").removeClass("md-hidden");
      setTimeout(function () {
        $("#modal-asigned .form-create").addClass("modal-show");
      }, 10);
    } catch (error) {
      console.log(error);
    }
    //
    $("#asigned_proyects").removeClass("md-hidden");
    setTimeout(function () {
      $("#asigned_proyects .form-create").addClass("modal-show");
    }, 10);
  });
  $("#update-asigned-form").click(() => {
    funcion = "add_user_proyect";
    let proyectos = $("#proyect-user").val();
    const id = idCliente;

    console.log(proyectos);
    console.log(idCliente);
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, proyectos, id },
      (response) => {
        console.log(response);
        if (response.trim() == "add-user-proyects") {
          alert("Se asigno proyectos al usuarios");
          $("#asigned_proyects").addClass("md-hidden");
          setTimeout(function () {
            $("#asigned_proyects .form-create").removeClass("modal-show");
          }, 10);
        } else {
          alert("No se asigno, contacta al administrador");
        }
      }
    );
  });

  // SHOW MODAL CREATE
  $("#create-clients").click(() => {
    $("#crear-users").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-users .form-create").addClass("modal-show");
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
    $(".modal-create .form-create").removeClass("modal-show");
    setTimeout(function () {
      $(".modal-create").addClass("md-hidden");
    }, 300);
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
    $("#modal-edit-user .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#modal-edit-user").addClass("md-hidden");
    }, 300);
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
