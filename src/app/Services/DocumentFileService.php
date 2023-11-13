<?php

namespace App\Services;

use App\Models\DocumentFile as Model;

class DocumentFileService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_users', 'tbl_document_files.user_id', 'tbl_users.id')->where('tbl_document_files.id', $id)->select('tbl_document_files.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->first();
    }

    public function getAll(int $documentId): mixed
    {
        return Model::join('tbl_users', 'tbl_document_files.user_id', 'tbl_users.id')->where('document_id', $documentId)->select('tbl_document_files.*', 'tbl_users.name AS user_name', 'tbl_users.family AS user_family')->orderBy('tbl_document_files.created_at', 'ASC')->orderBy('tbl_document_files.id', 'ASC')->get();
    }

    public function store(?string $description, int $documentId, int $userId): mixed
    {
        $data = [
            'description' => $description,
            'document_id' => $documentId,
            'user_id' => $userId,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, ?string $description, int $userId): bool
    {
        $data = [
            'description' => $description,
            'user_id' => $userId,
        ];
        return $model->update($data);
    }

    public function delete(Model $model): bool
    {
        if ($model->path) {
            @unlink(storage_path('app') . '/public/storage/document_files/' . $model->path);
        }
        return $model->delete();
    }

    public function count(int $documentId): int
    {
        return Model::where('document_id', $documentId)->count();
    }
}
