$(document).ready(function () {
  // variables de imagenes de file
  var profileFile;
  var portadaFile;

  var dataTargetUser;
  var stateNewDAtaTarget;

  // change image portada
  var template_portada = `<ion-icon class="text-[25px]" name="image"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>`;

  var imgPerfil = $("#perfil_upload");
  var imgPortada = $("#portada_upload");
  console.log(imgPortada.val());
  $("#portada_overlay").click(function () {
    $(imgPortada).click();
  });
  $(imgPortada).change(function (e) {
    console.log("cargo la imagen");
    const file = e.target.files[0];
    portadaFile = file;
    mostrarVistaPrevia(file);
  });
  function mostrarVistaPrevia(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#portada_overlay").html(
          `<img class="rounded-lg object-cover w-full h-full dark:ring-gray-500" src="${e.target.result}" alt="rofile picture">`
        );
        $("#preview_cover_photo").attr("src", e.target.result);
        $("#content-portada").append(
          `<span id="delete_cover_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
        );
      };
      reader.readAsDataURL(input);
    }
  }
  $(document).on("click", "#delete_cover_photo", function () {
    $(this).remove();
    $("#portada_overlay").html(`
    <ion-icon class="text-[25px]" name="image"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>
    `);

    $("#preview_cover_photo").attr(
      "src",
      "https://static.thenounproject.com/png/5647816-200.png"
    );

    $(imgPortada).val("");

    stateNewDAtaTarget.cover_photo = "";
    viewActivationChane();
  });
  // --------fin de change portada---------

  // change img profile
  console.log(imgPerfil);
  $("#perfil_overlay").click(function () {
    console.log("click");
    $(imgPerfil).click();
  });
  $(imgPerfil).change(function (e) {
    console.log("cargo la imagen");
    const file = e.target.files[0];
    profileFile = file;
    console.log(file);
    console.log($(imgPerfil).val());

    mostrarVistaPreviaPerfil(file);
  });
  function mostrarVistaPreviaPerfil(input) {
    if (input) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#perfil_overlay").html(
          `<img class="w-[80px] h-[80px] p-1 rounded-full" src="${e.target.result}" alt="rofile picture">`
        );
        $("#preview_perfil_photo").attr("src", e.target.result);
        $("#content-perfil").append(
          `<span id="delete_perfil_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
        );
      };
      reader.readAsDataURL(input);
    }
  }
  $(document).on("click", "#delete_perfil_photo", function () {
    $(this).remove();
    $("#perfil_overlay").html(`
    <ion-icon class="text-[25px]" name="person"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu perfil</p>
    `);

    $("#preview_perfil_photo").attr(
      "src",
      "https://static.thenounproject.com/png/5647816-200.png"
    );
    $(imgPerfil).val("");
    stateNewDAtaTarget.picture_perfil = "";
    viewActivationChane();
  });
  // --------fin de change img profile---------

  // profile y portada activar btn
  $(document).on("change", "#portada_upload, #perfil_upload", function (e) {
    // stateNewDAtaTarget;
    console.log(e);
    const etiqueta = $(this).attr("id");
    switch (etiqueta) {
      case "perfil_upload":
        stateNewDAtaTarget.picture_perfil = e.target.files[0].name;
        break;
      case "portada_upload":
        stateNewDAtaTarget.cover_photo = e.target.files[0].name;
        break;

      default:
        break;
    }

    viewActivationChane();
  });
  function viewActivationChane() {
    console.log(stateNewDAtaTarget);
    console.log(dataTargetUser);
    if (JSON.stringify(stateNewDAtaTarget) !== JSON.stringify(dataTargetUser)) {
      console.log("entro activar");
      enabled_update_acces_btn();
    } else {
      console.log("entro desactivar");
      disabled_update_acces_btn();
    }
  }
  buscar_target();
  function buscar_target() {
    let funcion = "buscar_user_target";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        setInterval(() => {
          $("#content-about").removeClass("hidden");
          $("#spinner-load").addClass("hidden");
        }, 3000);
        if (response.trim() === "no-register-target") {
          dataTargetUser = {
            picture_perfil: "",
            cover_photo: "",
            user_id: "",
            name_user: "",
            job: "",
            custom_description: "",
          };
          stateNewDAtaTarget = {
            picture_perfil: "",
            cover_photo: "",
            user_id: "",
            name_user: "",
            job: "",
            custom_description: "",
          };
        } else {
          const target = JSON.parse(response);
          console.log(target);
          delete target[0].id;
          let targetNet = {
            picture_perfil: target[0].picture_perfil
              ? target[0].picture_perfil
              : "",
            cover_photo: target[0].cover_photo ? target[0].cover_photo : "",
            // cover_photo: "meprofile.png",
            user_id: target[0].user_id ? target[0].user_id : "",
            name_user: target[0].name_user ? target[0].name_user : "",
            job: target[0].job ? target[0].job : "",
            custom_description: target[0].custom_description
              ? target[0].custom_description
              : "",
          };

          dataTargetUser = { ...targetNet };
          stateNewDAtaTarget = { ...targetNet };
          updateCamposform();
          update_preview(dataTargetUser);
        }
      }
    );
  }
  function update_preview(data) {
    $("#preview_nameuser").text(data.name_user);
    $("#preview_job").text(data.job);
    $("#preview_custom").text(data.custom_description);
  }
  $("#name_profile, #name_job, #name_custom").on("keyup", function () {
    const etiqueta = $(this).attr("id");
    switch (etiqueta) {
      case "name_profile":
        stateNewDAtaTarget.name_user = $(this).val();
        break;
      case "name_job":
        stateNewDAtaTarget.job = $(this).val();
        break;
      case "name_custom":
        stateNewDAtaTarget.custom_description = $(this).val();
        break;

      default:
        break;
    }
    update_preview(stateNewDAtaTarget);
    // console.log(newData);
    // console.log(dataTargetUser);
    if (JSON.stringify(stateNewDAtaTarget) !== JSON.stringify(dataTargetUser)) {
      console.log("entro activar");
      enabled_update_acces_btn();
    } else {
      console.log("entro desactivar");
      disabled_update_acces_btn();
    }
  });
  function updateCamposform() {
    $("#name_profile").val(dataTargetUser.name_user);
    $("#name_job").val(dataTargetUser.job);
    $("#name_custom").val(dataTargetUser.custom_description);
    // portada foto
    if (dataTargetUser.cover_photo === "") {
      $("#delete_cover_photo").remove();
      $("#portada_overlay").html(`
    <ion-icon class="text-[25px]" name="image"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>
    `);

      $("#preview_cover_photo").attr(
        "src",
        "https://static.thenounproject.com/png/5647816-200.png"
      );
      $(imgPerfil).val("");
    } else {
      $("#portada_overlay").html(
        `<img class="rounded-lg object-cover w-full h-full dark:ring-gray-500" src="../../${dataTargetUser.cover_photo}" alt="rofile picture">`
      );
      $("#preview_cover_photo").attr(
        "src",
        `../../${dataTargetUser.cover_photo}`
      );
      $("#content-portada").append(
        `<span id="delete_cover_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
      );
    }
    // perfil foto
    if (dataTargetUser.picture_perfil === "") {
      $("#perfil_overlay").html(`
    <ion-icon class="text-[25px]" name="person"></ion-icon>
    <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu perfil</p>
    `);

      $("#preview_perfil_photo").attr(
        "src",
        "https://static.thenounproject.com/png/5647816-200.png"
      );
      $(imgPortada).val("");
    } else {
      $("#perfil_overlay").html(
        `<img class="w-[80px] h-[80px] p-1 rounded-full" src="../../${dataTargetUser.picture_perfil}" alt="rofile picture">`
      );
      $("#preview_perfil_photo").attr(
        "src",
        `../../${dataTargetUser.picture_perfil}`
      );
      $("#content-perfil").append(
        `<span id="delete_perfil_photo" class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span>`
      );
    }
  }
  $("#cancelar_submit").click(function () {
    const disabled = $(this).attr("disable");
    if (disabled === "false") {
      // cancelar boton
      updateCamposform();
      $("#cancelar_submit").addClass("text-gray-300");
      $("#cancelar_submit").removeClass("text-gray-600");
      $("#cancelar_submit").removeClass("cursor-pointer");
      $("#cancelar_submit").addClass("cursor-default");
      $("#cancelar_submit").removeClass("hover:shadow-lg");
      $("#cancelar_submit").attr("disable", "true");
      // boton send info
      $("#send_submit").addClass("bg-gray-300");
      $("#send_submit").addClass("text-gray-500");
      $("#send_submit").removeClass("text-white");
      $("#send_submit").removeClass("bg-[#310ecd]");
      $("#send_submit").removeClass("cursor-pointer");
      $("#send_submit").addClass("cursor-default");
      $("#send_submit").removeClass("hover:shadow-lg");
      $("#send_submit").attr("disable", "true");
    }
  });
  $("#send_submit").click(function () {
    const disabled = $(this).attr("disable");

    if (disabled === "false") {
      let newData = stateNewDAtaTarget;
      console.log(newData);
      // Inicializa las promesas a null
      let profilePromise = null;
      let coverPhotoPromise = null;
      // casos para perfil de imagen
      if (dataTargetUser.picture_perfil !== stateNewDAtaTarget.picture_perfil) {
        if (dataTargetUser.picture_perfil === "") {
          console.log("crear imagen perfil");
          profilePromise = enviarImagenes(profileFile);
        } else {
          if (stateNewDAtaTarget.picture_perfil === "") {
            // eliminar mi image
            console.log("eliminar imagen perfil");
          } else {
            // actualizo la imagen
            console.log("actualizar imagen perfil");
          }
        }
      }
      // casos para portada imagen
      if (dataTargetUser.cover_photo !== stateNewDAtaTarget.cover_photo) {
        if (dataTargetUser.cover_photo === "") {
          console.log("crear imagen portada");
          coverPhotoPromise = enviarImagenes(portadaFile);
        } else {
          if (stateNewDAtaTarget.cover_photo === "") {
            // eliminar mi image
            console.log("eliminar imagen portada");
          } else {
            // actualizo la imagen
            console.log("actualizar imagen portada");
          }
        }
      }
      // console.log(newData);
      // let funcion = "update_user_target";
      // $.post(
      //   "../../controlador/UsuarioController.php",
      //   { funcion, data: JSON.stringify(newData) },
      //   (response) => {
      //     console.log(response);
      //     disabled_update_acces_btn();
      //     buscar_target();
      //   }
      // );
      // Crea un arreglo de promesas para esperar a ambas
      const promisesToWaitFor = [];

      if (profilePromise !== null) {
        promisesToWaitFor.push(
          profilePromise.then((galeria) => {
            newData.picture_perfil = galeria;
          })
        );
      }

      if (coverPhotoPromise !== null) {
        promisesToWaitFor.push(
          coverPhotoPromise.then((galeria) => {
            newData.cover_photo = galeria;
          })
        );
      }

      // Espera a que ambas promesas se resuelvan
      Promise.all(promisesToWaitFor)
        .then(() => {
          console.log("Ambas imágenes se han procesado.");
          console.log(newData);

          let funcion = "update_user_target";
          $.post(
            "../../controlador/UsuarioController.php",
            { funcion, data: JSON.stringify(newData) },
            (response) => {
              console.log(response);
              disabled_update_acces_btn();
              buscar_target();
            }
          );
        })
        .catch((error) => console.log(error));
    }
  });
  function enabled_update_acces_btn() {
    // cambios para boton cancelar
    $("#cancelar_submit").removeClass("text-gray-300");
    $("#cancelar_submit").addClass("text-gray-600");
    $("#cancelar_submit").addClass("cursor-pointer");
    $("#cancelar_submit").addClass("hover:shadow-lg");
    $("#cancelar_submit").attr("disable", "false");
    // cambios para boton send info
    $("#send_submit").removeClass("bg-gray-300");
    $("#send_submit").removeClass("text-gray-500");
    $("#send_submit").addClass("text-white");
    $("#send_submit").addClass("bg-[#310ecd]");
    $("#send_submit").addClass("cursor-pointer");
    $("#send_submit").addClass("hover:shadow-lg");
    $("#send_submit").attr("disable", "false");
  }
  function disabled_update_acces_btn() {
    // cancelar boton
    // $("#name_profile, #name_job, #name_custom").val("");
    $("#cancelar_submit").addClass("text-gray-300");
    $("#cancelar_submit").removeClass("text-gray-600");
    $("#cancelar_submit").removeClass("cursor-pointer");
    $("#cancelar_submit").addClass("cursor-default");
    $("#cancelar_submit").removeClass("hover:shadow-lg");
    $("#cancelar_submit").attr("disable", "true");
    // boton send info
    $("#send_submit").addClass("bg-gray-300");
    $("#send_submit").addClass("text-gray-500");
    $("#send_submit").removeClass("text-white");
    $("#send_submit").removeClass("bg-[#310ecd]");
    $("#send_submit").removeClass("cursor-pointer");
    $("#send_submit").addClass("cursor-default");
    $("#send_submit").removeClass("hover:shadow-lg");
    $("#send_submit").attr("disable", "true");
  }
  // funcion de subir imagnes
  function enviarImagenes(file) {
    return new Promise((resolve, reject) => {
      const carpeta = "targets";
      const formData = new FormData();
      formData.append("carpeta", carpeta);
      formData.append("targetimagen", file);

      $.ajax({
        url: "../../controlador/subirimagenes.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject("Error al guardar las imágenes");
        },
      });
    });
  }
  function eliminarImagenes(route) {
    return new Promise((resolve, reject) => {
      let funcion = "delete_image";
      $.post(
        "../../controlador/subirimagenes.php",
        { funcion, route },
        (response) => {
          resolve(response);
        }
      );
    });
  }
});
