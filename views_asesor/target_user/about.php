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
            <div id="spinner-load" class="text-center h-[400px] flex items-center justify-center">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="text-sm">Loading...</span>
                </div>
            </div>
            <div id="content-about" class="w-full hidden">
                <div class="flex flex-wrap md:flex-nowrap">
                    <div class="flex flex-wrap md:flex-nowrap bg-white border-r-[2px] border-gray-100">
                        <div class="p-3">
                            <ul class="flex flex-col gap-1">
                                <li class="w-full">
                                    <a class="page-target w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="../target_user/">
                                        <ion-icon name="apps-outline"></ion-icon>
                                        Contenido
                                    </a>
                                </li>
                                <li class="w-full">
                                    <a class="page-target actived w-full inline-block p-4 rounded-xl hover:bg-gray-200 ease-out duration-300 flex items-center gap-3 text-[12px]" href="about.php">
                                        <ion-icon name="person-outline"></ion-icon>
                                        Sobre mi
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-r-[2px] border-gray-100 grow w-full bg-white p-6 md:w-[500px] shadow-md space-y-4">
                        <div class="w-full flex gap-5">
                            <div class="flex  flex-col gap-3 text-sm text-black font-bold">
                                <label for="img">Foto de perfil</label>
                                <div class="relative" id="content-perfil">
                                    <div id=" img-profile" class="w-[80px]">
                                        <input id="perfil_upload" class="hidden" type="file" accept=".jpg,.jpeg,.png,.heic,.heif">
                                        <div id="perfil_overlay" class="w-[90px] h-[90px] p-1 rounded-full ring-2 ring-gray-200 dark:ring-gray-500 flex items-center flex-col bg-gray-100 text-gray-400 gap-2 justify-center cursor-pointer" src="#" alt="rofile picture">
                                            <ion-icon class="text-[25px]" name="person"></ion-icon>
                                            <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu perfil</p>
                                        </div>

                                        <!-- <img class="w-[80px] h-[80px] p-1 rounded-full ring-2 ring-gray-200 dark:ring-gray-500" src="https://firebasestorage.googleapis.com/v0/b/poplco.appspot.com/o/photos%2F1496665_bwwSLwwSw1bw?alt=media" alt="rofile picture"> -->
                                    </div>
                                    <!-- <span class="inline-block rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span> -->
                                </div>

                            </div>
                            <div class="flex  flex-col gap-3 text-sm text-black font-bold">
                                <label for="img">Portada de tarjeta</label>
                                <div class="relative" id="content-portada">
                                    <div id="img-profile-portada">
                                        <input id="portada_upload" class="hidden" type="file" accept=".jpg,.jpeg,.png,.heic,.heif">
                                        <div id="portada_overlay" class="w-[250px] rounded-lg ring-2 ring-gray-200 dark:ring-gray-500 flex items-center flex-col bg-gray-100 text-gray-400  h-[90px] gap-2 justify-center cursor-pointer" src="#" alt="rofile picture">
                                            <ion-icon class="text-[25px]" name="image"></ion-icon>
                                            <p class="text-[8px] w-[70%] text-center">Selecciona una foto para tu portada</p>
                                        </div>

                                        <!-- <img class="w-[80px] h-[80px] p-1 rounded-full ring-2 ring-gray-200 dark:ring-gray-500" src="#" alt="rofile picture"> -->
                                    </div>
                                    <!-- <span class="inline-block translate-x-[50%] translate-y-[-50%] rounded-full w-[30px] h-[30px] p-2 absolute top-[0] right-[0] shadow-lg z-[5000] bg-white cursor-pointer"><ion-icon name="close-outline"></ion-icon></span> -->
                                </div>

                            </div>
                        </div>
                        <h1 class="text-sm text-black font-bold">Nombre del usuario</h1>
                        <input id="name_profile" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe tu nombre"></input>
                        <h1 class="text-sm text-black font-bold">Ocupacion</h1>
                        <input id="name_job" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe la ocupacion primaria"></input>
                        <h1 class="text-sm text-black font-bold">Custom description</h1>

                        <textarea id="name_custom" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe el mensaje de tu plantilla"></textarea>
                        <div class="flex items-center gap-4 justify-end">
                            <button disable="true" id="cancelar_submit" class="rounded-full text-[12px] px-5 py-2 border-gray-300 border-solid border-2 text-gray-300 bg-white ">Cancelar</button>
                            <button disable="true" id="send_submit" class="rounded-full text-[12px] px-5 py-2 text-gray-500 bg-gray-300 ">Actualizar</button>
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
                                    <img id="preview_cover_photo" class="bg-gray-400 h-[95px] top-0 left-0 w-full relative" alt="banner" src="https://static.thenounproject.com/png/5647816-200.png" style="object-fit: cover;">
                                    <div class="left-1/2 translate-x-[-50%] absolute bottom-[-35px] rounded-full border-[6px] border-[#fff]">
                                        <img class="bg-gray-400" data-testid="company-logo" alt="logo" src="https://static.thenounproject.com/png/5647816-200.png" style="width: 32px; height: 32px; object-fit: cover; border-radius: 50%; position: absolute; bottom: 0px; right: 0px; z-index: 5; box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 12px;">
                                        <div class="jss104" style="width: 87px; height: 87px;">
                                            <img id="preview_perfil_photo" class="bg-gray-400 cursor-default target-element" data-testid="img" src="https://static.thenounproject.com/png/5647816-200.png" style="width: 87px; height: 87px; border-radius: 50%; object-fit: cover; position: absolute; top: 0px; left: 0px; z-index: 2;">
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-[43px] w-[75%] flex min-w-[121px] items-center flex-col">
                                    <div data-testid="name" class="text-[13px]" style="min-height: 23px;"><span id="preview_nameuser">Jampier Vasquez</span></div>
                                    <div data-testid="business-job-company" class="text-[8px]" id="preview_job">Ing. en Informática y Sistemas at Quiky</div>
                                    <div class="jss798"></div>
                                    <div data-testid="location" class="jss796 jss798" style="padding: 0px;"></div>
                                    <div class="jss799">
                                        <div class="text-[8px] text-center font-medium" data-testid="bio" style="width: 100%; word-break: break-word; min-height: 27px; padding-top: 10px;" id="preview_custom">Soy un profesional de la informacion, actualmente trabajo con todos los asociados... <br></div>
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
    <script src="../../js/dinamic/upload_about_target.js" defer></script>

    </html>
<?php } ?>