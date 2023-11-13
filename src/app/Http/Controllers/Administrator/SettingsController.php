<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\UpdateSettingsRequest;
use App\Packages\JsonResponse;
use App\Services\SettingsService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class SettingsController extends Controller
{
    public function __construct(JsonResponse $response, public SettingsService $service)
    {
        parent::__construct($response);
    }

    public function update(UpdateSettingsRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($request->company_name, $request->serial_no, $request->registry_book_no, $request->register_no));
    }
}
