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
        <link rel="stylesheet" href="../../css/chart.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="icon" href="../../img/logo.jpg">
        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>AppLotizador</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_admin.php"
        ?>

        <div class="container-dashboard h-screen">
            <span class="route">
                > Home
            </span>
            <div style="margin: 0px !important;" class="cards-admin">
                <div class="card-count">
                    <div class="left-card">
                        <h1>N° Proyectos</h1>
                        <span id="data-proyectos">0</span>
                    </div>
                    <!-- <ion-icon name="calendar-outline"></ion-icon> -->
                    <ion-icon name="home-outline"></ion-icon>
                </div>
                <div class="card-count">
                    <div class="left-card">
                        <h1>N° Asesores</h1>
                        <span id="data-asesores">0</span>
                    </div>
                    <ion-icon name="people-outline"></ion-icon>
                </div>
                <!-- <div class="card-count ventas">
                <div class="left-card">
                    <h1>Venta Total</h1>
                    <span id="data-ventas">S/00.00</span>
                </div>
                <ion-icon name="cash-outline"></ion-icon>
            </div> -->
            </div>

            <div class="grid gap-4 w-full">
                <div style="z-index: 5000; padding-top:40px" class="sticky top-[-40px] bg-[#f5f7fb]">
                    <div class="pt-4 w-full md:w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Filtros avanzados</h5>
                        </div>
                        <div>
                            <div class="grid grid-cols-4 gap-4">
                                <div class="h-auto">
                                    <label for="Fecha Inicio">Fecha Inicio</label>
                                    <input type="date" id="fecha-inicio-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                                </div>
                                <div class="h-auto">
                                    <label for="Fecha Inicio">Fecha Termino</label>
                                    <input type="date" id="fecha-fin-search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                                </div>
                                <div class="h-auto">

                                    <label for="Fecha Inicio">Asesor</label>


                                    <div class="relative mb-6">
                                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <ion-icon id="icon-drop-asesor" name="chevron-down"></ion-icon>

                                        </div>
                                        <div id="asesor-search" class="whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <span>Seleccione un asesor</span>

                                        </div>

                                        <div id="listUsuarios" style="top: calc(100% + 5px)" class="hidden cursor-pointer absolute w-full max-w-md bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                                            <div class="relative">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <input id="search-asesor-input" type="search" class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar por nombre del asesor">
                                            </div>
                                            <div class="flow-root">
                                                <ul id="listAsesores" role="list" class="max-h-[200px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                                                    <li class="py-3 px-4 sm:py-4 cursor-pointer hover:bg-gray-100">
                                                        <div class="flex items-center space-x-4">
                                                            <div class="flex-shrink-0">
                                                                <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                                                            </div>
                                                            <div class="flex-1 min-w-0">
                                                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                    Nombres
                                                                </p>
                                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                                    Apellidos
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button id="search_date_visitas" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Buscar</button>
                                    <button id="refresh_date_visitas" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Reset</button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <span class="route mt-6">
                    Trabajo de asesores
                </span>
                <div class="flex flex-wrap md:flex-nowrap gap-4">
                    <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Cuadro de Eficiencia</h5>

                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS CONCRETADAS
                                            </p>


                                        </div>
                                        <div id="resumen-visitas" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            0
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                SEPARACIONES
                                            </p>


                                        </div>
                                        <div id="resumen-separaciones" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            0
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VENTAS
                                            </p>


                                        </div>
                                        <div id="resumen-ventas" class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            0
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div id="resumen-vsv" class="w-full" style="height:400px;"></div>

                    </div>
                    <!-- <div class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Detalle de eficiencia por asesor</h5>

                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="../../img/avatar_default.jpg" alt="Neil image">
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center space-x-4">
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        Maicol Bohorquez
                                                    </p>

                                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                                    </div>

                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    1er puesto
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                    <div class="w-full md:w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-center text-gray-900 dark:text-white">Asistencia de Visitas</h5>

                        </div>
                        <div>
                            <div id="visitas_graf" class="w-full" style="height:400px;"></div>
                        </div>

                    </div>
                </div>

                <span class="route mt-6">
                    Visitas de enlaces de agentes
                </span>
                <div class="flex gap-4">
                    <div class="w-full md:w-1/3 max-w-md p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                        <canvas id="visitas" width="150"></canvas>
                    </div>
                    <div class="w-full md:w-2/3 max-w-md p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                        <canvas id="circleVisitas" width="150"></canvas>
                    </div>
                </div>

                <!-- <div class="grid-2-column gap-10">

                <div class="listAgentes">

                </div>
                <div class="dayAgentes">

                </div>
            </div> -->
            </div>

        </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="../../components/sidebar.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../../js/dinamic/gestion_contabilidad.js"></script>
    <script src="../../js/dinamic/graficos-admin.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/gestion_filtros.js"></script>

    </html>
<?php } ?>