<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\IndexDocumentsRequest;
use App\Models\Document as Model;
use App\Packages\JsonResponse;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DocumentController extends Controller
{
    public function __construct(JsonResponse $response, public DocumentService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexDocumentsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->count());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
