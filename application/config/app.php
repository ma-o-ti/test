<?php

return [
	/**
	 * Путь к файлу фабрики возвращающий реализацию RouterInterface или сам экземпляр класса
	 */
	\Rmphp\Foundation\RouterInterface::class => 'application/config/factories/routerFactory.php',
	/**
	 * Путь к файлу фабрики возвращающий реализацию TemplateInterface или сам экземпляр класса
	 */
	\Rmphp\Foundation\TemplateInterface::class => 'application/config/factories/templateFactory.php',
	/**
	 * Путь к файлу фабрики возвращающий реализацию PSR-3 LoggerInterface или сам экземпляр класса
	 */
	\Psr\Log\LoggerInterface::class => 'application/config/factories/loggerFactory.php',
	/**
	 * Путь к файлу фабрики возвращающий реализацию PSR-11 ContainerInterface или сам экземпляр класса
	 */
	\Psr\Container\ContainerInterface::class => 'application/config/factories/containerFactory.php',
];
 