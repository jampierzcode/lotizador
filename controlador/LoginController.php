<?php
include_once "../modelo/Usuario.php";
session_start();
$username = $_POST["username"];
$password = md5($_POST["password"]);

echo $username . $password;
$usuario = new Usuario();

$usuario->Loguearse($username, $password);

if (!empty($usuario->datos)) {

    foreach ($usuario->datos as $dato) {
        $_SESSION["id_usuario"] = $dato->id_usuario;
        $_SESSION["nombres"] = $dato->nombre . " " . $dato->apellido;
        $_SESSION["us_tipo"] = $dato->tipo;
    }
    if($_SESSION["us_tipo"]==2){
        $usuario->view_permisos($_SESSION["id_usuario"]);
        $_SESSION["permisos"] = $usuario->datos;
        header("Location: ../views_admin/Dashboard/");
    }elseif ($_SESSION["us_tipo"]==3) {
        header("Location: ../views_asesor/Dashboard/");
        # code...
    }else{
        header("Location: ../views/Dashboard/");

    }
} else {
    $_SESSION["error"] = "EL usuario o contraseña es incorrecto";
    header("Location: ../index.php");
}