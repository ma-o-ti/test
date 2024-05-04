<?php
return (new \Rmphp\Content\Content('/application/src/Presentation/templates/base.tpl'))->setSubtemplatePath('/application/src/Presentation/templates/')->setSubtemplatePathAlias([
	"main" => "/src/Main/Presentation/templates",
]);