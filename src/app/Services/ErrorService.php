<?php

namespace App\Services;

use App\Models\Error as Model;
use Illuminate\Support\Facades\DB;

class ErrorService
{
    public function getPaginate(int $page, int $pageItems): mixed
    {
        return $this->handleGetList()->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAllQuery(): mixed
    {
        return $this->handleGetList();
    }

    public function store(string $message): mixed
    {
        $data = [
            'message' => $message,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function delete(): bool
    {
        return Model::truncate() ? true : false;
    }

    private function handleGetList(): mixed
    {
        return Model::select('tbl_errors.*', DB::raw('COUNT(*) OVER() AS items_count'))->orderBy('created_at', 'DESC')->orderBy('id', 'DESC');
    }
}
