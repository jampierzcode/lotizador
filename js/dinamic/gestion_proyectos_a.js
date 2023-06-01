$(document).ready(function () {
  var funcion = "";

  buscar_proyectos();
  function buscar_proyectos() {
    funcion = "buscar_proyectos_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        let template = "";
        if (response.trim() == "no-register") {
          template += "<td>No hay registros</td>";
        } else {
          const proyectos = JSON.parse(response);

          proyectos.forEach((proyecto) => {
            template += `
              <tr>
              <td id="hab-id">${proyecto.id}</td>
              <td id="hab-id">${proyecto.nombreProyecto}</td>
              <td id="hab-numero">${proyecto.clienteNombre} ${proyecto.clienteApellido}</td>
              <td id="hab-categoria">${proyecto.imgUrl}</td>
              <td>               
                  <a href="lotizador?id=${proyecto.id}" class="btnLotes"> Ver lotes </a>
                  </td>
              </tr>
              `;
          });
        }
        $("#list-proyectos").html(template);
      }
    );
  }
});
