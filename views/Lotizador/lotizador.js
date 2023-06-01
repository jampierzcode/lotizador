$(document).ready(function () {
  var polygons = [];
  var poligonoSeleccionado = null;
  var creacionHabilitada = false;
  var loteAncho;
  var loteLargo;
  var loteArea;
  var loteMz;
  var loteNumero;
  var lotePrecio;
  fetchLotes();

  // Crear los dos mapas con CRS.Simple
  var map1 = L.map("map1", {
    crs: L.CRS.Simple,
    minZoom: -4,
    maxZoom: 4,
    zoom: 0,
  }).setView([0, 0], 1);

  // Definir las dimensiones y límites de la imagen
  var imageWidth = 800;
  var imageHeight = 0;
  var imageBounds = [
    [0, 0],
    [0, imageWidth],
  ];

  var desiredWidth = 1000;

  // Capa base de la imagen para ambos mapas
  var imageUrl = "../../img/lote.png"; // Ruta de la imagen
  var image = L.imageOverlay(imageUrl, map1.getBounds()).addTo(map1);
  // image.on("load", function () {
  //   // Establecer la anchura y la altura automática de la imagen
  //   image._image.style.width = desiredWidth + "px";
  //   image._image.style.height = "auto";

  //   // Obtener el ancho del contenedor del mapa
  //   var mapContainerWidth = map1._container.offsetWidth;

  //   // Calcular el margen izquierdo para centrar la imagen
  //   var marginLeft = (mapContainerWidth - desiredWidth) / 2;
  //   image._image.style.marginLeft = marginLeft + "px";
  // });

  // Capa de dibujo para cada mapa
  var drawnItems1 = new L.FeatureGroup().addTo(map1);
  // var drawnItems2 = new L.FeatureGroup().addTo(map2);

  // Configurar el control de dibujo para cada mapa
  var drawControl1 = new L.Control.Draw({
    draw: {
      polygon: false,
      marker: false,
      circlemarker: false,
      circle: false,
      polyline: false,
      rectangle: false,
    },
    edit: {
      featureGroup: drawnItems1,
    },
  });
  map1.addControl(drawControl1);
  // crear poligono en el mapa
  map1.on(L.Draw.Event.CREATED, function (event) {
    if (!creacionHabilitada) {
      // La creación de polígonos no está habilitada
      return;
    }
    var layer = event.layer;
    drawnItems1.addLayer(layer);

    var coordinates = layer.getLatLngs();
    // Obtener las coordenadas del polígono

    agregarPoligonos(layer, coordinates);
    drawControl1.setDrawingOptions({ polygon: false }); // Habilitar la creación de polígonos
    drawControl1.setDrawingOptions({ rectangle: false }); // Habilitar la creación de polígonos
    map1.addControl(drawControl1);
  });
  // seleccionar el poligono en el map
  drawnItems1.on("click", function (event) {
    var layer = event.layer;
    poligonoSeleccionado = layer;
  });

  function agregarPoligonos(layer, coordinates) {
    // Guardar la información en el array de polígonos
    var polygon = {
      loteAncho,
      loteLargo,
      loteArea,
      loteMz,
      loteNumero,
      lotePrecio,
      coordinates: coordinates,
      options: layer.options,
    };
    polygons.push(polygon);
    console.log(polygons);
    $(".createdZone").removeClass("active");
    fetchLotes();
  }
  function fetchLotes() {
    let template = "";
    if (polygons.length > 0) {
      polygons.map((lote) => {
        template += `
        <button class="btnLotizador dragSquare">MZ: ${lote.loteMz} NLote: ${lote.loteNumero} Precio: ${lote.lotePrecio} Area: ${lote.loteArea}</button>
        `;
      });
    } else {
      template += `
      <button class="btnLotizador dragSquare">No hay lotes</button>
      `;
    }
    $(".listLotes").html(template);
    loteAncho = 0;
    loteLargo = 0;
    loteArea = 0;
    loteMz = 0;
    loteNumero = 0;
    lotePrecio = 0;
  }
  $("#creaCotizacion").click(() => {
    $(".createdZone").addClass("active");
  });
  $("#closeCreated").click(() => {
    $(".createdZone").removeClass("active");
  });
  $("#crearLote").click(() => {
    loteAncho = $("#loteAncho").val();
    loteLargo = $("#loteLargo").val();
    loteArea = $("#loteArea").val();
    loteMz = $("#loteMz").val();
    loteNumero = $("#loteNumero").val();
    lotePrecio = $("#lotePrecio").val();
    if (
      (loteArea !== "" && loteMz !== "" && loteNumero > 0, lotePrecio !== "")
    ) {
      creacionHabilitada = true;
      console.log(drawControl1);
      drawControl1.setDrawingOptions({ polygon: true }); // Habilitar la creación de polígonos
      drawControl1.setDrawingOptions({ rectangle: true }); // Habilitar la creación de polígonos
      map1.addControl(drawControl1);
    } else {
      // Nombre o precio no ingresados o inválidos
      creacionHabilitada = false;
      alert("Te faltan llenar campos para crear el poligono");
    }
  });
  function copiarPoligono() {
    // Verificar si hay un polígono seleccionado
    if (poligonoSeleccionado) {
      console.log(poligonoSeleccionado);
      // Obtener las coordenadas del polígono seleccionado
      var coordenadas = poligonoSeleccionado.getLatLngs();
      console.log(coordenadas);

      // Calcular el ancho del polígono seleccionado
      var bounds = poligonoSeleccionado.getBounds();
      var ancho = bounds.getEast() - bounds.getWest();

      // Determinar la dirección de la copia (derecha o izquierda)
      var direccion = "derecha"; // Puedes cambiar a 'izquierda' si deseas la dirección opuesta

      // Crear una copia del polígono desplazada
      var copiaPoligono = L.polygon(coordenadas, { color: "#001529" }).addTo(
        map1
      );
      // copiaPoligono.enableEdit(); // Habilitar la edición del polígono

      // Establecer las coordenadas de la copia del polígono desplazadas según la dirección
      var desplazamientoX = direccion === "derecha" ? ancho : -ancho;
      var nuevasCoordenadas = coordenadas[0].map(function (coordenada) {
        return L.latLng(coordenada.lat, coordenada.lng + desplazamientoX);
      });
      copiaPoligono.setLatLngs(nuevasCoordenadas);

      // Agregar la copia del polígono al grupo de capas
      drawnItems1.addLayer(copiaPoligono);
    } else {
      alert("No hay un polígono seleccionado.");
    }
  }

  // ...código posterior...ert("No hay un polígono seleccionado.");
});
