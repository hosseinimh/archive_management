<?php

namespace App\Http\Controllers\User;

use App\Exports\ErrorExport;
use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\ErrorService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

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

    public function delete(Request $request): HttpJsonResponse
    {
        return $this->onDelete($this->service->delete());
    }

    public function excel(Excel $excel)
    {
        $errorExport = new ErrorExport();
        return $excel->download($errorExport, __('error.errors') . '.xlsx');
    }
}
