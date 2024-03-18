<?php
include_once '../modelo/Caja.php';
$caja = new Caja();
session_start();
$id_usuario = $_SESSION['id_usuario'];

if ($_POST["funcion"] == "buscar_cajas") {
    $creator = $_SESSION["creator"];
    $caja->buscar_cajas($creator);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_caja_abierta") {
    $user = $id_usuario;
    $caja->buscar_caja_abierta($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        if (!isset($_SESSION["caja_abierta"])) {
            $_SESSION["caja_abierta"] = $caja->datos[0]->id;
        }
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
// ventas financiero
if ($_POST["funcion"] == "registrar_venta_financiero") {
    $fecha = $_POST["fecha"];
    $hora = $_POST["hora"];
    $proyecto_id = $_POST["proyecto_id"];
    $cliente_id = $_POST["cliente_id"];
    $tipo_venta = $_POST["tipo_venta"];
    $tipo_pago = $_POST["tipo_pago"];
    $monto_inicial = $_POST["monto_inicial"];
    $monto_separacion = $_POST["monto_separacion"];
    $fecha_programacion = $_POST["fecha_programacion"];
    $status = $_POST["status"];
    $total = $_POST["suma"];
    $user = $id_usuario;
    $caja->registrar_venta_financiero($monto_separacion, $fecha_programacion, $tipo_pago, $monto_inicial, $fecha, $hora, $proyecto_id, $cliente_id, $tipo_venta, $total, $user, $status);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_detalle_venta") {
    $venta_id = $_POST["venta_id"];
    $data = json_decode($_POST["cart_items"]);
    $caja->registrar_detalle_venta($data, $venta_id);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_cronograma_pagos") {
    $venta_id = $_POST["venta_id"];
    $data = json_decode($_POST["cronograma"]);
    $caja->registrar_cronograma_pagos($data, $venta_id);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "cambiar_estado") {
    $data = json_decode($_POST["cart_items"]);
    $estado = $_POST["tipo_venta"];
    $caja->cambiar_estado($data, $estado);
    echo json_encode($caja->mensaje);
}
if ($_POST["funcion"] == "registrar_transaccion") {
    $venta_id = $_POST["venta_id"];
    $turno = $_POST["turno"];
    $suma = $_POST["suma"];
    $metodo_pago = $_POST["metodo_pago"];
    $fecha = $_POST["fecha"];
    $motivo_operacion = $_POST["motivo_operacion"];
    $caja->registrar_transaccion($venta_id, $turno, $suma, $metodo_pago, $fecha, $motivo_operacion);
    echo json_encode($caja->mensaje);
}
// pago de cuotas
if ($_POST["funcion"] == "pagar_cuota") {
    $fecha_pagada = $_POST["fecha_pagada"];
    $id = $_POST["id"];
    $status = $_POST["status"];
    $caja->pagar_cuota($id, $fecha_pagada, $status);
    echo json_encode($caja->mensaje);
}


if ($_POST["funcion"] == "buscar_finanzas_turno") {
    $caja_id = $_POST["id"];
    $caja->buscar_finanzas_turno($caja_id);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_ventas_caja") {
    $user = $id_usuario;
    $caja->buscar_ventas_caja($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_cronograma_pagos") {
    $user = $id_usuario;
    $caja->buscar_cronograma_pagos($user);
    if ($caja->mensaje) {
        echo $caja->mensaje;
    }
    if ($caja->datos) {
        $jsonstring = json_encode($caja->datos);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "registrar_turno") {
    $caja_id = $_POST["id"];
    $fecha = $_POST["fecha"];
    $monto_apertura = $_POST["monto_apertura"];
    $user = $id_usuario;
    $caja->registrar_turno($caja_id, $fecha, $monto_apertura, $user);
    echo $caja->mensaje;
}
if ($_POST["funcion"] == "cerrar_turno") {
    $id = $_POST["id"];
    $monto_cierre = $_POST["monto_cierre"];
    $fecha_cierre = $_POST["fecha_cierre"];
    $caja->cerrar_turno($id, $monto_cierre, $fecha_cierre);
    echo $caja->mensaje;
}
