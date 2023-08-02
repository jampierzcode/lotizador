<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 2) {
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
        <link rel="stylesheet" href="../../css/habitaciones.css">
        <link rel="stylesheet" href="../../css/productos.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- data table CDN -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.css" />
        <!-- bootsttrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script>
        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwind css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>
        <div class="container-dashboard">
            <span class="route">
                > Home > Agentes
            </span>
            <div class="confirm-popup md-hidden">
                <div class="form-confirm">
                    <span class="title-confirm">Estas seguro de eliminar el usuario</span>
                    <div class="footerConfirm">
                        <button id="cancelConfirm" class="btnJsvm ">No</button>
                        <button id="okConfirm" class="btnJsvm ">Si</button>

                    </div>
                </div>
            </div>

            <div id="modal-edit-user" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1>Actualizar Usuario</h1>
                    <div class="grid2Colum">
                        <div class="card-input">
                            <span>Documento</span>
                            <div class="input-group">
                                <i class="fas fa-address-card"></i>
                                <input id="documento-modal-edit" type="number" placeholder="Ingrese el numero">
                                <!-- <i id="search-client" class="fas fa-search"></i> -->
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Nombres</span>
                            <div class="input-group">

                                <ion-icon name="person-circle-outline"></ion-icon>
                                <input id="nombres-modal-edit" type="text" placeholder="Ingrese los nombres o razon social">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Apellidos</span>
                            <div class="input-group">

                                <ion-icon name="person-circle-outline"></ion-icon>
                                <input id="apellidos-modal-edit" type="text" placeholder="Ingrese los nombres o razon social">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Correo</span>
                            <div class="input-group">
                                <!-- <ion-icon name="person-circle-outline"></ion-icon> -->
                                <input id="correo-modal-edit" type="text" placeholder="Ingrese el correo del asesor">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Telefono/WhatsApp</span>
                            <div class="input-group">
                                <!-- <ion-icon name="person-circle-outline"></ion-icon> -->
                                <input id="phone-modal-edit" type="text" placeholder="Ingrese el numero de telefono del asesor">
                            </div>
                        </div>
                        <!-- <div class="card-input">
                        <span>Username</span>
                        <div class="input-group">
                            <input id="username-modal" type="text" placeholder="Ingrese los nombres o razon social">
                        </div>
                    </div>
                    <div class="card-input">
                        <span>Password</span>
                        <div class="input-group">
                            <input id="password-modal" type="text" placeholder="Ingrese los nombres o razon social">
                        </div>
                    </div> -->
                    </div>
                    <div class="card-input buttons-modal">
                        <button id="cancel-form-edit" class="btn-cancel">Cancelar</button>
                        <button id="user-form-edit" class="btn-create">Actualizar</button>
                    </div>
                    <!-- </form> -->
                </div>
            </div>
            <div id="crear-users" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1>Crear Usuario</h1>
                    <h1>Datos Personales</h1>
                    <div class="grid2Colum">
                        <div class="card-input">
                            <span>Tipo de documento</span>
                            <div class="input-group">
                                <select name="type-register" id="tipo-documento-modal">
                                    <option value="0">Seleccione el tipo de documento</option>
                                    <option value="1">DNI</option>
                                    <option value="2">RUC</option>
                                </select>
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Documento</span>
                            <div class="input-group">
                                <i class="fas fa-address-card"></i>
                                <input id="documento-modal" disabled type="number" placeholder="Ingrese el numero">
                                <i id="search-client" class="fas fa-search"></i>
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Nombres</span>
                            <div class="input-group">

                                <ion-icon name="person-circle-outline"></ion-icon>
                                <input id="nombres-modal" type="text" placeholder="Ingrese los nombres o razon social">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Apellidos</span>
                            <div class="input-group">

                                <ion-icon name="person-circle-outline"></ion-icon>
                                <input id="apellidos-modal" type="text" placeholder="Ingrese los nombres o razon social">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Correo</span>
                            <div class="input-group">
                                <!-- <ion-icon name="person-circle-outline"></ion-icon> -->
                                <input id="correo-modal" type="text" placeholder="Ingrese el correo del asesor">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Telefono/WhatsApp</span>
                            <div class="input-group">
                                <!-- <ion-icon name="person-circle-outline"></ion-icon> -->
                                <input id="phone-modal" type="text" placeholder="Ingrese numero de telefono">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Username</span>
                            <div class="input-group">
                                <!-- <ion-icon name="person-circle-outline"></ion-icon> -->
                                <input id="username-modal" type="text" placeholder="Ingrese los nombres o razon social">
                            </div>
                        </div>
                        <div class="card-input">
                            <span>Password</span>
                            <div class="input-group">
                                <!-- <ion-icon name="person-circle-outline"></ion-icon> -->
                                <input id="password-modal" type="text" placeholder="Ingrese los nombres o razon social">
                            </div>
                        </div>
                    </div>
                    <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div>
                    <!-- </form> -->
                </div>
            </div>
            <div id="asigned_proyects" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1>Asignar a Proyectos</h1>
                    <div class="fileProyect">
                        <p class="text-center w-full">Usuario: <span id="nombre_user"></span></p>
                    </div>

                    <div id="list-campos" style="display: flex; flex-direction: row; gap: 15px">
                        <select name="proyectos[]" multiple="multiple" id="proyect-user" style="width: 100%" class="users_proyect" name="state">

                        </select>
                        <button id="update-asigned-form" class="btn-add">Agregar</button>
                    </div>

                    <span class="route" style="margin-bottom: 0px !important">
                        Proyectos asignados
                    </span>
                    <div class="listUsuarios">
                        <div class="main-datatable">
                            <div class="overflow-x">
                                <table style="width:100% !important;" id="proyectsAsigned" class="table cust-datatable dataTable no-footer">
                                    <thead>
                                        <tr>
                                            <th style="min-width:30px;"># id</th>
                                            <th style="min-width:80px;">Cliente asignado</th>
                                            <th style="min-width:80px;">Asignado</th>
                                            <th style="min-width:80px;">Acciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card-input buttons-modal">
                        <button id="cancel-form-asigned" class="btn-cancel">Cancelar</button>
                        <button id="add-asigned_proyect" class="btn-create">Crear</button>
                    </div>
                    <!-- </form> -->
                </div>
            </div>
            <div id="confirm-delete-usuario" style="z-index: 5000; background: #00000061;" tabindex="-1" class="fixed top-0 left-0 right-0 p-4 flex items-center justify-center overflow-x-hidden hidden overflow-y-auto md:inset-0  max-h-full">
                <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button id="cancel-modal-confirm" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro de eliminar al usuario?</h3>
                            <button id="confirm-delete-response" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Si, seguro
                            </button>
                            <button id="cancel-delete-response" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancelar</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="create-productos" style="margin-bottom: 20px">
                <button id="create-clients" class="btn-add">+ Crear</button>
            </div>
            <div class="main-datatable">
                <div class="overflow-x">
                    <!-- <div class="section-search">
                        <input type="text" placeholder="Ingrese el nombre del cliente">
                        <ion-icon id="search-btn" name="search-sharp"></ion-icon>
                    </div> -->
                    <table id="usuariosList" style="width:100%;" id="proyectosList" class="table cust-datatable dataTable no-footer">
                        <thead>
                            <tr>
                                <th># id</th>
                                <th>Nombres</th>
                                <th>Username</th>
                                <th>Documento</th>
                                <th>Correo</th>
                                <th>Numero</th>
                                <th>Status</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.js"></script>
    <script src="../../components/sidebar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="../../js/dinamic/gestion_usuarios_admin.js"></script>

    </html>
<?php } ?>