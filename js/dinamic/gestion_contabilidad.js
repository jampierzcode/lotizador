$(document).ready(function () {
  var funcion = "";
  buscar_datos_contabilidad();
  function buscar_datos_contabilidad() {
    funcion = "buscar_datos_contabilidad";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        const datos = JSON.parse(response);
        datos.forEach((dato) => {
          $("#data-reservas").html(dato.reservas);
          $("#data-clients").html(dato.clientes);
          $("#data-habs").html(dato.habitaciones);
          $("#data-ventas").html(`S/${Number(dato.ventas).toFixed(2)}`);
        });
      }
    );
  }
});
