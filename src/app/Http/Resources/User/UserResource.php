<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => $this->name ?? '',
            'family' => $this->family ?? '',
            'role' => intval($this->role),
            'mobile' => $this->mobile ?? '',
            'isActive' => intval($this->is_active),
        ];
    }
}
