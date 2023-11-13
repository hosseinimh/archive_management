<?php

namespace App\Http\Resources\Settings;

use Illuminate\Http\Resources\Json\JsonResource;

class SettingsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'companyName' => $this->company_name ?? '',
            'serialNo' => $this->serial_no ?? '',
            'registryBookNo' => $this->registry_book_no ?? '',
            'registerNo' => $this->register_no ?? '',
        ];
    }
}
