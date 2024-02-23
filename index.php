<?php
session_start();
if (!empty($_SESSION["id_usuario"])) {
    switch ($_SESSION["us_tipo"]) {
        case 1:
            header("Location: views/Dashboard");
            break;
        case 2:
            header("Location: views_admin/Dashboard");
            break;
        case 3:
            header("Location: views_asesor/Dashboard");
            break;
        case 4:
            header("Location: views_caja/caja");
            break;

        default:
            # code...
            break;
    }
} else {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/login.css">
        <title>Login</title>
    </head>

    <body>
        <div class="container-login">
            <div class="form-login">

                <form action="./controlador/LoginController.php" method="post">
                    <div class="header-form">
                        <img style="width: 100%" src="./img/logo.png" alt="">
                        <!-- <img src="img/logo.jpg" alt="logo"> -->
                    </div>
                    <div class="body-form">
                        <?php

                        if (!empty($_SESSION["error"])) {
                            $error = $_SESSION["error"];

                        ?>
                            <div id="toast">
                                <p><?php echo $_SESSION["error"] ?></p>
                            </div>
                        <?php
                            session_destroy();
                        }
                        ?>
                        <div class="group-date">
                            <ion-icon name="person-sharp"></ion-icon>
                            <input name="username" type="text" placeholder="Ingresa el usuario">
                        </div>
                        <div class="group-date">
                            <ion-icon name="lock-closed"></ion-icon>
                            <input id="password_login" name="password" type="password" placeholder="Ingresa la contraseña">
                            <div class="view-password" key_actived="false"><ion-icon name="eye-off-outline"></ion-icon></div>
                        </div>
                        <button class="btn-submit" type="submit">Iniciar Sesion</button>
                    </div>
                </form>
            </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>

    <script src="js/jquery.min.js"></script>
    <script>
        $(document).on("click", ".view-password", function() {
            if ($(this).attr("key_actived") === "false") {
                $(this).attr("key_actived", "true")
                $("#password_login").attr("type", "text")
                $(this).html(`<ion-icon name="eye-outline"></ion-icon>`)
            } else {
                $(this).attr("key_actived", "false")
                $("#password_login").attr("type", "password")
                $(this).html(`<ion-icon name="eye-off-outline"></ion-icon>`)
            }
        })
    </script>

    </html>
<?php } ?>