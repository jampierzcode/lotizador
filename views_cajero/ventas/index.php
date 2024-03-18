<?php

session_start();
if (empty($_SESSION["id_usuario"]) || $_SESSION["us_tipo"] != 4) {
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
        <link rel="stylesheet" href="../../css/datatablesmith.css">
        <link rel="stylesheet" href="../../css/selectsinput.css">
        <link rel="stylesheet" href="../../css/toast.css">
        <link rel="stylesheet" href="../../css/sidebar.css">
        <link rel="stylesheet" href="../../css/navdashboard.css">
        <link rel="stylesheet" href="../../css/container-dashboard.css">
        <link rel="stylesheet" href="../../css/chart.css">
        <link rel="stylesheet" href="../../css/gestionApp.css">
        <link rel="icon" href="../../img/logo.jpg">
        <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        <!-- data table CDN -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.4.0/css/fixedHeader.dataTables.min.css" />

        <!-- tailwin css -->
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Soluciones Caja</title>
    </head>

    <body>
        <?php
        include_once "../../components/Sidebar_cajero.php"
        ?>
        <div class="container-dashboard h-screen">
            <!-- <span class="route">
                > Home > Ventas
            </span> -->
            <div id="crear-venta" class="modal-create md-hidden">
                <div class="form-create" style="width:100% ;max-width: 1025px;">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">Nueva Venta</h1>
                    <div>
                        <div class="grid grid-cols-3 gap-3">
                            <div class="group flex flex-col">
                                <label class="text-sm font-bold" for="proyecto">Proyecto</label>
                                <select style="width: 100%; background: #ececec" id="proyectoList" class="js-example-placeholder-single js-states form-control" name="state">
                                    <option></option>
                                </select>
                            </div>
                            <div class="group">
                                <label class="text-sm font-bold" for="cliente">Cliente</label>
                                <div class="flex gap-3">
                                    <select style="width: 250px; background: #ececec" id="clientesList" class="js-example-placeholder-single js-states form-control" name="state">
                                        <option></option>
                                    </select>
                                    <button id="open-lead" class="px-3 py-2 bg-green-500 text-white rounded h-max-h">+</button>
                                </div>
                            </div>
                            <div class="group">
                                <label class="text-sm font-bold" for="asesor">Tipo de Venta</label>
                                <select name="" id="tipoVenta" class="px-3 py-2 bg-gray-200 rounded text-gray-700 w-full text-sm">
                                    <option disabled value="0">Seleccione el tipo de venta</option>
                                    <option value="VENTA">VENTA</option>
                                    <option value="SEPARACION">SEPARACION</option>
                                </select>

                            </div>

                        </div>
                        <div class="grid grid-cols-3 gap-3 hidden" id="form_separacion">
                            <div class="group flex flex-col">
                                <label class="text-sm font-bold" for="proyecto">Tipo de Pago</label>
                                <select id="tipo_pago_separacion" class="px-3 py-2 bg-gray-200 rounded text-gray-700 w-full text-sm">
                                    <option disabled value="0">Seleccione el tipo de pagoa</option>
                                    <option value="AL CONTADO">AL CONTADO</option>
                                    <option value="FINANCIAMIENTO">FINANCIAMIENTO</option>
                                </select>
                            </div>
                            <div class="group">
                                <label class="text-sm font-bold" for="cliente">Fecha Programacion</label>
                                <div class="flex gap-3">
                                    <input type="datetime-local" name="fecha_programacion" id="fecha_programacion" class="px-3 py-2 bg-gray-200 rounded text-gray-700 w-full text-sm">
                                </div>
                            </div>
                            <div class="group">
                                <label class="text-sm font-bold" for="asesor">Monto Separacion</label>
                                <input id="monto_separacion" type="number" step="0.01" inputmode="decimal" class="px-3 py-2 bg-gray-200 rounded text-gray-700 w-full text-sm">
                            </div>

                        </div>
                        <div class="my-8 h-[2px] w-full bg-gray-200"></div>
                        <div class="formulario grid grid-cols-1 md:grid-cols-4 gap-4">

                            <div class="h-auto flex flex-col">

                                <label class="text-sm font-bold" for="metodo_pago">Metodo Pago</label>
                                <select name="" id="metodo_pago" class="px-3 py-2 bg-gray-200 rounded text-gray-700 w-full text-sm">
                                    <option disabled value="0">Seleccione el tipo de venta</option>
                                    <option value="EFECTIVO">EFECTIVO</option>
                                    <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                                </select>
                            </div>
                            <div class="h-auto flex flex-col">

                                <label class="text-sm font-bold" for="description">Lotes</label>
                                <select id="lotesList" class="js-example-placeholder-single js-states form-control" name="state">
                                    <option></option>
                                </select>
                            </div>
                            <div class="h-auto">

                                <label class="text-sm font-bold" for="precio">Precio</label>
                                <div class="flex items-center gap-4">
                                    <div class="campo">

                                        <input id="precio-lote" type="text" class="w-full text-sm px-4  text-sm py-2 rounded bg-gray-100" disabled placeholder="Ingresa un precio">
                                    </div>
                                </div>
                            </div>
                            <div class="h-auto flex items-end rounded">
                                <button id="cart-productos" class="px-3 py-2 bg-yellow-400 text-black font-bold text-sm ">Agregar</button>
                            </div>

                        </div>
                        <table class="w-full border cart-proforma mt-4">
                            <thead>
                                <tr class="bg-gray-200">
                                    <th class="px-4 py-2 text-sm">#</th>
                                    <th class="px-4 py-2 text-sm">Descripción</th>
                                    <th class="px-4 py-2 text-sm">Cantidad</th>
                                    <th class="px-4 py-2 text-sm">Precio</th>
                                    <th class="px-4 py-2 text-sm">Subtotal</th>
                                    <th class="px-4 py-2 text-sm">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="cart-items">
                                <!-- Aquí se generan las filas dinámicamente -->
                            </tbody>
                        </table>

                        <div class="my-8 h-[2px] w-full bg-gray-200"></div>
                        <div>
                            <div id="inputFinanciamiento" class="flex items-center mb-4">
                                <input id="financiamiento_check" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="financiamiento_check" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Financiamento?</label>
                            </div>
                            <div id="container-financiamento" class="hidden">
                                <div class="grid gap-3 grid-cols-1 md:grid-cols-4 w-full">

                                    <div>
                                        <label class="text-sm font-medium text-gray-900 dark:text-gray-300" for="inicial">Monto Inicia</label>
                                        <input id="monto_inicial" class="px-3 py-2 rounded bg-gray-100 w-full" type="text" placeholder="Ingrese el monto inicial">
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-900 dark:text-gray-300" for="cuotas">N-cuotas</label>
                                        <input id="numero_cuotas" class="px-3 py-2 rounded bg-gray-100 w-full" type="text" placeholder="Numero de cuotas">
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-900 dark:text-gray-300" for="cuotas">Monto por cuota</label>
                                        <input id="monto_cuotas" class="px-3 py-2 rounded bg-gray-100 w-full" type="text" placeholder="Numero de cuotas">
                                    </div>
                                    <div class="flex items-end">
                                        <button id="generar-cronograma" class="px-3 py-2 inline-block text-white bg-blue-500 whitespace-nowrap">Generar cronograma</button>
                                    </div>

                                </div>
                                <div class="w-full">
                                    <table class="w-full border cart-proforma mt-4">
                                        <thead>
                                            <tr class="bg-gray-200">
                                                <th class="px-4 py-2 text-sm">#</th>
                                                <th class="px-4 py-2 text-sm">Fecha</th>
                                                <th class="px-4 py-2 text-sm">Monto a pagar</th>
                                            </tr>
                                        </thead>
                                        <tbody id="cart-cronograma">
                                            <!-- Aquí se generan las filas dinámicamente -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <button type="submit" id="registrar_venta_btn" class="text-white bg-[#310ecd] px-3 py-2 rounded text-sm">Registrar</button>
                    </div>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
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
                                <label for="nombres" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Nombres</label>
                                <input type="text" id="nombre-lead" placeholder="Ingrese el nombre del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="apellidos" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Apellidos</label>
                                <input type="text" id="apellido-lead" placeholder="Ingrese los apellidos del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="documento" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Documento</label>
                                <input type="text" id="documento-lead" placeholder="Ingrese su nro documento" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="email" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" id="email-lead" placeholder="Ingrese su correo electrónico" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="celular" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Celular</label>
                                <input type="text" id="celular-lead" placeholder="Ingrese su celular" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="telefono" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Telefono</label>
                                <input type="text" id="telefono-lead" placeholder="Ingrese su telefono" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="pais" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Pais</label>
                                <input type="text" id="pais-lead" placeholder="Ingrese el pais del cliente" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="origen" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Medio Contactado</label>
                                <select class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="origen-lead">
                                    <option value="0">Seleccionar Origen</option>
                                    <option value="Facebook Ads">Facebook Ads</option>
                                    <option value="Marketplace">Marketplace</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Messenger">Messenger</option>
                                    <option value="Tiktok">Tiktok</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Llamada">Llamada</option>
                                    <option value="Prospección">Prospección</option>
                                    <option value="Oficina">Oficina</option>
                                    <option value="otro">otro</option>
                                </select>
                            </div>
                            <div class="mb-6">
                                <label for="campania" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Campaña</label>
                                <input type="text" id="campania-lead" placeholder="Ingrese si pertenece a una campaña" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="ciudad" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Ciudad</label>
                                <input type="text" id="ciudad-lead" placeholder="Ingrese ciudad" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div class="mb-6">
                                <label for="proyecto" class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Proyecto</label>
                                <select type="text" id="proyecto-lead" class="bg-white border border-gray-300 text-gray-900 text-[12px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select>
                            </div>
                        </div>
                        <button type="submit" id="registrar_lead_btn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
                    </form>

                    <!-- <div class="card-input buttons-modal">
                        <button id="cancel-form" class="btn-cancel">Cancelar</button>
                        <button id="add-user-form" class="btn-create">Crear</button>
                    </div> -->
                    <!-- </form> -->
                </div>
            </div>
            <!-- modal abrir caja -->
            <div id="aperturar_caja" class="modal-create md-hidden">
                <div class="form-create">
                    <!-- <form id="form_producto_add"> -->
                    <div class="close-modal">
                        <ion-icon name="close-outline"></ion-icon>
                    </div>
                    <h1 class="font-bold">No hay una caja abierta</h1>

                    <div class="w-full">
                        <h1 class="text-sm mb-4">Debes aperturar una caja para poder vender</h1>
                        <a href="../caja/" class="inline-block px-4 py-3 text-sm text-white bg-red-500">Abrir caja</a>
                    </div>
                </div>
            </div>
            <!-- modal print -->
            <div id="pdf-modal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center hidden z-[50000]">
                <div class="w-[500px]  bg-white p-4 rounded shadow-lg">
                    <h1 class="text-cnter text-xl font-bold">Imprimir PDF</h1>
                    <div class="w-full h-[400px]" id="pdf-content">
                        <table id="pdf-table" class="w-full mb-4">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id="pdf-table-body">
                                <!-- Aquí se agregarán las filas de la tabla de forma dinámica -->
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" class="text-right">TOTAL</td>
                                    <td id="pdf-total">0</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <button id="close-pdf-modal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 rounded">
                        Cerrar PDF
                    </button>
                </div>
            </div>
            <!-- fin de modal print -->
            <div class="flex w-full">
                <button id="new-venta" class="px-3 py-2 text-white bg-[#310ecd] rounded">+ Nueva Venta</button>
            </div>
            <div class="datatable-main mt-4 bg-white px-4 py-3 rounded shadow">
                <table id="ventasList" class="table cust-datatable dataTable no-footer" style="width:100%;">
                    <thead>
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                cliente
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Proyecto
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                fecha
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                tipo venta
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                total
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                pago
                            </th>
                            <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                monto inicial
                            </th> -->
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                acciones
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>


        </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js" integrity="sha512-EmNxF3E6bM0Xg1zvmkeYD3HDBeGxtsG92IxFt1myNZhXdCav9MzvuH/zNMBU1DmIPN6njrhX1VTbqdJxQ2wHDg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script src="../../js/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.2/js/dataTables.fixedColumns.min.js"></script>

    <script src="../../js/dinamic/toastmith.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="../../components/sidebar.js"></script>
    <!-- pdf generate -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"></script>




    <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.9.4/dayjs.min.js" integrity="sha512-XZSHSEFj4QeE0G4pwy4tToyAhF2VXoEcF9CP0t1PSZMP2XHhEEB9PjM9knsdzcEKbi6GRMazdt8tJadz0JTKIQ==" crossorigin="anonymous"></script>
    <script src="../../js/dinamic/gestion_ventas.js"></script>

    </html>
<?php } ?>