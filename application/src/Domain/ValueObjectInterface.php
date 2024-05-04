<?php
/**
 * Created by PhpStorm.
 * User: Zuev Yuri
 * Date: 23.04.2024
 * Time: 3:58
 */

namespace Base\Domain;

interface ValueObjectInterface {

	public function get();
	public function __toString(): string;

}