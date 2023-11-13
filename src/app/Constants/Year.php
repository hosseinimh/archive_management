<?php

namespace App\Constants;

use ReflectionClass;

abstract class Year
{
    const YEAR_1398 = 1398;
    const YEAR_1399 = 1399;
    const YEAR_1400 = 1400;
    const YEAR_1401 = 1401;
    const YEAR_1402 = 1402;
    const YEAR_1403 = 1403;
    const YEAR_1404 = 1404;
    const YEAR_1405 = 1405;
    const YEAR_1406 = 1406;
    const YEAR_1407 = 1407;
    const YEAR_1408 = 1408;
    const YEAR_1409 = 1409;
    const YEAR_1410 = 1410;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
