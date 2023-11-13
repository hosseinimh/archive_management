<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\DocumentController;
use App\Http\Controllers\User\DocumentFileController;
use App\Http\Controllers\User\ErrorController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\SettingsController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);

    Route::post('errors/store', [ErrorController::class, 'store']);
});

// 'user' type users
Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
    Route::post('users/update', [UserController::class, 'update']);
    Route::post('users/change_password', [UserController::class, 'changePassword']);
});

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('settings/show', [SettingsController::class, 'show']);

    Route::post('notifications', [NotificationController::class, 'index']);
    Route::post('notifications/review', [NotificationController::class, 'review']);
    Route::post('notifications/seen/{model}', [NotificationController::class, 'seen']);
    Route::post('notifications/seen_review', [NotificationController::class, 'seenReview']);

    Route::post('documents', [DocumentController::class, 'index']);
    Route::post('documents/show/{model}', [DocumentController::class, 'show']);

    Route::post('document_files/{document}', [DocumentFileController::class, 'index']);
    Route::post('document_files/show/{model}', [DocumentFileController::class, 'show']);
});
