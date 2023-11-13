<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\ErrorService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class ErrorController extends Controller
{
    public function __construct(JsonResponse $response, public ErrorService $service)
    {
        parent::__construct($response);
    }

    public function index(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->count());
    }
}
