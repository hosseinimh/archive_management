<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static mixed getOwner(int $ownerId, int $isMember)
 * @method static mixed getOwnerResource(int $ownerId, int $isMember)
 */
class ShareActionFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'share_action';
    }
}
