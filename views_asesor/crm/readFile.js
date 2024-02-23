$(document).ready(function () {
  buscarMyProyects();
  const columnsTratedData = [
    {
      readCol: "nombre",
    },
    { readCol: "apellido" },
    { readCol: "celular" },
    { readCol: "telefono" },
    { readCol: "campaña" },
    { readCol: "ciudad" },
    { readCol: "direccion" },
    { readCol: "correo" },
  ];
  class Contactos {
    constructor(content) {
      this.content = content;
    }
    header() {
      return this.content[0];
    }
    rows() {
      return this.content.slice(1, this.content.lenght);
    }
  }
  var subir = document.getElementById("upload-clients-fields");
  var input = document.getElementById("fileExcel");
  var data;
  subir.addEventListener("click", async function () {
    const result = await readXlsxFile(input.files[0]);
    if (result) {
      $(".main-file").addClass("md-hidden");
      data = new Contactos(result);
      //   console.log(data);
      $(".container-asignedTables").removeClass("md-hidden");
      let template = "";

      console.log(data.header());
      // console.log(data.header());
      console.log(data.rows());
      const dataHead = data.header();
      let count = 1;
      let templateoptions = `
      <option value="0">Seleccione una columna</option>
      
      `;
      columnsTratedData.map((item) => {
        templateoptions += `
        <option value="${item.readCol}">${item.readCol}</option>
                          
        `;
      });
      for (const [index, dato] of dataHead.entries()) {
        template += `
        <div class="group-asiggned">
                    <div class="ofDate">
                        <span>Asignar: </span>
                        <div class="map-user-field">
                            "${dato}"
                        </div>
                    </div>
                    <div class="toDate">
                        <span>Para: </span>
                        <select propPosition=${index} propKey=${dato} name="etiqueta-field-data" id="etiqueta-field-${count}">
`;
        template += templateoptions;
        template += `
                            </select>
                    </div>
                </div>
        `;
        count++;
      }
      $(".list-groups").html(template);
      // for (const dato of dataHead) {
      //     dato.map((dat) => {
      //         if(dat)
      //     })

      // }
    } else {
      alert("Hubo un error al cargar el archivo refresque la pagina");
    }
  });
  $("body").on("change", 'select[name="etiqueta-field-data"]', function () {
    var selectedOption = $(this).val(); // Obtiene la opción seleccionada

    // Busca el select que tiene la opción seleccionada en otros select y establece su valor a 0
    $('select[name="etiqueta-field-data"]')
      .not(this)
      .each(function () {
        if ($(this).val() === selectedOption) {
          $(this).val("0");
        }
      });
  });
  $("#regresarData").click(() => {
    console.log("click");
    $(".main-file").removeClass("md-hidden");
    $(".container-asignedTables").addClass("md-hidden");
  });
  $("body").on("click", "#subirData", async function () {
    const asignaciones = [];
    const proyecto_id = $("#listMyProyects").val();
    const origen_name = $("#listOrigen").val();
    let contadorAsignacion = 0;
    $('select[name="etiqueta-field-data"]').each(function () {
      const position = $(this).attr("propPosition");
      const key = $(this).attr("propKey");
      const value = $(this).val();

      contadorAsignacion++;
      if (position !== undefined && value !== "0") {
        console.log("Entro a asinacion");
        asignaciones.push({
          position,
          key,
          value,
        });
      }
    });

    const camposPredefinidos = {
      nombre: "",
      apellido: "",
      documento: "",
      correo: "",
      celular: "",
      telefono: "",
      Pais: "",
      origen: "",
      campaña: "",
      ciudad: "",
    };

    const resultado = data.rows().map((registro) => {
      const obj = { ...camposPredefinidos };
      asignaciones.forEach((asignacion) => {
        const { position, key, value } = asignacion;
        obj[value] =
          registro[position] !== "" && registro[position] !== null
            ? registro[position]
            : "";
      });
      return obj;
    });
    console.log(asignaciones);
    console.log(contadorAsignacion);
    let fechaActual = dayjs().format("YYYY-MM-DD");
    let horaActual = dayjs().format("HH:mm:ss");
    resultado.forEach((objeto) => {
      objeto.fecha = fechaActual;
      objeto.hora = horaActual;
    });
    console.log(resultado);
    if (asignaciones.length === contadorAsignacion) {
      if (proyecto_id !== "0") {
        if (origen_name !== "0") {
          try {
            let funcion = "add_cliente2";
            $.post(
              "../../controlador/UsuarioController.php",
              {
                funcion,
                result: JSON.stringify(resultado),
                proyecto_id,
                origen_name,
              },
              (response) => {
                const data = JSON.parse(response);
                console.log(data);

                if (data.hasOwnProperty("error")) {
                  // Si la respuesta contiene un mensaje de error, rechaza la promesa
                  console.log(data.error);
                } else {
                  let funcion = "add_user_cliente_asesor";

                  $.post(
                    "../../controlador/UsuarioController.php",
                    {
                      funcion,
                      ids_clientes: JSON.stringify(data.ids_clientes),
                      fecha_now: fechaActual,
                      hora_now: horaActual,
                    },
                    (response) => {
                      console.log(response);
                      if (response.trim() == "add-user-cliente") {
                        alert("Se subieron correctamente todos los datos");
                        var urlActual = window.location.href;

                        // Eliminar la última parte de la URL (la carpeta actual)
                        var urlPadre = urlActual.substring(
                          0,
                          urlActual.lastIndexOf("/")
                        );
                        console.log(urlPadre);
                        // Redireccionar a la carpeta anterior
                        window.location.href = urlPadre;
                      } else {
                        alert("No se asigno, contacta al administrador"); // Rechaza la promesa si hay un error
                      }
                    }
                  );
                }
              }
            );
          } catch (error) {
            alert(error);
          }
        } else {
          alert("Debes seleccionar un origen de donde provienen los clientes");
        }
      } else {
      }
    } else {
      alert("Te faltan agregar asignaciones");
    }
  });

  function buscarMyProyects() {
    let funcion = "buscar_proyectos_admin";
    $.post(
      "../../controlador/UsuarioController.php",
      { funcion },
      (response) => {
        if (response.trim() === "no-register") {
          alert(
            "No tienes proyectos asignados, por favor contacto a tu proveedor"
          );
          $(".container-dashboard").html("No puede importar ningun archivo");
        } else {
          const proyectos = JSON.parse(response);
          let template = `
          <option value="0">Seleccione el proyecto</option>
          `;
          proyectos.forEach((proyecto) => {
            template += `
          <option value="${proyecto.id}">${proyecto.nombreProyecto}</option>
          `;
          });
          $("#listMyProyects").html(template);
        }
        console.log(response);
      }
    );
  }
});
