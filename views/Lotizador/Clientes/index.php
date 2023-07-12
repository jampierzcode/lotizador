<?php
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lotizador</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
    <link rel="stylesheet" href="../../../css/main.css" />
    <link rel="stylesheet" href="../../../css/Lotizador.css" />
</head>

<body>
    <div id="map1"></div>
    <div class="container-loteActual">
        <h3>Mz/Zn: <span numberKey="" key="" id="mz_zonas"></span> Lote: <span numberKey="" key="" id="lote"></span>
        </h3>
        <div class="listDetail">
            <p>Ancho: <span id="ancho"></span></p>
            <p>Largo: <span id="largo"></span></p>
            <p>Area: <span id="area"></span></p>
            <p>Precio: <span id="precio"></span></p>

        </div>
        <p class="container-estado" id="estadoLote">
        </p>
        <!-- <div>
            <button class="btnLotizador">Me interesa</button>
        </div> -->
    </div>


    <script src="../../../js/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />

    <script src="./lotizador.js"></script>
</body>

</html>