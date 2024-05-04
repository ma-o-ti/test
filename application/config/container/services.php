<?php

use Rmphp\Cache\Cache;
use Rmphp\Cache\CacheInterface;
use Rmphp\Session\Session;
use Rmphp\Session\SessionInterface;
use Rmphp\Storage\Mysql\MysqlStorage;
use Rmphp\Storage\Mysql\MysqlStorageInterface;

return [
	MysqlStorageInterface::class => DI\create(MysqlStorage::class)->constructor(json_decode(getenv("MYSQL_PARAM"), true)),
	SessionInterface::class => DI\create(Session::class)->constructor(),
	CacheInterface::class => DI\create(Cache::class)->constructor("../var/cache"),
	'App\*\Domain\Repository\*RepositoryInterface' => DI\autowire('App\*\Infrastructure\Repository\*Repository'),
];