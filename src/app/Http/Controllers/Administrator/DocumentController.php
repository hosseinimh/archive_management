<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\Year;
use App\Facades\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreDocumentRequest;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Http\Resources\Document\DocumentResource;
use App\Models\Document as Model;
use App\Packages\JsonResponse;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function __construct(JsonResponse $response, public DocumentService $service)
    {
        parent::__construct($response);
    }

    public function getAddProps(Request $request): HttpJsonResponse
    {
        $documentYear = in_array($request->document_year, Year::toArray()) ? $request->document_year : Helper::getFaCurrentDate()[0];
        $item = $this->service->getLastInDocumentYear($documentYear);
        $item = $item ? new DocumentResource($item) : null;
        return $this->onOk(['documentYear' => $documentYear, 'item' => $item]);
    }

    public function store(StoreDocumentRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->document_year, $request->document_no, $request->document_date, $request->payment_no, $request->payment_date, $request->owner, $request->description, auth()->user()->id));
    }

    public function update(Model $model, UpdateDocumentRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->document_year, $request->document_no, $request->document_date, $request->payment_no, $request->payment_date, $request->owner, $request->description, auth()->user()->id));
    }
}
