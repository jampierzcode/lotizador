<?php

session_start();
if (empty($_SESSION["id_usuario"])) {
    header("Location: ../../index.php");
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
    <link rel="stylesheet" href="../../css/chart.css">
    <link rel="stylesheet" href="../../css/gestionApp.css">
    <link rel="icon" href="../../img/logo.jpg">
    <title>AppLotizador</title>
</head>

<body>
    <?php
        include_once "../../components/Sidebar.php"
        ?>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop active-link" href="../Dashboard">
                    <ion-icon name="pie-chart"></ion-icon>
                    <p>Dashboard</p>
                </a>
            </div>
        </div>
    </li>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop" href="../Proyectos">
                    <ion-icon name="home"></ion-icon>
                    <p>Proyectos</p>
                </a>
            </div>
        </div>
    </li>
    <?php if($_SESSION["us_tipo"]==1){?>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop" href="../Usuarios">
                    <ion-icon name="people-sharp"></ion-icon>
                    <p>Usuarios</p>
                </a>
            </div>
        </div>
    </li>
    <?php }?>
    <li class="links-menu-dashboard">
        <div class="link-block">
            <div class="left-link">
                <a class="toggle-drop" href="../../controlador/LogoutController.php">
                    <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                    <p>Cerrar sesión</p>
                </a>
            </div>
        </div>
    </li>
    </ul>
    </div>
    </aside>
    <div class="container-dashboard">
        <span class="route">
            > Home
        </span>
        <div class="cards-admin">
            <div class="card-count">
                <div class="left-card">
                    <h1>N° Proyectos</h1>
                    <span id="data-reservas">0</span>
                </div>
                <!-- <ion-icon name="calendar-outline"></ion-icon> -->
                <ion-icon name="home-outline"></ion-icon>
            </div>
            <div class="card-count">
                <div class="left-card">
                    <h1>N° Clientes</h1>
                    <span id="data-clients">0</span>
                </div>
                <ion-icon name="people-outline"></ion-icon>
            </div>
            <div class="card-count ventas">
                <div class="left-card">
                    <h1>Venta Total</h1>
                    <span id="data-ventas">S/00.00</span>
                </div>
                <ion-icon name="cash-outline"></ion-icon>
            </div>
        </div>
        <!-- <canvas id="myChart" width="150"></canvas> -->
    </div>
</body>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
    integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

<script src="../../js/jquery.min.js"></script>
<script src="../../components/sidebar.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"
    integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../../js/dinamic/gestion_contabilidad.js"></script>
<script src="../../js/dinamic/graficos-admin.js"></script>

</html>
<?php } ?>