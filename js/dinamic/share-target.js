$(document).ready(function () {
  buscar_proyectos();
  function buscar_proyectos() {
    let funcion = "buscar_proyectos";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        console.log(response);
        if (response.trim() !== "no-data") {
          let proyectos = JSON.parse(response);
          pintar_proyectos(proyectos);
        }
      }
    );
  }
  function pintar_proyectos(proyectos) {
    let template = "";
    proyectos.forEach((p) => {
      template += `
            
            <li class="border rounded p-3 w-full flex justify-between font-bold items-center gap-3">${p.nombreProyecto} <a target="_blank" class="link-proyect p-2 rounded bg-gray-700 text-white" data-link="targetspersonalize/?user=11&&proyect=${p.id}" href="../../targetspersonalize/?user=11&&proyect=${p.id}">Ir a Targeta</a></li>
            `;
    });
    $("#proyectosList").html(template);
  }
});
