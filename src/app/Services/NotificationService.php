<?php

namespace App\Services;

use App\Models\Notification as Model;
use Illuminate\Database\Eloquent\Collection;

class NotificationService
{
    public function getPaginate(int $userId, int $category, int $page, int $pageItems): mixed
    {
        $query = Model::query()->where('user_id', $userId);
        if ($category !== 0) {
            $query->where('category', $category);
        }
        return $query->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getReview(int $userId, int $type): mixed
    {
        return Model::where('user_id', $userId)->where('type', $type)->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->take(10)->get();
    }

    public function store(int $userId, int $type, int $category, int $subCategory, string $messageFields, int $priority, string|null $seenAt = null): mixed
    {
        $data = [
            'type' => $type,
            'category' => $category,
            'sub_category' => $subCategory,
            'message_fields' => $messageFields,
            'priority' => $priority,
            'user_id' => $userId,
            'seen_at' => $seenAt
        ];
        return Model::create($data);
    }

    public function seen(Model $model): bool
    {
        $data = [
            'seen_at' => date('Y-m-d H:i:s'),
        ];
        return $model->update($data);
    }

    public function seenReview(int $userId): bool
    {
        $query = Model::query()->where('user_id', $userId)->whereNull('seen_at')->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->take(10);
        $data = [
            'seen_at' => date('Y-m-d H:i:s'),
        ];
        return $query->update($data);
    }

    public function seenPaginate(Collection $records)
    {
        $data = [
            'seen_at' => date('Y-m-d H:i:s'),
        ];
        foreach ($records as $record) {
            if (!$record->seen_at) {
                $record->update($data);
            }
        }
    }

    public function count(int $userId, int $category): int
    {
        $query = Model::query()->where('user_id', $userId);
        if ($category !== 0) {
            $query = $query->where('category', $category);
        }
        return $query->count();
    }
}
