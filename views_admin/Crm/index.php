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
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.4.0/css/fixedHeader.dataTables.min.css" />
        <!-- bootsttrap
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
        </script> -->
        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>
        <div class="container-dashboard">
            <span class="route">
                > Home > CRM

                <div class="confirm-popup md-hidden">
                    <div class="form-confirm">
                        <span class="title-confirm">Estas seguro de eliminar el usuario</span>
                        <div class="footerConfirm">
                            <button id="cancelConfirm" class="btnJsvm ">No</button>
                            <button id="okConfirm" class="btnJsvm ">Si</button>

                        </div>
                    </div>
                </div>

                <div id="crear-lead" class="modal-create md-hidden">
                    <div class="form-create">
                        <!-- <form id="form_producto_add"> -->
                        <div class="close-modal">
                            <ion-icon name="close-outline"></ion-icon>
                        </div>
                        <h1 class="font-bold">Crear Lead</h1>
                        <form id="registerLead">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="mb-6">
                                    <label for="nombres" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                                    <input type="text" id="nombre-lead" placeholder="Ingrese el nombre del cliente" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="apellidos" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                                    <input type="text" id="apellido-lead" placeholder="Ingrese los apellidos del cliente" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="documento" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documento</label>
                                    <input type="text" id="documento-lead" placeholder="Ingrese su nro documento" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" id="email-lead" placeholder="Ingrese su correo electrónico" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="celular" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Celular</label>
                                    <input type="text" id="celular-lead" placeholder="Ingrese su celular" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="telefono" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                                    <input type="text" id="telefono-lead" placeholder="Ingrese su telefono" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="pais" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pais</label>
                                    <input type="text" id="pais-lead" placeholder="Ingrese el pais del cliente" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="origen" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medio Contactado</label>
                                    <input type="text" id="origen-lead" placeholder="ejm: Facebook, Instagram, Capacitaciones, etc." class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="campania" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Campaña</label>
                                    <input type="text" id="campania-lead" placeholder="Ingrese si pertenece a una campaña" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="ciudad" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
                                    <input type="text" id="ciudad-lead" placeholder="Ingrese ciudad de origen" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <div class="mb-6">
                                    <label for="proyecto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proyecto</label>
                                    <select type="text" id="proyecto-lead" placeholder="Ingrese ciudad de origen" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>
                                </div>
                            </div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
                        </form>

                        <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                        <!-- </form> -->
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
                <div id="asigned_asesores" class="modal-create md-hidden">
                    <div class="form-create">
                        <!-- <form id="form_producto_add"> -->
                        <div class="close-modal">
                            <ion-icon name="close-outline"></ion-icon>
                        </div>
                        <h1>Asignar a Asesores</h1>
                        <div class="fileProyect">
                            <p class="text-center w-full">Cliente: <span id="nombre_user"></span></p>
                        </div>

                        <div id="list-campos" style="display: flex; flex-direction: row; gap: 15px">
                            <select name="asesor" id="asesor-user" style="width: 100%" class="users_proyect" name="state">

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


                <!-- <div class="create-productos" style="margin-bottom: 20px">
            <button id="create-clients" class="btn-add">+ Crear</button>
        </div> -->
                <div style="display: flex; gap:10px; margin: 20px 0px">
                    <div class="relative inline-block text-left">
                        <div>
                            <button type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 btn-add hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">

                                <ion-icon name="people-sharp"></ion-icon>

                                Leads
                                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div id="expand_file" class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                <li id="modal-lead" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0"><ion-icon name="add-outline"></ion-icon> Agregar Lead</li>
                                <a href="./importar.php" id="import-leads" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0"> <ion-icon name="cloud-upload-outline"></ion-icon> Importar</a>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-datatable">
                    <!-- <div class="section-search">
                        <input type="text" placeholder="Ingrese el nombre del cliente">
                        <ion-icon id="search-btn" name="search-sharp"></ion-icon>
                    </div> -->
                    <table id="usuariosList" style="width:100%;" class="table cust-datatable dataTable no-footer" style="width:100%;">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Fecha Hora Creacion</th>
                                <th>Correo</th>
                                <th>Celular</th>
                                <th>Telefono</th>
                                <th>Origen</th>
                                <th>Ciudad</th>
                                <th>Proyecto</th>
                                <th>Agente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                    </table>
                </div>
        </div>
        </div>
        <script>
            // Obtiene el botón y el menú desplegable
            var button = document.getElementById('menu-button');
            var menu = document.getElementById('expand_file');

            // Agrega un evento de clic al botón para mostrar/ocultar el menú desplegable
            menu.addEventListener('click', function() {
                var expanded = button.getAttribute('aria-expanded') === 'true' || false;
                button.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu.style.transformOrigin = 'left top';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu.style.transform = 'scale(1)';
                        menu.style.opacity = '1';
                    }, 0);
                    menu.classList.remove('hidden');
                } else {
                    menu.style.transformOrigin = 'left top';
                    menu.style.opacity = '1';
                    menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.classList.add('hidden');
                    }, 300);
                }
            });
            button.addEventListener('click', function() {
                var expanded = button.getAttribute('aria-expanded') === 'true' || false;
                button.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu.style.transformOrigin = 'left top';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu.style.transform = 'scale(1)';
                        menu.style.opacity = '1';
                    }, 0);
                    menu.classList.remove('hidden');
                } else {
                    menu.style.transformOrigin = 'left top';
                    menu.style.opacity = '1';
                    menu.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu.style.transform = 'scale(0)';
                    menu.style.opacity = '0';
                    setTimeout(function() {
                        menu.classList.add('hidden');
                    }, 300);
                }
            });
        </script>
    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>

    <script src="../../components/sidebar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>


    <script src="../../js/dinamic/gestion-clientes.js"></script>

    </html>
<?php } ?>