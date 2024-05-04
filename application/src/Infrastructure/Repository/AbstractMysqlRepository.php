<?php

namespace Base\Infrastructure\Repository;

use Base\Domain\EntityInterface;
use Rmphp\Storage\Mysql\MysqlStorageInterface;

abstract class AbstractMysqlRepository extends AbstractRepository {

	public function __construct(
		public readonly MysqlStorageInterface $mysql
	) {}

	/**
	 * @param EntityInterface $object
	 * @param string $table
	 * @return mixed
	 * @throws RepositoryException
	 */
	public function saveEntity(EntityInterface $object, string $table) : mixed {
		$in = $this->getProperties($object, function ($value){
			return (is_string($value)) ? $this->mysql->escapeStr($value) : $value;
		});
		//dd($object, $in);
		try {
			if (!empty($object->getId()) && !empty($this->mysql->findById($table, $object->getId()))) {
				$this->mysql->updateById($table, $in, $object->getId());
				return $object->getId();
			} else {
				$this->mysql->insert($table, $in);
				return (is_string($object->getId())) ? $object->getId() : $this->mysql->mysql()->insert_id;
			}
		} catch (\Throwable $throwable) {throw new RepositoryException($throwable->getMessage());}
	}




}