<?php
return (new \Monolog\Logger('system'))->pushHandler(new \Monolog\Handler\StreamHandler(dirname(__DIR__, 3).'/var/logs/log'.date('Ymd').'.log'));
