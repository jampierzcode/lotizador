<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 3) {
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
        <!-- bootsttrap -->
        <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"> -->
        </script>
        <!-- select 2 -->
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_asesor.php"
        ?>
        <!-- <div style="z-index: 50000;" id="toast-success" class="fixed top-8 right-0 translate-x-full flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div> -->
        <div style="z-index: 50000;" id="toast-warning" class="fixed top-8 right-0 translate-x-full flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span class="sr-only">Debe seleccionar el tipo</span>
            </div>
            <div class="ml-3 text-sm font-normal">Debe seleccionar el tipo</div>
            <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>

        <div class="container-dashboard">
            <span class="route">
                > Home > CRM
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
            <div class="progreessbar" keyTop="10">
                <span>Visitas</span>
                <div class="bar">
                    <div class="barSize">
                    </div>
                </div>
                <p><span id="numberVisit"></span> visitas</p>
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
            <div id="editar-lead" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Editar Lead</h1>
                    <form id="editLead">
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
                        <button type="submit" class="btnJsvm info text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
                    </form>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <div id="crear-event" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Registrar Evento</h1>
                    <div class="flex items-center gap-4">
                        <p class="text-sm">Estado Cliente:
                            <!-- <div id="status-now"></div> -->
                    </div>
                    <div>
                        <div class="w-full">
                            <div class="flex items-center space-x-4 border-b-2 pb-4 border-dashed">
                                <div class="flex-shrink-0">
                                    <img id="img-now-status" class="w-8 h-8 rounded-full" src="" alt="cliente...">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p id="name-now-status" class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Neil Sims
                                    </p>
                                    <p id="contact-now-status" class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        email@windster.com
                                    </p>
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <div id="status-now"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form id="registerFormEvento">
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Evento</label>
                            <select id="status-evento" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected value="0">Selecciona una opcion</option>
                                <option value="NO RESPONDIO">NO RESPONDIO</option>
                                <option value="VISITA">VISITA</option>
                                <option value="AUSENCIA VISITA">AUSENCIA VISITA</option>
                                <option value="REPROGRAMACION CONTACTO">REPROGRAMACION CONTACTO</option>
                                <option value="REPROGRAMACION VISITA">REPROGRAMACION VISITA</option>
                                <option value="SEPARACION">SEPARACION</option>
                                <option value="NO INTERESADO">NO INTERESADO</option>
                            </select>

                        </div>
                        <div id="fecha_visita" class="grid gap-4 grid-cols-2 hidden">

                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                                <input type="date" id="date-visita" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="El cliente ..."></input>

                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora</label>
                                <input type="time" id="time-visita" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="El cliente ..."></input>

                            </div>
                        </div>
                        <div class="mb-6">

                            <label for="observaciones" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                            <textarea id="observaciones-evento" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="El cliente ..."></textarea>

                        </div>
                        <div class="flex justify-end w-full">

                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 btnJsvm info">Registrar</button>
                        </div>
                    </form>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <div id="historial-event" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Historial de Eventos</h1>
                    <div class="flex items-center gap-4">
                        <p class="text-xl">Estado Actual:
                        <div id="status-now"></div>
                    </div>

                    <ol id="list-historial" class="relative border-l border-gray-200 dark:border-gray-700">
                    </ol>

                </div>
            </div>
            <div style="display: flex; gap:10px; margin-bottom: 20px">
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
                            <a href="./importar.php" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0"> <ion-icon name="cloud-upload-outline"></ion-icon> Importar</a>

                        </div>
                    </div>
                </div>
                <div class="relative inline-block text-left">
                    <div>
                        <button type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 btn-add hover:bg-gray-50" id="menu-button-etiqueta" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="pricetags"></ion-icon>

                            Etiquetas
                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div id="expand-etiqueta" class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                        <div class="py-1" role="none">
                            <li id="modal-lead" class="flex items-center gap-2 cursor-pointer hover:bg-slate-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0"><ion-icon name="add-outline"></ion-icon> Crear etiqueta</li>

                        </div>
                    </div>
                </div>
                <!-- <input type="color" value="#5b5b5b"> -->
            </div>
            <div>
                <p class="text-lg text-black">Filtro Avanzado:</p>
            </div>
            <div class="main-datatable">
                <!-- <form> -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Nombre</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="cliente-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre de cliente">
                        </div>
                    </div>
                    <div>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Proyectos</label>
                        <select id="filter-proyecto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </select>
                    </div>
                    <div>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Etiquetas</label>
                        <select id="filter-proyecto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Sin etiquetas</option>
                        </select>
                    </div>

                    <div class="relative inline-block">
                        <label for="pendientes-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">-</label> <br>
                        <button type="button" class="inline-blockmax-w-max items-center justify-center gap-x-1.5 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 bg-emerald-800 hover:bg-lime-900" id="reset_filtros" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="refresh"></ion-icon>

                            Resetear

                        </button>

                    </div>
                </div>

                <p class="mt-4 text-lg text-black">Filtro de Pendientes:</p>

                <!-- <form> -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div class="h-auto">
                        <label for="Fecha Inicio">Del: </label>
                        <input type="date" id="fecha-inicio-pendients" class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                    </div>
                    <div class="h-auto">
                        <label for="pendientes-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Al:</label>
                        <input disabled type="date" id="fecha-fin-pendients" class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                    </div>
                    <div>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Status(Estado)</label>
                        <select id="filter-status-pendients" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="Todas" selected>Todas</option>
                            <option value="VISITA">VISITA</option>
                            <option value="REPROGRAMACION CONTACTO">REPROGRAMACION CONTACTO</option>
                            <option value="REPROGRAMACION VISITA">REPROGRAMACION VISITA</option>
                        </select>
                    </div>

                    <div class="relative inline-block text-left">

                        <label for="pendientes-search" class="mb-2 text-sm font-medium text-gray-900  dark:text-white">Pendientes</label>
                        <button type="button" class="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-red-600 text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700" id="menu-pendientes" aria-expanded="false" aria-haspopup="true">

                            <ion-icon name="warning"></ion-icon>

                            Pendientes: 0

                        </button>

                    </div>
                </div>

                <table id="usuariosList" class="table cust-datatable dataTable no-footer" style="width:100%;">
                    <thead>
                        <tr>
                            <!-- <th>
                                <div style="width: 50px !important">Nombres</div>
                            </th> -->
                            <!-- <th colspan="6" style="text-align: center">Apellidos</th> -->
                            <!-- <th>Nombres</th> -->
                            <!-- <th>
                                <div style="width: 50px !important">Apellidos</div>
                            </th> -->
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Fecha Hora Creacion</th>
                            <!-- <th>Correo</th> -->
                            <th>Celular</th>
                            <th>Telefono</th>
                            <th>Origen</th>
                            <th>Ciudad</th>
                            <th>Proyecto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                            <!-- <th>
                                <div style="width: 200px !important">Acciones</div>
                            </th> -->
                        </tr>
                    </thead>
                </table>
                <div id="spin-load">
                    <div role="status" class="flex items-center justify-center" style="height: 200px;">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <!-- </div> -->
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
            // Obtiene el botón y el menú desplegable etiqueta
            var button_etiqueta = document.getElementById('menu-button-etiqueta');
            var menu_etiqueta = document.getElementById('expand-etiqueta');

            // Agrega un evento de clic al botón para mostrar/ocultar el menú desplegable
            menu_etiqueta.addEventListener('click', function() {
                var expanded = button_etiqueta.getAttribute('aria-expanded') === 'true' || false;
                button_etiqueta.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu_etiqueta.style.transform = 'scale(1)';
                        menu_etiqueta.style.opacity = '1';
                    }, 0);
                    menu.classList.remove('hidden');
                } else {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.opacity = '1';
                    menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.classList.add('hidden');
                    }, 300);
                }
            });
            button_etiqueta.addEventListener('click', function() {
                var expanded = button_etiqueta.getAttribute('aria-expanded') === 'true' || false;
                button_etiqueta.setAttribute('aria-expanded', !expanded);

                if (!expanded) {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                        menu_etiqueta.style.transform = 'scale(1)';
                        menu_etiqueta.style.opacity = '1';
                    }, 0);
                    menu_etiqueta.classList.remove('hidden');
                } else {
                    menu_etiqueta.style.transformOrigin = 'left top';
                    menu_etiqueta.style.opacity = '1';
                    menu_etiqueta.style.transition = 'transform 300ms ease-out, opacity 300ms ease-out';
                    menu_etiqueta.style.transform = 'scale(0)';
                    menu_etiqueta.style.opacity = '0';
                    setTimeout(function() {
                        menu_etiqueta.classList.add('hidden');
                    }, 300);
                }
            });
        </script>

    </body>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>




    <script src="../../components/sidebar.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/gestion-clientes-as.js"></script>

    </html>
<?php } ?>