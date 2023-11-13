<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void onLoginSuccess(User $user)
 */
class Notification extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'notification';
    }
}
