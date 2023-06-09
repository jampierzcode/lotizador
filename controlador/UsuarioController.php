<?php
include_once '../modelo/Usuario.php';
$usuario = new Usuario();
session_start();
$id_usuario = $_SESSION['id_usuario'];


// SECTION DASHBOARD CONTABILIDAD
if ($_POST["funcion"] == "buscar_datos_contabilidad") {
    $json = array();
    $usuario->buscar_datos_contabilidad();
    // echo $usuario->datos;
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'reservas' => $dato->reservas,
                'clientes' => $dato->clientes,
                'habitaciones' => $dato->habitaciones,
                'ventas' => $dato->ventas
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}



// SECTION DE CLIENTES
if ($_POST["funcion"] == "buscar_cliente") {
    $documento = $_POST["documento"];
    $json = array();
    $usuario->buscar_cliente($documento);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_cliente' => $dato->id_cliente,
                'nombres' => $dato->nombres,
                'documento' => $dato->documento
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_cliente_id") {
    $id_producto = $_POST["id_producto"];
    $json = array();
    $usuario->buscar_producto_id($id_producto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_productos' => $dato->id_productos,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio,
                'inventario' => $dato->inventario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "borrar_cliente") {
    $id_cliente = $_POST["id_cliente"];
    $usuario->borrar_cliente($id_cliente);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "edit_cliente") {
    $id_producto = $_POST["id_producto"];
    $nombre = $_POST["nombre"];
    $precio = $_POST["precio"];
    $inventario = $_POST["inventario"];
    $usuario->edit_producto($id_producto, $nombre, $precio, $inventario);
    echo $usuario->mensaje;
}

// FIN DE SECTION DE CLIENTES

// seccion usuarios
if ($_POST["funcion"] == "add_user") {
    $user = intval($_SESSION["id_usuario"]);
    $documento = intval($_POST["documento"]);
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $username = $_POST["username"];
    $password = md5($_POST["password"]);
    $usuario->add_user($user, $documento, $nombres, $apellidos, $correo, $username, $password);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "add_user_asesor") {
    $user = intval($_SESSION["id_usuario"]);
    $documento = intval($_POST["documento"]);
    $nombres = $_POST["nombres"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $phone = $_POST["phone"];
    $username = $_POST["username"];
    $password = md5($_POST["password"]);
    $usuario->add_user_asesor($user, $documento, $nombres, $apellidos, $correo, $phone, $username, $password);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "registar_servicios") {
    $permisos = $_POST["permisos"];
    $id_usuario = $_POST["id"];
    $usuario->add_permisos($id_usuario, $permisos);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "add_user_proyect") {
    $proyectos = $_POST["proyectos"];
    $id_usuario = $_POST["id"];
    $usuario->add_user_proyect($id_usuario, $proyectos);
    echo $usuario->mensaje;
}
// fin de seccion usuarios

// SECTION DE RESERVAS
if ($_POST["funcion"] == "buscar_reserva") {
    $id_habitacion = $_POST["id_habitacion"];
    $json = array();
    $usuario->buscar_reserva($id_habitacion);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_reservas' => $dato->id_reservas,
                'cliente' => $dato->cliente,
                'documento' => $dato->documento,
                'id_habitaciones' => $dato->id_habitaciones,
                'precio' => $dato->precio,
                'n_cuarto' => $dato->n_cuarto,
                'nombre_categoria' => $dato->nombre_categoria,
                'fecha_entrada' => $dato->fecha_entrada,
                'fecha_salida' => $dato->fecha_salida,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
// SECTION DE DETAIL RESERVAS
if ($_POST["funcion"] == "buscar_detail_reserva") {
    $id_reserva = $_POST["id_reserva"];
    $json = array();
    $usuario->buscar_detail_reserva($id_reserva);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_reservas' => $dato->id_reservas,
                'total' => $dato->total,
                'descuento' => $dato->descuento,
                'adelanto' => $dato->adelanto,
                'total_descuento' => $dato->total_descuento
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
// SECTION DE DETAIL CONSUMO
if ($_POST["funcion"] == "buscar_detail_consumo") {
    $id_reserva = $_POST["id_reserva"];
    $json = array();
    $usuario->buscar_detail_consumo($id_reserva);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_detalle_venta' => $dato->id_detalle_venta,
                'cantidad' => $dato->cantidad,
                'estado_pago' => $dato->estado_pago,
                'subtotal' => $dato->subtotal,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "subir_foto_producto") {
    if (($_FILES['imagen_producto']['type'] == 'image/jpeg') || ($_FILES['imagen_producto']['type'] == 'image/png') || ($_FILES['imagen_producto']['type'] == 'image/jpg')) {
        $nombre = uniqid() . '-' . $_FILES['imagen_producto']['name'];
        $ruta = '../img/productos/' . $nombre;
        move_uploaded_file($_FILES['imagen_producto']['tmp_name'], $ruta);
        echo $ruta;
    } else {
        echo "no_format_imagen";
    }
}

// FIN DE SECTION DE RESERVAS

// SECTION PRODUCTOS
if ($_POST["funcion"] == "crear_productos") {
    $nombre = $_POST["nombre"];
    $precio = $_POST["precio"];
    $inventario = $_POST["inventario"];
    $usuario->crear_productos($nombre, $precio, $inventario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "buscar_productos") {
    $json = array();
    $usuario->buscar_productos();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_productos' => $dato->id_productos,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio,
                'inventario' => $dato->inventario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_producto_id") {
    $id_producto = $_POST["id_producto"];
    $json = array();
    $usuario->buscar_producto_id($id_producto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_productos' => $dato->id_productos,
                'nombre' => $dato->nombre,
                'precio' => $dato->precio,
                'inventario' => $dato->inventario
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "borrar_producto") {
    $id_producto = $_POST["id_producto"];
    $usuario->borrar_producto($id_producto);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "edit_producto") {
    $id_producto = $_POST["id_producto"];
    $nombre = $_POST["nombre"];
    $precio = $_POST["precio"];
    $inventario = $_POST["inventario"];
    $usuario->edit_producto($id_producto, $nombre, $precio, $inventario);
    echo $usuario->mensaje;
}
// FIN DE SECTION PRODUCTOS

// SECTION DE VENTAS DE PRODUCTOS
if ($_POST["funcion"] == "registrar_ventas_productos") {
    $json = array();
    $productos = $_POST["carrito"];
    $id_reserva = $_POST["id_reserva"];
    $option = $_POST["option"];
    $usuario->registrar_ventas_productos($productos, $id_reserva, $option);
    echo $usuario->mensaje;
}
// FIN DE SECTION DE VENTAS DE PRODUCTOS



// SECTION PROYECTOS
if ($_POST["funcion"] == "crear_proyecto") {
    $created = intval($_SESSION['id_usuario']);
    $galeria = $_POST["galeria"];
    $proyecto_nombre = $_POST["proyecto_nombre"];
    $proyecto_lotes = intval($_POST["proyecto_lotes"]);
    $usuario->crear_proyecto($created, $proyecto_nombre, $proyecto_lotes, $galeria);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "update_user") {
    $data_user = $_POST["data_user"];
    $nombres = $data_user["user_nombres"];
    $id = $data_user["id"];
    $apellidos = $data_user["user_apellidos"];
    $documento = $data_user["user_documento"];
    $correo = $data_user["user_correo"];
    $phone = $data_user["user_phone"];
    $usuario->update_user($id, $nombres, $apellidos, $documento, $correo, $phone);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "asigned_user_proyecto") {
    $user = intVal($_POST["user"]);
    $id_proyecto = intVal($_POST["id_proyecto"]);
    $usuario->asigned_user_proyecto($id_proyecto, $user);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "delete_user") {
    $id = $_POST["id"];
    $usuario->delete_user($id);
    echo $usuario->mensaje;
}

if ($_POST["funcion"] == "buscar_proyectos") {
    $json = array();
    $usuario->buscar_proyectos();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id,
                'nombreProyecto' => $dato->nombre_proyecto,
                'creadorNombre' => $dato->creador_nombre,
                'creadorApellido' => $dato->creador_apellido,
                'imgUrl' => $dato->img_url,
                'status' => $dato->proyect_status
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_proyectos_user") {
    $json = array();
    $id_usuario = $_SESSION["id_usuario"];
    $usuario->buscar_proyectos_user($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id,
                'nombreProyecto' => $dato->nombre_proyecto,
                "phone_number" => $dato->phone_number,
                "id_agente" => $dato->id_agente,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_proyectos_admin") {
    $json = array();
    $usuario->buscar_proyectos_admin();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id' => $dato->id,
                'nombreProyecto' => $dato->nombre_proyecto,
                'clienteNombre' => $dato->cliente_nombre,
                'clienteApellido' => $dato->cliente_apellido,
                'imgUrl' => $dato->img_url,
                'status' => $dato->proyect_status
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_user_proyect") {
    $json = array();
    $id_proyecto = $_POST["id_proyecto"];
    $usuario->buscar_user_proyect($id_proyecto);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'rol'=>$dato->rol,
                'clienteNombre' => $dato->cliente_nombre,
                'clienteApellido' => $dato->cliente_apellido,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_admin") {
    $json = array();
    $usuario->buscar_usuarios_admin();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id_usuario' => $dato->id_usuario,
                'nombre' => $dato->nombre,
                'apellido' => $dato->apellido,
                'dni' => $dato->dni,
                'correo' => $dato->correo,
                'user' => $dato->user,
                'creator' => $dato->creator,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_usuarios_asesores") {
    $json = array();
    $id_usuario = $_SESSION["id_usuario"];
    $usuario->buscar_usuarios_asesores($id_usuario);
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id_usuario' => $dato->id_usuario,
                'nombre' => $dato->nombre,
                'apellido' => $dato->apellido,
                'phone_number' => $dato->phone_number,
                'dni' => $dato->dni,
                'correo' => $dato->correo,
                'user' => $dato->user,
                'status' => $dato->status
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar_servicios") {
    $json = array();
    $usuario->buscar_servicios();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id' => $dato->id,
                'nombre' => $dato->nombre_servicio,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "buscar-imagen-proyect") {
    $id = $_POST["id_proyect"];
    $usuario->buscar_imagen_proyect($id);
    $json = array();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'imgURL' => $dato->img_url,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "agregar_lotes") {
    $id = $_POST['id'];
    $lotes = $_POST['lotes'];
    $lotesArray = json_decode($lotes, true);
    // $usuario->crear_lote($id, $lote);
    foreach ($lotesArray as $lote) {
        # code..
        $loteAncho=$lote["loteAncho"];
        $loteLargo=$lote["loteLargo"];
        $loteArea=$lote["loteArea"];
        $loteMz=$lote["loteMz"];
        $loteNumero=$lote["loteNumero"];
        $lotePrecio=$lote["lotePrecio"];
        $tipo=$lote["tipo"];
        $coordenadas=json_encode($lote["coordenadas"]);
        $estado=$lote["estado"];
        $usuario->crear_lote($id, $loteAncho, $loteLargo, $loteArea, $loteMz, $loteNumero, $lotePrecio, $tipo, $estado, $coordenadas);
        echo $usuario->mensaje;
        
    }
}
if ($_POST["funcion"] == "buscar_lotes") {
    $id = $_POST["id"];
    $usuario->buscar_lotes($id);
    $json = array();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {

            $json[] = array(
                'id' => $dato->id,
                'ancho' => $dato->ancho,
                'largo' => $dato->largo,
                'area' => $dato->area,
                'numero' => $dato->numero,
                'mz_zona' => $dato->mz_zona,
                'precio' => $dato->precio,
                'tipo' => $dato->tipo,
                'cordinates' => json_decode($dato->cordinates),
                'estado' => $dato->estado
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}
if ($_POST["funcion"] == "edit_lote") {
    $id = $_POST["id_lote"];
    $estado = $_POST["select"];
    $usuario->edit_lote($id, $estado);
    $usuario->mensaje;
}

// fin de section proyectos


if ($_POST["funcion"] == "buscar_piso_hab") {
    $json = array();
    $usuario->buscar_piso_hab();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_piso' => $dato->id_piso,
                'numero_piso' => $dato->numero_piso
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

if ($_POST["funcion"] == "buscar_habs_ocupaded") {
    $json = array();
    $usuario->buscar_ocupaded_habs();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_habitaciones' => $dato->id_habitaciones,
                'n_cuarto' => $dato->n_cuarto,
                'precio' => $dato->precio,
                'nombre_categoria' => $dato->nombre_categoria,
                'numero_piso' => $dato->numero_piso,
                'estado' => $dato->nombre_estado
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

// FIN DE HABITACIONES

// SECTION RESERVAS
if ($_POST["funcion"] == "crear_reserva") {
    $cliente = $_POST["cliente"];
    $documento = $_POST["documento"];
    $ingreso = $_POST["ingreso"];
    $salida = $_POST["salida"];
    $descuento = $_POST["descuento"];
    $adelanto = $_POST["adelanto"];
    $observacion = $_POST["observacion"];
    $total = $_POST["total"];
    $id_hab = $_POST["id_hab"];
    $total_descuento = $_POST["total_descuento"];
    $usuario->crear_reserva($cliente, $documento, $id_hab, $ingreso, $salida, $descuento, $adelanto, $observacion, $total, $total_descuento);
    $_SESSION["msg-reserva"] = "add-reserva";
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "cerrar_reserva") {
    $total_pagar = $_POST["total_pagar"];
    $id_reserva = $_POST["id_reserva"];
    $id_hab = $_POST["id_hab"];
    $fecha_today = $_POST["fecha_today"];
    $usuario->cerrar_reserva($total_pagar, $id_reserva, $id_hab, $fecha_today, $id_usuario);
    echo $usuario->mensaje;
}
if ($_POST["funcion"] == "habitacion_limpieza_terminada") {
    $key = $_POST["key"];
    $usuario->habitacion_limpieza_terminada($key);
    echo $usuario->mensaje;
}

// FIN DE SECTION RESERVAS

// SECTION DE CLIENTES 
// CREAR CLIENTES DESDE RECEPCION

if ($_POST["funcion"] == "add_cliente") {
    $tipo_documento = $_POST["tipo_documento"];
    $documento = $_POST["documento"];
    $nombres = $_POST["nombres"];
    if ($tipo_documento == 1) {
        $documento_tipo = "DNI";
    } else {
        $documento_tipo = "RUC";
    }
    $usuario->add_cliente($documento_tipo, $documento, $nombres);
    echo $usuario->mensaje;
}
// BUSCAR CLIENTES


if ($_POST["funcion"] == "buscar_clientes") {
    $json = array();
    $usuario->buscar_clientes();
    if ($usuario->mensaje) {
        echo $usuario->mensaje;
    }
    if ($usuario->datos) {
        foreach ($usuario->datos as $dato) {
            $json[] = array(
                'id_cliente' => $dato->id_cliente,
                'nombres' => $dato->nombres,
                'tipo_documento' => $dato->tipo_documento,
                'documento' => $dato->documento
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
}

// FIN DE SECTION DE CLIENTES CREAR CLIENTES DESDE RECEPCION