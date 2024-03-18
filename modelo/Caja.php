<?php
include_once "Conexion.php";

class Caja
{
    var $datos;
    var $mensaje;
    public $conexion;

    public function __construct()
    {
        // se va a conectar a la base de datos
        $db = new Conexion(); // $db ya no es una variable es un objeto
        $this->conexion = $db->pdo;
        // $this hace referencia al objeto que se crea en una instancia de clase
    }
    function buscar_cajas($creator)
    {
        $sql = "SELECT * FROM caja where created_by=:id_usuario";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $creator));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_caja_abierta($id_usuario)
    {
        $sql = "SELECT tc.*, c.nombre, u.nombre as nombre_cajero, u.apellido as apellido_cajero FROM turno_caja tc inner join caja c on tc.caja_id=c.id inner join usuario u on tc.user_id=u.id_usuario where tc.user_id=:id_usuario AND tc.status = 'ABIERTO'";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':id_usuario' => $id_usuario));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_finanzas_turno($caja_id)
    {
        $sql = "SELECT * FROM transacciones where turno_id=:turno_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':turno_id' => $caja_id));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_ventas_caja($user)
    {
        $sql = "SELECT v.*, p.nombreProyecto as nombre_proyecto, c.nombres as nombre_cliente, c.apellidos as apellido_cliente FROM ventas_financiero v inner join cliente c on v.cliente_id=c.id_cliente inner join proyectos p on v.proyecto_id=p.id where v.user_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function buscar_cronograma_pagos($user)
    {
        $sql = "SELECT p.* FROM ventas_financiero v join pagos  p on v.id = p.venta_id where v.tipo_pago=1 AND v.status = 'VENTA'  AND v.user_id=:user_id";
        $query = $this->conexion->prepare($sql);
        $query->execute(array(':user_id' => $user));
        $this->datos = $query->fetchAll(); // retorna objetos o no
        if (!empty($this->datos)) {

            return $this->datos;
        } else {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function registrar_turno($caja_id, $fecha, $monto_apertura, $user)
    {
        $sql = "INSERT INTO turno_caja (fecha_apertura, monto_apertura, user_id, caja_id, status) VALUES (:fecha_apertura, :monto_apertura, :user_id, :caja_id, :status)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(':caja_id' => $caja_id, ':fecha_apertura' => $fecha, ':monto_apertura' => $monto_apertura, ':user_id' => $user, ':status' => "ABIERTO"));
            $this->mensaje = "add-turno";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-register";
            return $this->mensaje;
        }
    }
    function cerrar_turno($id, $monto_cierre, $fecha_cierre)
    {
        $sql = "UPDATE turno_caja SET monto_cierre=:monto_cierre, fecha_cierre=:fecha_cierre, status='CERRADO' WHERE id=:id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":monto_cierre" => $monto_cierre, ":fecha_cierre" => $fecha_cierre, ":id" => $id));
            $this->mensaje = "add-cierre";
            return $this->mensaje;
        } catch (\Throwable $error) {
            $this->mensaje = "no-cierre";
            return $this->mensaje;
        }
    }
    function registrar_venta_financiero($monto_separacion, $fecha_programacion, $tipo_pago, $monto_inicial, $fecha, $hora, $proyecto_id, $cliente_id, $tipo_venta, $total, $user, $status)
    {
        $response = [];
        $sql = "INSERT INTO ventas_financiero (cliente_id, user_id, proyecto_id, fecha, hora, tipo_venta, total, tipo_pago, monto_inicial, monto_separado, fecha_programacion, status) VALUES (:cliente_id, :user_id, :proyecto_id, :fecha, :hora, :tipo_venta, :total, :tipo_pago, :monto_inicial, :monto_separado, :fecha_programacion, :status)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":cliente_id" => $cliente_id, ":user_id" => $user, ":proyecto_id" => $proyecto_id, ":fecha" => $fecha, ":hora" => $hora, ":tipo_venta" => $tipo_venta, ":total" => $total, ":tipo_pago" => $tipo_pago, ":monto_inicial" => $monto_inicial, ":monto_separado" => $monto_separacion, ":fecha_programacion" => $fecha_programacion, ":status" => $status));
            $venta_id = $this->conexion->lastInsertId();
            $response[] = [
                "venta_id" => $venta_id,
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_transaccion($venta_id, $turno, $suma, $metodo_pago, $fecha, $motivo_operacion)
    {
        $response = [];
        $sql = "INSERT INTO transacciones (monto, metodo_pago, turno_id, venta_id, fecha, motivo_operacion) VALUES (:monto, :metodo_pago, :turno_id, :venta_id, :fecha, :motivo_operacion)";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":monto" => $suma, ":metodo_pago" => $metodo_pago, ":turno_id" => $turno, ":venta_id" => $venta_id, ":fecha" => $fecha, ":motivo_operacion" => $motivo_operacion));
            $response[] = [
                "msg" => "add-transaccion"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function pagar_cuota($id, $fecha_pagada, $status)
    {
        $response = [];
        $sql = "UPDATE pagos SET fecha_pagada = :fecha_pagada, status=:status WHERE id=:id";
        $query = $this->conexion->prepare($sql);
        try {
            $query->execute(array(":fecha_pagada" => $fecha_pagada, ":status" => $status, ":id" => $id));
            $response[] = [
                "msg" => "add-pago"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_detalle_venta($data, $venta_id)
    {
        $response = [];

        try {
            $sql = "INSERT INTO detalle_venta(producto_id, cantidad, total, venta_id) VALUES (?,?,?,?)";
            $query = $this->conexion->prepare($sql);
            foreach ($data as $producto) {
                $values = array(
                    $producto->id,
                    $producto->quantity,
                    $producto->price,
                    $venta_id,
                );

                if (!$query->execute($values)) {
                    throw new Exception("Error al registrar detalle: " . implode(", ", $query->errorInfo()));
                }
            }
            $response[] = [
                "msg" => "add-venta"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function registrar_cronograma_pagos($data, $venta_id)
    {
        $response = [];

        try {
            $sql = "INSERT INTO pagos(monto_pago, fecha_pago, tipo_pago, venta_id, status) VALUES (?,?,?,?,?)";
            $query = $this->conexion->prepare($sql);
            foreach ($data as $pago) {
                $values = array(
                    $pago->monto,
                    $pago->fecha,
                    $pago->tipo,
                    $venta_id,
                    $pago->status
                );

                if (!$query->execute($values)) {
                    throw new Exception("Error al registrar cronograma: " . implode(", ", $query->errorInfo()));
                }
            }
            $response[] = [
                "msg" => "add-cronograma"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
    function cambiar_estado($data, $estado)
    {
        $response = [];
        try {
            $idLotes = array_map(function ($lote) {
                return $lote->id;
            }, $data);
            $sql = "UPDATE lotes SET estado=:estado WHERE id IN (" . implode(',', $idLotes) . ")";
            $query = $this->conexion->prepare($sql);
            if (!$query->execute(array(":estado" => $estado))) {
                throw new Exception("Error al cambiar estado: " . implode(", ", $query->errorInfo()));
            }
            $response[] = [
                "msg" => "change_estado"
            ];
        } catch (\Throwable $error) {
            $response[] = [
                "error" => $error->getMessage()
            ];
        }
        $this->mensaje = $response;
        return $this->mensaje;
    }
}
