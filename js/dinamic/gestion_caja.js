$(document).ready(async function () {
  var caja;
  var rendirTotalState = 0;
  const meses = [
    { espanol: "Enero", ingles: "January" },
    { espanol: "Febrero", ingles: "February" },
    { espanol: "Marzo", ingles: "March" },
    { espanol: "Abril", ingles: "April" },
    { espanol: "Mayo", ingles: "May" },
    { espanol: "Junio", ingles: "June" },
    { espanol: "Julio", ingles: "July" },
    { espanol: "Agosto", ingles: "August" },
    { espanol: "Septiembre", ingles: "September" },
    { espanol: "Octubre", ingles: "October" },
    { espanol: "Noviembre", ingles: "November" },
    { espanol: "Diciembre", ingles: "December" },
  ];
  async function finanzas() {
    return new Promise((resolve, reject) => {
      let funcion = "buscar_finanzas_turno";
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: caja.id },
        (response) => {
          if (response.trim() === "no-register") {
            resolve({ msg: "No se encontraron registros" });
          } else {
            let data = JSON.parse(response);
            resolve(data);
          }
        }
      );
    });
  }
  async function pintarCaja() {
    const mes = dayjs(caja?.fecha).format("MMMM");
    const mesSpanish = meses.find((m) => m.ingles === mes);
    const fechaFormateada = dayjs(caja?.fecha).format(
      `DD [de] [${mesSpanish.espanol}] [a las] HH:mm`
    );
    const monto_apertura = Math.round((caja?.monto_apertura * 100) / 100);

    $("#name_caja").text(caja.nombre);
    $("#fecha_apertura_caja").text(fechaFormateada);
    $("#responsable_caja").text(
      caja?.nombre_cajero + " " + caja?.apellido_cajero
    );
    const data_finanzas = await finanzas();
    let rendir_total = 0;
    let rendir_efectivo = 0;
    let ventas_total = 0;
    let ventas_efectivo = 0;
    let ventas_transferencias = 0;
    let gastos_total = 0;

    if (data_finanzas.msg) {
      console.log(data_finanzas);
    } else {
      data_finanzas.forEach((f) => {
        ventas_total = ventas_total + Number(f.monto);
        switch (f.metodo_pago) {
          case "EFECTIVO":
            ventas_efectivo = ventas_efectivo + Number(f.monto);
            break;
          case "TRANSFERENCIA":
            ventas_transferencias = ventas_transferencias + Number(f.monto);
            break;

          default:
            break;
        }
      });
      rendir_total = rendir_total + monto_apertura + ventas_total;
      rendir_efectivo = rendir_efectivo + monto_apertura + ventas_efectivo;
    }
    rendirTotalState = rendir_total;
    $("#saldo_inicial").text("S/" + ((monto_apertura * 100) / 100).toFixed(2));
    // ventas
    $("#ventas_total").text("S/" + ((ventas_total * 100) / 100).toFixed(2));
    $("#ventas_efectivo").text(
      "S/" + ((ventas_efectivo * 100) / 100).toFixed(2)
    );
    $("#ventas_transferencias").text(
      "S/" + ((ventas_transferencias * 100) / 100).toFixed(2)
    );
    //   gastos
    $("#gastos_total").text("S/" + ((gastos_total * 100) / 100).toFixed(2));
    //   rendir
    $("#rendir_total").text("S/" + ((rendir_total * 100) / 100).toFixed(2));
    $("#rendir_efectivo").text(
      "S/" + ((rendir_efectivo * 100) / 100).toFixed(2)
    );
  }
  async function buscar_caja_abierta() {
    let funcion = "buscar_caja_abierta";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            $("#registra-caja-abierta").removeClass("md-hidden");
            setTimeout(() => {
              $("#registra-caja-abierta .form-create").addClass("modal-show");
            }, 300);
            add_toast("error", "No haz abierto ninguna caja");
            resolve("no-register");
            $("#sectionopencaja").removeClass("hidden");
          } else {
            add_toast("success", "tienes una caja abierta");
            let data = JSON.parse(response);
            caja = data[0];
            pintarCaja();
            resolve("si-register");
            $("#cajaAbierta").removeClass("hidden");
            $("#sectionopencaja").addClass("hidden");
          }
        }
      );
    });
  }
  async function buscar_cajas() {
    let funcion = "buscar_cajas";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion },
        (response) => {
          if (response.trim() === "no-register") {
            add_toast(
              "error",
              "No hay cajas registradas, contacta al administrador"
            );
            resolve({ error: response });
          } else {
            let cajas = JSON.parse(response);
            let template = "";
            resolve(cajas[0]);
            cajas.forEach((caja) => {
              template += `
                  <option value="${caja.id}">${caja.nombre}</option>`;
            });
            $("#cajasList").html(template);
          }
        }
      );
    });
  }
  async function cerrar_caja(id, monto_cierre, fecha_cierre) {
    let funcion = "cerrar_turno";
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id, monto_cierre, fecha_cierre },
        (response) => {
          if (response.trim() === "no-cierre") {
            reject({ error: response });
          } else {
            resolve({ msj: response });
          }
        }
      );
    });
  }

  $("#registra-caja-abierta .close-modal").on("click", function () {
    $("#registra-caja-abierta .form-create").removeClass("modal-show");
    setTimeout(() => {
      $("#registra-caja-abierta").addClass("md-hidden");
    }, 300);
  });
  $("#open-caja").on("click", function () {
    $("#registra-caja-abierta").removeClass("md-hidden");
    setTimeout(() => {
      $("#registra-caja-abierta .form-create").addClass("modal-show");
    }, 300);
  });
  await buscar_cajas();
  await buscar_caja_abierta();
  $("#registrar_turno").on("click", function () {
    let id_caja = $("#cajasList").val();
    let monto_apertura = $("#monto_apertura").val();
    let fecha = dayjs().format("YYYY-MM-DD HH:mm:ss");
    let funcion = "registrar_turno";

    try {
      $.post(
        "../../controlador/CajaController.php",
        { funcion, id: id_caja, fecha, monto_apertura },
        async (response) => {
          if (response.trim() === "no-register") {
            add_toast(
              "error",
              "No se pudo abrir la caja, sonctactar a soporte"
            );
          } else {
            add_toast("success", "Se aperturo la caja correctamente");
            $("#registra-caja-abierta .form-create").removeClass("modal-show");
            setTimeout(() => {
              $("#registra-caja-abierta").addClass("md-hidden");
            }, 300);
            await buscar_caja_abierta();
          }
        }
      );
    } catch (error) {
      console.log(error);
      add_toast("error", "Ocurrio un error contacte a soporte");
    }
  });
  // corte de caja
  $("[data-modal-toggle]").click(function () {
    const target = $(this).data("modal-toggle");
    $(`#${target}`).removeClass("hidden");
  });
  $("#confirm_cerrar_caja").on("click", async function () {
    let monto_cierre = rendirTotalState;
    let fecha_cierre = dayjs().format("YYYY-MM-DD");
    try {
      await cerrar_caja(caja.id, monto_cierre, fecha_cierre);
      caja = null;
      rendirTotalState = 0;
      await buscar_caja_abierta();
      $("#cajaAbierta").removeClass("hidden");
    } catch (error) {
      console.log(error);
      add_toast(
        "error",
        "Ocurrio un error, mo se pudo cerrar caja, contacta ala dministrador"
      );
    }
  });
  $("[data-modal-hide]").click(function () {
    const target = $(this).data("modal-hide");
    $(`#${target}`).addClass("hidden");
  });
  // Cerrar modal al hacer clic fuera del contenido del modal
  $(document).mouseup(function (e) {
    const modals = $("[data-modal-toggle]").map(function () {
      return $(`#${$(this).data("modal-toggle")}`);
    });

    modals.each(function () {
      const modal = $(this);
      const overlay = modal.find(".overlay");

      if (overlay.is(e.target)) {
        modal.addClass("hidden");
      }
    });
  });
  // Cerrar modal al presionar la tecla "ESC"
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $("[data-modal-toggle]").each(function () {
        $(`#${$(this).data("modal-toggle")}`).addClass("hidden");
      });
    }
  });
});
