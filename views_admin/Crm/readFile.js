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
    { readCol: "origen" },
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
  // Crear una función que realizará la solicitud post y devolverá una promesa
  function performPostRequest(result, funcion, proyecto_id) {
    return new Promise((resolve, reject) => {
      $.post(
        "../../controlador/UsuarioController.php",
        { funcion, result, proyecto_id },
        (response) => {
          console.log(response);

          if (data.hasOwnProperty("error")) {
            // Si la respuesta contiene un mensaje de error, muestra el mensaje
            reject(data.error);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
  $("body").on("click", "#subirData", function () {
    const asignaciones = [];
    const proyecto_id = $("#listMyProyects").val();
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
          registro[position] === null || registro[position] === ""
            ? ""
            : registro[position];
      });
      return obj;
    });
    console.log(asignaciones);
    console.log(resultado);
    console.log(contadorAsignacion);
    if (asignaciones.length === contadorAsignacion) {
      if (proyecto_id !== "0") {
        let funcion = "add_cliente2"; // Cambiamos la función a "add_clientes"
        // const dataToInsert = []; // Array para almacenar los datos a insertar

        // Llenar el array de datos a insertar
        // resultado.forEach((result) => {
        //   dataToInsert.push(result);
        // });
        const jsonData = JSON.stringify(resultado);
        console.log(jsonData);
        // Realizar una única solicitud con todos los datos
        performPostRequest(jsonData, funcion, proyecto_id)
          .then((response) => {
            console.log(response);
            alert("Se subieron correctamente todos los datos");
            var urlActual = window.location.href;
            var urlPadre = urlActual.substring(0, urlActual.lastIndexOf("/"));
            console.log(urlPadre);
            window.location.href = urlPadre;
          })
          .catch((error) => {
            alert("Se produjo un error: " + error);
          });
      } else {
        alert("Debes seleccionar un proyecto a donde asignar los clientes");
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
