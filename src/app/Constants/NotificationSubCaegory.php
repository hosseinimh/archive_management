<?php

namespace App\Constants;

use ReflectionClass;

abstract class NotificationSubCaegory
{
    const LOGIN_SUCCEED = 111;
    const LOGIN_FAILED = 112;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
