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
      {
        data: null,
        render: function (data) {
          return `${dayjs(data.fecha).format("DD / MM / YYYY")}`;
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          template += `
            <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white inline-block rounded-full font-bold ${
              data.cuotas_retrasadas > 0 ? "bg-red-500" : "bg-green-500"
            }">${data.cuotas_retrasadas} cuotas retrasadas</p>
              `;
          template += `<br/>`;
          template += `<p class="px-3 py-2 text-[10px] whitespace-nowrap text-black inline-block rounded-full font-bold bg-yellow-400">${data.cuotas_pagadas} cuotas pagadas</p>
              `;
          return template;
        },
      },

      {
        data: null,
        render: function (data) {
          const ahora = dayjs();
          const fecha_retrasada = dayjs(data.fecha_retrasada);
          const diferencia = fecha_retrasada.diff(ahora, "minute", true); // Diferencia en minutos
          var dias = Math.floor(diferencia / (24 * 60));
          let tiempoRestante = "";
          let template_status = "";

          // Ajuste para considerar 0 cuando estamos en el mismo día y hora
          if (
            diferencia > 0 ||
            (diferencia === 0 && fecha_retrasada.isAfter(ahora))
          ) {
            if (dias > 1) {
              tiempoRestante += `${dias} día${dias > 1 ? "s" : ""}`;
            }

            template_status +=
              tiempoRestante.length > 0
                ? `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">Faltan ${tiempoRestante}</div>`
                : `<div class="px-4 py-2 bg-green-100 border-green-500 text-green-500 font-bold text-xs rounded">La visita está programada para ahora</div>`;
          } else {
            dias = dias * -1;
            if (dias > 1) {
              tiempoRestante += `${dias - 1} día${dias > 2 ? "s" : ""}`;
            }

            template_status +=
              tiempoRestante.length > 0
                ? `<div class="px-4 py-2 bg-red-100 border-red-500 text-red-500 font-bold text-xs rounded">Retrasado por ${tiempoRestante}</div>`
                : ""; // No mostrar nada si no hay retraso
          }
          return template_status;
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
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_inicial * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          //   if (data.financiamiento === "0") {
          //     template += `
          //     <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd]">AL CONTADO</p>
          //       `;
          //   } else {
          //     template += `
          //     <p class="px-3 py-2 text-[10px] whitespace-nowrap text-white rounded-full inline-block font-bold bg-[#310ecd8c]">FINANCIADO</p>
          //       `;
          //   }
          template += `
                S/${(
                  ((Number(data.monto_pagado_now) +
                    Number(data.monto_inicial)) *
                    100) /
                  100
                ).toFixed(2)}
                `;
          return template;
        },
      },
      // { data: "monto_inicial" },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          template += `
            <div class="flex gap-3">
            <button target="_blank" keyVenta="${data?.id}" id="pagar-cuota" class="bg-[#310ecd] rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center text-white">Pagar Cuota</button>
            `;
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
  var dataTableCronograma = $("#cronogramaList").DataTable({
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
          return `${dayjs(data.fecha_pago).format("DD / MM / YYYY")}`;
        },
      },

      {
        data: null,
        render: function (data) {
          return `<p class="font-bold text-[12px]"> S/${(
            (data.monto_pago * 100) /
            100
          ).toFixed(2)}</p>`;
        },
      },
      {
        data: null,
        render: function (data) {
          if (data.status === "NO PAGADO") {
            if (dayjs(data.fecha_pago).isBefore(dayjs().format("YYYY-MM-DD"))) {
              return `<p class="px-3 py-2 rounded bg-yellow-400 text-black text-[10px] whitespace-nowrap inline-flex">PAGO RETRASADO</p>`;
            } else {
              return `<p class="px-3 py-2 rounded bg-green-200 text-green-700 border border-green-700 text-[10px] whitespace-nowrap inline-flex">A TIEMPO</p>`;
            }
          } else {
            return `${dayjs(data.fecha_pagada).format("DD / MM / YYYY")}`;
          }
        },
      },
      {
        data: null,
        render: function (data) {
          let template = "";
          if (data.status === "NO PAGADO") {
            template += `
                        <p class="px-3 py-2 text-[10px] rounded bg-red-500 text-white whitespace-nowrap inline-flex">NO PAGADO</p>
                        `;
          } else {
            template += `
                          <p class="px-3 py-2 text-[10px] rounded bg-green-600 text-white whitespace-nowrap inline-flex">PAGADO</p>
                          `;
          }
          return template;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          let template = "";
          if (data.status === "NO PAGADO") {
            template += `
                  <button target="_blank" montoPago="${data?.monto_pago}" keyVenta="${data?.venta_id}" keyCuota="${data?.id}" id="pagar-is-cuota" class="bg-[#310ecd] rounded whitespace-nowrap px-3 py-3 inline-flex gap-2 items-center text-white text-[10px]">Pagar esta Cuota</button>
                  `;
          } else {
            template += `
                      <p class="px-3 text-[10px] py-2 rounded bg-green-600 text-white whitespace-nowrap inline-flex">PAGADO</p>
                      `;
            template += `<br/>`;
          }
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
  function pintar_cronograma(cronograma) {
    var estadoActual = {
      page: dataTableCronograma.page(), // Página actual
      scrollLeft: $("#cronogramaList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };
    // Limpiar la tabla (eliminar las filas sin nueva carga)

    dataTableCronograma.clear().draw(false);

    // Agregar las nuevas filas
    dataTableCronograma.rows.add(cronograma).draw(false);
    // Restaurar el número de página previo
    var pageInfo = dataTableCronograma.page.info();
    var totalPaginas = pageInfo.pages;
    console.log(totalPaginas);
    if (estadoActual.page < totalPaginas) {
      console.log(estadoActual.page);
      dataTableCronograma.page(estadoActual.page);
    } else {
      dataTableCronograma.clear().draw();

      // Agregar las nuevas filas
      dataTableCronograma.rows.add(ventas).draw();
      console.log(totalPaginas - 1);
      dataTableCronograma.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#cronogramaList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  // pagar cuota eventos
  async function pagar_cuota(cuota_id, fecha_pagada, status) {
    let funcion = "pagar_cuota";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: cuota_id, fecha_pagada, status },
        (response) => {
          let data = JSON.parse(response);
          resolve(data);
        }
      );
    });
  }

  $(document).on("click", "#pagar-cuota", function () {
    let keyVenta = $(this).attr("keyVenta");
    console.log(keyVenta);
    $("#pago_cuota_modal").removeClass("md-hidden");
    let crono = cronograma_pagos.filter((c) => c.venta_id === keyVenta);
    console.log(crono);
    pintar_cronograma(crono);
    setTimeout(() => {
      $("#pago_cuota_modal .form-create").addClass("modal-show");
    }, 300);
  });
  $("#pago_cuota_modal .close-modal").on("click", function () {
    $("#pago_cuota_modal .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#pago_cuota_modal").addClass("md-hidden");
    }, 300);
  });
  $(document).on("click", "#pagar-is-cuota", async function () {
    let cuota_id = $(this).attr("keyCuota");
    let keyVenta = $(this).attr("keyVenta");
    let montoPago = $(this).attr("montoPago");
    let fecha_now = dayjs().format("YYYY-MM-DD");
    let status = "PAGADO";
    console.log(cuota_id, keyVenta, fecha_now, status);
    let pagarIsCuota = await pagar_cuota(cuota_id, fecha_now, status);
    if (pagarIsCuota.error) {
      add_toast("error", "No se pudo registrar esta cuota");
      console.log(pagarIsCuota.error);
    } else {
      let transaccion = await registrar_transaccion(
        turno,
        montoPago,
        "EFECTIVO",
        keyVenta,
        fecha_now,
        "PAGO_CUOTA"
      );
      if (transaccion.error) {
        add_toast("error", "No se registro la transaccion del dinero");
      } else {
        add_toast("success", "Se hizo el pago correcto para esta cuota");
        var ventas_financiero = await buscar_ventas();
        var cronograma = await buscar_cronograma_pagos();
        pintar_ventas(ventas_financiero, cronograma);
        let crono = cronograma.filter((c) => c.venta_id === keyVenta);
        pintar_cronograma(crono);
      }
    }
  });

  // fin de pagar cuota
  async function buscar_caja_abierta() {
    let funcion = "buscar_caja_abierta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve("no-register");
            add_toast("error", "No haz abierto ninguna caja");
          } else {
            add_toast("success", "Tienes una caja abierta");
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
            let filter_pagos = data.filter(
              (d) => d.status === "VENTA" && d.tipo_pago === "1"
            );
            console.log(filter_pagos);
            ventasList = filter_pagos;
            resolve(filter_pagos);
          }
          resolve("exito");
        }
      );
    });
  }
  async function buscar_cronograma_pagos() {
    let funcion = "buscar_cronograma_pagos";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            resolve([]);
          } else {
            let data = JSON.parse(response);
            console.log(data);
            cronograma_pagos = data;
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

  function pintar_ventas(ventas, cronograma) {
    var estadoActual = {
      page: dataTable.page(), // Página actual
      scrollLeft: $("#usuariosList").parent().scrollLeft(), // Posición de scroll horizontal
      bodyScroll: $("body").parent().scrollTop(),
    };
    ventas.forEach((v) => {
      let cuotasPagadas = cronograma.filter(
        (cuota) => cuota.status === "PAGADO" && v.id === cuota.venta_id
      ).length;
      let cuotasRetrasadas = cronograma.filter(
        (cuota) =>
          dayjs(cuota.fecha_pago) < dayjs() &&
          v.id === cuota.venta_id &&
          cuota.status === "NO PAGADO"
      ).length;
      v.cuotas_pagadas = cuotasPagadas;
      v.cuotas_retrasadas = cuotasRetrasadas;
      let fechas_nopagadas = cronograma.filter(
        (cuota) => cuota.status === "NO PAGADO" && v.id === cuota.venta_id
      );
      // Encontrar la fecha más pequeña entre las fechas 'NO PAGADO'
      const fechaMasProxima = fechas_nopagadas.reduce((prev, current) =>
        dayjs(current.fecha).isBefore(dayjs(prev.fecha)) ? current : prev
      );
      console.log(fechaMasProxima);
      v.fecha_retrasada = fechaMasProxima.fecha_pago;
      let proximaCuota = cronograma.find(
        (cuota) => dayjs(cuota.fecha_pago) > dayjs() && v.id === cuota.venta_id
      );

      var pagado_monto_now = 0;
      cronograma.forEach((c) => {
        if (c.status === "PAGADO" && c.venta_id === v.id) {
          pagado_monto_now = pagado_monto_now + c.monto_pago;
        }
      });
      console.log(pagado_monto_now);
      v.monto_pagado_now = pagado_monto_now;
      v.proxima_cuota = proximaCuota;
    });
    console.log(ventas);

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
      dataTable.rows.add(ventas).draw();
      console.log(totalPaginas - 1);
      dataTable.page(totalPaginas - 1);
    }
    // Restaurar la posición de scroll horizontal
    $("#ventasList").parent().scrollLeft(estadoActual.scrollLeft);
    $("body").parent().scrollTop(estadoActual.bodyScroll);
  }
  var ventas_financiero = await buscar_ventas();
  var cronograma = await buscar_cronograma_pagos();
  pintar_ventas(ventas_financiero, cronograma);
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
  function buscar_clientes(id) {
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
});
