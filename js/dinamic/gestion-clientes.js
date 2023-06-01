$(document).ready(function () {
  var funcion = "";
  buscar_clientes();

  // BUSCAR CLIENTES
  function buscar_clientes() {
    funcion = "buscar_clientes";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() == "no-register-clientes") {
          template += "No hay registros de clientes";
        } else {
          const clientes = JSON.parse(response);
          clientes.forEach((cliente) => {
            template += `
                <div class="card-product">
                <p class="campo_tabla">${cliente.nombres}
                </p>
                <p class="campo_tabla">${cliente.tipo_documento}</p>
                <p class="campo_tabla">${cliente.documento}</p>
                <div class="actions-button-clientes">
                    <button class="btn-edit" id="edit_cliente">
                        <ion-icon key_client="${cliente.id_cliente}" name="pencil-sharp"></ion-icon>
                    </button>
                    <button class="btn-remove" id="remove_cliente">
                        <ion-icon key_client="${cliente.id_cliente}" name="trash-sharp"></ion-icon>
                    </button>
                </div>
            </div>
                `;
          });
        }
        $("#clientes-body-table").html(template);
      }
    );
  }
  //   CREATE CLIENTES
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
          const clientes = JSON.parse(response);
          console.log(clientes);
          if (tipo_documento == 1) {
            $("#nombres-modal").val(`${clientes.nombre}`);
          } else {
            $("#nombres-modal").val(`${clientes.razonSocial}`);
          }
        }
      );
    }
  });

  $("#add-cliente-form").click(() => {
    funcion = "add_cliente";
    let tipo_documento = $("#tipo-documento-modal").val();
    let documento = $("#documento-modal").val();
    let nombres = $("#nombres-modal").val();
    if (tipo_documento > 0 && documento && nombres) {
      let cen = 0;
      if (tipo_documento == 1) {
        if (documento.length != 8) {
          // DNI
          alert(
            "La cantidad de digitos para el DNI son incorrectos, DNI de 8 digitos"
          );
        } else {
          cen = 1;
        }
      } else {
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
          "../../controlador/UsuarioController.php",
          { funcion, tipo_documento, documento, nombres },
          (response) => {
            if (response.trim() == "add-cliente") {
              alert("Cliente agregado correctamente");
              buscar_clientes();
              $("#documento-modal").val("");
              $("#nombres-modal").val("");
            } else {
              if (response.trim() == "Existe el cliente") {
                alert(
                  "El cliente ya esta registrado en la base de datos, puede eliminarlo o editarlo para luego agregarlo"
                );
              } else {
                alert(
                  "No se pudo agregar el cliente, revise conexi[on o consulte a tecnico encargado"
                );
              }
            }
          }
        );
      }
    } else {
      let template = "";
      if (tipo_documento == 0) {
        template += `Falta seleccionar el tipo de documento \n`;
      }
      if (documento.length == 0) {
        template += `Falta llenar el campo del numero de documento \n`;
      }
      if (nombres.length == 0) {
        template += `Falta llenar el campo de nombres \n`;
      }
      alert(template);
    }
  });

  // REMOVE PRODUCTOS
  $(document).on(
    "click",
    ".actions-button-clientes .btn-remove#remove_cliente",
    (e) => {
      funcion = "borrar_cliente";
      let id_cliente = $(e.target).attr("key_client");
      console.log(id_cliente);
      var sentencia = confirm(`Desea eliminar al cliente?`);
      if (sentencia == true) {
        $.post(
          "../../controlador/UsuarioController.php",
          { funcion, id_cliente },
          (response) => {
            console.log(response);
            if (response.trim() == "remove-cliente") {
              alert("Cliente borrado correctamente");
              buscar_clientes();
            } else {
              alert(
                "No se pudo eliminar el producto, revise conexion a internet o llamar a tecnico encargado"
              );
            }
          }
        );
      }
    }
  );
  //  EDIT CLIENTES
  $(document).on(
    "click",
    ".actions-button-clientes .btn-edit#edit_cliente",
    (e) => {
      $("#modal-edit-cliente").removeClass("md-hidden");
      funcion = "buscar_cliente_id";
      let id_cliente = $(e.target).attr("key_client");
      // $.post(
      //   "../../controlador/UsuarioController.php",
      //   { funcion, id_producto },
      //   (response) => {
      //     const producto = JSON.parse(response);
      //     producto.forEach((element) => {
      //       $("#modal-edit-product").attr(
      //         "key_producto",
      //         `${element.id_productos}`
      //       );
      //       $("#modal-edit-product #producto-nombre").val(`${element.nombre}`);
      //       $("#modal-edit-product #producto-precio").val(`${element.precio}`);
      //       $("#modal-edit-product #producto-inventario").val(
      //         `${element.inventario}`
      //       );
      //     });
      //   }
      // );
    }
  );
  $(document).on("click", "#update-producto-form", (e) => {
    funcion = "edit_producto";
    let id_producto = $("#modal-edit-product").attr("key_producto");
    let nombre = $("#modal-edit-product #producto-nombre").val();
    let precio = $("#modal-edit-product #producto-precio").val();
    let inventario = $("#modal-edit-product #producto-inventario").val();
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_producto, nombre, precio, inventario },
      (response) => {
        if (response.trim() == "update-producto") {
          buscar_productos();
          alert("Producto actualizado correctamente");
          $("#modal-edit-product").addClass("md-hidden");

          $("#modal-edit-product #producto-nombre").val("");
          $("#modal-edit-product #producto-precio").val("");
          $("#modal-edit-product #producto-inventario").val("");
        } else {
          alert(
            "No se pudo actualizar el producto, revise conexion a internet"
          );
        }
      }
    );
  });

  // SHOW MODAL CREATE
  $("#create-clients").click(() => {
    $(".modal-create").removeClass("md-hidden");
  });
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
