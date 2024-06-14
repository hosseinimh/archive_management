<?php

namespace App\Http\Controllers\User;

use App\Exports\DocumentExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Document\ExcelDocumentsRequest;
use App\Http\Requests\Document\IndexDocumentsRequest;
use App\Models\Document as Model;
use App\Packages\JsonResponse;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Maatwebsite\Excel\Excel;

class DocumentController extends Controller
{
    public function __construct(JsonResponse $response, public DocumentService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexDocumentsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->document_no, $request->document_date, $request->payment_no, $request->payment_date, $request->owner, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function excel(ExcelDocumentsRequest $request, Excel $excel)
    {
        $documentExport = new DocumentExport(
            $request->document_no,
            $request->document_date,
            $request->payment_no,
            $request->payment_date,
            $request->owner
        );
        return $excel->download($documentExport, __('document.documents') . '.xlsx');
    }
}
