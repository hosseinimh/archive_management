<?php

namespace App\Http\Resources\Document;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'documentNo' => $this->document_no,
            'documentDate' => $this->document_date,
            'paymentNo' => $this->payment_no,
            'paymentDate' => $this->payment_date,
            'owner' => $this->owner,
            'description' => $this->description,
            'createdAt' => $this->created_at,
            'createdAtFa' => Helper::faDate($this->created_at),
            'userId' => intval($this->user_id),
            'userName' => $this->user_name,
            'userFamily' => $this->user_family,
        ];
    }
}
