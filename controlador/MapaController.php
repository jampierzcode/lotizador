<?php
include_once '../modelo/Usuario.php';
$usuario = new Usuario();

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
if ($_POST["funcion"] == "register_visitas") {
    $agente = $_POST["agent"];
    $usuario->register_visitas($agente);
}
?>