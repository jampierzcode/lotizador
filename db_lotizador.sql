-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2023 a las 22:46:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_lotizador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `tipo_documento` varchar(50) NOT NULL,
  `documento` int(11) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` int(9) NOT NULL,
  `Pais` varchar(20) NOT NULL,
  `createdBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `id` int(11) NOT NULL,
  `proyectoID` int(11) NOT NULL,
  `ancho` int(5) NOT NULL,
  `largo` int(5) NOT NULL,
  `area` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `mz_zona` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `cordinates` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`cordinates`)),
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lotes`
--

INSERT INTO `lotes` (`id`, `proyectoID`, `ancho`, `largo`, `area`, `numero`, `mz_zona`, `precio`, `tipo`, `cordinates`, `estado`) VALUES
(1, 4, 10, 20, 200, 1, 'A', 23500, 'rectangulo', '[[917.2401985146852,976.4935403451585],[746.0297577195893,1063.5941924153715]]', 'SEPARADO'),
(2, 4, 10, 20, 200, 2, 'A', 22500, 'rectangulo', '[[1001.7906380803968,979.8068456515387],[918.8258378888456,1150.4746168840115]]', 'DISPONIBLE'),
(3, 4, 10, 20, 200, 3, 'A', 22500, 'rectangulo', '[[1087.4187238392065,979.0107416511421],[1003.7362210087123,1150.0580140700094]]', 'OCUPADO'),
(4, 4, 10, 200, 200, 4, 'A', 22500, 'rectangulo', '[[1172.920904491662,979.3568380233365],[1088.8443524417032,1150.8578301402174]]', 'OCUPADO'),
(5, 4, 10, 20, 200, 5, 'A', 22200, 'rectangulo', '[[1258.0950666028164,979.9988201392259],[1175.408206284323,1150.8054704186693]]', 'SEPARADO'),
(6, 4, 10, 20, 200, 6, 'A', 22500, 'rectangulo', '[[1345.7717482582023,979.6976631630581],[1259.5504604448286,1151.4439282086405]]', 'SEPARADO'),
(7, 4, 10, 20, 200, 7, 'A', 22500, 'rectangulo', '[[1430.5465922318817,979.2810565349553],[1346.8835490025601,1151.4763599764651]]', 'SEPARADO'),
(8, 4, 10, 20, 200, 8, 'A', 22500, 'rectangulo', '[[1513.7902771829288,980.0366841847094],[1431.7982512794329,1152.2319952544217]]', 'DISPONIBLE'),
(9, 4, 15, 20, 300, 9, 'A', 25000, 'rectangulo', '[[1645.8940473110088,980.0386073928545],[1516.652403297995,1151.956160368626]]', 'DISPONIBLE'),
(10, 4, 10, 25, 250, 10, 'A', 21000, 'rectangulo', '[[1642.9985487763042,1153.5455850392427],[1431.9412330741395,1240]]', 'DISPONIBLE'),
(11, 4, 10, 25, 250, 11, 'A', 23000, 'poligono', '[[1644.0485930923426,1240.180524368288],[1644.604472838458,1323.4895389651563],[1431.1472915713102,1323.2118489617428],[1431.9811188243066,1239.347423849368]]', 'DISPONIBLE'),
(12, 4, 10, 200, 200, 5, 'a', 25000, 'rectangulo', '[[1429.5,1159],[1341.5,1323.5]]', 'DISPONIBLE'),
(13, 5, 10, 20, 200, 1, 'A', 12000, 'rectangulo', '[[446.5,341.5],[305.5,445.5]]', 'DISPONIBLE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `nombreProyecto` varchar(250) NOT NULL,
  `imgUrl` varchar(250) NOT NULL,
  `cantLotes` int(11) NOT NULL,
  `proyectStatus` varchar(20) NOT NULL,
  `fecha_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombreRol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombreRol`) VALUES
(1, 'superadmin'),
(2, 'admin'),
(3, 'clientes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre_servicio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre_servicio`) VALUES
(1, 'Lotizador'),
(2, 'Usuarios'),
(3, 'CRM');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_proyect`
--

CREATE TABLE `user_proyect` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  `created_asigned` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_register` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` int(8) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `usuarioRol` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `usuarioStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `createdBy_2` (`createdBy`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyectoID` (`proyectoID`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_proyect`
--
ALTER TABLE `user_proyect`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`proyecto_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `usuarioRol` (`usuarioRol`),
  ADD KEY `createdBy` (`createdBy`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_proyect`
--
ALTER TABLE `user_proyect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`usuarioRol`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
