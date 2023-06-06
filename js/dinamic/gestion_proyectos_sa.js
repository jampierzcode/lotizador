$(document).ready(function () {
  proyectosArray = [];
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
              template += `<span class="mode mode_done">${splitA}${splitB}</span>`;
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
          <div class="dropdown">
          <button class="btnJsvm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <ion-icon aria-label="Favorite" aria-hidden="true" name="ellipsis-vertical-outline"></ion-icon>
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" href="#"id="asigned_user" key_proyect=${data.id}>+ Asigar usuario</button></li>
            <li><button class="dropdown-item" href="#"><ion-icon key_hab=${data.id} id="remove-hab" name="trash-outline"></ion-icon> Eliminar Proyecto</button></li>
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

  //  EDIT proyectos
  $(document).on("click", "#asigned_user", function () {
    let id_proyect = $(this).attr("key_proyect");
    id_proyecto = id_proyect;
    console.log(id_proyect);
    const result = proyectosArray.find(
      (elemento) => elemento.id === id_proyect
    );
    $("#nombre_proyecto").html(result.nombreProyecto);
    $("#modal-asigned").removeClass("md-hidden");
    setTimeout(function () {
      $("#modal-asigned .form-create").addClass("modal-show");
    }, 10);
    buscar_admin()
      .then((usuarios) => {
        let template = "";
        if (usuarios !== null) {
          usuarios.forEach((user) => {
            template += `
        <option value=${user.id_usuario}>${user.nombre} ${user.apellido}</option>
        `;
          });
        } else {
          template += `
        <option value="0">No existen usuarios</option>
        `;
        }
        $(".users_proyect").html(template);
        $(".users_proyect").select2({
          allowClear: true,
          placeholder: "Seleciona un usuario",
        });
      })
      .catch((error) => {
        // Manejar errores en caso de que ocurran
        return error;
      });
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

  $("#cancel-form-asigned").click(() => {
    setTimeout(function () {
      $("#modal-asigned .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-asigned").addClass("md-hidden");
  });
});
