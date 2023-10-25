$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var user = urlParams.get("user");
  var proyect = urlParams.get("proyect");
  var dataUser;
  console.log(user, proyect);

  if (user && proyect) {
    console.log("entro");
    buscar_target();
    function buscar_target() {
      let funcion = "search_target_user_uuid";
      $.post(
        "../controlador/UsuarioController.php",
        { funcion, id: user },
        (response) => {
          // console.log(response);
          if (response.trim() !== "no-register-target") {
            const user = JSON.parse(response);
            console.log(user);
            dataUser = user[0];

            $("#preview_cover_photo").attr("src", "../" + user[0].cover_photo);
            $("#photo_proyect").attr("src", "../" + user[0].cover_photo);
            $("#preview_perfil_photo").attr(
              "src",
              "../" + user[0].picture_perfil
            );
            $("#preview_nameuser").html(user[0].name_user);
            $("#preview_job").html(user[0].job);
            $("#preview_custom").html(user[0].custom_description);
            // generar metadatos
            $("#favicon").attr("href", "../" + user[0].picture_perfil);
            // Supongamos que tienes datos dinámicos
            const dynamicTitle = user[0].name_user;
            const dynamicDescription = user[0].custom_description;
            const dynamicImage = user[0].picture_perfil;

            // Actualiza el contenido de las etiquetas OG con los datos dinámicos
            $("meta[property='og:title']").attr("content", dynamicTitle);
            $("meta[property='og:description']").attr(
              "content",
              dynamicDescription
            );
            $("meta[property='og:image']").attr("content", dynamicImage);

            // También puedes actualizar el título y la descripción de la página
            $("title").text(dynamicTitle);
            $("meta[name='description']").attr("content", dynamicDescription);
          } else {
            $("body").html("No se puede acceder a esta ruta");
          }
        }
      );
    }
    // buscarProyecto();
    // function buscarProyecto() {
    //   let funcion = "buscar_proyectos";
    //   $.post(
    //     "../../controlador/MapaController.php",
    //     { funcion, proyecto: id },
    //     (response) => {
    //       const proyecto = JSON.parse(response);
    //       console.log(proyecto);
    //       nameProyecto = proyecto[0].nombreproyecto;
    //     }
    //   );
    // }
    $("#save_contact").click(() => {
      var nombre = dataUser.name_user;
      var telefono = "1234567890";
      var email = "correo@example.com";

      if ("contacts" in navigator) {
        // Utiliza el API de Contactos si está disponible en el navegador
        navigator.contacts
          .select(["name", "tel", "email"])
          .then(function (contacts) {
            var nuevoContacto = navigator.contacts.create();
            nuevoContacto.name = new ContactName(null, nombre);
            nuevoContacto.tel = [new ContactField("mobile", telefono)];
            nuevoContacto.email = [new ContactField("work", email)];

            nuevoContacto.save();
          });
      } else {
        var vcard =
          "BEGIN:VCARD\nVERSION:3.0\nFN:" +
          nombre +
          "\nTEL:" +
          telefono +
          "\nEMAIL:" +
          email +
          "\nEND:VCARD";
        var dataUri = "data:text/vcard," + encodeURIComponent(vcard);

        // Crear una ruta para la descarga
        var downloadUrl = dataUri;

        // Redirigir al usuario para que descargue el archivo
        window.location.href = downloadUrl;
      }
    });
  } else {
    $("body").html("No se puede acceder a esta ruta");
  }
});
