<?php

namespace App\Constants;

use ReflectionClass;

abstract class NotificationType
{
    const SYSTEM = 1;
    const USER = 2;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
