<?php

namespace App\Http\Controllers;

use App\Constants\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class FileUploaderController extends Controller
{
    function __construct(private string $storagePath)
    {
        $this->storagePath = $storagePath;
    }

    public function uploadFile(Model $model, Request $request, string $requestKey, string $modelColumn, int $maxSize = 0, array $fileMimeTypes = null)
    {
        if ($request->hasFile($requestKey) && $request->file($requestKey)->isValid()) {
            if (count($fileMimeTypes) > 0 && ($fileMimeType = $request->file($requestKey)->getMimeType()) && !in_array($fileMimeType, $fileMimeTypes)) {
                return UploadedFile::MIME_TYPE_ERROR;
            }
            if ($maxSize > 0 && $request->file($requestKey)->getSize() > $maxSize) {
                return UploadedFile::MAX_SIZE_ERROR;
            }
            $path = $request->$requestKey->store($this->storagePath);
            if ($path) {
                @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->$modelColumn);
                $data = [
                    $modelColumn => basename($path),
                    'name' => mb_substr($request->file($requestKey)->getClientOriginalName(), 0, 100)
                ];
                return $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;
            }
            return UploadedFile::UPLOAD_ERROR;
        }
        return UploadedFile::NOT_UPLOADED_ERROR;
    }

    public function uploadScanFile(Model $model, Request $request, string $requestKey, string $modelColumn, string $name, int $maxSize = 0, array $fileMimeTypes = null)
    {
        if ($request->hasFile($requestKey) && $request->file($requestKey)->isValid()) {
            if (count($fileMimeTypes) > 0 && ($fileMimeType = $request->file($requestKey)->getMimeType()) && !in_array($fileMimeType, $fileMimeTypes)) {
                return UploadedFile::MIME_TYPE_ERROR;
            }
            if ($maxSize > 0 && $request->file($requestKey)->getSize() > $maxSize) {
                return UploadedFile::MAX_SIZE_ERROR;
            }
            $path = $request->$requestKey->store($this->storagePath);
            if ($path) {
                @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->$modelColumn);
                $data = [
                    $modelColumn => basename($path),
                    'name' => $name
                ];
                return $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;
            }
            return UploadedFile::UPLOAD_ERROR;
        }
        return UploadedFile::NOT_UPLOADED_ERROR;
    }
}
