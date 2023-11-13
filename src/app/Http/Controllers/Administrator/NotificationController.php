<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\NotificationCategory;
use App\Constants\NotificationType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\IndexNotificationsRequest;
use App\Models\User;
use App\Packages\JsonResponse;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class NotificationController extends Controller
{
    public function __construct(JsonResponse $response, public NotificationService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexNotificationsRequest $request, User $user): HttpJsonResponse
    {
        $type = in_array($request->type, NotificationType::toArray()) ? $request->type : 0;
        $category = in_array($request->category, NotificationCategory::toArray()) ? $request->category : 0;
        return $this->onItems($this->service->getPaginate($user->id, $type, $category, $request->_pn, $request->_pi), $this->service->count($user->id, $type, $category));
    }
}
