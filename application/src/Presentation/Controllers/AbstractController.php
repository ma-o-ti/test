<?php

namespace Base\Presentation\Controllers;

use Laminas\Diactoros\Response\HtmlResponse;
use Laminas\Diactoros\Response\JsonResponse;
use Laminas\Diactoros\Response\RedirectResponse;
use Laminas\Diactoros\Response\TextResponse;
use Psr\Http\Message\ResponseInterface;
use Rmphp\Kernel\Main;
use Throwable;

abstract class AbstractController extends Main {

	/**
	 * @param Throwable $throwable
	 * @param array $data
	 * @return void
	 */
	public function logException(Throwable $throwable, array $data = []) : void {
		$this->logger()->warning($throwable->getMessage()." on ".$throwable->getFile().":".$throwable->getLine(), $data);
	}

	/**
	 * @param Throwable $throwable
	 * @param array $data
	 * @return void
	 */
	public function logError(Throwable $throwable, array $data = []) : void {
		$this->logger()->error($throwable->getMessage()." on ".$throwable->getFile().":".$throwable->getLine(), $data);
	}

	/**
	 * @param string $name
	 * @param string $value
	 * @return void
	 */
	public function addHeader(string $name, string $value) : void {
		$this->globals()->addHeader($name, $value);
	}

	/**
	 * @param $html
	 * @param int $status
	 * @param array $headers
	 * @return ResponseInterface
	 */
	public function htmlResponse($html, int $status = 200, array $headers = []) : ResponseInterface {
		return new HtmlResponse($html, $status, array_merge($this->globals()->response()->getHeaders(), $headers));
	}

	/**
	 * @param $text
	 * @param int $status
	 * @param array $headers
	 * @return ResponseInterface
	 */
	public function textResponse($text, int $status = 200, array $headers = []) : ResponseInterface {
		return new TextResponse($text, $status, array_merge($this->globals()->response()->getHeaders(), $headers));
	}

	/**
	 * @param array $array
	 * @param int $status
	 * @param array $headers
	 * @return ResponseInterface
	 */
	public function jsonResponse(array $array, int $status = 200, array $headers = []) : ResponseInterface {
		return new JsonResponse($array, $status, array_merge($this->globals()->response()->getHeaders(), $headers), JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
	}

	/**
	 * @param string $url
	 * @param int $status
	 * @param array $headers
	 * @return ResponseInterface
	 */
	public function redirectResponse(string $url, int $status = 302, array $headers = []) : ResponseInterface {
		return new RedirectResponse($url, $status, array_merge($this->globals()->response()->getHeaders(), $headers));
	}

	/**
	 * @param string $point
	 * @param string $subtemplate
	 * @param array $data
	 * @param int $status
	 * @param array $headers
	 * @return ResponseInterface
	 */
	public function renderResponse(string $point, string $subtemplate, array $data = [], int $status = 200, array $headers = []) : ResponseInterface {
		$this->template()->setSubtemplate($point, $this->getTemplatePath($subtemplate), $data);
		return new HtmlResponse($this->template()->getResponse(), $status, array_merge($this->globals()->response()->getHeaders(), $headers));
	}

	/**
	 * @param int $status
	 * @param array $headers
	 * @return ResponseInterface
	 */
	public function render(int $status = 200, array $headers = []) : ResponseInterface {
		return new HtmlResponse($this->template()->getResponse(), $status, array_merge($this->globals()->response()->getHeaders(), $headers));
	}

	/**
	 * @param string $point
	 * @param string $string
	 * @return void
	 */
	public function templSetValue(string $point, string $string) : void {
		$this->template()->setValue($point, $string);
	}

	/**
	 * @param string $point
	 * @param string $string
	 * @return void
	 */
	public function templAddValue(string $point, string $string) : void {
		$this->template()->addValue($point, $string);
	}

	/**
	 * @param string $point
	 * @param string $subtemplate
	 * @param array $resource
	 * @return void
	 */
	public function templSetSubtemplate(string $point, string $subtemplate, array $resource = []) : void {
		$this->template()->setSubtemplate($point, $this->getTemplatePath($subtemplate), $resource);
	}

	/**
	 * @param string $point
	 * @param string $subtemplate
	 * @param array $resource
	 * @return void
	 */
	public function templAddSubtemplate(string $point, string $subtemplate, array $resource = []) : void {
		$this->template()->addSubtemplate($point, $this->getTemplatePath($subtemplate), $resource);
	}

	/**
	 * @param string $path
	 * @return string
	 */
	public function getTemplatePath(string $path) : string {
		return $path;
	}
}