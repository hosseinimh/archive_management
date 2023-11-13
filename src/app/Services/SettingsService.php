<?php

namespace App\Services;

use App\Models\Settings as Model;

class SettingsService
{
    public function get(): mixed
    {
        $model = Model::where('id', 1)->first();
        if ($model || ($model = $this->create())) {
            return $model;
        }
        return null;
    }

    public function update(string $companyName, string $serialNo, string $registryBookNo, string $registerNo): bool
    {
        $model = $this->get();
        $data = [
            'company_name' => $companyName ?? '',
            'serial_no' => $serialNo ?? '',
            'registry_book_no' => $registryBookNo ?? '',
            'register_no' => $registerNo ?? '',
        ];
        return $model->update($data);
    }

    private function create(): mixed
    {
        $data = [
            'company_name' => '',
            'serial_no' => '',
            'registry_book_no' => '',
            'register_no' => '',
        ];
        return Model::create($data);
    }
}
