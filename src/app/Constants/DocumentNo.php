<?php

namespace App\Constants;

use ReflectionClass;

abstract class DocumentNo
{
    const MIN_DOCUMENT_NO = 1;
    const MAX_DOCUMENT_NO = 99999;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
