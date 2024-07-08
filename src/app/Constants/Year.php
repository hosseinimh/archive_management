<?php

namespace App\Constants;

abstract class Year
{
    const MIN_YEAR = 1398;
    const MAX_YEAR = 1420;

    public static function toArray()
    {
        return range(Year::MIN_YEAR, Year::MAX_YEAR);
    }
}
