<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\DocumentController;
use App\Http\Controllers\Administrator\DocumentFileController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\NotificationController;
use App\Http\Controllers\Administrator\SettingsController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\DocumentController as UserDocumentController;
use App\Http\Controllers\User\DocumentFileController as UserDocumentFileController;
use App\Http\Controllers\User\ErrorController as UserErrorController;
use App\Http\Controllers\User\NotificationController as UserNotificationController;
use App\Http\Controllers\User\SettingsController as UserSettingsController;
use App\Http\Controllers\User\UserController as UserUserController;
use App\Http\Resources\Document\DocumentResource;
use App\Http\Resources\DocumentFile\DocumentFileResource;
use App\Http\Resources\Error\ErrorResource;
use App\Http\Resources\Notification\NotificationResource;
use App\Http\Resources\Settings\SettingsResource;
use App\Http\Resources\User\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Packages\Notification;
use App\Services\DocumentFileService;
use App\Services\DocumentService;
use App\Services\ErrorService;
use App\Services\NotificationService;
use App\Services\SettingsService;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function () {
            return new Helper();
        });

        $this->app->bind('notification', function () {
            return new Notification();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(ErrorController::class, function ($app) {
            return new ErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(UserErrorController::class, function ($app) {
            return new UserErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserDashboardController::class, function ($app) {
            return new UserDashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(SettingsController::class, function ($app) {
            return new SettingsController(new JsonResponse(SettingsResource::class), $app->make(SettingsService::class));
        });

        $this->app->bind(UserSettingsController::class, function ($app) {
            return new UserSettingsController(new JsonResponse(SettingsResource::class), $app->make(SettingsService::class));
        });

        $this->app->bind(NotificationController::class, function ($app) {
            return new NotificationController(new JsonResponse(NotificationResource::class), $app->make(NotificationService::class));
        });

        $this->app->bind(UserNotificationController::class, function ($app) {
            return new UserNotificationController(new JsonResponse(NotificationResource::class), $app->make(NotificationService::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(UserUserController::class, function ($app) {
            return new UserUserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(DocumentController::class, function ($app) {
            return new DocumentController(new JsonResponse(DocumentResource::class), $app->make(DocumentService::class));
        });

        $this->app->bind(UserDocumentController::class, function ($app) {
            return new UserDocumentController(new JsonResponse(DocumentResource::class), $app->make(DocumentService::class));
        });

        $this->app->bind(DocumentFileController::class, function ($app) {
            return new DocumentFileController(new JsonResponse(DocumentFileResource::class), $app->make(DocumentFileService::class));
        });

        $this->app->bind(UserDocumentFileController::class, function ($app) {
            return new UserDocumentFileController(new JsonResponse(DocumentFileResource::class), $app->make(DocumentFileService::class));
        });
    }
}
