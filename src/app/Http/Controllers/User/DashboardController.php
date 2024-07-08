<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\Document\DocumentSummaryResource;
use App\Packages\JsonResponse;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function index(): HttpJsonResponse
    {
        $documentService = new DocumentService();
        $summary = DocumentSummaryResource::collection($documentService->getSummary());
        return $this->onOk(['summary' => $summary]);
    }
}
