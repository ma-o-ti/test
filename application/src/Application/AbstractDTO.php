<?php

namespace Base\Application;

use ReflectionClass;

abstract class AbstractDTO {

	/**
	 * @param array $data
	 * @return static
	 */
	static function fromArray(array $data) : static {
		$class = new ReflectionClass(static::class);
		$self = new static();
		foreach ($class->getProperties() as $property) {
			$propertyNameSnakeCase = strtolower(preg_replace("'([A-Z])'", "_$1", $property->getName()));
			// data[propertyName] ?? data[property_name] ?? null
			$value = $data[$property->getName()] ?? $data[$propertyNameSnakeCase] ?? null;
			// если есть внутренний метод (приоритетная обработка)
			if($class->hasMethod('set'.ucfirst($property->getName()))) $self->{'set'.ucfirst($property->getName())}($value);
			// прямое присовение по умолчанию
			elseif(isset($value)) $self->{$property->getName()} = $value;
		}
		return $self;
	}
}