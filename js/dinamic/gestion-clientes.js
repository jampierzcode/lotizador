$(document).ready(function () {
  var funcion = "";
  var clientesList;
  var asesoresList;
  var idCliente;
  var proyectosList;
  var selectedCount = 0;
  // lista de clientes seleccionados
  var selectClientes;
  buscar_clientes();
  var dataTable = $("#usuariosList").DataTable({
    // select: true,
    stateSave: false,
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
    // scrollCollapse: true,
    // paging: false,
    fixedColumns: {
      leftColumns: 3,
    },

    columns: [
      { data: "id" },
      // { data: "id" },
      { data: "nombres" },
      { data: "apellidos" },
      {
        data: "created_cliente",
      },
      { data: "correo" },
      { data: "celular" },
      // { data: "telefono" },
      // { data: "origen" },
      // { data: "ciudad" },
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
          let template_status = imprimirStatus(data?.status);
          return template_status;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
          <div class="flex-actions">
          <button target="_blank" keyClient="${data?.id}" id="asignedClient" class="btnJsvm default"><ion-icon name="add-circle-sharp"></ion-icon></button>
          <button target="_blank" keyClient="${data?.id}" id="editClient" class="btnJsvm normal"><ion-icon name="create-sharp"></ion-icon></button>
           
          <button target="_blank" keyClient="${data?.id}" id="historialCliente" class="btnJsvm normal">Historial</button>
           
          </div>

          `;
        },
      },
    ],
    order: [],
    // columnDefs: [{ orderable: false, targets: 0 }],
    // columnDefs: [{ checkboxes: { selectRow: true }, targets: 0 }],
    columnDefs: [
      {
        targets: 0,
        checkboxes: {
          selectRow: true,
        },
      },
    ],
    select: {
      style: "multi",
    },
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
          <button target="_blank" keyAsesor="${data?.id}" id="deleteAsesor" class="btnJsvm danger"><ion-icon name="trash"></ion-icon></button>
          

          `;
        },
      },
    ],
    order: false,
    bLengthChange: false,
    dom: '<"top">ct<"top"p><"clear">',
  });
  // busca a todos los asesores
  fetchasesores();
  function fetchasesores() {
    let funcion = "buscar_asesores";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        if (response.trim() === "no-register") {
          return;
        } else {
          const asesores = JSON.parse(response);
          asesoresList = asesores;
          pintar_results_asesores(asesoresList);
        }
      }
    );
  }
  function pintar_results_asesores(asesores) {
    let template = `<option value="" selected></option>`;
    asesores.forEach((asesor) => {
      let option = `<option value=${asesor.id_usuario}>${asesor.nombre} ${asesor.apellido}</option>`;

      template += option;
    });

    $("#asesor-user-multi").html(template);
    $("#asesor-user-multi").select2({
      allowClear: true,
      placeholder: "Selecciona un asesor",
      data: [],
    });
  }

  // buscar asesores con id cliente asignado
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
  function compareDatesDesc(a, b) {
    return dayjs(b.created_cliente).diff(dayjs(a.created_cliente));
  }
  // BUSCAR CLIENTES
  function imprimirStatus(status) {
    let template = "";
    switch (status) {
      case "NO CONTACTADO":
        template += `<span class="target_tab warning">${status}</span>`;
        break;

      case "CONTACTADO":
        template += `<span class="target_tab info flex items-center gap-2">CONTACTANDO <div role="status">
        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div></span>`;

        break;
      case "NO RESPONDIO":
        template += `<span class="target_tab warning">${status}</span>`;

        break;
      case "VISITA":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "ASISTIO":
        template += `<span class="target_tab success">${status} a la visita</span>`;

        break;
      case "NO ASISTIO":
        template += `<span class="target_tab danger">${status}</span>`;

        break;
      case "REPROGRAMACION CONTACTO":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "REPROGRAMACION VISITA":
        template += `<span class="target_tab info">${status}</span>`;

        break;
      case "SEPARACION":
        template += `<span class="target_tab success">${status}</span>`;

        break;
      case "VENTA":
        template += `<span style="display: flex; gap: 10px; align-items: center" class="target_tab success"> 
        <img style="width: 20px;" src="../../img/corona.png" alt=""> ${status}</span>`;

        break;

      default:
        break;
    }
    return template;
  }
  const compareDates = (a, b) => {
    // Parsear las fechas con el formato "dd/mm/yyyy"
    const [dayA, monthA, yearA] = a.fecha.split("/");
    const [dayB, monthB, yearB] = b.fecha.split("/");

    // Crear las instancias de Date con el formato "YYYY-MM-DD"
    const dateA = new Date(`${yearA}-${monthA}-${dayA} ${a.hora}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB} ${b.hora}`);

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  };
  // delete asigneed asesor

  $(document).on("click", "#deleteAsesor", function () {
    const id_asesor = $(this).attr("keyAsesor");
    console.log(idCliente);
    let funcion = "removed_asigned_asesor";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente: idCliente, usuario: id_asesor },
      async (response) => {
        console.log(response);
        if (response.trim() === "remove-asigned") {
          alert("se elimino correctamente al asesor");
          const asesores = await buscar_asesores(id_cliente);
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

          const result = clientesList.find(
            (elemento) => elemento.id === idCliente
          );

          $("#nombre_user").html(
            result.nombres +
              " " +
              (result.apellidos !== "" && result.apellidos !== null
                ? result.apellidos
                : "")
          );
          buscar_clientes();
        } else {
          alert("Hubo un error, contacta al administrador");
        }
      }
    );
  });

  // fin de delete asigneed asesor

  // editar lead
  $(document).on("click", "#editClient", function () {
    // console.log(e);
    // console.log("hola");
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#editar-lead #proyecto-lead").html(template);
    $("#editar-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#editar-lead .form-create").addClass("modal-show");
    }, 10);
    const id_cliente = $(this).attr("keyClient");
    idCliente = id_cliente;
    const clienteResult = clientesList.filter(
      (elemento) => elemento.id === id_cliente
    );
    console.log(id_cliente, clienteResult);

    $("#editar-lead #nombre-lead").val(clienteResult[0].nombres);
    $("#editar-lead #apellido-lead").val(clienteResult[0].apellidos);
    $("#editar-lead #documento-lead").val(clienteResult[0].documento);
    $("#editar-lead #celular-lead").val(clienteResult[0].celular);
    $("#editar-lead #telefono-lead").val(clienteResult[0].telefono);
    $("#editar-lead #origen-lead").val(clienteResult[0].origen);
    $("#editar-lead #ciudad-lead").val(clienteResult[0].ciudad);
    $("#editar-lead #pais-lead").val(clienteResult[0].Pais);
    $("#editar-lead #campania-lead").val(clienteResult[0].campania);
    $("#editar-lead #email-lead").val(clienteResult[0].correo);

    $("#editar-lead #proyecto-lead").val(clienteResult[0].proyecto_id);
  });
  $("#editar-lead #editLead").submit((e) => {
    e.preventDefault();
    let nombre = $("#editar-lead #nombre-lead").val();
    let apellido = $("#editar-lead #apellido-lead").val();
    let documento = $("#editar-lead #documento-lead").val();
    let celular = $("#editar-lead #celular-lead").val();
    let telefono = $("#editar-lead #telefono-lead").val();
    let origen = $("#editar-lead #origen-lead").val();
    let ciudad = $("#editar-lead #ciudad-lead").val();
    let pais = $("#editar-lead #pais-lead").val();
    let campania = $("#editar-lead #campania-lead").val();
    let correo = $("#editar-lead #email-lead").val();
    let proyecto_id = $("#editar-lead #proyecto-lead").val();
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
    };
    console.log(result);
    if (proyecto_id !== "0") {
      let funcion = "edit_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id, cliente: idCliente },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          console.log(data);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            alert(data.error);
          } else {
            alert("Se edito correctamente al cliente");
            setTimeout(function () {
              $("#editar-lead .form-create").removeClass("modal-show");
            }, 1000);
            $("#editar-lead").addClass("md-hidden");
            buscar_clientes();

            $("#editar-lead #nombre-lead").val("");
            $("#editar-lead #apellido-lead").val("");
            $("#editar-lead #documento-lead").val("");
            $("#editar-lead #celular-lead").val("");
            $("#editar-lead #telefono-lead").val("");
            $("#editar-lead #origen-lead").val("");
            $("#editar-lead #ciudad-lead").val("");
            $("#editar-lead #pais-lead").val("");
            $("#editar-lead #campania-lead").val("");
            $("#editar-lead #email-lead").val("");
          }
        }
      );
    }
  });
  // fin de editar lead
  // show modal de historial de cliente
  $(document).on("click", "#historialCliente", function () {
    let cliente = $(this).attr("keyClient");
    idCliente = cliente;
    let funcion = "buscar_historial_seguimiento";
    buscarHistorial(funcion, cliente);
  });
  function buscarHistorial(funcion, cliente) {
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, cliente },
      (response) => {
        console.log(response);
        if (response.trim() === "no-data") {
          alert("no hay registro alguno, porfavor cree uno");
        } else {
          const historial = JSON.parse(response);
          console.log(historial);
          const sortedData = historial.sort(compareDates);
          console.log(historial);
          console.log(sortedData);
          let template = "";
          sortedData.forEach((history) => {
            template += `
          <li class="mb-10 ml-4">
          <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">${
            history.fecha + " " + history.hora
          }</time>
                          <h3 class="flex items-center gap-4 text-lg font-semibold text-gray-900 dark:text-white">Estado Registrado: ${imprimirStatus(
                            history.status
                          )}</h3>
                          <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">${
                            history.observacion !== null
                              ? history.observacion
                              : "Sin observaciones"
                          }</p>
                          </li>
                          `;
          });
          $("#list-historial").html(template);
          $("#historial-event").removeClass("md-hidden");
          setTimeout(function () {
            $("#historial-event .form-create").addClass("modal-show");
          }, 10);
        }
      }
    );
  }

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
          clientes.sort(compareDatesDesc);
          filtrarProyectos();
        }
      }
    );
  }
  // agregar lead
  buscar_proyectos();
  async function buscar_proyectos() {
    funcion = "buscar_proyectos_agentes";
    const response = await $.post("../../controlador/UsuarioController.php", {
      funcion,
    });
    const proyectos = JSON.parse(response);
    proyectosList = proyectos;

    llenarFiltros();
  }

  // Event listeners para los cambios en el select y el input
  $("#cliente-search, #filter-proyecto, #filter-selected").on(
    "change keyup",
    filtrarProyectos
  );
  function filtrarProyectos() {
    console.log(clientesList);
    const selected = $("#filter-selected").val();
    const nombreProyecto = $("#filter-proyecto").val();
    const nombreCliente = $("#cliente-search").val().toLowerCase();
    console.log(nombreProyecto, nombreCliente, selected);

    const clientes = clientesList.filter((cliente) => {
      // si, asignado true
      //si, no asignado false
      // no, asignado false
      // no, no asignado true
      if (selected === "SI" && cliente.asignado_usuario === "No asignado") {
        console.log(cliente.nombre_proyecto);
        return false;
      }
      if (selected === "NO" && cliente.asignado_usuario !== "No asignado") {
        console.log(cliente.nombre_proyecto);
        return false;
      }
      if (
        nombreProyecto !== "Todos" &&
        cliente.proyecto_id !== nombreProyecto
      ) {
        console.log(cliente.nombre_proyecto);
        return false;
      }
      if (
        nombreCliente !== "" &&
        !contienenombreCliente(cliente, nombreCliente)
      ) {
        console.log(nombreCliente);
        return false;
      }
      return true;
    });

    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(clientes).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTable.page.info();
    var totalPaginas = pageInfo.pages;
    console.log(totalPaginas);
    if (estadoActual.page < totalPaginas) {
      console.log(estadoActual.page);
      dataTable.page(estadoActual.page);
    } else {
      dataTable.clear().draw();

      // Agregar las nuevas filas
      dataTable.rows.add(clientes).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }

    // Restaurar la posición de scroll horizontal
    $("#usuariosList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  // Función auxiliar para verificar si el nombre y apellido coinciden con el filtro
  function contienenombreCliente(cliente, nombreCliente) {
    const nombreCompleto =
      `${cliente.nombres} ${cliente.apellidos}`.toLowerCase();
    return nombreCompleto.includes(nombreCliente);
  }
  // $("#usuariosList").on("click", ".dt-checkboxes", function () {
  //   console.log("check no check");
  //   if ($(this).prop("checked")) {
  //     selectedCount++;
  //   } else {
  //     selectedCount--;
  //   }

  //   // Actualiza el conteo en el elemento HTML
  //   $("#seleccionadosCount").text(selectedCount);
  // });
  // $("#menu-button-acciones").on("click", function () {
  //   var rows_selected = dataTable.column(0).checkboxes.selected();
  //   $.each(rows_selected, function (key, clienteId) {
  //     console.log(clienteId);
  //   });
  // });
  $(document).on("click", function () {
    var $expandAcciones = $("#expand-acciones");
    var $mostrarBoton = $("#menu-button-acciones");

    // Verifica si el clic no ocurrió en el botón ni en el elemento
    if (
      !$mostrarBoton.is(event.target) &&
      !$mostrarBoton.has(event.target).length &&
      !$expandAcciones.is(event.target) &&
      !$expandAcciones.has(event.target).length
    ) {
      // Si no tiene la clase "hidden", la agrega
      if (!$expandAcciones.hasClass("hidden")) {
        $mostrarBoton.attr("aria-expanded", "false");
        menu_acciones.style.transformOrigin = "left top";
        menu_acciones.style.opacity = "1";
        menu_acciones.style.transition =
          "transform 300ms ease-out, opacity 300ms ease-out";
        menu_acciones.style.transform = "scale(0)";
        menu_acciones.style.opacity = "0";
        setTimeout(function () {
          menu_acciones.classList.add("hidden");
        }, 300);
      }
    }
  });
  button_acciones.addEventListener("click", function () {
    let bolCount = 0;
    var expanded =
      button_acciones.getAttribute("aria-expanded") === "true" || false;
    button_acciones.setAttribute("aria-expanded", !expanded);
    var rows_selected = dataTable.column(0).checkboxes.selected();
    // console.log(rows_selected.length);
    let arrayClientes = [];
    $.each(rows_selected, function (key, clienteId) {
      const cliente = clientesList.find((e) => e.id === clienteId);
      arrayClientes.push(cliente);
      if (cliente.asignado_usuario !== "No asignado") {
        bolCount = bolCount + 1;
      }
    });
    selectClientes = arrayClientes;
    console.log(bolCount);
    if (bolCount > 0) {
      $("#asigned_usuarios_actions").attr("active", "false");
      $("#asigned_usuarios_actions").removeClass("cursor-pointer");
      $("#asigned_usuarios_actions").removeClass("hover:bg-slate-200");
      $("#asigned_usuarios_actions").removeClass("text-gray-700");
      $("#asigned_usuarios_actions").addClass("text-gray-200");
      $("#asigned_usuarios_actions").addClass("hover:bg-slate-100");
    } else {
      $("#asigned_usuarios_actions").attr("active", "true");
      $("#asigned_usuarios_actions").addClass("cursor-pointer");
      $("#asigned_usuarios_actions").addClass("hover:bg-slate-200");
      $("#asigned_usuarios_actions").addClass("text-gray-700");
      $("#asigned_usuarios_actions").removeClass("text-gray-200");
      $("#asigned_usuarios_actions").removeClass("hover:bg-slate-100");
    }

    if (!expanded) {
      menu_acciones.style.transformOrigin = "left top";
      menu_acciones.style.transform = "scale(0)";
      menu_acciones.style.opacity = "0";
      setTimeout(function () {
        menu_acciones.style.transition =
          "transform 300ms ease-out, opacity 300ms ease-out";
        menu_acciones.style.transform = "scale(1)";
        menu_acciones.style.opacity = "1";
      }, 0);
      menu_acciones.classList.remove("hidden");
    } else {
      menu_acciones.style.transformOrigin = "left top";
      menu_acciones.style.opacity = "1";
      menu_acciones.style.transition =
        "transform 300ms ease-out, opacity 300ms ease-out";
      menu_acciones.style.transform = "scale(0)";
      menu_acciones.style.opacity = "0";
      setTimeout(function () {
        menu_acciones.classList.add("hidden");
      }, 300);
    }
  });
  // asignar varios clientes a un asesor
  $("#asigned_usuarios_actions").click(function () {
    let active = $(this).attr("active");
    console.log(active);
    if (active === "true") {
      var rows_selected = dataTable.column(0).checkboxes.selected();
      if (rows_selected.length > 0) {
        $("#asigned_asesores_multiclient").removeClass("md-hidden");
        setTimeout(function () {
          $("#asigned_asesores_multiclient .form-create").addClass(
            "modal-show"
          );
        }, 10);
      } else {
        alert("aun no ha seleccionado ningun cliente");
      }
    } else {
      alert("Algunos clientes cuentan con asignacion, revisar selecciones");
    }
  });
  $("#asesor-asigned-multiclient").click(function () {
    let funcion = "add_user_cliente";
    let asesor = $("#asesor-user-multi").val();
    console.log(asesor);
    console.log(selectClientes);
    selectClientes.forEach((cliente) => {
      $.post(
        "../../controlador/UsuarioController.php",
        {
          funcion,
          asesor,
          id: cliente.id,
        },
        (response) => {
          console.log(response);
        }
      );
    });
    alert("Se asignaron todos los clientes");
    $("#asesor-user-multi").val(null).trigger("change");

    $(".modal-create").addClass("md-hidden");

    buscar_clientes();
  });
  // fin de asignar varios clientes a un asesor

  function llenarFiltros() {
    let template = "";
    template += `<option value="Todos">Todos</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#filter-proyecto").html(template);
    llenar_modal_lead();
  }
  function llenar_modal_lead() {
    let template = "";
    template += `<option value="0">Seleccione un proyecto</option>`;
    // console.log(proyectosList);
    proyectosList.forEach((proyecto) => {
      template += `<option value="${proyecto.id}">${proyecto.nombreProyecto}</option>`;
    });
    $("#proyecto-lead").html(template);
  }
  // filter cliente
  $("#cliente-search").on("keyup", function () {
    var nombre = $(this).val();
    console.log(clientesList);
    console.log(nombre);
    if (nombre !== "") {
      const result = clientesList.filter(function (persona) {
        var nombreCompleto = (
          persona.nombres +
          " " +
          persona.apellidos
        ).toLowerCase();
        return nombreCompleto.includes(nombre);
      });

      dataTable.clear().rows.add(result).draw();
    } else {
      dataTable.clear().rows.add(clientesList).draw();
    }
  });

  $("#modal-lead").click(() => {
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(function () {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 10);
  });
  $("#crear-lead .close-modal").click(function () {
    $("#crear-lead .form-create").removeClass("modal-show");
    setTimeout(function () {
      $("#crear-lead").addClass("md-hidden");
    }, 300);
  });
  $("#registerLead").submit((e) => {
    e.preventDefault();
    let nombre = $("#nombre-lead").val();
    let apellido = $("#apellido-lead").val();
    let documento = $("#documento-lead").val();
    let celular = $("#celular-lead").val();
    let telefono = $("#telefono-lead").val();
    let origen = $("#origen-lead").val();
    let ciudad = $("#ciudad-lead").val();
    let pais = $("#pais-lead").val();
    let campania = $("#campania-lead").val();
    let correo = $("#email-lead").val();
    let proyecto_id = $("#proyecto-lead").val();
    const result = {
      nombre: nombre,
      apellido: apellido,
      documento: documento,
      correo: correo,
      celular: celular,
      telefono: telefono,
      Pais: pais,
      origen: origen,
      campaña: campania,
      ciudad: ciudad,
    };
    console.log(result);
    if (proyecto_id !== "0") {
      let funcion = "add_cliente";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id },
        (response) => {
          console.log(response);
          const data = JSON.parse(response);
          console.log(data);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            alert(data.error);
          } else {
            funcion = "add_user_cliente_asesor";
            alert("se subio correctamente el cliente");
            let id = data.id;
            setTimeout(function () {
              $("#crear-lead .form-create").removeClass("modal-show");
            }, 1000);
            $("#crear-lead").addClass("md-hidden");
            buscar_clientes();
            $("#nombre-lead").val("");
            $("#apellido-lead").val("");
            $("#documento-lead").val("");
            $("#celular-lead").val("");
            $("#telefono-lead").val("");
            $("#origen-lead").val("");
            $("#ciudad-lead").val("");
            $("#pais-lead").val("");
            $("#campania-lead").val("");
            $("#email-lead").val("");
            $("#proyecto-lead").val("");
          }
        }
      );
    } else {
      alert("Debe seleccionar un proyecto");
    }
  });

  // asignar clientes
  $("#usuariosList tbody").on("click", ".cliente-checkbox", function () {
    var clientesSeleccionados = $(".cliente-checkbox:checked");
    console.log(clientesSeleccionados);
    var row = $(this).closest("tr");
    row.toggleClass("seleccion", $(this).checked);
    // Utiliza la variable "clientesSeleccionados" para asignarlos a un asesor u otras acciones que desees realizar.
  });
  $(document).on("click", "#checkAllClient", function () {
    if ($(this).is(":checked")) {
      $(".cliente-checkbox").prop("checked", true);
      var row = $(".cliente-checkbox").closest("tr");
      row.toggleClass("seleccion", $(".cliente-checkbox").checked);
    } else {
      $(".cliente-checkbox").prop("checked", false);
    }
    // Utiliza la variable "clientesSeleccionados" para asignarlos a un asesor u otras acciones que desees realizar.
  });

  // SHOW MODAL asigned

  $(".main-datatable").on("click", "#asignedClient", async function () {
    let id_cliente = $(this).attr("keyClient");

    idCliente = id_cliente;
    try {
      const asesores = await buscar_asesores(id_cliente);
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
  $();

  // FIN DE MODAL ASIGNES
  $("#historial-event .form-create .close-modal").click(() => {
    $("#historial-event").addClass("md-hidden");
    setTimeout(function () {
      $("#historial-event .form-create").removeClass("modal-show");
    }, 10);
  });
  $("#asigned_asesores .form-create .close-modal").click(() => {
    $("#tipo-documento-modal").val(0);
    $("#documento-modal").val("");
    $("#documento-modal").attr("disabled", "true");
    $("#nombres-modal").val("");
    $(".modal-create").addClass("md-hidden");
  });
  // FIN DE MODAL multi ASIGNES
  $("#asigned_asesores_multiclient .form-create .close-modal").click(() => {
    $("#asesor-user-multi").val(null).trigger("change");

    $(".modal-create").addClass("md-hidden");
  });

  // fin de presentation modal
});
