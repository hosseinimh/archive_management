<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Constants\NotificationCategory;
use App\Constants\NotificationType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\IndexNotificationsRequest;
use App\Http\Resources\Notification\NotificationResource;
use App\Models\Notification as Model;
use App\Packages\JsonResponse;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class NotificationController extends Controller
{
    public function __construct(JsonResponse $response, public NotificationService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexNotificationsRequest $request): HttpJsonResponse
    {
        $category = in_array($request->category, NotificationCategory::toArray()) ? $request->category : 0;
        $records = $this->service->getPaginate(auth()->user()->id, $category, $request->_pn, $request->_pi);
        $response = $this->onItems($records, $this->service->count(auth()->user()->id, $category));
        $this->service->seenPaginate($records);
        return $response;
    }

    public function review(): HttpJsonResponse
    {
        $systemNotifications = $this->service->getReview(auth()->user()->id, NotificationType::SYSTEM);
        $userNotifications = $this->service->getReview(auth()->user()->id, NotificationType::USER);
        $data = ['systemNotifications' => NotificationResource::collection($systemNotifications), 'userNotifications' => NotificationResource::collection($userNotifications)];
        return $this->onItems($data);
    }

    public function seen(Model $model): HttpJsonResponse
    {
        if ($model->user_id === auth()->user()->id && !$model->seen_at) {
            return $this->onUpdate($this->service->seen($model));
        }
        return $this->onError(['_error' => __('general.update_error'), '_errorCode' => ErrorCode::UPDATE_ERROR]);
    }

    public function seenReview(): HttpJsonResponse
    {
        return $this->onUpdate($this->service->seenReview(auth()->user()->id));
    }
}
