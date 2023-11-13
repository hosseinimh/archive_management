<?php

namespace App\Http\Controllers\User;

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

    public function store(Request $request): HttpJsonResponse
    {
        $error = $request->error ?? '';
        $errorInfo = $request->error_info ?? '';
        $message = $error . '
' . $errorInfo;

        return $this->onStore($this->service->store($message));
    }
}
