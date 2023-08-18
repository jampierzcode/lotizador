$(document).ready(function () {
  var funcion = "";
  var listMsg;
  var dataTable = $("#msgList").DataTable({
    pageLength: 5,
    aoColumnDefs: [
      {
        bSortable: false,
        aTargets: ["nosort"],
      },
    ],

    columns: [
      { data: "id" },
      { data: "nombre" },
      { data: "mensaje" },
      // {
      //   data: null,
      //   render: function (data, type, row) {
      //     return `
      //     <a target="_blank" href="../../${data.imgUrl}">
      //     <ion-icon name="cloud-done-outline"></ion-icon> Ver
      //     archivo
      //     </a>`;
      //   },
      // },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <div class="flex-actions">
             <button target="_blank" keyProyect="https://lotizador.mcsolucionesti.com/views/Lotizador/Clientes/?proyect=${data.id}" id="rutaEnlace" class="btnLotes"> Send Msj </button>
              
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
  $("#message-plantilla").on("keyup", function () {
    let value = $(this).val();

    $("#preview-insert-text").text(value);
    console.log(value);
  });
  buscar_msg();
  function buscar_msg() {
    let funcion = "buscar_msg_template";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        $("#spin-load").html("");
        const msg = JSON.parse(response);
        listMsg = msg;
        dataTable.clear().rows.add(msg).draw();
      }
    );
  }

  $(document).on("click", "#emojiList li", function () {
    let emoji = $(this).html();
    console.log(emoji);
    let text = $("#message-plantilla").val();
    let prevText = $("#preview-insert-text").text();
    text = text + emoji;
    $("#message-plantilla").val(text);
    prevText = prevText + emoji;
    $("#preview-insert-text").text(prevText);
    $("#emojiSelector").toggleClass("hidden");
  });
  $("#active-created").click(function () {
    $("#crear-plantilla").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-plantilla .form-create").addClass("modal-show");
    }, 10);
  });
  $("#created-submit-msj").click(function () {
    let funcion = "register-msg";
    let nombre = $("#name-message").val();
    let msg = $("message-plantilla").val();

    if (nombre !== "") {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, nombre, msg },
        (response) => {
          console.log(response);
          if (response.trim() === "add-msg") {
            $("#name-message").val("");
            $("#message-plantilla").val("");
            buscar_msg();
          } else {
            alert("Hubo un error, conatcta al administrador");
          }
        }
      );
    } else {
      alert("Te faltan llenar los campos del formulario");
    }
  });
  $("#crear-plantilla .close-modal").click(function () {
    $("#crear-plantilla").addClass("md-hidden");
  });
});
