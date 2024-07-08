<?php

namespace App\Http\Resources\Document;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentSummaryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'count' => intval($this->count),
            'documentYear' => intval($this->document_year),
        ];
    }
}
