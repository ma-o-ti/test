<?php
/**
 * Created by PhpStorm.
 * User: Zuev Yuri
 */

namespace Base\Domain;

abstract class AbstractObject implements EntityInterface {

	/**
	 * @return int|null
	 */
	public function getId(): mixed {
		return (isset($this->id)) ? (($this->id instanceof ValueObjectInterface) ? $this->id->get() : $this->id) : null;
	}
}