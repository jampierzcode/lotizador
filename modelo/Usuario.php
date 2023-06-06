<?php
include_once "Conexion.php";

class Usuario
{
    var $datos;
    var $mensaje;

    public function __construct()
    {
        // se va a conectar a la base de datos
        $db = new Conexion(); // $db ya no es una variable es un objeto
        $this->conexion = $db->pdo;
        // $this hace referencia al objeto que se crea en una instancia de clase
    }

    function view_permisos($id_usuario)
    {
        $sql = "SELECT SER.nombre_servicio FROM permisos as PER inner join servicios as SER on PER.id_servicio=SER.id inner join usuario as USER on PER.id_usuario=USER.id_usuario WHERE PER.id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        return $this->datos;
    }
    function Loguearse($username, $password)
    {
        $sql = "SELECT id_usuario, nombre, apellido, usuarioRol as tipo FROM usuario WHERE user=:username and password=:password";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':username' => $username, ':password' => $password));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        return $this->datos;
    }
    function buscar_datos_contabilidad()
    {
        $sql = "SELECT count(*) as reservas, (SELECT count(*) FROM cliente) as clientes, (SELECT count(*) FROM habitaciones) as habitaciones, (SELECT SUM(total) FROM ventas) as ventas FROM reservas";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll();
        // $this->datos = $query->fetchColumn();
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = 0;
            return $this->mensaje;
        }
    }
    function buscar_piso_hab()
    {
        $sql = "SELECT id_piso, numero_piso FROM piso";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "Falta crear pisos";
            return $this->mensaje;
        }
    }
    function buscar_usuarios_admin()
    {
        $sql = "SELECT ADMIN.id_usuario, ADMIN.nombre, ADMIN.apellido, ADMIN.dni, ADMIN.correo, ADMIN.user, CREATOR.nombre as creator FROM usuario as ADMIN inner join usuario as CREATOR on ADMIN.createdBy=CREATOR.id_usuario WHERE ADMIN.usuarioRol=2";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-users-admin";
            return $this->mensaje;
        }
    }
    function buscar_usuarios_asesores($id_usuario)
    {
        $sql = "SELECT id_usuario, nombre, apellido, dni, correo, phone_number, user, usuarioStatus as status FROM usuario WHERE createdBy=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_usuario"=>$id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-users-asesor";
            return $this->mensaje;
        }
    }
    function buscar_servicios()
    {
        $sql = "SELECT id, nombre_servicio FROM servicios";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-services";
            return $this->mensaje;
        }
    }

    function buscar_imagen_proyect($id)
    {
        $sql = "SELECT imgUrl as img_url FROM proyectos WHERE id=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id"=>$id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }


    function crear_lote($id, $loteAncho, $loteLargo, $loteArea, $loteMz, $loteNumero, $lotePrecio, $tipo, $estado, $coordenadas)
    {
        $sql = "INSERT INTO lotes(proyectoID, ancho, largo, area, numero, mz_zona, precio, tipo, cordinates, estado ) VALUES (:proyectoID, :ancho, :largo, :area, :numero, :mz_zona, :precio, :tipo, :cordinates, :estado)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":proyectoID" => $id, ":ancho"=> $loteAncho, ":largo"=>$loteLargo, ":area"=>$loteArea, ":numero"=>$loteNumero,":mz_zona"=>$loteMz, ":precio"=>$lotePrecio, ":tipo"=>$tipo, ":cordinates"=>$coordenadas, ":estado"=>$estado));
            $this->mensaje = "add-lotes";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-lotes";
            return $this->mensaje;
        }
    }

function buscar_lotes($id){
    $sql = "SELECT * FROM lotes WHERE proyectoID=:id";
    $query = $this->conexion->prepare($sql);
        $query->execute(array(":id"=>$id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }    
}
function edit_lote($id, $estado){
    $sql = "UPDATE lotes SET estado=:estado WHERE id=:id_lote";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_lote" => $id, ":estado" => $estado));
            $this->mensaje = "update-lote";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-lote" . $error;
            return $this->mensaje;
        } 
}

    function crear_habitaciones($n_habitacion, $habs_piso, $habs_cat, $caracteristicas)
    {
        $sql = "INSERT INTO habitaciones(n_cuarto, categoria, piso, estado, caracteristicas) VALUES (:n_cuarto, :categoria, :piso, :estado, :caracteristicas)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":n_cuarto" => $n_habitacion, ":categoria" => $habs_cat, ":piso" => $habs_piso, ":estado" => 1, ":caracteristicas"=>$caracteristicas));
            $this->mensaje = "add-habs";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-habs";
            return $this->mensaje;
        }
    }
    function crear_proyecto($created, $proyecto_nombre, $proyecto_lotes, $galeria)
    {
        $sql = "INSERT INTO proyectos(nombreProyecto, imgUrl, cantLotes, createdBy, proyectStatus) VALUES (:nombre, :img, :lotes, :created, :status)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $proyecto_nombre, ":img"=>$galeria, ":lotes"=> $proyecto_lotes, ":created"=>$created, ":status"=> "CREADA"));
            $this->mensaje = "add-proyecto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-proyecto" . $error;
            return $this->mensaje;
        }
    }
    function update_user($id, $nombres, $apellidos, $documento, $correo, $phone)
    {
        $sql = "UPDATE usuario SET nombre=:nombre, apellido=:apellido, dni=:dni, correo=:correo, phone_number=:phone_number WHERE id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $nombres, ":apellido"=>$apellidos, ":dni"=>$documento, ":correo"=>$correo, ':phone_number'=> $phone, ":id_usuario"=>$id));
            $this->mensaje = "update-usuario";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-usuario" . $error;
            return $this->mensaje;
        }
    }
    function asigned_user_proyecto($id_proyecto, $id_user)
    {
        $sql = "INSERT INTO user_proyect(user_id, proyecto_id) VALUES (:user_id, :proyecto_id)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":user_id" => $id_user, ":proyecto_id"=>$id_proyecto));
            $this->mensaje = "user-asigned";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-user-signed" . $error;
            return $this->mensaje;
        }
    }
    function delete_user($id)
    {
        $sql = "DELETE FROM usuario WHERE id_usuario=:id_usuario";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_usuario"=>$id));
            $this->mensaje = "delete-usuario";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-delete-usuario" . $error;
            return $this->mensaje;
        }
    }




    function crear_piso_habitaciones($piso_nombre)
    {
        $sql = "INSERT INTO piso(numero_piso) VALUES (:numero_piso)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":numero_piso" => $piso_nombre));
            $this->mensaje = "add-piso-habs";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-piso-habs";
            return $this->mensaje;
        }
    }
    function register_visitas($agente)
    {
        // Verificar si ya existe un registro para el agente
        $selectSql = "SELECT numero_visitas FROM visitas WHERE agente_id = :agente";
        $selectQuery = $this->conexion->prepare($selectSql);
        $selectQuery->execute(array(":agente" => $agente));
        $row = $selectQuery->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            // Existe un registro para el agente, incrementar el contador
            $contador = $row['numero_visitas'] + 1;

            $updateSql = "UPDATE visitas SET numero_visitas = :contador WHERE agente_id = :agente";
            $updateQuery = $this->conexion->prepare($updateSql);
            $updateQuery->execute(array(":contador" => $contador, ":agente" => $agente));

            $this->mensaje = "update-visita";
        } else {
            // No existe un registro para el agente, agregar uno nuevo con contador 1
            $insertSql = "INSERT INTO visitas(agente_id, numero_visitas) VALUES (:agente, 1)";
            $insertQuery = $this->conexion->prepare($insertSql);
            $insertQuery->execute(array(":agente" => $agente));

            $this->mensaje = "add-visita";
        }

        return $this->mensaje;
    }

    

    function buscar_proyectos()
    {
        $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.imgUrl as img_url, PRO.proyectStatus as proyect_status, CREATOR.nombre as creador_nombre, CREATOR.apellido as creador_apellido FROM proyectos as PRO inner join usuario as CREATOR on PRO.createdBy=CREATOR.id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    // function buscar_proyectos_user($id_usuario, $proyectos)
    // {
    //     foreach ($proyectos as $proyecto) {
    //         try{
    //             # code...
    //             $sql = "INSERT INTO user_proyect(user_id, proyecto_id) VALUES (:id_usuario, :id_proyecto)";
    //             $query = $this->conexion->prepare($sql);
    //             $query->execute(array(":id_usuario" =>$id_usuario, ':id_proyecto'=>$proyecto));
    //         }catch(\Throwable $error){
    //             $this->mensaje = "no-add-services" . $error;
    //             return $this->mensaje;
    //         }            
    //     }
    //     $this->mensaje = "add-proyectos";
    //     return $this->mensaje;
    // }
    function buscar_proyectos_user($id_usuario)
    {
        try{
            # code...
            $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, USPRO.user_id as id_agente, USER.phone_number FROM user_proyect as USPRO inner join usuario as USER on USPRO.user_id=USER.id_usuario inner join proyectos as PRO on USPRO.proyecto_id=PRO.id WHERE USPRO.user_id=:id_usuario";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":id_usuario" =>$id_usuario));
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register";
                return $this->mensaje;
            }
        }catch(\Throwable $error){
            $this->mensaje = "no-proyectos" . $error;
            return $this->mensaje;
        }         
    }
    // function buscar_proyectos()
    // {
    //     $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.imgUrl as img_url, PRO.proyectStatus as proyect_status ,CLIENTE.nombre as cliente_nombre, CLIENTE.apellido as cliente_apellido, CREATOR.nombre as creador_nombre, CREATOR.apellido as creador_apellido FROM proyectos as PRO inner join usuario as CLIENTE on PRO.clienteID=CLIENTE.id_usuario inner join usuario as CREATOR on PRO.createdBy=CREATOR.id_usuario";
    //     $query = $this->conexion->prepare($sql);
    //     $query->execute();
    //     $this->datos = $query->fetchAll(); // retorna objetos o no
    //     if (!empty($this->datos)) {
    //         return $this->datos;
    //     } else {
    //         $this->mensaje = "no-register";
    //         return $this->mensaje;
    //     }
    // }
    function buscar_proyectos_admin()
    {
        $sql = "SELECT PRO.id, PRO.nombreProyecto as nombre_proyecto, PRO.imgUrl as img_url, PRO.proyectStatus as proyect_status, USER.nombre as cliente_nombre, USER.apellido as cliente_apellido FROM user_proyect as USPRO inner join proyectos as PRO on USPRO.proyecto_id=PRO.id inner join usuario as USER on USPRO.user_id=USER.id_usuario WHERE USPRO.user_id=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id"=>$_SESSION["id_usuario"]));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_user_proyect($id_proyecto)
    {
        $sql = "SELECT CLIENTE.usuarioRol as rol, CLIENTE.nombre as cliente_nombre, CLIENTE.apellido as cliente_apellido FROM user_proyect as PROUSER inner join usuario as CLIENTE on PROUSER.user_id=CLIENTE.id_usuario  inner join proyectos as PRO on PROUSER.proyecto_id=PRO.id WHERE PRO.id=:id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id"=>$id_proyecto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {
            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ocupaded_habs()
    {
        $sql = "SELECT HAB.id_habitaciones, C_HAB.precio, ES.nombre_estado, HAB.n_cuarto, C_HAB.nombre_categoria, PS.numero_piso FROM habitaciones as HAB inner join cat_habitaciones as C_HAB on HAB.categoria=C_HAB.id_cat_habitaciones inner join piso as PS on HAB.piso=PS.id_piso inner join estado_habitacion as ES on HAB.estado=ES.id_estado_habitacion WHERE HAB.estado=:estado";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":estado" => 2));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen registro de habitaciones";
            return $this->mensaje;
        }
    }


    // SECTION DE RESERVAS
    function buscar_reserva($id_habitacion)
    {
        $sql = "SELECT HAB.id_habitaciones, C_HAB.precio, HAB.n_cuarto, C_HAB.nombre_categoria, RE.id_reservas, RE.cliente, RE.documento, RE.fecha_entrada, RE.fecha_salida FROM reservas as RE inner join habitaciones as HAB on RE.habitacion=HAB.id_habitaciones inner join cat_habitaciones as C_HAB on HAB.categoria=C_HAB.id_cat_habitaciones  WHERE habitacion=:id_habitacion AND RE.estado_reserva='creado'";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_habitacion" => $id_habitacion));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen reservas en esta habitacion";
            return $this->mensaje;
        }
    }
    function buscar_detail_reserva($id_reserva)
    {
        $sql = "SELECT id_reservas, total, adelanto, descuento, total_descuento FROM reservas WHERE id_reservas=:id_reserva";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_reserva" => $id_reserva));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen  esta reserva";
            return $this->mensaje;
        }
    }
    function buscar_detail_consumo($id_reserva)
    {
        $sql = "SELECT RE.id_detalle_venta, RE.cantidad, RE.estado_pago, RE.subtotal, PRO.nombre, PRO.precio FROM detalle_venta as RE inner join productos as PRO on RE.id_producto=PRO.id_productos WHERE id_reserva=:id_reserva";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_reserva" => $id_reserva));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen registros de ventas para esta habitacion";
            return $this->mensaje;
        }
    }
    // FIN DE SECTION DE RESERVAS


    // SECTION PRODUCTOS
    function crear_productos($nombre, $precio, $inventario)
    {
        $sql = "INSERT INTO productos(nombre, precio, inventario) VALUES (:nombre, :precio, :inventario)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":nombre" => $nombre, ":precio" => $precio, ":inventario" => $inventario));
            $this->mensaje = "add-producto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-producto";
            return $this->mensaje;
        }
    }
    function edit_producto($id_producto, $nombre, $precio, $inventario)
    {
        $sql = "UPDATE productos SET nombre=:nombre, precio=:precio, inventario=:inventario WHERE id_productos=:id_producto";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_producto" => $id_producto, ":nombre" => $nombre, ":precio" => $precio, ":inventario" => $inventario));
            $this->mensaje = "update-producto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-update-producto" . $error;
            return $this->mensaje;
        }
    }
    function buscar_productos()
    {
        $sql = "SELECT * FROM productos";
        $query = $this->conexion->prepare($sql);
        $query->execute();
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-create-products";
            return $this->mensaje;
        }
    }
    function buscar_producto_id($id_producto)
    {
        $sql = "SELECT * FROM productos WHERE id_productos=:id_producto";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":id_producto" => $id_producto));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-existe-products";
            return $this->mensaje;
        }
    }
    function borrar_producto($id_producto)
    {
        $sql = "DELETE FROM productos WHERE id_productos=:id_productos";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_productos" => $id_producto));
            $this->mensaje = "remove-producto";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-producto";
            return $this->mensaje;
        }
    }
    // FIN DE SECTION PRODUCOTS

    // SECTION DE REGISTRO DE VENTAS DE PRODUCTOS A LAS HABITACIONES
    function registrar_ventas_productos($productos, $id_reserva, $option)
    {
        if ($option == 0) {
            $estado = "PAGADO";
        } else {
            $estado = "NO PAGADO";
        }
        for ($i = 0; $i < count($productos); $i++) {

            $sql = "INSERT INTO detalle_venta(id_reserva,id_producto,cantidad,subtotal, estado_pago) VALUES (:id_reserva,:id_producto,:cantidad,:subtotal, :estado_pago)";
            $query = $this->conexion->prepare($sql);

            $query->execute(array(":id_reserva" => $id_reserva, ":id_producto" => $productos[$i]["id"], ":cantidad" => $productos[$i]["cantidad"], ":subtotal" => $productos[$i]["cantidad"] * $productos[$i]["precio"], ":estado_pago" => $estado));
        }
        $this->mensaje = "add-producto";
        return $this->mensaje;
    }
    // FIN DE SECTION DE REGISTRO DE VENTAS DE PRODUCTOS A LAS HABITACIONES








    // SECTION CLIENTES
    function buscar_cliente($documento)
    {
        $sql = "SELECT id_cliente, nombres, documento FROM cliente WHERE documento=:documento";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":documento" => $documento));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "No existen registro de este cliente cree uno nuevo";
            return $this->mensaje;
        }
    }
    function add_cliente($documento_tipo, $documento, $nombres)
    {
        $sql = "SELECT id_cliente, nombres, documento FROM cliente WHERE documento=:documento";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":documento" => $documento));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            $this->mensaje = "Existe el cliente";
            return $this->mensaje;
        } else {
            try {
                $sql = "INSERT INTO cliente(nombres, tipo_documento, documento) VALUES(:nombres, :tipo_documento, :documento)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":nombres" => $nombres, ":tipo_documento" => $documento_tipo, ":documento" => $documento));
                $this->mensaje = "add-cliente";
                return $this->mensaje;
            } catch (\Throwable $error) {
                $this->mensaje = "no-add-cliente" . $error;
                return $this->mensaje;
            }
        }
    }
    function add_user($user, $documento, $nombres, $apellidos, $correo, $username, $password)
    {
        $sql = "SELECT * FROM usuario WHERE user=:username";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":username" => $username));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            $this->mensaje = "Existe el usuario";
            return $this->mensaje;
        } else {
            try {
                $this->conexion->beginTransaction();
                $sql = "INSERT INTO usuario(nombre, apellido, dni, correo, user, password, usuarioRol, createdBy, usuarioStatus) VALUES(:nombre, :apellido, :dni, :correo, :username, :password, :usuarioRol, :createdBy, :usuarioStatus)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":nombre" =>$nombres, ':apellido'=>$apellidos, ':dni'=>$documento, ':correo'=>$correo, ":username"=>$username, ":password"=>$password,
                ":usuarioRol"=>2, ":createdBy"=>$user, ":usuarioStatus"=>true));
                
                $usuarioId = $this->conexion->lastInsertId(); // Obtener el ID del usuario insertado

                $this->conexion->commit(); // Confirmar la transacción

                $this->mensaje = $usuarioId;
                return $this->mensaje;
            } catch (\Throwable $error) {
                $this->mensaje = "no-add-cliente" . $error;
                return $this->mensaje;
            }
        }
    }
    function add_user_asesor($user, $documento, $nombres, $apellidos, $correo, $phone, $username, $password)
    {
        $sql = "SELECT * FROM usuario WHERE user=:username";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(":username" => $username));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            $this->mensaje = "Existe el usuario";
            return $this->mensaje;
        } else {
            try {
                $sql = "INSERT INTO usuario(nombre, apellido, dni, correo, phone_number, user, password, usuarioRol, createdBy, usuarioStatus) VALUES(:nombre, :apellido, :dni, :correo, :phone_number, :username, :password, :usuarioRol, :createdBy, :usuarioStatus)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":nombre" =>$nombres, ':apellido'=>$apellidos, ':dni'=>$documento, ':correo'=>$correo, ':phone_number'=>$phone, ":username"=>$username, ":password"=>$password,
                ":usuarioRol"=>3, ":createdBy"=>$user, ":usuarioStatus"=>true)); // Confirmar la transacción

                $this->mensaje = "add-user-asesor";
                return $this->mensaje;
            } catch (\Throwable $error) {
                $this->mensaje = "no-add-cliente" . $error;
                return $this->mensaje;
            }
        }
    }
    function add_permisos($id_usuario, $permisos){
        foreach ($permisos as $permiso) {
            try{
                # code...
                $sql = "INSERT INTO permisos(id_usuario, id_servicio) VALUES (:id_usuario, :id_servicio)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":id_usuario" =>$id_usuario, ':id_servicio'=>$permiso));
            }catch(\Throwable $error){
                $this->mensaje = "no-add-services" . $error;
                return $this->mensaje;
            }            
        }
        $this->mensaje = "add-services";
        return $this->mensaje;

    }
    function add_user_proyect($id_usuario, $proyectos){
        foreach ($proyectos as $proyecto) {
            try{
                # code...
                $sql = "INSERT INTO user_proyect(user_id, proyecto_id) VALUES (:id_usuario, :id_proyecto)";
                $query = $this->conexion->prepare($sql);
                $query->execute(array(":id_usuario" =>$id_usuario, ':id_proyecto'=>$proyecto));
            }catch(\Throwable $error){
                $this->mensaje = "no-add-proyectos" . $error;
                return $this->mensaje;
            }            
        }
        $this->mensaje = "add-user-proyects";
        return $this->mensaje;

    }
    function borrar_cliente($id_cliente)
    {
        $sql = "DELETE FROM cliente WHERE id_cliente=:id_cliente";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_cliente" => $id_cliente));
            $this->mensaje = "remove-cliente";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-remove-cliente";
            return $this->mensaje;
        }
    }
    // GESTION DE CLIENTES USCAR CLIENTE

    function buscar_clientes()
    {
        try {
            $sql = "SELECT * FROM cliente";
            $query = $this->conexion->prepare($sql);
            $query->execute();
            $this->datos = $query->fetchAll(); // retorna objetos o no
            if (!empty($this->datos)) {
                return $this->datos;
            } else {
                $this->mensaje = "no-register-clientes";
                return $this->mensaje;
            }
        } catch (\Throwable $error) {
            $this->mensaje = "fatal_error";
            return $this->mensaje;
            //throw $th;
        }
    }

    // FIN DE SECTION DE CLIENTES

    // SECTION DE RESERVAS
    function crear_reserva($cliente, $documento, $id_hab, $ingreso, $salida, $descuento, $adelanto, $observacion, $total, $total_descuento)
    {
        $sql = "INSERT INTO reservas(cliente, documento, habitacion, fecha_entrada, fecha_salida, observacion, adelanto, descuento, total, total_descuento, estado_reserva) VALUES (:cliente, :documento, :habitacion, :fecha_entrada, :fecha_salida, :observacion, :adelanto, :descuento, :total, :total_descuento, :estado)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":cliente" => $cliente, ":documento" => $documento, ":habitacion" => $id_hab, ":fecha_entrada" => $ingreso, ":fecha_salida" => $salida, ":observacion" => $observacion, ":adelanto" => $adelanto, ":descuento" => $descuento, ":total" => $total, ":total_descuento" => $total_descuento, ":estado" => 'creado'));
            $this->mensaje = "add-reserva";

            $sql = "UPDATE habitaciones SET estado=:estado WHERE id_habitaciones=:id_hab";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado" => 2, "id_hab" => $id_hab));
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-reserva" . $error;
            return $this->mensaje;
        }
    }
    function cerrar_reserva($total_pagar, $id_reserva, $id_hab, $fecha_today, $id_usuario)
    {
        $sql = "INSERT INTO ventas(id_usuario, id_reserva, total, fecha) VALUES (:id_usuario, :id_reserva, :total, :fecha)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":id_usuario" => $id_usuario, ":id_reserva" => $id_reserva, ":total" => $total_pagar, ":fecha" => $fecha_today));
            $this->mensaje = "venta_close";

            $sql = "UPDATE habitaciones SET estado=:estado WHERE id_habitaciones=:id_hab";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado" => 3, ":id_hab" => $id_hab));


            // ACTUALIZAR ESTADO DE LA RESERVA
            $sql = "UPDATE reservas SET estado_reserva=:estado_reserva WHERE id_reservas=:id_reserva";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado_reserva" => "finalizado", ":id_reserva" => $id_reserva));

            // ACTUALIZAR ESTADO DE DETALLES DE VENTA
            if (!empty($_POST["carrito_consumo"])) {
                $carrito_consumo = $_POST["carrito_consumo"];
                $length = count($carrito_consumo);
                for ($i = 0; $i < $length; $i++) {
                    $sql = "UPDATE detalle_venta SET estado_pago=:estado_pago WHERE id_detalle_venta=:id_detalle_venta";
                    $query = $this->conexion->prepare($sql);
                    $query->execute(array(":estado_pago" => "PAGADO", ":id_detalle_venta" => $carrito_consumo[$i]["id"]));
                }
            }

            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-add-reserva" . $error;
            return $this->mensaje;
        }
    }
    function habitacion_limpieza_terminada($key)
    {
        try {
            $sql = "UPDATE habitaciones SET estado=:estado WHERE id_habitaciones=:id_hab";
            $query = $this->conexion->prepare($sql);
            $query->execute(array(":estado" => 1, "id_hab" => $key));
            $this->mensaje = "change_exito";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "change_fracaso" . $error;
            return $this->mensaje;
        }
    }
}