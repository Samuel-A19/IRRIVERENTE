-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-12-2025 a las 02:14:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pizzeria_irriverente`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito_compra`
--

CREATE TABLE `carrito_compra` (
  `id_carrito` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_producto` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `fecha_agregado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_pedido` int(10) UNSIGNED NOT NULL,
  `id_producto` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_pedido` int(10) UNSIGNED NOT NULL,
  `fecha_compra` datetime NOT NULL DEFAULT current_timestamp(),
  `detalles_compra` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(50) NOT NULL DEFAULT 'pendiente',
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pizza_prices`
--

CREATE TABLE `pizza_prices` (
  `product_id` int(11) NOT NULL,
  `price_small` int(11) NOT NULL,
  `price_medium` int(11) NOT NULL,
  `price_large` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pizza_prices`
--

INSERT INTO `pizza_prices` (`product_id`, `price_small`, `price_medium`, `price_large`) VALUES
(1, 13500, 29000, 47500),
(2, 13500, 29000, 47500),
(3, 13500, 29000, 47500),
(4, 15000, 29000, 47500),
(5, 19000, 32500, 49500),
(6, 16000, 31000, 48500),
(7, 14000, 29000, 47500),
(8, 15000, 29000, 47500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ingredients` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `is_pizza` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `ingredients`, `price`, `category`, `is_pizza`) VALUES
(1, 'Pizza Margarita', 'Jamon, queso mozzarella', NULL, 'pizza', 1),
(2, 'Pizza Primavera', 'Jamon, maíz, tocineta', NULL, 'pizza', 1),
(3, 'Pizza Hawaiana', 'Jamon, piña', NULL, 'pizza', 1),
(4, 'Pizza Ranchera', 'Jamon, pimentón, tocineta, carne desmechada', NULL, 'pizza', 1),
(5, 'Pizza A la Marinera', 'Champiñones, camarones, calamares', NULL, 'pizza', 1),
(6, 'Pizza 4 Quesos', 'Mozzarella, provolone, gouda, parmesano', NULL, 'pizza', 1),
(7, 'Pizza Alemana', 'Jamon, salami, peperoni, tocineta, chorizo', NULL, 'pizza', 1),
(8, 'Pizza Mexicana', 'Jamon, tomate, chorizo, maiz, carne molida', NULL, 'pizza', 1),
(9, 'Pasta Carbonara', 'Tocineta y jamón en salsa blanca con pimienta', 19500, 'pasta', 0),
(10, 'Pasta Alfredo', 'Salsa blanca con mantequilla, ajo y perejil', 19500, 'pasta', 0),
(11, 'Pasta Bolognesa', 'Carne molida en salsa de tomate', 19000, 'pasta', 0),
(12, 'Pasta Irriverente', 'Carne o pollo en salsa especial de la casa', 22000, 'pasta', 0),
(13, 'Pasta A la Marinera', 'Calamares y camarones en salsa de tomate', 24000, 'pasta', 0),
(14, 'Olio con Camarones y Champiñones', 'Ají especial de la casa', 24000, 'pasta', 0),
(15, 'All Amatriciana', 'Tocineta y aceitunas en salsa de tomate', 19500, 'pasta', 0),
(16, 'Lasaña de Pollo', '3 capas de pasta y pollo con bechamel y gratinado', 19000, 'lasagna', 0),
(17, 'Lasaña de Carne', '3 capas de pasta y carne molida con bechamel', 19000, 'lasagna', 0),
(18, 'Hamburguesa Irriverente', 'Carne 100% res, queso mozzarella, lechuga, tomate, salsa tártara', 14000, 'hamburguesa', 0),
(19, 'Hamburguesa Irriverente + Papas', 'Carne 100% res, queso mozzarella, lechuga, tomate, salsa tártara', 17000, 'hamburguesa', 0),
(20, 'Limonada de Piña', '', 6000, 'limonadas', 0),
(21, 'Limonada de Fresa', '', 6000, 'limonadas', 0),
(22, 'Limonada Natural', '', 6000, 'limonadas', 0),
(23, 'Malteada de Fresa', '', 9000, 'limonadas', 0),
(24, 'Gaseosa Personal (350ml)', '', 4000, 'gaseosa', 0),
(25, 'Gaseosa Grande (1.5L)', '', 8000, 'gaseosa', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rango` varchar(20) NOT NULL DEFAULT 'cliente',
  `fecha_creacion` date NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_completo`, `correo`, `contrasena`, `rango`, `fecha_creacion`, `reset_token`, `reset_expiry`) VALUES
(1, 'AzuKy', 'Samuelesssneider@gmail.com', '$2y$10$5Y62kCIM6CdvLIqu/CLfVe0RJt/UyFQU1zC.whgsv5qzduiQX1P2W', 'cliente', '2025-10-16', NULL, NULL),
(13, 'Samuel', 'Samuelessneider@gmail.com', '$2y$10$seJ0yFb7czUoRZQSq0WwG.e3K2ZHMGxvP1raRsHvetwlSsbfmKRUa', 'cliente', '2025-10-16', NULL, NULL),
(14, 'Steven ', 'Stevendavidmora@gmail.com', '$2y$10$yT9FBrXNc9gjhfig1KlPD.4eCSNCyNkQoz0ptLyh0e6rjBjzJHh0a', 'cliente', '2025-10-16', NULL, NULL),
(15, 'Erick', 'ericksebastian0103@gmail.com', '$2y$10$5YRPMGzrDYmcmmu2er1tverhvAgcj40lPs3Gq./EPhQQ2BKT27MAm', 'admin', '2025-11-27', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito_compra`
--
ALTER TABLE `carrito_compra`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_usuario` (`id_usuario`,`id_producto`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_pedido`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_pedido` (`id_pedido`,`id_producto`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`,`id_pedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pizza_prices`
--
ALTER TABLE `pizza_prices`
  ADD PRIMARY KEY (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `correo_2` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito_compra`
--
ALTER TABLE `carrito_compra`
  MODIFY `id_carrito` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito_compra`
--
ALTER TABLE `carrito_compra`
  ADD CONSTRAINT `carrito_compra_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `carrito_compra_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pizza_prices`
--
ALTER TABLE `pizza_prices`
  ADD CONSTRAINT `pizza_prices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
