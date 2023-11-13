<?php

namespace App\Http\Resources\DocumentFile;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentFileResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'path' => $this->path,
            'name' => $this->name,
            'description' => $this->description,
            'createdAt' => $this->created_at,
            'createdAtFa' => Helper::faDate($this->created_at),
            'documentId' => intval($this->document_id),
            'userId' => intval($this->user_id),
            'userName' => $this->user_name,
            'userFamily' => $this->user_family,
        ];
    }
}
