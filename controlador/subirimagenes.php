<?php
// Verificar si se ha enviado alguna imagen
function crearCarpeta($carpeta)
{
    if (!file_exists($carpeta)) {
        mkdir($carpeta, 0777, true);
    }
}

if (isset($_FILES['imagen'])) {
    // Obtener la cantidad de imágenes recibidas
    $totalImagenes = count($_FILES['imagen']['name']);
    $carpeta = $_POST["carpeta"];
    $proyecto = $_POST["proyecto"];

    crearCarpeta("../imagenes/" . $carpeta . "/" . $proyecto);
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $dominio = $_SERVER['HTTP_HOST'];
    // Recorrer cada imagen recibida
    try {
        for ($i = 0; $i < $totalImagenes; $i++) {
            $nombreImagen = $_FILES['imagen']['name'][$i];
            $tmpImagen = $_FILES['imagen']['tmp_name'][$i];
            $rutaDestino = "../imagenes/" . $carpeta . "/" . $proyecto . "/" . $nombreImagen;

            $rutas = "imagenes/" . $carpeta . "/" . $proyecto . "/" . $nombreImagen;

            // Mover la imagen a la carpeta de destino
            move_uploaded_file($tmpImagen, $rutaDestino);
        }
        echo $rutas;
    } catch (\Throwable $th) {
        echo $th;
    }
}
if (isset($_FILES['targetimagen'])) {
    // Obtener la cantidad de imágenes recibidas
    $totalImagenes = $_FILES['targetimagen']['name'];
    $carpeta = $_POST["carpeta"];

    crearCarpeta("../imagenes/" . $carpeta);
    $protocolo = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
    $dominio = $_SERVER['HTTP_HOST'];
    // Recorrer cada imagen recibida
    try {

        $nombreImagen = uniqid() . '-' . $_FILES['targetimagen']['name'];
        $tmpImagen = $_FILES['targetimagen']['tmp_name'];
        $rutaDestino = "../imagenes/" . $carpeta . "/" . $nombreImagen;

        $rutas = "imagenes/" . $carpeta . "/" . $nombreImagen;

        // Mover la imagen a la carpeta de destino
        move_uploaded_file($tmpImagen, $rutaDestino);

        echo $rutas;
    } catch (\Throwable $th) {
        echo $th;
    }
}

if ($_POST["funcion"] === "delete_image") {
}

// Enviar respuesta al cliente si es necesario
