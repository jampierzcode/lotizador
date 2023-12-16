<?php
// Obtén la URL actual
$currentUrl = basename($_SERVER['REQUEST_URI']);

// Define los enlaces de tu sidebar con sus respectivas URLs
$links = [
    [
        'url' => '../Dashboard',
        'icon' => 'pie-chart',
        'text' => 'Dashboard'
    ],
    [
        'url' => '../crm',
        'icon' => 'people-sharp',
        'text' => 'CRM'
    ],
    // Agrega más enlaces aquí si es necesario
];
?>
<nav class="navbar-dashboard">
    <div class="drop-down-menu">
        <ion-icon name="reorder-three-outline"></ion-icon>
    </div>
    <div class="user-login" style="gap: 20px">
        <!-- <FaBell /> campanas-->
        <!-- <img src="../../img/jampier.jpg" alt="img_avatar_user" /> -->
        <img src="../../img/avatar_default.jpg" alt="img_avatar_user" />
    </div>
</nav>
<div class="overlay-sidebar"></div>
<aside class="aside-dashboard">
    <div class="header-aside">
        <div class="logo">
            <!-- <img src="../img/logo.jpg" alt="logo-img" class="logo-icon" /> -->
            <ion-icon name="home"></ion-icon>
            <p>App Lotizador</p>
        </div>
    </div>
    <div class="main">
        <div class="perfil-user">
            <img src="../../img/avatar_default.jpg" alt="img_avatar_user" />
            <div class="info-perfil">

                <p><?php echo $_SESSION["nombres"] ?></p>
                <span><?php switch ($_SESSION["us_tipo"]) {
                            case 1:
                                echo "superadmin";
                                break;
                            case 2:
                                echo "admin";
                                break;
                            case 3:
                                echo "asesor";
                                break;

                            default:
                                echo "null";
                                break;
                        } ?></span>
            </div>
        </div>
        <ul class="nav-links">
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop <?php echo ($currentUrl === "Dashboard") ? ' active-link' : ''; ?>""  href=" ../Dashboard">
                            <ion-icon name="pie-chart"></ion-icon>
                            <p>Dashboard</p>
                        </a>
                    </div>
                </div>
            </li>
            <?php
            foreach ($_SESSION["permisos"] as $permiso) {
                # code...
                switch ($permiso->nombre_servicio) {
                    case 'Lotizador':
                        # code...
            ?>
                        <li class="links-menu-dashboard">
                            <div class="link-block">
                                <div class="left-link">
                                    <a class="toggle-drop <?php echo ($currentUrl === "Proyectos") ? ' active-link' : ''; ?>"" href=" ../Proyectos">
                                        <ion-icon name="home"></ion-icon>
                                        <p>Proyectos</p>
                                    </a>
                                </div>
                            </div>
                        </li>
                    <?php
                        break;
                    case 'Usuarios':
                        # code...
                    ?>
                        <li class="links-menu-dashboard">
                            <div class="link-block">
                                <div class="left-link">
                                    <a class="toggle-drop <?php echo ($currentUrl === "Usuarios") ? ' active-link' : ''; ?>"" href=" ../Usuarios">
                                        <ion-icon name="people-sharp"></ion-icon>
                                        <p>Usuarios</p>
                                    </a>
                                </div>
                            </div>
                        </li>
                    <?php
                        break;
                    case 'CRM':
                        # code...
                    ?>
                        <li class="links-menu-dashboard">
                            <div class="link-block">
                                <div class="left-link">
                                    <a class="toggle-drop <?php echo ($currentUrl === "Crm" || $currentUrl === "papelera") ? ' active-link' : ''; ?>"" href=" ../Crm">
                                        <ion-icon name="people-sharp"></ion-icon>
                                        <p>CRM</p>
                                    </a>
                                </div>
                            </div>
                        </li>
            <?php
                        break;

                    default:
                        # code...
                        break;
                }
            }
            ?>
            <li class="links-menu-dashboard">
                <div class="link-block">
                    <div class="left-link">
                        <a class="toggle-drop" href="../../controlador/LogoutController.php">
                            <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                            <p>Cerrar sesion</p>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</aside>