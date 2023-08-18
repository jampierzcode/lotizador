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
          <button target="_blank" keyProyect="https://lotizador.mcsolucionesti.com/views/Lotizador/Clientes/?proyect=${data.id}" id="rutaEnlace" class="btnLotes"> Copiar Link </button>
          <button id="manager_lotes" key_proyect=${data.id} name="${data.nombreProyecto} type="button" class="p-2 whitespace-nowrap text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Administrar Lotes</button>
<a target="_blank" class="btnJsvm default" key="${data.id}" href="./schemalotizador.php?proyect=${data.id}">PDF <ion-icon name="document-text-outline"></ion-icon></a>
                
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
  // EDIT LOTES MODAL
  $("#modal-manager-lotes .close-modal").click(() => {
    setTimeout(function () {
      $("#modal-manager-lotes .form-create").removeClass("modal-show");
    }, 10);
    $("#modal-manager-lotes").addClass("md-hidden");
  });
  // ---------
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
