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
        <link rel="stylesheet" href="../../css/card-user.css">
        <link rel="stylesheet" href="../../css/sortablelist.css">
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
                > Home > Target User
            </span>
            <div class="w-full">

                <div class="flex flex-wrap md:flex-nowrap">
                    <div class="w-full md:w-[200px] flex flex-wrap md:flex-nowrap bg-white border-r-[2px] border-gray-100">
                        <div class="p-3">
                            <ul class="flex md:flex-col gap-1">
                                <li class="w-full">
                                    <a class="page-target actived w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="../target_user/">
                                        <ion-icon name="apps-outline"></ion-icon>
                                        Contenido
                                    </a>
                                </li>
                                <li class="w-full">
                                    <a class="page-target w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="about.php">
                                        <ion-icon name="person-outline"></ion-icon>
                                        Sobre mi
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-r-[2px] border-gray-100 grow w-full bg-white p-6 md:w-[500px] shadow-md space-y-4">

                        <!-- links -->
                        <h1 class="text-sm text-black font-bold">redes sociales</h1>

                        <ul class="sortable-list">
                            <li class="item" draggable="true">
                                <div class="details">
                                    <ion-icon name="apps"></ion-icon>
                                    <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filterc9)">
                                            <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc9)"></path>
                                            <path d="M66.0163 22H14.4268C13.9581 22 13.5169 22.1379 13.1309 22.3585L13.6823 22.9099L36.8163 46.0714C38.6913 47.9464 41.7519 47.9464 43.6269 46.0714L67.3399 22.386C66.9538 22.1379 66.4851 22 66.0163 22Z" fill="white"></path>
                                            <path d="M68.4695 24.454C68.4695 23.9853 68.3316 23.5441 68.111 23.1581L51.0156 40.4189L68.1662 57.5143C68.3592 57.1559 68.4695 56.7423 68.4695 56.3287V24.454Z" fill="white"></path>
                                            <path d="M12 24.454C12 23.9853 12.1379 23.5441 12.3585 23.1581L29.4539 40.4189L12.3033 57.5143C12.1103 57.1559 12 56.7423 12 56.3287V24.454Z" fill="white"></path>
                                            <path d="M50.1066 41.2185L44.1232 47.2019C41.9725 49.3526 38.4431 49.3526 36.2924 47.2019L30.309 41.2461L13.1309 58.3967C13.5169 58.6173 13.9305 58.7551 14.3992 58.7551H65.9888C66.4575 58.7551 66.8987 58.6173 67.2571 58.3967L66.2369 57.3765L50.1066 41.2185Z" fill="white"></path>
                                        </g>
                                        <defs>
                                            <filter id="filterc9" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                <feOffset dy="-1"></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                            </filter>
                                            <linearGradient id="paint0_linearc9" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#1E51EE"></stop>
                                                <stop offset="1" stop-color="#19E4FF"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span class="text-sm">Email</span>
                                </div>
                                <div class="boton-encend">
                                    <input type="checkbox" class="btnchecklink" id="btn-email">
                                    <label for="btn-email" class="lbl-switch"></label>
                                </div>
                            </li>
                            <li class="item" draggable="true">
                                <div class="details">
                                    <ion-icon name="apps"></ion-icon>
                                    <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0)" filter="url(#filter0_i)">
                                            <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc6)"></path>
                                            <path d="M55.9244 51.5313L57.7211 39.7967H46.4821V32.1817C46.4821 28.9713 48.052 25.842 53.086 25.842H58.196V15.8517C58.196 15.8517 53.5585 15.0589 49.1249 15.0589C39.8684 15.0589 33.8185 20.6788 33.8185 30.853V39.7967H23.5293V51.5313H33.8185V80.3918C33.8185 80.3918 37.9962 80.3922 40.1503 80.3922C42.3044 80.3922 46.4821 80.3922 46.4821 80.3922V51.5313H55.9244Z" fill="white"></path>
                                        </g>
                                        <defs>
                                            <filter id="filter0_i" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                <feOffset dy="-1"></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                            </filter>
                                            <linearGradient id="paint0_linearc6" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#1BAFFF"></stop>
                                                <stop offset="1" stop-color="#0062E0"></stop>
                                            </linearGradient>
                                            <clipPath id="clip0">
                                                <rect width="80" height="80" fill="white"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span class="text-sm">Facebook</span>
                                </div>
                                <div class="boton-encend">
                                    <input type="checkbox" class="btnchecklink" id="btn-facebook">
                                    <label for="btn-facebook" class="lbl-switch"></label>
                                </div>
                            </li>
                            <li class="item" draggable="true">
                                <div class="details">
                                    <ion-icon name="apps"></ion-icon>
                                    <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filterc3)">
                                            <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_radial)"></path>
                                            <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint1_radial)"></path>
                                            <path d="M38.7619 10.4761C42.5714 10.4761 46.381 10.4761 50.1905 10.4761C52.5714 10.4761 55.0476 10.6666 57.4286 11.3332C61.619 12.4761 64.8571 14.8571 67.0476 18.5713C68.381 20.8571 68.9524 23.3332 69.2381 25.9047C69.4286 28.1904 69.5238 30.4761 69.5238 32.7618C69.5238 38.3809 69.5238 44.0951 69.5238 49.7142C69.5238 52.2856 69.3333 54.8571 68.6667 57.4285C67.2381 62.5713 64.0952 66.1904 59.1429 68.0951C56.7619 69.0475 54.1905 69.3332 51.619 69.4285C45.3333 69.5237 39.0476 69.619 32.7619 69.619C30.0952 69.619 27.3333 69.5237 24.7619 69.1428C21.0476 68.6666 17.8095 67.238 15.1429 64.4761C12.6667 61.9047 11.3333 58.7618 10.8571 55.238C10.2857 50.4761 10.381 45.7142 10.381 40.8571C10.381 36.8571 10.4762 32.9523 10.4762 28.9523C10.5714 26.1904 10.7619 23.4285 11.8095 20.7618C13.7143 15.8094 17.2381 12.7618 22.381 11.3332C24.7619 10.6666 27.2381 10.5713 29.7143 10.4761C32.5714 10.4761 35.7143 10.4761 38.7619 10.4761ZM64.2857 40.0951C64.2857 37.8094 64.381 35.619 64.2857 33.3332C64.1905 30.5713 64.0952 27.7142 63.8095 24.9523C63.619 23.0475 62.8571 21.238 61.5238 19.7142C59.3333 17.1428 56.4762 15.9999 53.2381 15.8094C50.0952 15.619 46.8571 15.5237 43.7143 15.5237C38 15.5237 32.2857 15.619 26.5714 15.8094C24.4762 15.9047 22.4762 16.3809 20.6667 17.5237C17.7143 19.3332 16.1905 22.0952 15.9048 25.4285C15.619 28.2856 15.5238 31.1428 15.4286 33.9999C15.4286 39.5237 15.4286 44.9523 15.5238 50.4761C15.5238 52.3809 15.8095 54.3809 16.1905 56.1904C16.7619 58.6666 18.1905 60.6666 20.2857 62.0951C22.381 63.5237 24.8571 63.9999 27.3333 64.0952C30.2857 64.1904 33.1429 64.2856 36.0952 64.2856C41.7143 64.2856 47.3333 64.1904 52.9524 64.0952C55.3333 63.9999 57.619 63.4285 59.5238 61.9999C61.9048 60.2856 63.3333 57.9047 63.7143 55.0475C64 52.9523 64.0952 50.8571 64.1905 48.7618C64.2857 45.9047 64.2857 43.0475 64.2857 40.0951Z" fill="white"></path>
                                            <path d="M54.9537 40C54.9537 48.4762 48.1918 55.1429 39.7156 55.1429C31.4299 55.1429 24.668 48.2858 24.668 39.9048C24.668 31.6191 31.5251 24.7619 39.9061 24.7619C48.1918 24.8572 54.9537 31.6191 54.9537 40ZM29.9061 40C29.9061 45.5238 34.3823 50 39.9061 50C45.4299 50 49.9061 45.5238 49.9061 40C49.9061 34.5715 45.4299 30.0953 39.9061 30.0953C34.287 30.0953 29.9061 34.4762 29.9061 40Z" fill="white"></path>
                                            <path d="M55.618 20.762C57.618 20.762 59.1418 22.2858 59.1418 24.1905C59.1418 26.0953 57.618 27.7143 55.7133 27.7143C53.8085 27.7143 52.1895 26.1905 52.1895 24.2858C52.1895 22.2858 53.7133 20.762 55.618 20.762Z" fill="white"></path>
                                        </g>
                                        <defs>
                                            <filter id="filterc3" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                <feOffset dy="-1"></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                            </filter>
                                            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.17752 78.2474) scale(101.57)">
                                                <stop offset="0.09" stop-color="#FA8F21"></stop>
                                                <stop offset="0.78" stop-color="#D82D7E"></stop>
                                            </radialGradient>
                                            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(55.4132 75.6787) scale(89.3828)">
                                                <stop offset="0.64" stop-color="#8C3AAA" stop-opacity="0"></stop>
                                                <stop offset="1" stop-color="#8C3AAA"></stop>
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                    <span class="text-sm">Instagram</span>
                                </div>
                                <div class="boton-encend">
                                    <input type="checkbox" class="btnchecklink" id="btn-insta">
                                    <label for="btn-insta" class="lbl-switch"></label>
                                </div>
                            </li>

                            <li class="item" draggable="true">
                                <div class="details">
                                    <ion-icon name="apps"></ion-icon>
                                    <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filterc18)">
                                            <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc18)"></path>
                                            <path d="M11.7656 68.2354C11.9539 67.4825 12.1421 66.9178 12.2362 66.3531C13.3656 62.4001 14.4009 58.4472 15.4362 54.4942C15.5303 54.1178 15.5303 53.6472 15.3421 53.3648C13.3656 49.8825 12.3303 46.1178 11.9539 42.0707C11.5774 37.7413 12.2362 33.506 13.8362 29.4589C16.3774 23.2472 20.6127 18.5413 26.448 15.2472C30.2127 13.1766 34.2597 12.0472 38.5892 11.8589C46.0244 11.5766 52.5186 13.7413 58.1656 18.6354C63.3421 23.1531 66.6362 28.8001 67.5774 35.5766C68.8009 43.9531 66.7303 51.3884 61.2715 57.8825C56.6597 63.3413 50.7303 66.6354 43.5774 67.5766C38.0244 68.3295 32.6597 67.5766 27.5774 64.9413C26.7303 64.5648 26.0715 64.4707 25.1303 64.6589C20.9892 65.7883 16.848 66.8236 12.7068 67.9531C12.6127 68.0472 12.2362 68.1413 11.7656 68.2354ZM39.3421 16.3766C38.5892 16.4707 37.0833 16.5648 35.6715 16.7531C30.4009 17.7884 25.8833 20.3295 22.3068 24.3766C18.1656 29.1766 16.1892 34.8236 16.5656 41.1295C16.7539 45.2707 18.0715 49.0354 20.3303 52.5178C20.5186 52.8001 20.5186 53.1766 20.4244 53.5531C19.8597 55.7178 19.295 57.8825 18.6362 60.0472C18.5421 60.4236 18.448 60.706 18.3539 61.0825C18.3539 61.1766 18.6362 61.4589 18.7303 61.4589C18.9186 61.4589 19.2009 61.3648 19.4833 61.2707C21.7421 60.706 24.095 60.0472 26.3539 59.4825C26.8244 59.3884 27.3892 59.4825 27.7656 59.6707C32.2833 62.306 37.1774 63.4354 42.3539 62.8707C48.7539 62.2119 54.0244 59.2942 57.9774 54.4001C61.8362 49.6001 63.6244 44.1413 63.1539 37.9295C62.7774 32.5648 60.8009 27.8589 57.1303 23.906C52.7068 19.0119 46.8715 16.4707 39.3421 16.3766Z" fill="white"></path>
                                            <path d="M47.3429 53.1765C45.1782 53.2706 43.2958 52.4235 41.4135 51.6706C38.1194 50.447 35.2959 48.3765 32.8488 45.8353C30.6841 43.6706 28.7076 41.3176 27.2958 38.5882C25.8841 36.1412 25.3194 33.5059 26.2606 30.7765C26.7311 29.4588 27.5782 28.3294 28.6135 27.3882C29.6488 26.5412 30.8723 26.7294 32.0958 27.0117C32.3782 27.1059 32.5664 27.3882 32.7547 27.6706C33.6017 29.5529 34.4488 31.4353 35.2017 33.4117C35.39 33.7882 35.2958 34.3529 35.0135 34.7294C34.637 35.3882 34.0723 36.047 33.5076 36.6117C32.8488 37.3647 32.7547 37.647 33.3194 38.4941C35.5782 42.3529 38.7782 45.0823 42.9194 46.6823C43.4841 46.8706 43.8606 46.7765 44.237 46.4C44.8958 45.5529 45.6488 44.7059 46.3076 43.9529C46.8723 43.2 47.1547 43.1059 48.0958 43.4823C48.8488 43.7647 49.5076 44.1412 50.2606 44.4235C51.2959 44.8941 52.3311 45.4588 53.3664 45.9294C54.0253 46.2117 54.2135 46.7765 54.2135 47.4353C53.9311 50.6353 51.39 52.9882 48.0958 53.0823C47.8135 53.1765 47.5311 53.1765 47.3429 53.1765Z" fill="white"></path>
                                        </g>
                                        <defs>
                                            <filter id="filterc18" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                <feOffset dy="-1"></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                            </filter>
                                            <linearGradient id="paint0_linearc18" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#00FF6A"></stop>
                                                <stop offset="1" stop-color="#00D31D"></stop>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span class="text-sm">Celular/Whatsapp</span>
                                </div>
                                <div class="boton-encend">
                                    <input type="checkbox" class="btnchecklink" id="btn-whatsapp">
                                    <label for="btn-whatsapp" class="lbl-switch"></label>
                                </div>
                            </li>
                            <li class="item" draggable="true">
                                <div class="details">
                                    <ion-icon name="apps"></ion-icon>
                                    <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filterc11)">
                                            <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="#020002"></path>
                                            <path d="M52.3062 32.3583C56.0659 35.0502 60.6718 36.6341 65.6464 36.6341V27.0461C64.7049 27.0463 63.7659 26.9479 62.8448 26.7525V34.2996C57.8707 34.2996 53.2654 32.7157 49.5046 30.024V49.5904C49.5046 59.3785 41.5827 67.3128 31.811 67.3128C28.1649 67.3128 24.7761 66.2087 21.9609 64.3152C25.1739 67.6058 29.6547 69.6471 34.6119 69.6471C44.3842 69.6471 52.3066 61.7128 52.3066 51.9243V32.3583H52.3062ZM55.7622 22.6851C53.8407 20.5825 52.5792 17.8654 52.3062 14.8614V13.6282H49.6513C50.3196 17.4462 52.5989 20.7081 55.7622 22.6851ZM28.1415 56.8041C27.068 55.3943 26.4879 53.6696 26.4905 51.8962C26.4905 47.4195 30.1139 43.7897 34.5843 43.7897C35.4174 43.7895 36.2456 43.9173 37.0395 44.1696V34.3673C36.1117 34.24 35.1752 34.1859 34.2392 34.2057V41.8354C33.4446 41.583 32.6161 41.4549 31.7828 41.4557C27.3124 41.4557 23.6891 45.0851 23.6891 49.5624C23.6891 52.7281 25.5003 55.469 28.1415 56.8041Z" fill="#FF004F"></path>
                                            <path d="M49.5046 30.0238C53.2653 32.7155 57.8706 34.2994 62.8448 34.2994V26.7523C60.0682 26.1599 57.6102 24.7066 55.7621 22.6851C52.5987 20.7079 50.3195 17.446 49.6513 13.6282H42.6777V51.9239C42.6619 56.3884 39.0447 60.0033 34.5839 60.0033C31.9552 60.0033 29.6199 58.7483 28.1409 56.8041C25.4998 55.4689 23.6887 52.7279 23.6887 49.5626C23.6887 45.0857 27.312 41.4559 31.7823 41.4559C32.6388 41.4559 33.4644 41.5894 34.2387 41.8356V34.2059C24.6387 34.4046 16.918 42.2613 16.918 51.9241C16.918 56.7476 18.8406 61.1204 21.9611 64.3154C24.7762 66.2087 28.1651 67.313 31.8111 67.313C41.583 67.313 49.5048 59.3783 49.5048 49.5904V30.0238H49.5046Z" fill="#FFFEFF"></path>
                                            <path d="M62.8454 26.7523V24.7116C60.3416 24.7154 57.887 24.0131 55.7627 22.6849C57.6432 24.7471 60.1194 26.1689 62.8454 26.7523ZM49.6518 13.6282C49.5881 13.2633 49.5391 12.896 49.5051 12.5273V11.2941H39.8765V49.5902C39.8612 54.0541 36.2441 57.6691 31.7829 57.6691C30.4732 57.6691 29.2366 57.3577 28.1414 56.8043C29.6204 58.7483 31.9558 60.0032 34.5844 60.0032C39.0448 60.0032 42.6627 56.3886 42.6783 51.9241V13.6282H49.6518ZM34.2397 34.2059V32.0335C33.4352 31.9233 32.624 31.8681 31.8119 31.8685C22.0392 31.8683 14.1172 39.8029 14.1172 49.5902C14.1172 55.7263 17.2307 61.1341 21.9618 64.3151C18.8414 61.1202 16.9187 56.7473 16.9187 51.9239C16.9187 42.2614 24.6393 34.4046 34.2397 34.2059Z" fill="#00F2EA"></path>
                                        </g>
                                        <defs>
                                            <filter id="filterc11" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                <feOffset dy="-1"></feOffset>
                                                <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                            </filter>
                                        </defs>
                                    </svg>
                                    <span class="text-sm">TikTok</span>
                                </div>
                                <div class="boton-encend">
                                    <input type="checkbox" class="btnchecklink" id="btn-switch">
                                    <label for="btn-switch" class="lbl-switch"></label>
                                </div>
                            </li>

                        </ul>
                        <div class="flex items-center gap-4 justify-end">
                            <button disabled class="rounded-full text-[12px] px-5 py-2 border-gray-300 border-solid border-2 text-gray-300 bg-white ">Cancelar</button>
                            <button disabled class="rounded-full text-[12px] px-5 py-2 text-gray-500 bg-gray-300 ">Actualizar</button>
                        </div>
                    </div>
                    <div class="grow w-full bg-white p-6 justify-center flex md:max-w-[400px] shadow-md">
                        <div class="card-movil">
                            <div class="absolute top-0">
                                <svg width="145" height="20" fill="none" viewBox="0 0 145 20">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M144.516 0H0C2.49419 0 4.51613 2.02194 4.51613 4.51613C4.17977 13.0429 10.8623 19.8833 19.5482 20L20 20H124.516L124.962 20C133.526 19.8833 140.211 13.0429 140 4.51613C140 2.02194 142.022 0 144.516 0Z" fill="#E0E0E0"></path>
                                </svg>
                            </div>
                            <div class="w-full flex justify-between pt-[8px] pr-[3px] pb-[14px] pl-[14px] rounded-[25px]" style="background-color: rgb(255, 255, 255); display: flex;">
                                <div class="text-[10px] w-[36px]">6:25</div>
                                <div class="flex items-center">
                                    <svg width="16" height="9" fill="none" viewBox="0 0 12 9">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9742 0.966309H10.2968C9.92273 0.966309 9.61948 1.26956 9.61948 1.64365V7.51393C9.61948 7.88801 9.92273 8.19127 10.2968 8.19127H10.9742C11.3482 8.19127 11.6515 7.88801 11.6515 7.51393V1.64365C11.6515 1.26956 11.3482 0.966309 10.9742 0.966309ZM7.13634 2.54688H7.81368C8.18776 2.54688 8.49102 2.85013 8.49102 3.22422V7.51404C8.49102 7.88812 8.18776 8.19138 7.81368 8.19138H7.13634C6.76225 8.19138 6.459 7.88812 6.459 7.51404V3.22422C6.459 2.85013 6.76225 2.54688 7.13634 2.54688ZM4.65188 4.12712H3.97454C3.60045 4.12712 3.2972 4.43037 3.2972 4.80446V7.51382C3.2972 7.8879 3.60045 8.19116 3.97454 8.19116H4.65188C5.02596 8.19116 5.32922 7.8879 5.32922 7.51382V4.80446C5.32922 4.43037 5.02596 4.12712 4.65188 4.12712ZM1.4914 5.4818H0.814059C0.439974 5.4818 0.136719 5.78505 0.136719 6.15914V7.51382C0.136719 7.8879 0.439974 8.19116 0.814059 8.19116H1.4914C1.86548 8.19116 2.16874 7.8879 2.16874 7.51382V6.15914C2.16874 5.78505 1.86548 5.4818 1.4914 5.4818Z" fill="black"></path>
                                    </svg><svg width="11" height="8" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.23227 2.28614C6.73917 2.2862 8.18845 2.86473 9.28056 3.90214C9.3628 3.98223 9.49425 3.98122 9.57525 3.89987L10.3614 3.10716C10.4024 3.0659 10.4253 3.01001 10.4249 2.95186C10.4246 2.89372 10.4011 2.8381 10.3596 2.79732C7.49312 0.0525852 2.97098 0.0525852 0.104532 2.79732C0.0630094 2.83807 0.0394501 2.89367 0.0390672 2.95182C0.0386844 3.00997 0.0615095 3.06587 0.102492 3.10716L0.888847 3.89987C0.969791 3.98134 1.10134 3.98235 1.18353 3.90214C2.27578 2.86466 3.72523 2.28613 5.23227 2.28614ZM5.23206 4.86522C6.06 4.86516 6.8584 5.17265 7.47212 5.72791C7.55512 5.80672 7.68588 5.80501 7.7668 5.72406L8.55202 4.93135C8.59338 4.88977 8.61632 4.83336 8.61572 4.77475C8.61513 4.71614 8.59104 4.66021 8.54885 4.61948C6.67996 2.8825 3.78574 2.8825 1.91685 4.61948C1.87464 4.66021 1.85055 4.71616 1.85 4.7748C1.84945 4.83343 1.87247 4.88983 1.91391 4.93135L2.6989 5.72406C2.77982 5.80501 2.91058 5.80672 2.99359 5.72791C3.6069 5.17301 4.40466 4.86556 5.23206 4.86522ZM6.80446 6.60047C6.80566 6.65925 6.78254 6.71592 6.74054 6.7571L5.38227 8.12668C5.34246 8.16693 5.28817 8.18958 5.23153 8.18958C5.17489 8.18958 5.1206 8.16693 5.08079 8.12668L3.72229 6.7571C3.68032 6.71589 3.65724 6.6592 3.65848 6.60043C3.65973 6.54165 3.68519 6.48599 3.72886 6.44659C4.59631 5.71352 5.86675 5.71352 6.7342 6.44659C6.77784 6.48602 6.80326 6.5417 6.80446 6.60047Z" fill="black"></path>
                                    </svg><svg width="17" height="8" fill="none">
                                        <rect opacity="0.35" x="1.15117" y="1.07939" width="14.2241" height="6.99918" rx="1.46757" stroke="black" stroke-width="0.67734"></rect>
                                        <path opacity="0.4" d="M16.3906 3.22412V5.93348C16.9357 5.70401 17.2902 5.17021 17.2902 4.5788C17.2902 3.98739 16.9357 3.45359 16.3906 3.22412Z" fill="black"></path>
                                        <rect x="2.16797" y="2.09521" width="12.1921" height="4.96716" rx="0.90312" fill="black"></rect>
                                    </svg>
                                </div>

                            </div>
                            <div data-testid="scrollabel-container" class="jss791 overflow-auto w-[247px] flex flex-col rounded-b-[25px] grow items-center " style="background-color: rgb(255, 255, 255); overflow: auto;">
                                <div class="w-full relative rounded-[18px] bg-cover h-[118px]">
                                    <img class="h-[95px] top-0 left-0 w-full relative" alt="banner" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/banners%2F1496665_e46eW6eWm6em?alt=media" style="object-fit: cover;">
                                    <div class="left-1/2 translate-x-[-50%] absolute bottom-[-35px] rounded-full border-[6px] border-[#fff]">
                                        <img data-testid="company-logo" alt="logo" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/logos%2F1496665_6RRpNpZU3U88?alt=media" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; position: absolute; bottom: 0px; right: 0px; z-index: 5; box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;">
                                        <div class="jss104" style="width: 87px; height: 87px;">
                                            <img class="cursor-default target-element" data-testid="img" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/photos%2F1496665_bwwSLwwSw1bw?alt=media" style="width: 87px; height: 87px; border-radius: 50%; object-fit: cover; position: absolute; top: 0px; left: 0px; z-index: 2;">
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-[43px] w-[75%] flex min-w-[121px] items-center flex-col">
                                    <div data-testid="name" class="text-[13px]" style="min-height: 23px;"><span>Jampier Vasquez</span></div>
                                    <div data-testid="business-job-company" class="text-[8px]">Ing. en Informática y Sistemas at Quiky</div>
                                    <div class="jss798"></div>
                                    <div data-testid="location" class="jss796 jss798" style="padding: 0px;"></div>
                                    <div class="jss799">
                                        <div class="text-[8px] text-center font-medium" data-testid="bio" style="width: 100%; word-break: break-word; min-height: 27px; padding-top: 10px;">Soy un profesional de la informacion, actualmente trabajo con todos los asociados... <br></div>
                                    </div>
                                </div>
                                <div data-testid="button" class="w-full pt-[20px] pb-[20px] flex justify-center" style="background: linear-gradient(rgba(255, 255, 255, 0) 15%, rgb(255, 255, 255) 100%) rgb(255, 255, 255);">
                                    <div data-testid="button-text-cont" class="rounded-[48px] text-[10px] text-white flex items-center justify-center w-[170px] h-[38px] font-bold" color="primary" variant="contained" style="background-color: rgb(0, 0, 0);">Save Contact</div>
                                </div>
                                <div class="jss805" style="background-color: rgb(255, 255, 255); flex-grow: 1;">
                                    <div data-testid="links-container" style="display: flex; justify-content: center; flex-wrap: wrap; background-color: rgb(255, 255, 255);">
                                        <div data-testid="not-highlighted" style="display: flex; justify-content: center; margin: 0px 9px 5px;"><a class="jss807" href="tel:+51900366553" target="_blank" style="margin-bottom: 0px; width: 54.58px; height: 74px; box-shadow: none; border-radius: 0px;">
                                                <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#c_31)">
                                                        <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearс31)"></path>
                                                        <path d="M14.6819 21.9295C14.4937 19.3883 15.529 17.6001 17.6937 16.2824C18.6349 15.7177 19.576 15.0589 20.5172 14.4942C22.2113 13.4589 23.8113 13.7413 24.9407 15.4354C26.9172 18.353 28.7996 21.1766 30.776 24.0942C32.1878 26.1648 32.0937 27.5766 30.4937 29.4589C30.0231 30.0236 29.5525 30.5883 29.176 31.153C27.8584 32.8471 27.7643 34.353 28.9878 36.1413C30.4937 38.2119 32.1878 40.1883 33.8819 42.1648C36.5172 45.1766 39.6231 47.7177 42.9172 50.1648C44.7055 51.4824 46.3996 51.3883 48.1878 50.2589C48.7525 49.8824 49.4113 49.4118 49.976 49.0354C51.6702 47.7177 52.9878 47.6236 54.8702 48.753C57.7878 50.6354 60.7996 52.4236 63.7172 54.306C65.8819 55.6236 66.2584 57.0354 65.129 59.2942C64.4702 60.5177 63.7172 61.6471 62.8702 62.7766C61.6466 64.5648 59.8584 65.1295 57.7878 65.1295C55.2466 65.2236 52.8937 64.5648 50.6349 63.6236C44.329 61.0824 38.776 57.3177 33.7878 52.8001C27.6702 47.3413 22.3996 41.1295 18.4466 33.8824C16.7525 30.6824 15.3407 27.3883 14.8702 23.8119C14.776 23.153 14.776 22.4942 14.6819 21.9295Z" fill="white"></path>
                                                    </g>
                                                    <defs>
                                                        <filter id="c_31" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                            <feOffset dy="-1"></feOffset>
                                                            <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                                        </filter>
                                                        <linearGradient id="paint0_linearс31" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#8BFB6B"></stop>
                                                            <stop offset="1" stop-color="#19DB1C"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <span class="text-icon-target" data-testid="link-title" style="color: rgb(0, 0, 0); overflow: hidden; padding-top: 0px;">Phone</span></a></div>
                                        <div data-testid="not-highlighted" style="display: flex; justify-content: center; margin: 0px 9px 5px;"><a class="jss807" href="mailto:jampierv127@gmail.com" target="_blank" style="margin-bottom: 0px; width: 54.58px; height: 74px; box-shadow: none; border-radius: 0px;">
                                                <svg class="icon-shadow" width="54" height="54" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#filterc9)">
                                                        <path d="M18.0952 0H61.9048C71.9048 0 80 8.09524 80 18.0952V61.9048C80 71.9048 71.9048 80 61.9048 80H18.0952C8.09524 80 0 71.9048 0 61.9048V18.0952C0 8.09524 8.09524 0 18.0952 0Z" fill="url(#paint0_linearc9)"></path>
                                                        <path d="M66.0163 22H14.4268C13.9581 22 13.5169 22.1379 13.1309 22.3585L13.6823 22.9099L36.8163 46.0714C38.6913 47.9464 41.7519 47.9464 43.6269 46.0714L67.3399 22.386C66.9538 22.1379 66.4851 22 66.0163 22Z" fill="white"></path>
                                                        <path d="M68.4695 24.454C68.4695 23.9853 68.3316 23.5441 68.111 23.1581L51.0156 40.4189L68.1662 57.5143C68.3592 57.1559 68.4695 56.7423 68.4695 56.3287V24.454Z" fill="white"></path>
                                                        <path d="M12 24.454C12 23.9853 12.1379 23.5441 12.3585 23.1581L29.4539 40.4189L12.3033 57.5143C12.1103 57.1559 12 56.7423 12 56.3287V24.454Z" fill="white"></path>
                                                        <path d="M50.1066 41.2185L44.1232 47.2019C41.9725 49.3526 38.4431 49.3526 36.2924 47.2019L30.309 41.2461L13.1309 58.3967C13.5169 58.6173 13.9305 58.7551 14.3992 58.7551H65.9888C66.4575 58.7551 66.8987 58.6173 67.2571 58.3967L66.2369 57.3765L50.1066 41.2185Z" fill="white"></path>
                                                    </g>
                                                    <defs>
                                                        <filter id="filterc9" x="0" y="-1" width="80" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                            <feOffset dy="-1"></feOffset>
                                                            <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                                                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"></feBlend>
                                                        </filter>
                                                        <linearGradient id="paint0_linearc9" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#1E51EE"></stop>
                                                            <stop offset="1" stop-color="#19E4FF"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                                <span class="text-icon-target" data-testid="link-title" style="color: rgb(0, 0, 0); overflow: hidden; padding-top: 0px;">Email</span></a></div>
                                        <div data-testid="not-highlighted" style="display: flex; justify-content: center; margin: 0px 9px 5px;"><a class="jss807" href="https://facebook.com/awdawdawd" target="_blank" style="margin-bottom: 0px; width: 54.58px; height: 74px; box-shadow: none; border-radius: 0px;"><img alt="Mi facebook" class="jss809" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/42957129888-icon_dBBcz44rOdrt?alt=media" style="border-radius: 10px; object-fit: cover; width: 54px; height: 54px;"><span data-testid="link-title" style="color: rgb(0, 0, 0); overflow: hidden; padding-top: 0px;">Mi facebook</span></a></div>
                                        <div data-testid="not-highlighted" style="display: flex; justify-content: center; margin: 0px 9px 5px;"><a class="jss807" href="https://instagram.com/awd" target="_blank" style="margin-bottom: 0px; width: 54.58px; height: 74px; box-shadow: none; border-radius: 0px;"><img alt="awdawd" class="jss809" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/42957129888-icon_IJDI937379JD?alt=media" style="border-radius: 10px; object-fit: cover; width: 54px; height: 54px;"><span data-testid="link-title" style="color: rgb(0, 0, 0); overflow: hidden; padding-top: 0px;">awdawd</span></a></div>
                                        <div style="width: 254px; padding: 15px 23px; margin-bottom: 5px;">
                                            <div>
                                                <div class="MuiPaper-root MuiAccordion-root jss813 jss815 MuiPaper-elevation1">
                                                    <div class="MuiButtonBase-root MuiAccordionSummary-root jss816" tabindex="0" role="button" aria-disabled="false" aria-expanded="false" aria-controls="panel1d-content" id="panel1d-header">
                                                        <div class="MuiAccordionSummary-content jss817"><span style="color: rgb(0, 0, 0);"><strong>Tecnico en computacion</strong></span>
                                                            <div class="jss812" style="transform: rotate(0deg);"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-3vmltg" focusable="false" viewBox="0 0 24 24" color="white" aria-hidden="true" data-testid="ArrowForwardIosSharpIcon" style="user-select: none; width: 1em; height: 1em; display: inline-block; fill: rgb(3, 4, 6); flex-shrink: 0; transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; font-size: 0.9rem;">
                                                                    <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                                                </svg></div>
                                                        </div>
                                                    </div>
                                                    <div class="MuiCollapse-root MuiCollapse-hidden" style="min-height: 0px;">
                                                        <div class="MuiCollapse-wrapper">
                                                            <div class="MuiCollapse-wrapperInner">
                                                                <div aria-labelledby="panel1d-header" id="panel1d-content" role="region">
                                                                    <div class="MuiAccordionDetails-root jss819"><span style="color: rgb(0, 0, 0); white-space: pre-line;">tecnico en computacion</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="width: 254px; padding: 15px 23px; margin-bottom: 5px;"><span style="display: inline-block; white-space: pre-line; font-size: 13px; font-weight: 600; margin: 0px; line-height: 1.5; color: rgb(0, 0, 0);">Mis skills</span></div>
                                        <div style="width: 254px; padding: 15px 23px; margin-bottom: 5px;">
                                            <div>
                                                <div class="MuiPaper-root MuiAccordion-root jss813 jss820 MuiPaper-elevation1">
                                                    <div class="MuiButtonBase-root MuiAccordionSummary-root jss816" tabindex="0" role="button" aria-disabled="false" aria-expanded="false" aria-controls="panel1d-content" id="panel1d-header">
                                                        <div class="MuiAccordionSummary-content jss817"><span style="color: rgb(0, 0, 0);"><strong>gestion</strong></span>
                                                            <div class="jss812" style="transform: rotate(0deg);"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-3vmltg" focusable="false" viewBox="0 0 24 24" color="white" aria-hidden="true" data-testid="ArrowForwardIosSharpIcon" style="user-select: none; width: 1em; height: 1em; display: inline-block; fill: rgb(3, 4, 6); flex-shrink: 0; transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; font-size: 0.9rem;">
                                                                    <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                                                                </svg></div>
                                                        </div>
                                                    </div>
                                                    <div class="MuiCollapse-root MuiCollapse-hidden" style="min-height: 0px;">
                                                        <div class="MuiCollapse-wrapper">
                                                            <div class="MuiCollapse-wrapperInner">
                                                                <div aria-labelledby="panel1d-header" id="panel1d-content" role="region">
                                                                    <div class="MuiAccordionDetails-root jss819"><span style="color: rgb(0, 0, 0); white-space: pre-line;">hola
                                                                            awdw
                                                                            awdawd</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- </div> -->
        </div>
        </div>

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
    <!-- <script src="../../js/dinamic/gestion-clientes-as.js"></script> -->
    <!-- <script src="../../js/dinamic/emojiapp.js"></script> -->
    <script src="../../js/dinamic/gestion-target.js" defer></script>

    </html>
<?php } ?>