<?php

session_start();
if (empty($_SESSION["id_usuario"])) {
    header("Location: ../index.php");
} else {
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../css/main.css">
    <link rel="stylesheet" href="../../css/sidebar.css">
    <link rel="stylesheet" href="../../css/navdashboard.css">
    <link rel="stylesheet" href="../../css/container-dashboard.css">
    <link rel="stylesheet" href="../../css/habitaciones.css">
    <link rel="stylesheet" href="../../css/drag-drop.css">
    <link rel="icon" href="../../img/logo.jpg">
    <!-- data table CDN -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />
    <!-- bootsttrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>
    <!-- select 2 -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />

    <title>AppLotizador</title>
</head>

<body>
    <?php
        include_once "../../components/Sidebar_admin.php"
        ?>

    <div class="container-dashboard">
        <span class="route">
            > Home > Proyectos
        </span>
        <div id="modal-asigned" class="modal-create md-hidden">
            <div class="form-create">
                <!-- <form id="form_producto_add"> -->
                <div class="close-modal">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </div>
                <h1 class="title-modal">Asiganr Usuario: </h1>
                <div class="fileProyect">
                    <p class="text-center w-full">Proyecto:</p>
                    <p class="text-center" id="nombre_proyecto"></p>
                </div>
                <div id="list-campos" style="display: flex; flex-direction: column; gap: 15px">
                    <select id="user-proyect" class="users_proyect" name="state">

                    </select>
                </div>
                <div class="mt-4">
                    <h4>Usuarios Registrados</h4>
                </div>
                <div class="card-input buttons-modal">
                    <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
                    <button id="update-asigned-form" class="btn-create">Actualizar</button>
                </div>
                <!-- </form> -->
            </div>
        </div>
        <div class="main-datatable">
            <div class="overflow-x">
                <!-- <h1 class="title-table">Proyectos</h1> -->
                <!-- <div class="section-search">
                        <input type="text" placeholder="Ingrese el nombre del cliente">
                        <ion-icon id="search-btn" name="search-sharp"></ion-icon>
                    </div> -->

                <table style="width:100% !important;" id="proyectosList"
                    class="table cust-datatable dataTable no-footer">
                    <thead>
                        <tr>
                            <th style="min-width:30px;"># id</th>
                            <th style="min-width:80px;">Nombre Proyecto</th>
                            <th style="min-width:80px;">Status</th>
                            <th style="min-width:80px;">Acciones</th>
                        </tr>
                    </thead>
                </table>


            </div>
        </div>
    </div>
    </div>
</body>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

<script src="../../js/jquery.min.js"></script>

<script src="../../components/sidebar.js"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
<script src="../../js/dinamic/gestion_proyectos_a.js"></script>

<?php } ?>

</html>