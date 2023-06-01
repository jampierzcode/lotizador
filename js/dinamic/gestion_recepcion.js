$(document).ready(function () {
  var funcion = "";
  buscar_piso();

  buscar_habitaciones();

  function buscar_piso() {
    funcion = "buscar_piso_hab";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        template += `<option value="0">Seleccione el Piso</option>`;
        let pisos = JSON.parse(response);
        pisos.forEach((piso) => {
          template += `
          <option value="${piso.id_piso}">${piso.numero_piso}</option>
          `;
        });
        $("#search-piso").html(template);
      }
    );
  }

  function buscar_habitaciones() {
    funcion = "buscar_habitacion";
    var id_piso = $("#search-piso").val();
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion, id_piso },
      (response) => {
        let template = "";
        if (response.trim() == "No existen registro de habitaciones") {
          template += "No hay registros";
          let estado = "";
        } else {
          const habitaciones = JSON.parse(response);
          habitaciones.forEach((habitacion) => {
            estado = habitacion.estado.toLowerCase();
            template += `
            <div class="card-habs bg-${estado}">
            <div class="body-card">
                <ion-icon name="bed-outline"></ion-icon>
                <h1>Nro: ${habitacion.n_cuarto}</h1>
                <h1>${habitacion.numero_piso}</h1>
                <span>${habitacion.nombre_categoria}</span>
            </div>`;
            if (habitacion.estado == "Disponible") {
              template += `
              <div class="footer-card">
                <a href="?id=${habitacion.id_habitaciones}&&view=reservar">
                    <span>${habitacion.estado}</span>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </a>
                
            </div>`;
            }
            if (habitacion.estado == "Ocupado") {
              template += `
              <div class="footer-card">
                <p >
                    <span>${habitacion.estado}</span>
                </p>
                
            </div>`;
            }
            if (habitacion.estado == "Limpieza") {
              template += `
              <div class="footer-card" >
                <div class="footer-content">
                    <span>${habitacion.estado}</span>
                    <ion-icon name="chevron-forward-outline" n_hab="${habitacion.n_cuarto}" key="${habitacion.id_habitaciones}" id="limpieza-cancel"></ion-icon>
                </div>
                
            </div>`;
            }
            template += `
            </div>
            `;
          });
        }
        $(".list-habitaciones").html(template);

        $("ion-icon#limpieza-cancel").click((e) => {
          let key = $(e.target).attr("key");
          let n_hab = $(e.target).attr("n_hab");
          var opcion = confirm(
            `Desea terminar limpieza de habitacion ${n_hab} ?`
          );
          if (opcion == true) {
            funcion = "habitacion_limpieza_terminada";
            $.post(
              "../../controlador/UsuarioController.php",
              { funcion, key },
              (response) => {
                buscar_habitaciones();
              }
            );
          } else {
          }
        });
      }
    );
  }
  $("#search-piso").change(() => {
    buscar_habitaciones();
  });
});
