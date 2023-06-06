<?php
session_start();
if(empty($_SESSION["us_tipo"])){
header("Location: ../../../index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lotizador</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
    <link rel="stylesheet" href="../../../css/Lotizador.css" />
</head>

<body>
    <div id="map1"></div>
    <!-- <div id="map2"></div> -->
    <?php if($_SESSION["us_tipo"]==1){?>
    <div class="containerLotizador">
        <div class="contentCreated">
            <button id="creaCotizacion" class="btnOptions">
                Crear Poligono +
            </button>
            <div class="createdZone addLote">
                <h3>Crear poligono</h3>
                <p style="font-size: 10px">El (.) es la separacion decimal</p>
                <div class="formCreated">
                    <div class="bodyForm">
                        <div class="cardGroup">
                            <label for="">Ancho</label>
                            <input id="loteAncho" type="number" placeholder="0" />
                        </div>
                        <div class="cardGroup">
                            <label for="">Largo</label>
                            <input id="loteLargo" type="number" placeholder="0" />
                        </div>
                        <div class="cardGroup">
                            <label for="">Area</label>
                            <input id="loteArea" type="number" placeholder="0" />
                        </div>
                        <div class="cardGroup">
                            <label for="">Mz</label>
                            <input id="loteMz" type="text" placeholder="0" />
                        </div>
                        <div class="cardGroup">
                            <label for="">N Lote</label>
                            <input id="loteNumero" type="number" placeholder="0" />
                        </div>
                        <div class="cardGroup">
                            <label for="">Precio</label>
                            <input id="lotePrecio" type="number" placeholder="0" />
                        </div>
                    </div>
                    <div class="footerForm">
                        <button id="crearLote" class="btnLotizador">
                            Crear Lote
                        </button>
                    </div>
                </div>
                <div class="closeForm">
                    <button id="closeCreated" class="btnLotizador">X</button>
                </div>
            </div>
        </div>
        <button class="btnOptions" onclick="copiarPoligono()">
            Copiar Polígono
        </button>
        <div class="contentCreated">
            <button id="addCarritoLotes" class="btnOptions showCarrito">
                Agregar al Carrito +
            </button>
            <div class="createdZone carrito">
                <h3>Lotes Dibujados</h3>
                <p style="font-size: 10px">Aqui se muestran todos lotes creados en tiempo real</p>
                <div class="formCreated">
                    <div class="listLotes" id="listCarrito">

                    </div>
                    <div class="footerForm">
                        <button id="guardarLotizador" class="btnLotizador">
                            Add Carrito
                        </button>
                    </div>
                </div>
                <div class="closeForm">
                    <button id="closeCarrito" class="btnLotizador">X</button>
                </div>
            </div>
        </div>
    </div>
    <?php }?>
    <?php if($_SESSION["us_tipo"]==1){?>
    <div class="containerLotes">
        <h3>Mis lotes</h3>

        <div id="listLotes" class="listLotes"></div>
    </div>
    <div class="containerCopyLotes"></div>
    <?php } else if($_SESSION["us_tipo"]==2){?>
    <div class="container-loteActual">
        <h3>Lote: <span numberKey="" key="" id="lote"></span></h3>
        <div class="listDetail">
            <p>Ancho: <span id="ancho"></span></p>
            <p>Largo: <span id="largo"></span></p>
            <p>Area: <span id="area"></span></p>
            <p>Precio: <span id="precio"></span></p>

        </div>
        <p class="container-estado" id="estadoLote">
        </p>
        <div class="container-edit-status md-hidden">
            <select id="selectStatus" name="estado">
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="SEPARADO">SEPARADO</option>
                <option value="OCUPADO">OCUPADO</option>
            </select>
            <button id="cancelEdit" class="btnLotizador">Cancelar</button>
            <button id="changeEdit" class="btnLotizador">cambiar</button>

        </div>
        <!-- <div>
            <button class="btnLotizador">Me interesa</button>
        </div> -->
    </div>
    <?php }?>


    <script src="../../../js/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
    <?php if($_SESSION["us_tipo"]==1){?>
    <script src="./lotizador.js"></script>
    <?php } else if($_SESSION["us_tipo"]==2){?>
    <script src="./lotizador_admin.js"></script>

    <?php }?>
</body>

</html>