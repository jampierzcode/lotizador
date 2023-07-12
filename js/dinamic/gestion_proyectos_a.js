$(document).ready(function () {
  var funcion = "";
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
          return `<span class="mode mode_on">${data.status}</span>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <a target="_blank" href="lotizador?id=${data.id}" class="btnLotes"> Ver lotes </a>
          <button target="_blank" keyProyect="https://lotizador.mccompany.pe/views/Lotizador/Clientes/?proyect=${data.id}" id="rutaEnlace" class="btnLotes"> Copiar Link </button>
          
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
  buscar_proyectos();
  function buscar_proyectos() {
    funcion = "buscar_proyectos_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        let template = "";
        if (response.trim() == "no-register") {
          template += "<td>No hay registros</td>";
        } else {
          const proyectos = JSON.parse(response);
          dataTable.clear().rows.add(proyectos).draw();
        }
      }
    );
  }
  $(document).on("click", "#rutaEnlace", function (event) {
    event.preventDefault(); // Evita la acción de navegación predeterminada

    // Copiar la ruta al portapapeles
    var ruta = $(this).attr("keyProyect");
    navigator.clipboard
      .writeText(ruta)
      .then(function () {
        // alert("La ruta se ha copiado al portapapeles.");
        $("#rutaEnlace").text("Copiado!");
        $("#rutaEnlace").addClass("success");
        setTimeout(function () {
          $("#rutaEnlace").text("Copiar Link");
          $("#rutaEnlace").removeClass("success");
        }, 3000);
      })
      .catch(function (error) {
        console.error("Error al copiar la ruta: ", error);
      });
  });
});
