<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\StoragePath;
use App\Constants\UploadedFile;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FileUploaderController;
use App\Http\Requests\DocumentFile\StoreDocumentFileRequest;
use App\Http\Requests\DocumentFile\UpdateDocumentFileRequest;
use App\Models\Document;
use App\Models\DocumentFile as Model;
use App\Packages\JsonResponse;
use App\Services\DocumentFileService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class DocumentFileController extends Controller
{
    public function __construct(JsonResponse $response, public DocumentFileService $service)
    {
        parent::__construct($response);
    }

    public function store(Document $document, StoreDocumentFileRequest $request): HttpJsonResponse
    {
        $result = $this->service->store($request->description, $document->id, auth()->user()->id);
        if ($result) {
            $uploadResult = (new FileUploaderController(StoragePath::DOCUMENT_FILE))->uploadFile($result, $request, 'file', 'path', 10 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
            if ($uploadResult !== UploadedFile::OK) {
                $this->service->delete($result);
            }
        }
        return $this->onItems($this->service->getAll($document->id), $this->service->count($document->id));
    }

    public function storeViaScan(Document $document, Request $request): HttpJsonResponse
    {
        $result = $this->service->store(null, $document->id, auth()->user()->id);
        if ($result) {
            $name = __('document_file.document_file') . $this->service->count($document->id) . '.pdf';
            $uploadResult = (new FileUploaderController(StoragePath::DOCUMENT_FILE))->uploadScanFile($result, $request, 'RemoteFile', 'path', $name, 10 * 1024 * 1024, ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
            if ($uploadResult !== UploadedFile::OK) {
                $this->service->delete($result);
            }
        }
        return $this->onItems($this->service->getAll($document->id), $this->service->count($document->id));
    }

    public function update(Model $model, UpdateDocumentFileRequest $request): HttpJsonResponse
    {
        $this->service->update($model, $request->description, auth()->user()->id);
        return $this->onItems($this->service->getAll($model->document_id), $this->service->count($model->document_id));
    }

    public function delete(Model $model): HttpJsonResponse
    {
        $this->service->delete($model);
        return $this->onItems($this->service->getAll($model->document_id), $this->service->count($model->document_id));
    }
}
