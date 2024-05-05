<?php

namespace App\Main\Presentation\Controllers;
use Base\Presentation\Controllers\AbstractPageController;
use Psr\Http\Message\ResponseInterface;


class IndexController extends AbstractPageController {

	/**
	 * @return bool|ResponseInterface
	 */
	public function index() : bool|ResponseInterface {
		try {
			//$this->addHeader("App-Mode", "Dev");
			$this->template()->setValue("title", "Главная");
			$this->template()->setSubtemplate("main", "@main/index.tpl");
			$this->template()->setSubtemplate("js-bundle", "@main/bundles/js.tpl");
			$this->template()->setSubtemplate("css-bundle", "@main/bundles/css.tpl");
		}
		catch(\Throwable $e){$error = $this->checkError($e);}
		return $this->render();
	}
}
