<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }
}
