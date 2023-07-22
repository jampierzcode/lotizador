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

        <div class="container-dashboard">
            <span class="route">
                > Home
            </span>
            <div class="cards-admin">
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
            <div>

                <span class="route">
                    Trabajo de asesores
                </span>
                <div class="flex gap-4 w-full">
                    <div class="w-full md:w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Seguimiento de clientes</h5>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                D--
                            </a>
                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS
                                            </p>

                                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                            </div>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            20
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                REPROGRAMACION CONTACTO
                                            </p>

                                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                            </div>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            20
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                REPROGRAMACION VISITA
                                            </p>

                                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                            </div>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            20
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>

                            <div id="compare_seguimiento" class="w-full" style="height:400px;"></div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Visitas para esta semana</h5>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                --
                            </a>
                        </div>
                        <div>
                            <div id="main" class="w-full" style="height:400px;"></div>
                        </div>
                        <!-- <div class="flow-root">
                            <ul role="list" class="max-h-[200px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div> -->
                    </div>

                </div>
                <span class="route mt-6">
                    Clientes Potenciales
                </span>
                <div class="flex gap-4">
                    <div class="w-full md:w-1/3 max-w-md p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Proyectos Vendidos</h5>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                D--
                            </a>
                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                VISITAS
                                            </p>

                                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                            </div>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            20
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                REPROGRAMACION CONTACTO
                                            </p>

                                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                            </div>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            20
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                REPROGRAMACION VISITA
                                            </p>

                                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 45%"></div>
                                            </div>

                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            20
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-full md:w-2/3 max-w-md p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex items-center justify-between mb-4">
                            <h5 class="text-lg font-bold leading-none text-gray-900 dark:text-white">Seguimiento de clientes por asesor</h5>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                --
                            </a>
                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image">
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
                                                    20
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script type="text/javascript">
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('main'));
        var myChart2 = echarts.init(document.getElementById('compare_seguimiento'));

        // Specify the configuration items and data for the chart
        var option = {
            // title: {
            //     text: 'ECharts Getting Started Example'
            // },
            tooltip: {},
            legend: {
                data: ['Visitas']
            },
            xAxis: {
                data: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
            },
            yAxis: {},
            series: [{
                name: 'Visitas',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 14]
            }]
        };
        var option2 = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center',
                // doesn't perfectly work with our tricks, disable it
                selectedMode: false
            },
            series: [{
                // name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '70%'],
                // adjust the start angle
                startAngle: 180,
                label: {
                    show: true,
                    formatter(param) {
                        // correct the percentage
                        return param.name + ' (' + param.percent * 2 + '%)';
                    }
                },
                data: [{
                        value: 1048,
                        name: 'REPROGRAMACION CONTACTO'
                    },
                    {
                        value: 735,
                        name: 'REPROGRAMACION VISITA'
                    },
                    {
                        value: 580,
                        name: 'VISITA'
                    },
                    {
                        // make an record to fill the bottom 50%
                        value: 1048 + 735 + 580,
                        itemStyle: {
                            // stop the chart from rendering this piece
                            color: 'none',
                            decal: {
                                symbol: 'none'
                            }
                        },
                        label: {
                            show: false
                        }
                    }
                ]
            }]
        };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
        myChart2.setOption(option2);
    </script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="../../components/sidebar.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js" integrity="sha512-Wt1bJGtlnMtGP0dqNFH1xlkLBNpEodaiQ8ZN5JLA5wpc1sUlk/O5uuOMNgvzddzkpvZ9GLyYNa8w2s7rqiTk5Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../../js/dinamic/gestion_contabilidad.js"></script>
    <script src="../../js/dinamic/graficos-admin.js"></script>

    </html>
<?php } ?>