<?php

$routes = glob(__DIR__."/{*.yaml}", GLOB_BRACE);

$routesCollection = array_map(function ($routesFile){
	return file_get_contents($routesFile).PHP_EOL;
}, $routes);

return yaml_parse(implode($routesCollection));