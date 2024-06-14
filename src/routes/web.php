<?php

use App\Http\Controllers\User\DocumentController;
use App\Http\Controllers\User\DocumentFileController;
use App\Http\Controllers\User\ErrorController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->prefix('panel')->group(
    function () {
        Route::get('users/logout', [UserController::class, 'logout']);

        Route::get('errors/excel', [ErrorController::class, 'excel']);

        Route::get('documents/excel', [DocumentController::class, 'excel']);
        Route::get('document_files/download/{model}', [DocumentFileController::class, 'download']);
    }
);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
