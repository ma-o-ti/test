<?php
/**
 * Created by PhpStorm.
 * User: Zuev Yuri
 * Date: 25.04.2024
 * Time: 13:06
 */

namespace Base\Infrastructure\Repository;

use Base\Domain\ValueObjectInterface;
use ReflectionClass;
use ReflectionException;

class AbstractRepository {

	static array $classes = [];

	/**
	 * @param string $class
	 * @param $data
	 * @return mixed
	 * @throws RepositoryException
	 */
	public function create(string $class, $data) : mixed {
		try {
			if(!isset(static::$classes[$class])) static::$classes[$class] = new ReflectionClass($class);
			$object = new $class;
			foreach (static::$classes[$class]->getProperties() as $property) {
				$propertyNameSnakeCase = strtolower(preg_replace("'([A-Z])'", "_$1", $property->getName()));
				// data[propertyName] ?? data[property_name] ?? null
				$value = $data[$property->getName()] ?? $data[$propertyNameSnakeCase] ?? null;

				// если есть внутренний метод (приоритетная обработка)
				if(static::$classes[$class]->hasMethod('set'.ucfirst($property->getName()))) $object->{'set'.ucfirst($property->getName())}($value);
				// Если тип свойства класс (valueObject)
				elseif($property->hasType() && class_exists($property->getType()->getName())) $object->{$property->getName()} = new ($property->getType()->getName())($value);
				// если значения не пустое
				elseif(isset($value)) $object->{$property->getName()} = $value;
			}
			return $object;
		}
		catch (ReflectionException $exception) {
			throw new RepositoryException($exception->getMessage());
		}
	}

	/**
	 * @param object $class
	 * @param callable|null $method
	 * @return array
	 */
	public function getProperties(object $class, callable $method = null) : array {

		$objectData = get_object_vars($class);
		foreach ($objectData as $fieldName => $value)
		{
			// to option_id
			$fieldNameSnakeCase = strtolower(preg_replace("'([A-Z])'", "_$1", $fieldName));

			// если есть внутренний метод (приоритетная обработка)
			if(method_exists($this, 'get'.ucfirst($fieldName))) {
				$out[$fieldNameSnakeCase] = $this->{'get'.ucfirst($fieldName)}($value);
			}
			// если тип свойства класс (valueObject)
			elseif($value instanceof ValueObjectInterface && null !== $value->get()) {
				$out[$fieldNameSnakeCase] = $value->get();
			}
			// если передана callable функция через которую нужно пропустить все элементы
			elseif(isset($method) && !is_array($value) && !is_object($value)) {
				$out[$fieldNameSnakeCase] = $method($value);
			}
			// если это логическое значение
			elseif(is_bool($value)){
				$out[$fieldNameSnakeCase] = (int) $value;
			}
			// если это дробное число
			elseif(is_float($value)) {
				$out[$fieldNameSnakeCase] = $value;
			}
			// если это целое число
			elseif(is_int($value)) {
				$out[$fieldNameSnakeCase] = $value;
			}
			// если это строка
			elseif(is_string($value)) {
				$out[$fieldNameSnakeCase] = $value;
			}

		}
		return $out ?? [];
	}
}