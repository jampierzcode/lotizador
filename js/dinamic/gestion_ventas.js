$(document).ready(async function () {
  var ventasList;
  var proyectosList = [];
  var clientesList = [];
  var turno;
  var lotesList = [];
  var cartItems = [];
  var cronograma_pagos = [];
  var dataTable = $("#ventasList").DataTable({
    // select: true,
    stateSave: false,
    lengthMenu: [5, 10, 25, 50],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "No se encontraron resultados",
      info: "Total _TOTAL_ registros, mostrando _START_ a _END_",
      infoEmpty: "No hay registros disponibles",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      search: "Busqueda avanzada",
      paginate: {
        first: "|<",
        last: ">|",
        next: ">",
        previous: "<",
      },
      select: true,
      footerCallback: function (row, data, start, end, display) {
        var api = this.api();
        $(api.column(0).footer()).html(
          "Seleccionados: " + api.rows({ selected: true }).count()
        );
      },
    },
    pageLength: 5,
    scrollX: true,
    // scrollCollapse: true,
    // paging: false,

    columns: [
      {
        data: null,
        render: function (data) {
          return `${data?.nombre_cliente} <br/> ${data?.apellido_cliente}`;
        },
      },
      {
        data: null,
        render: function (data) {
          return `${data?.nombre_proyecto}`;
        },
      },
      { data: "fecha" },
      {
        data: null,
        render: function (data) {
          if (data.tipo_venta === "VENTA") {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold bg-[#310ecd]">VENTA</p>
            `;
          } else {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-black inline-block rounded-full font-bold bg-yellow-400">SEPARACION</p>
            `;
          }
        },
      },
      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.total * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.tipo_pago === "0") {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd]">AL CONTADO</p>
            `;
          } else {
            return `
          <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd8c]">FINANCIADO</p>
            `;
          }
        },
      },
      // { data: "monto_inicial" },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
          <div class="flex gap-3">
          <button target="_blank" keyVenta="${data?.id}" id="print-venta" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="print" class="text-[15px]"></ion-icon></button>
          
          `;
          if (data.tipo_pago === "1") {
            template += `
          <button target="_blank" keyVenta="${data?.id}" id="print-venta" class="bg-white rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center border border-gray-500"><ion-icon name="calendar" class="text-[15px]"></ion-icon>Cronograma</button>
          `;
          }
          template += `</div>`;
          return template;
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
  });
  $(document).on("click", "#print-venta", function () {
    const url = "ruta/al/pdf.pdf";
    const pdfjsLib = window["pdfjs-dist/build/pdf"];
    let id_venta = $(this).attr("keyVenta");
    console.log(id_venta);
    const products = [
      { descripcion: "Producto 1", cantidad: 2, subtotal: 20 },
      { descripcion: "Producto 2", cantidad: 3, subtotal: 30 },
      { descripcion: "Producto 3", cantidad: 1, subtotal: 10 },
      { descripcion: "Producto 4", cantidad: 5, subtotal: 50 },
      { descripcion: "Producto 5", cantidad: 4, subtotal: 40 },
    ];
    $("#pdf-modal").removeClass("hidden");
    $("#close-pdf-modal").click(function () {
      $("#pdf-modal").addClass("hidden");
    });

    let total = 0;
    $("#pdf-table-body").empty();
    $.each(products, function (index, product) {
      $("#pdf-table-body").append(`
        <tr>
          <td>${product.descripcion}</td>
          <td>${product.cantidad}</td>
          <td>${product.subtotal}</td>
        </tr>
      `);
      total += product.subtotal;
    });
    $("#pdf-total").text(total);
    // Crear el PDF en memoria
    const element = document.getElementById("pdf-table");
    html2pdf()
      .from(element)
      .set({
        margin: 10, // márgenes en orden: arriba, derecha, abajo, izquierda
      })
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        // Mostrar el PDF en el modal
        const pdfDataUri = pdf.output("datauristring");
        console.log(pdfDataUri);
        $("#pdf-content").html(
          `<embed src="${pdfDataUri}" type="application/pdf" width="100%" height="100%" />`
        );
      });
  });
  async function buscar_caja_abierta() {
    let funcion = "buscar_caja_abierta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            add_toast("error", "No haz abierto ninguna caja");
            resolve("no-register");
          } else {
            add_toast("success", "tienes una caja abierta");
            let data = JSON.parse(response);
            console.log(data);
            turno = data[0].id;
            resolve("si-register");
          }
        }
      );
    });
  }

  async function buscar_ventas() {
    let funcion = "buscar_ventas_caja";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          console.log(response);
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
          resolve("exito");
        }
      );
    });
  }
  var apertura = await buscar_caja_abierta();
  console.log(apertura);
  if (apertura === "no-register") {
    $("#aperturar_caja").removeClass("md-hidden");
    setTimeout(() => {
      $("#aperturar_caja .form-create").addClass("modal-show");
    }, 300);
    return;
  }
  function pintar_ventas(ventas) {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };

    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTable.clear().draw(false);

    // Agregar las nuevas filas
    dataTable.rows.add(ventas).draw(false);
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
      // dataTable.rows.add(ventas).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#ventasList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  var ventas_financiero = await buscar_ventas();
  pintar_ventas(ventas_financiero);
  // buscar listas
  function buscar_proyectos() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_proyectos_mi_creator";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            console.log(response);
            reject({ error: response });
          } else {
            let data = JSON.parse(response);
            proyectosList = data;
            resolve(data);
          }
        }
      );
    });
  }
  function buscar_lotes_proyecto(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_lotes";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id },
        (response) => {
          if (response.trim() === "no-register") {
            console.log(response);
            reject({ error: response });
          } else {
            let data = JSON.parse(response);
            lotesList = data;
            console.log(data);
            resolve(data);
          }
        }
      );
    });
  }
  async function buscar_clientes(id) {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_cliente_proyecto";
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, id },
        (response) => {
          if (response.trim() === "no-register") {
            // console.log(response);
            resolve({ error: response });
          } else {
            let data = JSON.parse(response);
            clientesList = data;
            console.log(data);
            resolve(data);
          }
        }
      );
    });
  }
  // pintar listas
  function pintar_proyectos(proyectos) {
    let template = "";
    template += `
    <option></option>
    
    `;
    proyectos.forEach((p) => {
      template += `
      <option value="${p.proyecto_id}">${p.nombre_proyecto}</option>
      `;
    });
    let template2 = "";
    template2 += `
    <option value="0" disabled>Seleccione un proyecto</option>
    
    `;
    proyectos.forEach((p) => {
      template2 += `
      <option value="${p.proyecto_id}">${p.nombre_proyecto}</option>
      `;
    });

    $("#proyectoList").html(template);
    $("#proyecto-lead").html(template2);
    $("#proyecto-lead").val("0");
  }
  function pintar_lotes(lotes) {
    let template = "";
    template += `
    <option></option>
    
    `;
    if (lotes.length > 0) {
      lotes.forEach((l) => {
        template += `
        <option ${l.estado === "DISPONIBLE" ? "" : "disabled"} value="${
          l.id
        }">Lote ${l.numero}, Mz ${l.mz_zona} ${l.estado}</option>
        `;
      });
    }

    $("#lotesList").html(template);
  }
  function pintar_clientes(clientes) {
    let template = "";
    template += `
    <option></option>
    
    `;
    if (clientes.length > 0) {
      clientes.forEach((c) => {
        template += `
        <option value="${c.id_cliente}">${c?.nombres} ${c?.apellidos}</option>
        `;
      });
    }

    $("#clientesList").html(template);
  }
  var proyectos = await buscar_proyectos();
  pintar_proyectos(proyectos);
  $("#lotesList").select2({
    placeholder: "Seleccione un lote",
    allowClear: true,
  });
  $("#proyectoList").select2({
    placeholder: "Seleccione un proyecto",
    allowClear: true,
  });
  $("#clientesList").select2({
    placeholder: "Seleccione un cliente",
    allowClear: true,
  });
  // proyecto eventos
  $("#proyectoList").on("select2:select", async function (e) {
    var data = e.params.data;
    console.log(data);
    var lotes = await buscar_lotes_proyecto(data.id);
    pintar_lotes(lotes);
    var clientes = await buscar_clientes(data.id);
    if (clientes.error) {
      let vacio = [];
      pintar_clientes(vacio);
    } else {
      pintar_clientes(clientes);
    }
    cartItems = [];
    renderCart();
    $("#precio-lote").val("");
  });
  $("#proyectoList").on("select2:unselect", function () {
    let lotes = [];
    pintar_lotes(lotes);
    let clientes = [];
    pintar_clientes(clientes);
    cartItems = [];
    renderCart();
    $("#precio-lote").val("");
  });
  // lotes eventos
  $("#lotesList").on("select2:select", async function (e) {
    var data = e.params.data;
    console.log(data);
    let loteSelect = lotesList.find((l) => l.id === data.id);
    console.log(loteSelect);
    $("#precio-lote").val(loteSelect.precio);
  });
  $("#lotesList").on("select2:unselect", function () {
    $("#precio-lote").val("");
  });
  // tipo venta eventos
  $("#tipoVenta").on("change", function () {
    cartItems = [];
    renderCart();
    cronograma_pagos = [];
    pintar_cronograma(cronograma_pagos);
    const now = dayjs().format("YYYY-MM-DDTHH:mm");
    if ($(this).val() === "SEPARACION") {
      $("#inputFinanciamiento").addClass("hidden");
      $("#container-financiamento").addClass("hidden");
      $("#financiamiento_check").val(false);
      $("#financiamiento_check").prop("checked", false);
      $("#monto_inicial").val("");
      $("#numero_cuotas").val("");
      $("#monto_cuotas").val("");
      $("#fecha_programacion").attr("min", now);
      $("#form_separacion").removeClass("hidden");
    } else {
      $("#form_separacion").addClass("hidden");
      $("#inputFinanciamiento").removeClass("hidden");
      $("#financiamiento_check").val(false);
      $("#financiamiento_check").prop("checked", false);
    }
  });
  // crear lead eventos
  $("#open-lead").on("click", function () {
    let proyecto_seleccionado = $("#proyectoList").val();
    console.log(proyecto_seleccionado);
    if (proyecto_seleccionado !== "") {
      $("#proyecto-lead").val(proyecto_seleccionado);
    }
    $("#crear-lead").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-lead .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-lead .close-modal").on("click", function () {
    $("#nombre-lead").val("");
    $("#apellido-lead").val("");
    $("#documento-lead").val("");
    $("#celular-lead").val("");
    $("#telefono-lead").val("");
    $("#origen-lead").val("0");
    $("#ciudad-lead").val("");
    $("#pais-lead").val("");
    $("#campania-lead").val("");
    $("#email-lead").val("");
    $("#proyecto-lead").val("0");
    $("#crear-lead .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-lead").addClass("md-hidden");
    }, 300);
  });
  // registrar lead
  $("#registerLead").submit((e) => {
    e.preventDefault();
    let fecha_now = dayjs().format("YYYY-MM-DD");
    let hora_now = dayjs().format("HH:mm:ss");
    // return 0;
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
      fecha: fecha_now,
      hora: hora_now,
    };
    if (proyecto_id !== "0" && origen !== "0") {
      let funcion = "add_cliente";
      $("#registrar_lead_btn").prop("disabled", true);
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id },
        async (response) => {
          const data = JSON.parse(response);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            add_toast("error", data.error);
          } else {
            add_toast("success", "se subio correctamente el cliente");
            let id = data.id;
            console.log(id, proyecto_id);
            $("#crear-lead .form-create").removeClass("modal-show");
            setTimeout(function () {
              $("#crear-lead").addClass("md-hidden");
            }, 300);
            let clientes = await buscar_clientes(proyecto_id);
            pintar_clientes(clientes);
            $("#clientesList").val(id).trigger("change");
            $("#proyectoList").val(proyecto_id).trigger("change");
            // resetear form
            $("#nombre-lead").val("");
            $("#apellido-lead").val("");
            $("#documento-lead").val("");
            $("#celular-lead").val("");
            $("#telefono-lead").val("");
            $("#origen-lead").val("0");
            $("#ciudad-lead").val("");
            $("#pais-lead").val("");
            $("#campania-lead").val("");
            $("#email-lead").val("");
            $("#proyecto-lead").val("0");
          }

          $("#registrar_lead_btn").prop("disabled", false);
        }
      );
    } else {
      add_toast("warning", "Debe seleccionar un proyecto y origen");
    }
  });

  $("#new-venta").on("click", function () {
    $("#crear-venta").removeClass("md-hidden");
    setTimeout(() => {
      $("#crear-venta .form-create").addClass("modal-show");
    }, 300);
  });
  $("#crear-venta .close-modal").on("click", function () {
    $("#crear-venta .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#crear-venta").addClass("md-hidden");
    }, 300);
  });
  function renderCart() {
    const cartTable = $("#cart-items");
    cartTable.empty();
    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        const subtotal = item.quantity * item.price;
        const row = `
              <tr>
                  <td class="border text-[14px] px-4 py-2">${index + 1}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.description
                  }</td>
                  <td class="border text-[14px] px-4 py-2">${item.quantity}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.currency
                  } ${Math.round((item.price * 100) / 100).toFixed(2)}</td>
                  <td class="border text-[14px] px-4 py-2">${
                    item.currency
                  } ${Math.round((subtotal * 100) / 100).toFixed(2)}</td>
                  <td class="border text-[14px] px-4 py-2">
                      <button class="text-red-500 hover:text-red-700" id="deleteItem" index-table="${index}"><ion-icon name="trash"></ion-icon></button>
                  </td>
              </tr>
          `;
        cartTable.append(row);
      });
    } else {
      cartTable.html("");
    }
  }

  // Función para agregar un elemento al carrito
  function addItem(id, description, quantity, price, currency) {
    cartItems.push({ id, description, quantity, price, currency });
    renderCart();
  }

  // Función para editar un elemento del carrito
  function editItem(index) {
    const row = $("#cart-items tr").eq(index); // Sumamos 1 para omitir la fila de encabezado
    const item = cartItems[index];

    // Convertir los campos en inputs editables
    row.find("td").each(function (i) {
      if (i > 0 && i < 4) {
        // Excluir el primer y último campo
        let fieldValue = $(this).text();
        if (i === 3) {
          // Campo de Precio
          // const currency = item.currency === "dolar" ? "$" : "S/";
          fieldValue = `<select class="currency-select">
                                  <option value="$" ${
                                    item.currency === "$" ? "selected" : ""
                                  }>$</option>
                                  <option value="S/" ${
                                    item.currency === "S/" ? "selected" : ""
                                  }>S/</option>
                              </select>
                              <input type="number" class="price-input" value="${
                                item.price
                              }">`;
        } else {
          fieldValue = `<input type="text" class="editable-field" value="${fieldValue}">`;
        }
        $(this).html(fieldValue);
      }
    });

    // Agregar botón de guardar
    const saveButton = $(
      `<button class="text-green-500 hover:text-green-700" index-table="${index}" id="saveItemChanges"><ion-icon name="save"></ion-icon></button>`
    );
    row.find("td:last-child").html(saveButton);
  }
  function saveItemChanges(index) {
    const row = $("#cart-items tr").eq(index);
    const item = cartItems[index];

    // Obtener los nuevos valores de los inputs editables
    const description = row.find(".editable-field").eq(0).val();
    const quantity = parseInt(row.find(".editable-field").eq(1).val());
    const currency = row.find(".currency-select").val();
    const price = parseFloat(row.find(".price-input").val());

    // Actualizar el objeto del carrito con los nuevos valores
    item.description = description;
    item.quantity = quantity;
    item.currency = currency;
    item.price = price;

    // Renderizar el carrito nuevamente
    renderCart();
  }
  // Función para eliminar un elemento del carrito
  function deleteItem(index) {
    cartItems.splice(index, 1);
    renderCart();
  }
  $("#cart-productos").on("click", function (e) {
    e.preventDefault();
    console.log(cartItems);
    let idLote = $("#lotesList").val();
    let precio = $("#precio-lote").val();
    let tipo = $("#tipoVenta").val();
    if (cartItems.length === 1) {
      add_toast("warning", "Por lo pronto no puedes vender mas de un lote");
      return;
    }
    if (idLote !== "" && precio !== "" && tipo !== "0") {
      let selectLote = lotesList.find((l) => l.id === idLote);
      let description = `${tipo} de Lote ${selectLote.numero}, Mz: ${
        selectLote.mz_zona
      }${selectLote?.aerea ? ", Area:" + selectLote?.aerea : ""}`;
      addItem(idLote, description, 1, precio, "S/");
    } else {
      add_toast("warning", "Aun no haz seleccionado ningun lote");
    }
  });
  $(document).on("click", "#editItem", function () {
    let index = $(this).attr("index-table");
    editItem(index);
  });
  $(document).on("click", "#deleteItem", function () {
    let index = $(this).attr("index-table");
    deleteItem(index);
  });
  $(document).on("click", "#saveItemChanges", function (e) {
    e.preventDefault();
    let index = $(this).attr("index-table");
    saveItemChanges(index);
  });
  async function registrar_venta(
    fecha,
    hora,
    proyecto_id,
    cliente_id,
    tipo_venta,
    suma,
    tipo_pago,
    monto_inicial,
    monto_separacion,
    fecha_programacion,
    status
  ) {
    console.log(tipo_pago);
    let funcion = "registrar_venta_financiero";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          tipo_pago,
          monto_inicial,
          fecha,
          hora,
          proyecto_id,
          cliente_id,
          tipo_venta,
          suma,
          monto_separacion,
          fecha_programacion,
          status,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function registrar_detalle_venta(cart, venta_id) {
    let funcion = "registrar_detalle_venta";

    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, cart_items: JSON.stringify(cart), venta_id },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function cambiar_estado(cart, tipo_venta) {
    let funcion = "cambiar_estado";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, cart_items: JSON.stringify(cart), tipo_venta },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function registrar_transaccion(
    turno,
    suma,
    metodo_pago,
    venta_id,
    fecha,
    motivo_operacion
  ) {
    let funcion = "registrar_transaccion";

    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        {
          funcion,
          turno,
          suma,
          metodo_pago,
          venta_id,
          fecha,
          motivo_operacion,
        },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  async function registrar_cronograma_pagos(cronograma_pagos, venta_id) {
    let funcion = "registrar_cronograma_pagos";

    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, cronograma: JSON.stringify(cronograma_pagos), venta_id },
        (response) => {
          console.log(response);
          resolve(JSON.parse(response));
        }
      );
    });
  }
  function generarCronograma(fechaActual, cuotas, monto) {
    const cronograma = [];
    let fecha = dayjs(fechaActual);

    for (let i = 0; i < cuotas; i++) {
      fecha = fecha.add(1, "month");
      cronograma.push({
        fecha: fecha.format("YYYY-MM-DD"),
        monto: monto,
        status: "NO PAGADO",
        tipo: "CUOTAS",
      });
    }

    return cronograma;
  }
  function pintar_cronograma(cronograma_pagos) {
    const cartTable = $("#cart-cronograma");
    cartTable.empty();
    if (cronograma_pagos.length > 0) {
      cronograma_pagos.forEach((item, index) => {
        const row = `
              <tr>
                  <td class="border text-[14px] px-4 py-2">${index + 1}</td>
                  <td class="border text-[14px] px-4 py-2">${item.fecha}</td>
                  <td class="border text-[14px] px-4 py-2">${Math.round(
                    (item.monto * 100) / 100
                  ).toFixed(2)}</td>
              </tr>
          `;
        cartTable.append(row);
      });
    } else {
      cartTable.html("");
    }
  }
  $("#generar-cronograma").on("click", function () {
    let monto_inicial = $("#monto_inicial").val();
    let numero_cuotas = $("#numero_cuotas").val();
    let monto_cuotas = $("#monto_cuotas").val();
    if (monto_inicial !== "" && numero_cuotas !== "" && numero_cuotas !== "") {
      const fechaActual = dayjs();

      const cronograma = generarCronograma(
        fechaActual,
        numero_cuotas,
        monto_cuotas
      );
      cronograma_pagos = cronograma;
      pintar_cronograma(cronograma_pagos);
    } else {
      add_toast(
        "warning",
        "Debes llenar los campos de financiamiento para generar el cronograma"
      );
    }
  });
  $("#registrar_venta_btn").on("click", async function () {
    $("#registrar_venta_btn").prop("disabled", true);
    let fecha = dayjs().format("YYYY-MM-DD");
    let hora = dayjs().format("HH:mm:ss");
    let proyecto_id = $("#proyectoList").val();
    let cliente_id = $("#clientesList").val();
    let tipo_venta = $("#tipoVenta").val();
    let suma = 0;
    let metodo_pago = $("#metodo_pago").val();
    cartItems.forEach((c) => {
      suma = suma + c.price;
    });
    let monto_inicial = $("#monto_inicial").val();
    let numero_cuotas = $("#numero_cuotas").val();
    let monto_cuotas = $("#monto_cuotas").val();
    let tipo_pago = $("#financiamiento_check").prop("checked");
    let tipo_pago_separacion =
      $("#tipo_pago_separacion").val() === "AL CONTADO" ? 0 : 1;
    let monto_separacion = $("#monto_separacion").val();
    let fecha_programacion = $("#fecha_programacion").val();
    let splitfecha = fecha_programacion.split("T");
    let fecha_formated = `${splitfecha[0]} ${splitfecha[1]}:00`;
    console.log(fecha_formated);
    // return;
    if (
      proyecto_id !== "0" &&
      cliente_id !== "" &&
      tipo_venta !== "" &&
      suma !== 0
    ) {
      if (tipo_pago) {
        if (
          monto_inicial === "" &&
          numero_cuotas === "" &&
          monto_cuotas === ""
        ) {
          add_toast("warning", "Debes llenar los campos del financimiento");
          return;
        } else {
          if (cronograma_pagos.length === 0) {
            add_toast("warning", "Debes generar un cronograma de pagos");
            return;
          }
        }
      }
      if (tipo_venta === "SEPARACION") {
        if (
          tipo_pago_separacion === 0 &&
          fecha_programacion === "" &&
          monto_separacion === ""
        ) {
          add_toast(
            "warning",
            "Debes llenar todos los campos para la separacion"
          );
          return;
        }
      }
      let tp = tipo_pago ? 1 : 0;
      console.log(tipo_pago_separacion);
      var venta;
      if (tipo_venta === "VENTA") {
        venta = await registrar_venta(
          fecha,
          hora,
          proyecto_id,
          cliente_id,
          tipo_venta,
          suma,
          tp,
          monto_inicial,
          0,
          "",
          tipo_venta
        );
      } else {
        venta = await registrar_venta(
          fecha,
          hora,
          proyecto_id,
          cliente_id,
          tipo_venta,
          suma,
          tipo_pago_separacion,
          0,
          monto_separacion,
          fecha_formated,
          tipo_venta
        );
      }
      if (venta[0].error) {
        add_toast("error", "Ocurrio un error");
        console.log(venta[0].error);
      } else {
        let venta_id = venta[0].venta_id;
        let detalle_venta = await registrar_detalle_venta(cartItems, venta_id);
        if (detalle_venta[0].error) {
          add_toast("error", "Ocurrio un error");
        } else {
          let monto_transaccion;
          let motivo_operacion;
          if (tipo_venta === "VENTA") {
            if (tipo_pago) {
              monto_transaccion = monto_inicial;
              motivo_operacion = "PAGO_INICIAL|";
            } else {
              motivo_operacion = "PAGO_CONTADO";
              monto_transaccion = suma;
            }
          } else {
            motivo_operacion = "PAGO_SEPARACION";
            monto_transaccion = monto_separacion;
          }
          let transaccion = await registrar_transaccion(
            turno,
            monto_transaccion,
            metodo_pago,
            venta_id,
            fecha + " " + hora,
            motivo_operacion
          );
          if (transaccion[0].error) {
            add_toast("Ocurrio un error");
          } else {
            console.log(tipo_pago);
            if (tipo_pago) {
              let crono = await registrar_cronograma_pagos(
                cronograma_pagos,
                venta_id
              );
              if (crono[0].error) {
                add_toast(
                  "error",
                  "Ocurrio un error, no se registro el cronograma"
                );
                return;
              }
            }
            let newEstado = tipo_venta === "VENTA" ? "OCUPADO" : "SEPARADO";
            let estado = await cambiar_estado(cartItems, newEstado);
            if (estado[0].error) {
              add_toast("error", "Ocurrio un error");
            } else {
              let newlotes = await buscar_lotes_proyecto(proyecto_id);
              pintar_lotes(newlotes);
              $("#precio-lote").val("");
              cartItems = [];
              cronograma_pagos = [];
              renderCart();
              pintar_cronograma(cronograma_pagos);
              $("#financiamiento_check").val(false);
              $("#financiamiento_check").prop("checked", false);
              $("#monto_inicial").val("");
              $("#numero_cuotas").val("");
              $("#monto_cuotas").val("");
              var ventas_financiero = await buscar_ventas();
              pintar_ventas(ventas_financiero);
              $("#container-financiamento").addClass("hidden");
              $("#registrar_venta_btn").prop("disabled", false);
              add_toast(
                "success",
                `Se registro la ${tipo_venta} correctamente`
              );
            }
          }
        }
      }
    } else {
      add_toast(
        "warning",
        "Revisa todos los campos: cliente, proyecto tipo de venta, antes de registrar esta venta"
      );
    }
  });
  // ---------------FINANCIAMIENTO---------------------

  $("#financiamiento_check").on("click", function () {
    let actived = $(this).prop("checked");
    if (actived === false) {
      $("#monto_inicial").val("");
      $("#numero_cuotas").val("");
      $("#monto_cuotas").val("");
    }
    $("#container-financiamento").toggleClass("hidden");
    $("#proforma_financiamiento").toggleClass("hidden");
  });
  $("#monto_inicial_fn, #numero_cuotas_fn, #monto_cuotas_fn").on(
    "change keyup",
    // llenar_financiamiento
    console.log("llenado")
  );
});
