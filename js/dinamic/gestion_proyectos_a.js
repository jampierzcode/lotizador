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
});
