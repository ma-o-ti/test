<?php

use DI\ContainerBuilder;

$containerDir = (getenv("CONTAINER_DIR")) ?: "application/config/container";
$containerCache = (getenv("CONTAINER_CACHE"))?:"var/cache/container";

$dependencies = glob(dirname(__DIR__,3)."/".$containerDir."/*.php");
$dependenciesCollection = array_map(function ($dependenciesFile){
	return require $dependenciesFile;
}, $dependencies);

try {
	$builder = new ContainerBuilder();
	if(getenv("APP_MODE") == "PROD") $builder->enableCompilation(dirname(__DIR__,3)."/".$containerCache);
	$builder->addDefinitions(array_replace_recursive(...$dependenciesCollection));
	return $builder->build();
} catch (Exception $e) {echo $e->getMessage();}
